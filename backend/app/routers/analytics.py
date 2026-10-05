import random
import uuid
import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models
from ..database import get_db

router = APIRouter(prefix="/api/analytics", tags=["Analytics & Reporting"])

@router.get("/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    """FR16: Aggregated analytics derived directly from database records."""
    total_scans = db.query(models.Scan).count()
    suitable_count = db.query(models.Scan).filter(models.Scan.overall_verdict.in_(["suitable", "healthy_looking"])).count()
    questionable_count = db.query(models.Scan).filter(models.Scan.overall_verdict.in_(["questionable", "warning_signs"])).count()
    reject_count = db.query(models.Scan).filter(models.Scan.overall_verdict.in_(["reject", "significant_concern"])).count()
    
    pending_reviews = db.query(models.Scan).filter(models.Scan.status == "pending_review").count()
    active_batches = db.query(models.Batch).count()
    total_passports = db.query(models.PlantPassport).count()
    
    # Survival rate from passports
    alive_passports = db.query(models.PlantPassport).filter(models.PlantPassport.survival_status == "alive").count()
    survival_rate = round((alive_passports / max(total_passports, 1)) * 100, 1) if total_passports > 0 else 100.0

    # Disease frequency
    disease_query = db.query(
        models.Scan.primary_condition,
        func.count(models.Scan.id).label("count")
    ).filter(models.Scan.primary_condition != None).group_by(models.Scan.primary_condition).all()

    disease_distribution = [
        {"name": row[0] or "Unclassified", "count": row[1]}
        for row in disease_query
    ]

    # Nurseries breakdown
    nurseries = db.query(models.Nursery).all()
    nursery_stats = []
    for n in nurseries:
        batch_ids = [b.id for b in n.batches]
        n_scans = db.query(models.Scan).filter(models.Scan.batch_id.in_(batch_ids)).count() if batch_ids else 0
        n_suitable = db.query(models.Scan).filter(
            models.Scan.batch_id.in_(batch_ids),
            models.Scan.overall_verdict.in_(["suitable", "healthy_looking"])
        ).count() if batch_ids else 0

        cert_rate = round((n_suitable / max(n_scans, 1)) * 100, 1) if n_scans > 0 else 85.0
        nursery_stats.append({
            "id": n.id,
            "name": n.name,
            "district": n.district,
            "taluka": n.taluka,
            "total_scans": n_scans,
            "certification_rate": cert_rate,
            "is_certified": n.is_certified
        })

    # Recent activity
    recent_scans = db.query(models.Scan).order_by(models.Scan.created_at.desc()).limit(5).all()

    return {
        "summary": {
            "total_scans": total_scans,
            "suitable_count": suitable_count,
            "questionable_count": questionable_count,
            "reject_count": reject_count,
            "pending_reviews": pending_reviews,
            "active_batches": active_batches,
            "passports_issued": total_passports,
            "field_survival_rate": survival_rate
        },
        "verdict_breakdown": [
            {"name": "Suitable (Good)", "value": suitable_count, "color": "#1F7A3D"},
            {"name": "Questionable (Check)", "value": questionable_count, "color": "#A86A00"},
            {"name": "Reject (Do Not Plant)", "value": reject_count, "color": "#B3261E"}
        ],
        "disease_distribution": disease_distribution,
        "nursery_performance": nursery_stats,
        "recent_scans": [
            {
                "id": s.id,
                "scan_uid": s.scan_uid,
                "variety": s.variety,
                "verdict": s.overall_verdict,
                "confidence": s.confidence_score,
                "created_at": s.created_at.strftime("%d %b, %H:%M")
            }
            for s in recent_scans
        ]
    }

@router.post("/simulate-realtime-scan")
def simulate_realtime_scan(db: Session = Depends(get_db)):
    """Simulate real-time incoming nursery scan for live analytics demonstration."""
    nurseries = db.query(models.Nursery).all()
    nursery = random.choice(nurseries) if nurseries else None
    batches = db.query(models.Batch).all()
    batch = random.choice(batches) if batches else None

    varieties = ["Nagpur Mandarin (Santra)", "Mosambi (Sweet Orange)", "Acid Lime (Kagzi Nimboo)"]
    rootstocks = ["Rangpur Lime", "Rough Lemon (Jambheri)", "Alemow"]

    roll = random.random()
    if roll < 0.72:
        verdict = "suitable"
        primary_condition = "Healthy Vigour (निरोगी)"
        conf = round(random.uniform(92.0, 98.5), 1)
        foliar = "Vigorous green foliage, no chlorosis"
        graft = "Standard graft height (18cm), clean union"
    elif roll < 0.88:
        verdict = "questionable"
        condition_options = [
            "Zinc Deficiency (जस्त कमतरता)",
            "Minor Graft Indentation (कलम जोड दोष)",
            "Leaf Miner Damage (नागअळी प्रादुर्भाव)"
        ]
        primary_condition = random.choice(condition_options)
        conf = round(random.uniform(84.0, 91.5), 1)
        foliar = "Mild interveinal chlorosis observed"
        graft = "Slight angle variation at graft junction"
    else:
        verdict = "reject"
        condition_options = [
            "Citrus Canker Lesions (संत्रा खैरा)",
            "Gummosis / Bark Splitting (डिंक्या रोग)",
            "Rootstock Sprout / Inverted Graft"
        ]
        primary_condition = random.choice(condition_options)
        conf = round(random.uniform(88.0, 96.0), 1)
        foliar = "Necrotic lesions and leaf perforation"
        graft = "Weak graft union with gum exudation"

    scan_uid = f"SCN-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    new_scan = models.Scan(
        scan_uid=scan_uid,
        user_id=1,
        batch_id=batch.id if batch else 1,
        nursery_id=nursery.id if nursery else 1,
        scan_mode="sapling",
        variety=random.choice(varieties),
        rootstock=random.choice(rootstocks),
        growth_stage="Budded Sapling (10-12 months)",
        overall_verdict=verdict,
        confidence_score=conf,
        primary_condition=primary_condition,
        symptoms_observed=foliar,
        status="completed" if verdict != "questionable" else "pending_review",
        created_at=datetime.datetime.utcnow()
    )
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)

    return {
        "success": True,
        "scan": {
            "id": new_scan.id,
            "scan_uid": new_scan.scan_uid,
            "nursery_name": nursery.name if nursery else "Hatla Accredited Nursery",
            "taluka": nursery.taluka if nursery else "Katol",
            "district": nursery.district if nursery else "Nagpur",
            "variety": new_scan.variety,
            "verdict": new_scan.overall_verdict,
            "primary_condition": new_scan.primary_condition,
            "confidence": new_scan.confidence_score,
            "created_at": "Just now"
        }
    }
