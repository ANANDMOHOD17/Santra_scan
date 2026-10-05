import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SantraScan API"
    VERSION: str = "1.0.0"
    APP_MODE: str = os.getenv("APP_MODE", "demo")  # "demo" or "production"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "santrascan-super-secure-secret-key-nagpur-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./santrascan.db")
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads")
    HEATMAP_DIR: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads", "heatmaps")
    QR_DIR: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads", "qrcodes")
    
    SEED_ON_STARTUP: bool = True
    
    # Weather config (Nagpur coordinates default)
    DEFAULT_LATITUDE: float = 21.1458
    DEFAULT_LONGITUDE: float = 79.0882
    
    class Config:
        case_sensitive = True

settings = Settings()

# Ensure directories exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.HEATMAP_DIR, exist_ok=True)
os.makedirs(settings.QR_DIR, exist_ok=True)
