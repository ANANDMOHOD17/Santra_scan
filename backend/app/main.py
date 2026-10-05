import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .config import settings
from .database import engine, Base, SessionLocal
from .seed_data import seed_database_if_empty

# Routers
from .routers import auth, scans, reviews, passports, orange_book, analytics, health

# Create DB tables
Base.metadata.create_all(bind=engine)

# Auto seed
if settings.SEED_ON_STARTUP:
    db = SessionLocal()
    try:
        seed_database_if_empty(db)
    finally:
        db.close()

app = FastAPI(
    title="SantraScan API",
    description="AI Orange Sapling Quality Assessment + Orange Book Knowledge Center for Nagpur Mandarin & Vidarbha Citrus Orchards",
    version=settings.VERSION
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images, heatmaps, and QR codes
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers
app.include_router(auth.router)
app.include_router(scans.router)
app.include_router(reviews.router)
app.include_router(passports.router)
app.include_router(orange_book.router)
app.include_router(analytics.router)
app.include_router(health.router)

@app.get("/")
def root():
    return {
        "app": "SantraScan API",
        "cohort": "Nagpur RISE Agri Innovation Cohort",
        "team": "Build Bridge",
        "problem_statement": "AI-Based Orange Planting Material Quality Assessment",
        "status": "online",
        "app_mode": settings.APP_MODE,
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
