from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
import datetime

# --- Auth Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class UserLogin(BaseModel):
    username: str  # Can be email, phone number, or username
    password: str

class UserRegister(BaseModel):
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    password: str
    role: Optional[str] = "operator"
    preferred_language: Optional[str] = "mr"

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str
    preferred_language: str
    phone: Optional[str] = None

    class Config:
        from_attributes = True

# --- Nursery & Batch Schemas ---
class NurseryResponse(BaseModel):
    id: int
    name: str
    license_number: Optional[str]
    district: str
    taluka: Optional[str]
    village: Optional[str]
    contact_person: Optional[str]
    phone: Optional[str]
    is_certified: bool

    class Config:
        from_attributes = True

class BatchResponse(BaseModel):
    id: int
    batch_code: str
    nursery_id: int
    variety: str
    rootstock: str
    total_saplings: int
    certified_count: int
    questionable_count: int
    rejected_count: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# --- Scan & Images Schemas ---
class ScanImageResponse(BaseModel):
    id: int
    view_type: str
    file_path: str
    heatmap_path: Optional[str] = None
    blur_score: float
    quality_passed: bool

    class Config:
        from_attributes = True

class AIAssessmentResponse(BaseModel):
    model_version: str
    inference_time_ms: int
    primary_finding: str
    attention_description: Optional[str] = None
    evidence_points: Optional[List[str]] = None

    class Config:
        from_attributes = True

class RecoveryAdvisoryItem(BaseModel):
    title_en: str
    title_hi: str
    title_mr: str
    description_en: str
    description_hi: str
    description_mr: str
    urgency: str = "medium"  # immediate, monitor, seasonal

class RecoveryAdvisory(BaseModel):
    summary_en: str
    summary_hi: str
    summary_mr: str
    immediate_actions: List[RecoveryAdvisoryItem]
    prevention_measures: List[str]
    recommended_reading_slugs: List[str]
    disclaimer: str

class ScanResponse(BaseModel):
    id: int
    scan_uid: str
    plant_id: Optional[int] = None
    batch_id: Optional[int] = None
    nursery_id: Optional[int] = None
    scan_mode: str
    growth_stage: str
    variety: str
    rootstock: str
    overall_verdict: str  # suitable, questionable, reject, healthy_looking, warning_signs, significant_concern, inconclusive
    confidence_score: float
    growth_score: str
    leaf_score: str
    graft_score: str
    primary_condition: Optional[str] = None
    condition_category: Optional[str] = None
    recovery_advisory: Optional[Dict[str, Any]] = None
    weather_snapshot: Optional[Dict[str, Any]] = None
    status: str
    created_at: datetime.datetime
    images: List[ScanImageResponse] = []
    assessment: Optional[AIAssessmentResponse] = None
    passport_uid: Optional[str] = None

    class Config:
        from_attributes = True

# --- Review Schemas ---
class ReviewCreate(BaseModel):
    expert_verdict: str  # suitable, questionable, reject
    diagnosis_code: Optional[str] = None
    expert_notes: Optional[str] = None
    lab_test_requested: bool = False

class ReviewResponse(BaseModel):
    id: int
    scan_id: int
    reviewer_name: str
    original_verdict: str
    final_verdict: str
    diagnosis_code: Optional[str]
    expert_notes: Optional[str]
    lab_test_requested: bool
    created_at: datetime.datetime

# --- Passport & Survival Schemas ---
class SurvivalLogCreate(BaseModel):
    farmer_name: str
    farmer_phone: Optional[str] = None
    status: str  # alive, weak, died
    days_since_planting: int = 30
    orchard_location: Optional[str] = None
    notes: Optional[str] = None

class SurvivalLogResponse(BaseModel):
    id: int
    farmer_name: str
    status: str
    days_since_planting: int
    orchard_location: Optional[str]
    notes: Optional[str]
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class PlantPassportResponse(BaseModel):
    id: int
    passport_uid: str
    plant_uid: str
    scan_uid: str
    nursery_name: str
    batch_code: str
    variety: str
    rootstock: str
    verdict: str
    review_status: str
    issue_date: datetime.datetime
    survival_status: str
    survival_updated_at: Optional[datetime.datetime]
    qr_code_path: Optional[str]
    verification_hash: str
    survival_logs: List[SurvivalLogResponse] = []

    class Config:
        from_attributes = True

# --- Orange Book Schemas ---
class ArticleSummary(BaseModel):
    id: int
    slug: str
    category: str
    title_en: str
    title_hi: str
    title_mr: str
    summary_en: str
    summary_hi: str
    summary_mr: str
    image_url: Optional[str]
    verified_date: str

    class Config:
        from_attributes = True

class ArticleDetail(BaseModel):
    id: int
    slug: str
    category: str
    title_en: str
    title_hi: str
    title_mr: str
    summary_en: str
    summary_hi: str
    summary_mr: str
    content_en: str
    content_hi: str
    content_mr: str
    symptoms: Optional[List[str]] = None
    prevention: Optional[List[str]] = None
    management: Optional[List[str]] = None
    source_attribution: str
    source_url: Optional[str]
    verified_date: str
    image_url: Optional[str]
    tags: Optional[str]

    class Config:
        from_attributes = True

class DiseaseSummary(BaseModel):
    id: int
    code: str
    category: str
    name_en: str
    name_hi: str
    name_mr: str
    severity_level: str
    scientific_name: Optional[str]
    description_en: str
    description_hi: str
    description_mr: str
    key_symptoms: Optional[List[str]] = None
    immediate_actions: Optional[List[str]] = None
    prevention_measures: Optional[List[str]] = None
    treatment_details: Optional[Dict[str, Any]] = None
    verified_source: str

    class Config:
        from_attributes = True
