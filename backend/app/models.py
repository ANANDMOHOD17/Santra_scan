import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    full_name = Column(String(100), nullable=False)
    role = Column(String(20), default="operator")  # operator, reviewer, officer, admin
    phone = Column(String(20), nullable=True)
    preferred_language = Column(String(10), default="mr")  # mr, hi, en
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scans = relationship("Scan", back_populates="user")
    reviews = relationship("ExpertReview", back_populates="reviewer")


class Nursery(Base):
    __tablename__ = "nurseries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    license_number = Column(String(100), unique=True, nullable=True)
    state = Column(String(50), default="Maharashtra")
    district = Column(String(50), default="Nagpur")
    taluka = Column(String(50), nullable=True)
    village = Column(String(100), nullable=True)
    contact_person = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    is_certified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    batches = relationship("Batch", back_populates="nursery")


class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    batch_code = Column(String(50), unique=True, index=True, nullable=False)
    nursery_id = Column(Integer, ForeignKey("nurseries.id"), nullable=False)
    variety = Column(String(100), default="Nagpur Mandarin (Santra)")
    rootstock = Column(String(100), default="Rangpur Lime")
    sowing_date = Column(String(50), nullable=True)
    grafting_date = Column(String(50), nullable=True)
    total_saplings = Column(Integer, default=500)
    certified_count = Column(Integer, default=0)
    questionable_count = Column(Integer, default=0)
    rejected_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    nursery = relationship("Nursery", back_populates="batches")
    plants = relationship("Plant", back_populates="batch")


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    plant_uid = Column(String(50), unique=True, index=True, nullable=False)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=False)
    plant_type = Column(String(30), default="sapling")  # sapling, mature_tree
    age_months = Column(Integer, default=12)
    variety = Column(String(100), default="Nagpur Mandarin")
    rootstock = Column(String(100), default="Rangpur Lime")
    current_status = Column(String(30), default="suitable")  # suitable, questionable, reject, healthy, warning, concern
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    batch = relationship("Batch", back_populates="plants")
    scans = relationship("Scan", back_populates="plant")
    passport = relationship("PlantPassport", back_populates="plant", uselist=False)


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    scan_uid = Column(String(50), unique=True, index=True, nullable=False)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=True)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=True)
    nursery_id = Column(Integer, ForeignKey("nurseries.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    scan_mode = Column(String(30), default="sapling")  # sapling, mature_tree
    growth_stage = Column(String(50), default="Budded Sapling")
    variety = Column(String(100), default="Nagpur Mandarin")
    rootstock = Column(String(100), default="Rangpur Lime")
    irrigation_method = Column(String(50), nullable=True)
    soil_type = Column(String(50), nullable=True)
    symptoms_observed = Column(Text, nullable=True)
    symptom_start_date = Column(String(50), nullable=True)
    recent_fertilizer = Column(String(200), nullable=True)
    recent_pesticide = Column(String(200), nullable=True)

    # Verdicts & Scores
    overall_verdict = Column(String(30), nullable=False)  # suitable, questionable, reject, healthy_looking, warning_signs, significant_concern, inconclusive
    confidence_score = Column(Float, default=0.0)
    growth_score = Column(String(20), default="OK")  # Weak, OK, Strong
    leaf_score = Column(String(20), default="OK")    # Weak, OK, Strong
    graft_score = Column(String(20), default="OK")   # Weak, OK, Strong
    
    # Detailed data
    primary_condition = Column(String(150), nullable=True)
    condition_category = Column(String(50), nullable=True)  # healthy, disease, pest, nutrient, physical
    recovery_advisory = Column(JSON, nullable=True)  # Actions, prevention, monitoring
    weather_snapshot = Column(JSON, nullable=True)
    location_district = Column(String(50), default="Nagpur")
    location_coords = Column(String(50), nullable=True)
    
    status = Column(String(30), default="completed")  # completed, pending_review, reviewed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="scans")
    plant = relationship("Plant", back_populates="scans")
    images = relationship("ScanImage", back_populates="scan", cascade="all, delete-orphan")
    assessment = relationship("AIAssessment", back_populates="scan", uselist=False, cascade="all, delete-orphan")
    review = relationship("ExpertReview", back_populates="scan", uselist=False)
    passport = relationship("PlantPassport", back_populates="scan", uselist=False)


class ScanImage(Base):
    __tablename__ = "scan_images"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"), nullable=False)
    view_type = Column(String(50), nullable=False)  # whole_plant, leaf_closeup, graft_joint, fruit_shoot
    file_path = Column(String(300), nullable=False)
    heatmap_path = Column(String(300), nullable=True)
    blur_score = Column(Float, default=150.0)
    brightness_score = Column(Float, default=128.0)
    quality_passed = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scan = relationship("Scan", back_populates="images")


class AIAssessment(Base):
    __tablename__ = "ai_assessments"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"), nullable=False)
    model_version = Column(String(50), default="SantraScan-EffCitrus-v1.4")
    inference_time_ms = Column(Integer, default=320)
    raw_predictions = Column(JSON, nullable=True)
    primary_finding = Column(String(150), nullable=False)
    attention_description = Column(Text, nullable=True)
    evidence_points = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scan = relationship("Scan", back_populates="assessment")


class ExpertReview(Base):
    __tablename__ = "expert_reviews"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    original_verdict = Column(String(30), nullable=False)
    final_verdict = Column(String(30), nullable=False)
    diagnosis_code = Column(String(100), nullable=True)
    expert_notes = Column(Text, nullable=True)
    lab_test_requested = Column(Boolean, default=False)
    review_status = Column(String(30), default="completed")  # in_review, completed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scan = relationship("Scan", back_populates="review")
    reviewer = relationship("User", back_populates="reviews")


class PlantPassport(Base):
    __tablename__ = "plant_passports"

    id = Column(Integer, primary_key=True, index=True)
    passport_uid = Column(String(64), unique=True, index=True, nullable=False)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    scan_id = Column(Integer, ForeignKey("scans.id"), nullable=False)
    qr_code_path = Column(String(300), nullable=True)
    verification_hash = Column(String(64), nullable=False)
    nursery_name = Column(String(150), nullable=False)
    batch_code = Column(String(50), nullable=False)
    variety = Column(String(100), nullable=False)
    rootstock = Column(String(100), nullable=False)
    verdict = Column(String(30), nullable=False)
    review_status = Column(String(30), default="Direct AI Certified")
    issue_date = Column(DateTime, default=datetime.datetime.utcnow)
    survival_status = Column(String(30), default="alive")  # alive, weak, died, unconfirmed
    survival_updated_at = Column(DateTime, nullable=True)

    plant = relationship("Plant", back_populates="passport")
    scan = relationship("Scan", back_populates="passport")
    survival_logs = relationship("SurvivalLog", back_populates="passport")


class SurvivalLog(Base):
    __tablename__ = "survival_logs"

    id = Column(Integer, primary_key=True, index=True)
    passport_id = Column(Integer, ForeignKey("plant_passports.id"), nullable=False)
    farmer_name = Column(String(100), nullable=False)
    farmer_phone = Column(String(20), nullable=True)
    status = Column(String(30), nullable=False)  # alive, weak, died
    days_since_planting = Column(Integer, default=30)
    orchard_location = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    passport = relationship("PlantPassport", back_populates="survival_logs")


class OrangeBookArticle(Base):
    __tablename__ = "orange_book_articles"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    category = Column(String(50), index=True, nullable=False)  # Anatomy, Cultivation, Diseases, Pests, Nutrient Deficiencies, Irrigation, Fertilization, Pruning, Seasonal Care Calendar
    title_en = Column(String(200), nullable=False)
    title_hi = Column(String(200), nullable=False)
    title_mr = Column(String(200), nullable=False)
    summary_en = Column(Text, nullable=False)
    summary_hi = Column(Text, nullable=False)
    summary_mr = Column(Text, nullable=False)
    content_en = Column(Text, nullable=False)
    content_hi = Column(Text, nullable=False)
    content_mr = Column(Text, nullable=False)
    symptoms = Column(JSON, nullable=True)
    prevention = Column(JSON, nullable=True)
    management = Column(JSON, nullable=True)
    source_attribution = Column(String(250), default="ICAR - Central Citrus Research Institute (CCRI), Nagpur")
    source_url = Column(String(300), nullable=True)
    verified_date = Column(String(50), default="2026-03-15")
    image_url = Column(String(300), nullable=True)
    tags = Column(String(200), nullable=True)


class DiseaseCatalog(Base):
    __tablename__ = "disease_catalog"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)
    category = Column(String(50), nullable=False)  # disease, pest, nutrient_deficiency, physical_stress
    name_en = Column(String(150), nullable=False)
    name_hi = Column(String(150), nullable=False)
    name_mr = Column(String(150), nullable=False)
    severity_level = Column(String(20), default="high")  # low, medium, high, quarantine
    scientific_name = Column(String(150), nullable=True)
    description_en = Column(Text, nullable=False)
    description_hi = Column(Text, nullable=False)
    description_mr = Column(Text, nullable=False)
    key_symptoms = Column(JSON, nullable=True)
    immediate_actions = Column(JSON, nullable=True)
    prevention_measures = Column(JSON, nullable=True)
    verified_treatment_available = Column(Boolean, default=True)
    treatment_details = Column(JSON, nullable=True)
    verified_source = Column(String(250), default="ICAR-CCRI Nagpur Citrus Protection Guidelines")


class SystemNotification(Base):
    __tablename__ = "system_notifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50), default="info")  # scan_completed, review_required, weather_alert, status_alert
    link = Column(String(200), nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
