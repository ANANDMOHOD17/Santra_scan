import os
import segno
import hashlib
from .config import settings

def generate_passport_qr(passport_uid: str, base_url: str = "http://localhost:5173") -> str:
    """
    Generates a high-quality SVG/PNG QR code pointing to the public passport URL:
    `${base_url}/passport/${passport_uid}`.
    Stores in uploads/qrcodes and returns relative URL.
    """
    passport_target_url = f"{base_url}/passport/{passport_uid}"
    qr = segno.make(passport_target_url, error='H')
    
    file_name = f"qr_{passport_uid}.png"
    file_path = os.path.join(settings.QR_DIR, file_name)
    qr.save(file_path, scale=8, border=2, dark="#1D2A1F", light="#FBF7EE")

    return f"/uploads/qrcodes/{file_name}"

def compute_verification_hash(plant_uid: str, batch_code: str, nursery_name: str, verdict: str) -> str:
    """
    Produces a tamper-proof SHA-256 digital stamp hash for the Plant Passport.
    """
    payload = f"{plant_uid}|{batch_code}|{nursery_name}|{verdict}|ICAR_CCRI_COMPLIANT_2026"
    return hashlib.sha256(payload.encode('utf-8')).hexdigest()[:16].upper()
