from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..auth import verify_password, hash_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=schemas.Token)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    identifier = login_data.username.strip().lower()
    
    # Allow login with email, phone, or username
    user = db.query(models.User).filter(
        (models.User.username.ilike(identifier)) |
        (models.User.email.ilike(identifier)) |
        (models.User.phone == identifier)
    ).first()

    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/phone or password. Please try again or use Quick Demo Login."
        )
    
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "preferred_language": user.preferred_language,
            "phone": user.phone
        }
    }

@router.post("/register", response_model=schemas.Token)
def register(reg_data: schemas.UserRegister, db: Session = Depends(get_db)):
    raw_email = reg_data.email.strip().lower() if reg_data.email and reg_data.email.strip() else None
    raw_phone = reg_data.phone.strip() if reg_data.phone and reg_data.phone.strip() else None
    
    if not raw_email and not raw_phone:
        raise HTTPException(status_code=400, detail="Please provide either an email or a phone number.")
    
    # In models.User, email is NOT NULL and UNIQUE. If user registered with phone only, synthesize unique internal email
    email = raw_email if raw_email else f"user_{raw_phone}@santrascan.agri"
    phone = raw_phone

    # Check if email or phone already exists
    filters = []
    if raw_email:
        filters.append(models.User.email.ilike(raw_email))
    if raw_phone:
        filters.append(models.User.phone == raw_phone)
        filters.append(models.User.email.ilike(f"user_{raw_phone}@santrascan.agri"))
    
    if filters:
        from sqlalchemy import or_
        existing = db.query(models.User).filter(or_(*filters)).first()
        if existing:
            raise HTTPException(status_code=400, detail="An account with this email or phone number already exists.")
    
    # Generate unique username
    if raw_email:
        base_username = raw_email.split("@")[0].replace(".", "_")
    else:
        base_username = f"user_{raw_phone[-6:] if len(raw_phone) >= 6 else raw_phone}"
        
    username = base_username
    counter = 1
    while db.query(models.User).filter(models.User.username == username).first():
        username = f"{base_username}{counter}"
        counter += 1

    user = models.User(
        username=username,
        email=email,
        phone=phone,
        hashed_password=hash_password(reg_data.password),
        full_name=reg_data.full_name.strip(),
        role=reg_data.role or "operator",
        preferred_language=reg_data.preferred_language or "mr"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Immediately authenticate on sign-up
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "preferred_language": user.preferred_language,
            "phone": user.phone
        }
    }

@router.get("/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    if not current_user:
        return {"authenticated": False, "role": "guest"}
    return {
        "authenticated": True,
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "preferred_language": current_user.preferred_language
    }

@router.get("/demo-users")
def get_demo_users():
    """Provides fast one-click logins for judging and demonstration."""
    return [
        {"role": "operator", "username": "operator", "name": "Ramesh Patil", "badge": "Nursery Operator (काटोल)", "language": "mr"},
        {"role": "reviewer", "username": "reviewer", "name": "Dr. S. Deshmukh", "badge": "Citrus Expert Reviewer (ICAR-CCRI)", "language": "mr"},
        {"role": "officer", "username": "officer", "name": "V. K. Shinde", "badge": "District Horticulture Officer", "language": "hi"},
        {"role": "admin", "username": "admin", "name": "System Admin", "badge": "SantraScan Administrator", "language": "en"},
    ]
