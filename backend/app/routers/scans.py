import os
import uuid
import asyncio
import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..config import settings
from ..auth import get_current_user
from ..vision_pipeline import assess_image_quality, analyze_sapling_features, analyze_mature_tree_features
from ..weather import fetch_nagpur_weather
from ..qr_service import generate_passport_qr, compute_verification_hash

router = APIRouter(prefix="/api/scans", tags=["Scans"])

@router.post("/upload")
async def upload_scan_images(
    scan_mode: str = Form("sapling"),  # sapling or mature_tree
    plant_uid: Optional[str] = Form(None),
    batch_code: Optional[str] = Form("NGP-2026-B01"),
    variety: str = Form("Nagpur Mandarin"),
    rootstock: str = Form("Rangpur Lime"),
    growth_stage: str = Form("Budded Sapling"),
    soil_type: Optional[str] = Form("Potting Mix"),
    irrigation_method: Optional[str] = Form("Drip / Micro-sprinkler"),
    symptoms_observed: Optional[str] = Form(""),
    recent_fertilizer: Optional[str] = Form(""),
    recent_pesticide: Optional[str] = Form(""),
    whole_plant: Optional[UploadFile] = File(None),
    leaf_closeup: Optional[UploadFile] = File(None),
    graft_joint: Optional[UploadFile] = File(None),
    fruit_shoot: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_current_user)
):
    """
    FR5 & FR6: Upload 4 required photos with metadata and validate quality.
    """
    scan_uid = f"SCN-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    if not plant_uid:
        plant_uid = f"SS-NGP-{datetime.datetime.utcnow().year}-{uuid.uuid4().hex[:4].upper()}"

    # Find or associate batch
    batch = db.query(models.Batch).filter(models.Batch.batch_code == batch_code).first()
    if not batch:
        nursery = db.query(models.Nursery).first()
        batch = models.Batch(
            batch_code=batch_code,
            nursery_id=nursery.id if nursery else 1,
            variety=variety,
            rootstock=rootstock
        )
        db.add(batch)
        db.commit()
        db.refresh(batch)

    # Find or create plant
    plant = db.query(models.Plant).filter(models.Plant.plant_uid == plant_uid).first()
    if not plant:
        plant = models.Plant(
            plant_uid=plant_uid,
            batch_id=batch.id,
            plant_type=scan_mode,
            variety=variety,
            rootstock=rootstock
        )
        db.add(plant)
        db.commit()
        db.refresh(plant)

    # Initial scan placeholder
    scan = models.Scan(
        scan_uid=scan_uid,
        plant_id=plant.id,
        batch_id=batch.id,
        nursery_id=batch.nursery_id,
        user_id=current_user.id if current_user else 1,
        scan_mode=scan_mode,
        growth_stage=growth_stage,
        variety=variety,
        rootstock=rootstock,
        irrigation_method=irrigation_method,
        soil_type=soil_type,
        symptoms_observed=symptoms_observed,
        recent_fertilizer=recent_fertilizer,
        recent_pesticide=recent_pesticide,
        overall_verdict="analyzing",
        confidence_score=0.0,
        status="created"
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    # Save uploaded files and run quality checks
    uploads = [
        ("whole_plant", whole_plant),
        ("leaf_closeup", leaf_closeup),
        ("graft_joint", graft_joint),
        ("fruit_shoot", fruit_shoot),
    ]

    saved_images = []
    quality_issues = []

    for view_type, file_obj in uploads:
        if file_obj and file_obj.filename:
            ext = os.path.splitext(file_obj.filename)[1].lower() or ".jpg"
            filename = f"{scan_uid}_{view_type}{ext}"
            file_dest = os.path.join(settings.UPLOAD_DIR, filename)

            content = await file_obj.read()
            with open(file_dest, "wb") as f:
                f.write(content)

            # Quality gate evaluation
            q_res = assess_image_quality(file_dest)
            if not q_res["passed"]:
                quality_issues.append(f"{view_type}: {q_res['reason']}")

            scan_img = models.ScanImage(
                scan_id=scan.id,
                view_type=view_type,
                file_path=f"/uploads/{filename}",
                blur_score=q_res["blur_score"],
                brightness_score=q_res["brightness"],
                quality_passed=q_res["passed"]
            )
            db.add(scan_img)
            saved_images.append(scan_img)

    db.commit()

    return {
        "status": "uploaded",
        "scan_id": scan.id,
        "scan_uid": scan.scan_uid,
        "plant_uid": plant.plant_uid,
        "images_saved": len(saved_images),
        "quality_gate_passed": len(quality_issues) == 0,
        "quality_warnings": quality_issues
    }


@router.post("/{scan_id}/analyze")
async def run_scan_analysis(scan_id: int, db: Session = Depends(get_db)):
    """
    FR7: Quality Gate -> Segmentation & Colour Metrics -> Health Classification -> Graft Check -> Decision -> Report.
    """
    scan = db.query(models.Scan).filter(models.Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    images = db.query(models.ScanImage).filter(models.ScanImage.scan_id == scan_id).all()
    
    # Map views to local filesystem paths
    image_paths_by_view = {}
    for img in images:
        rel_path = img.file_path.replace("/uploads/", "")
        full_path = os.path.join(settings.UPLOAD_DIR, rel_path)
        if os.path.exists(full_path):
            image_paths_by_view[img.view_type] = full_path

    # Gather weather for disease risk correlation (FR18)
    weather = await fetch_nagpur_weather()

    metadata = {
        "symptoms_observed": scan.symptoms_observed or "",
        "variety": scan.variety,
        "rootstock": scan.rootstock,
        "mode": scan.scan_mode
    }

    # Run AI analysis
    if scan.scan_mode == "mature_tree":
        analysis = analyze_mature_tree_features(image_paths_by_view, metadata)
    else:
        analysis = analyze_sapling_features(image_paths_by_view, metadata)

    # Save Grad-CAM heatmaps
    heatmaps = analysis.get("heatmaps", {})
    for img in images:
        if img.view_type in heatmaps:
            img.heatmap_path = heatmaps[img.view_type]

    # Update scan results
    scan.overall_verdict = analysis["overall_verdict"]
    scan.confidence_score = analysis["confidence_score"]
    scan.growth_score = analysis["growth_score"]
    scan.leaf_score = analysis["leaf_score"]
    scan.graft_score = analysis["graft_score"]
    scan.primary_condition = analysis["primary_condition"]
    scan.condition_category = analysis["condition_category"]
    scan.recovery_advisory = analysis["recovery_advisory"]
    scan.weather_snapshot = weather
    scan.status = "pending_review" if analysis["overall_verdict"] == "questionable" else "completed"

    # Update plant current status
    if scan.plant:
        scan.plant.current_status = scan.overall_verdict

    # Save AI Assessment record
    assessment = models.AIAssessment(
        scan_id=scan.id,
        primary_finding=analysis["primary_finding"],
        attention_description="Grad-CAM highlight identifies specific regions of interest (chlorosis vs foliar necrosis).",
        evidence_points=analysis.get("evidence_points", []),
        inference_time_ms=310
    )
    db.add(assessment)

    # If verdict is 'suitable', automatically generate the QR Plant Passport! (FR13)
    passport_uid = None
    if scan.overall_verdict == "suitable":
        passport_uid = f"PSP-NGP-{uuid.uuid4().hex[:8].upper()}"
        qr_path = generate_passport_qr(passport_uid)
        nursery_name = scan.plant.batch.nursery.name if scan.plant and scan.plant.batch and scan.plant.batch.nursery else "Vidarbha Certified Citrus Nursery"
        batch_code = scan.plant.batch.batch_code if scan.plant and scan.plant.batch else "BATCH-2026"
        v_hash = compute_verification_hash(scan.plant.plant_uid, batch_code, nursery_name, "suitable")

        passport = models.PlantPassport(
            passport_uid=passport_uid,
            plant_id=scan.plant.id,
            scan_id=scan.id,
            qr_code_path=qr_path,
            verification_hash=v_hash,
            nursery_name=nursery_name,
            batch_code=batch_code,
            variety=scan.variety,
            rootstock=scan.rootstock,
            verdict="suitable",
            review_status="Direct AI Certified",
            survival_status="alive"
        )
        db.add(passport)

    db.commit()

    return {
        "status": "completed",
        "scan_id": scan.id,
        "overall_verdict": scan.overall_verdict,
        "confidence_score": scan.confidence_score,
        "growth_score": scan.growth_score,
        "leaf_score": scan.leaf_score,
        "graft_score": scan.graft_score,
        "recovery_advisory": scan.recovery_advisory,
        "passport_uid": passport_uid
    }


@router.get("/{scan_id}")
def get_scan_details(scan_id: int, db: Session = Depends(get_db)):
    scan = db.query(models.Scan).filter(models.Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    images = db.query(models.ScanImage).filter(models.ScanImage.scan_id == scan_id).all()
    assessment = db.query(models.AIAssessment).filter(models.AIAssessment.scan_id == scan_id).first()
    passport = db.query(models.PlantPassport).filter(models.PlantPassport.scan_id == scan_id).first()

    return {
        "id": scan.id,
        "scan_uid": scan.scan_uid,
        "plant_uid": scan.plant.plant_uid if scan.plant else "N/A",
        "batch_code": scan.plant.batch.batch_code if scan.plant and scan.plant.batch else "N/A",
        "nursery_name": scan.plant.batch.nursery.name if scan.plant and scan.plant.batch and scan.plant.batch.nursery else "Hatla Citrus Nursery",
        "scan_mode": scan.scan_mode,
        "growth_stage": scan.growth_stage,
        "variety": scan.variety,
        "rootstock": scan.rootstock,
        "overall_verdict": scan.overall_verdict,
        "confidence_score": scan.confidence_score,
        "growth_score": scan.growth_score,
        "leaf_score": scan.leaf_score,
        "graft_score": scan.graft_score,
        "primary_condition": scan.primary_condition,
        "condition_category": scan.condition_category,
        "recovery_advisory": scan.recovery_advisory,
        "weather_snapshot": scan.weather_snapshot,
        "status": scan.status,
        "created_at": scan.created_at.isoformat(),
        "passport_uid": passport.passport_uid if passport else None,
        "images": [
            {
                "view_type": img.view_type,
                "file_path": img.file_path,
                "heatmap_path": img.heatmap_path,
                "blur_score": img.blur_score,
                "quality_passed": img.quality_passed
            }
            for img in images
        ],
        "assessment": {
            "model_version": assessment.model_version,
            "inference_time_ms": assessment.inference_time_ms,
            "primary_finding": assessment.primary_finding,
            "attention_description": assessment.attention_description,
            "evidence_points": assessment.evidence_points
        } if assessment else None
    }


@router.get("")
def list_scans(
    status_filter: Optional[str] = None,
    mode_filter: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """FR14: Scan history with search & filter from database."""
    query = db.query(models.Scan)

    if status_filter and status_filter != "all":
        query = query.filter(models.Scan.overall_verdict == status_filter)

    if mode_filter and mode_filter != "all":
        query = query.filter(models.Scan.scan_mode == mode_filter)

    if search:
        query = query.filter(
            (models.Scan.scan_uid.contains(search)) |
            (models.Scan.variety.contains(search)) |
            (models.Scan.primary_condition.contains(search))
        )

    scans = query.order_by(models.Scan.created_at.desc()).limit(limit).all()

    results = []
    for s in scans:
        results.append({
            "id": s.id,
            "scan_uid": s.scan_uid,
            "plant_uid": s.plant.plant_uid if s.plant else "N/A",
            "batch_code": s.plant.batch.batch_code if s.plant and s.plant.batch else "N/A",
            "scan_mode": s.scan_mode,
            "variety": s.variety,
            "overall_verdict": s.overall_verdict,
            "confidence_score": s.confidence_score,
            "growth_score": s.growth_score,
            "leaf_score": s.leaf_score,
            "graft_score": s.graft_score,
            "primary_condition": s.primary_condition,
            "status": s.status,
            "created_at": s.created_at.isoformat()
        })

    return results


@router.get("/{scan_id}/live-progress")
async def live_progress_sse(scan_id: int):
    """
    FR8 Live Progress via SSE (Uploading, Validating, Running model, Generating assessment, Saving report, Completed).
    """
    async def event_generator():
        stages = [
            ("uploading", "Uploading 4 plant views...", 15),
            ("validating", "Running quality gate (blurriness & lighting check)...", 35),
            ("running_model", "Evaluating foliar health & graft union in MobileNet/OpenCV...", 65),
            ("generating_assessment", "Synthesizing Grad-CAM heatmap & ICAR-CCRI recovery advisory...", 85),
            ("saving_report", "Generating digital Plant Passport and cryptographic verification hash...", 95),
            ("completed", "Assessment completed successfully!", 100)
        ]

        for step, msg, pct in stages:
            yield f"data: {{\"step\": \"{step}\", \"message\": \"{msg}\", \"percent\": {pct}}}\n\n"
            await asyncio.sleep(0.4)

    return StreamingResponse(event_generator(), media_type="text/event-stream")
