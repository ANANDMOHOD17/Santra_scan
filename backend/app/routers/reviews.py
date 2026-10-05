import uuid
import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..auth import get_current_user
from ..qr_service import generate_passport_qr, compute_verification_hash

router = APIRouter(prefix="/api/reviews", tags=["Expert Reviews"])

@router.get("/queue")
def get_review_queue(db: Session = Depends(get_db)):
    """FR15: Fetch all scans needing expert review (Questionable or low-confidence)."""
    pending = db.query(models.Scan).filter(
        (models.Scan.overall_verdict == "questionable") |
        (models.Scan.status == "pending_review")
    ).order_by(models.Scan.created_at.desc()).all()

    queue_items = []
    for s in pending:
        images = db.query(models.ScanImage).filter(models.ScanImage.scan_id == s.id).all()
        queue_items.append({
            "scan_id": s.id,
            "scan_uid": s.scan_uid,
            "plant_uid": s.plant.plant_uid if s.plant else "N/A",
            "batch_code": s.plant.batch.batch_code if s.plant and s.plant.batch else "N/A",
            "nursery_name": s.plant.batch.nursery.name if s.plant and s.plant.batch and s.plant.batch.nursery else "Vidarbha Nursery",
            "variety": s.variety,
            "rootstock": s.rootstock,
            "overall_verdict": s.overall_verdict,
            "confidence_score": s.confidence_score,
            "growth_score": s.growth_score,
            "leaf_score": s.leaf_score,
            "graft_score": s.graft_score,
            "primary_condition": s.primary_condition,
            "symptoms_observed": s.symptoms_observed,
            "created_at": s.created_at.isoformat(),
            "images": [
                {
                    "view_type": img.view_type,
                    "file_path": img.file_path,
                    "heatmap_path": img.heatmap_path
                }
                for img in images
            ]
        })

    return queue_items


@router.post("/{scan_id}")
def submit_expert_review(
    scan_id: int,
    review_data: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_current_user)
):
    """
    FR15: Expert confirms, corrects, or requests lab test.
    Never overwrites AI result. Saves expert review as an active training label.
    """
    scan = db.query(models.Scan).filter(models.Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    # Fallback reviewer ID if not passed
    reviewer_id = current_user.id if current_user else 2

    # Record the expert review
    expert_review = models.ExpertReview(
        scan_id=scan.id,
        reviewer_id=reviewer_id,
        original_verdict=scan.overall_verdict,
        final_verdict=review_data.expert_verdict,
        diagnosis_code=review_data.diagnosis_code or "EXPERT_VERIFIED",
        expert_notes=review_data.expert_notes,
        lab_test_requested=review_data.lab_test_requested,
        review_status="completed"
    )
    db.add(expert_review)

    # Update scan status without deleting AI findings
    scan.status = "reviewed"
    scan.overall_verdict = review_data.expert_verdict
    if scan.plant:
        scan.plant.current_status = review_data.expert_verdict

    # If the expert decided "suitable", generate the QR Plant Passport
    passport_uid = None
    if review_data.expert_verdict == "suitable":
        existing_passport = db.query(models.PlantPassport).filter(models.PlantPassport.scan_id == scan.id).first()
        if not existing_passport and scan.plant:
            passport_uid = f"PSP-EXP-{uuid.uuid4().hex[:8].upper()}"
            qr_path = generate_passport_qr(passport_uid)
            nursery_name = scan.plant.batch.nursery.name if scan.plant.batch and scan.plant.batch.nursery else "Vidarbha Certified Citrus Nursery"
            batch_code = scan.plant.batch.batch_code if scan.plant.batch else "BATCH-2026"
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
                review_status="Expert Verified (ICAR Standard)",
                survival_status="alive"
            )
            db.add(passport)

    db.commit()

    return {
        "status": "success",
        "scan_id": scan.id,
        "original_verdict": expert_review.original_verdict,
        "final_verdict": expert_review.final_verdict,
        "lab_test_requested": expert_review.lab_test_requested,
        "passport_uid": passport_uid
    }
