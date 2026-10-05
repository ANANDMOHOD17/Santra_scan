import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/passports", tags=["Plant Passports"])

@router.get("/{passport_uid}")
def get_plant_passport(passport_uid: str, db: Session = Depends(get_db)):
    """FR13: Public QR Plant Passport viewer."""
    passport = db.query(models.PlantPassport).filter(
        models.PlantPassport.passport_uid == passport_uid
    ).first()
    if not passport:
        raise HTTPException(status_code=404, detail="Plant Passport not found or invalid QR code")

    plant = passport.plant
    batch = plant.batch if plant else None
    nursery = batch.nursery if batch else None
    scan = passport.scan
    survival_logs = db.query(models.SurvivalLog).filter(
        models.SurvivalLog.passport_id == passport.id
    ).order_by(models.SurvivalLog.created_at.desc()).all()

    return {
        "passport_uid": passport.passport_uid,
        "plant_uid": plant.plant_uid if plant else "N/A",
        "scan_uid": scan.scan_uid if scan else "N/A",
        "nursery_name": passport.nursery_name,
        "batch_code": passport.batch_code,
        "variety": passport.variety,
        "rootstock": passport.rootstock,
        "verdict": passport.verdict,
        "review_status": passport.review_status,
        "issue_date": passport.issue_date.strftime("%d %b %Y"),
        "verification_hash": passport.verification_hash,
        "qr_code_path": passport.qr_code_path,
        "survival_status": passport.survival_status,
        "growth_score": scan.growth_score if scan else "OK",
        "leaf_score": scan.leaf_score if scan else "OK",
        "graft_score": scan.graft_score if scan else "OK",
        "primary_condition": scan.primary_condition if scan else "Clean Stock",
        "survival_logs": [
            {
                "id": log.id,
                "farmer_name": log.farmer_name,
                "status": log.status,
                "days_since_planting": log.days_since_planting,
                "orchard_location": log.orchard_location,
                "notes": log.notes,
                "created_at": log.created_at.strftime("%d %b %Y")
            }
            for log in survival_logs
        ],
        "disclaimer": "SantraScan Plant Passport serves as an AI screening and nursery traceability passport. Adhere to ICAR-CCRI standards for statutory certifications."
    }


@router.post("/{passport_uid}/survival")
def log_farmer_survival(
    passport_uid: str,
    log_data: schemas.SurvivalLogCreate,
    db: Session = Depends(get_db)
):
    """FR13 & User Flows: Farmer logs sapling survival status (alive / weak / died)."""
    passport = db.query(models.PlantPassport).filter(
        models.PlantPassport.passport_uid == passport_uid
    ).first()
    if not passport:
        raise HTTPException(status_code=404, detail="Plant Passport not found")

    new_log = models.SurvivalLog(
        passport_id=passport.id,
        farmer_name=log_data.farmer_name,
        farmer_phone=log_data.farmer_phone,
        status=log_data.status,
        days_since_planting=log_data.days_since_planting,
        orchard_location=log_data.orchard_location,
        notes=log_data.notes
    )
    db.add(new_log)

    # Update current survival status on passport
    passport.survival_status = log_data.status
    passport.survival_updated_at = datetime.datetime.utcnow()
    db.commit()

    return {
        "status": "success",
        "message": "Orchard survival feedback recorded successfully.",
        "passport_uid": passport_uid,
        "current_survival_status": passport.survival_status
    }
