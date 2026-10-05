import datetime
from sqlalchemy.orm import Session
from . import models
from .auth import hash_password
from .qr_service import generate_passport_qr, compute_verification_hash

def seed_database_if_empty(db: Session):
    # Check if already seeded
    if db.query(models.User).first():
        return

    print(">>> Seeding database with authentic ICAR-CCRI citrus knowledge, nurseries, and demo records...")

    # 1. Users with roles
    users = [
        models.User(
            username="operator",
            email="operator@santrascan.agri",
            hashed_password=hash_password("operator123"),
            full_name="Ramesh Patil (नर्सरी ऑपरेटर)",
            role="operator",
            phone="9823012345",
            preferred_language="mr"
        ),
        models.User(
            username="reviewer",
            email="dr.deshmukh@ccri.gov.in",
            hashed_password=hash_password("reviewer123"),
            full_name="Dr. S. Deshmukh (वरिष्ठ फलोत्पादन तज्ज्ञ)",
            role="reviewer",
            phone="9422067890",
            preferred_language="mr"
        ),
        models.User(
            username="officer",
            email="officer.nagpur@gov.in",
            hashed_password=hash_password("officer123"),
            full_name="V. K. Shinde (जिल्हा कृषी अधिकारी)",
            role="officer",
            phone="9822114433",
            preferred_language="hi"
        ),
        models.User(
            username="admin",
            email="admin@santrascan.agri",
            hashed_password=hash_password("admin123"),
            full_name="SantraScan System Administrator",
            role="admin",
            phone="9988776655",
            preferred_language="en"
        ),
    ]
    db.add_all(users)
    db.commit()

    operator = db.query(models.User).filter_by(username="operator").first()
    reviewer = db.query(models.User).filter_by(username="reviewer").first()

    # 2. Nurseries in Vidarbha
    nursery1 = models.Nursery(
        name="Hatla Containerized Citrus Nursery",
        license_number="MH-NGP-NUR-2024-082",
        state="Maharashtra",
        district="Nagpur",
        taluka="Katol",
        village="Hatla",
        contact_person="Kishor Raut",
        phone="9822334455",
        latitude=21.2721,
        longitude=78.5872,
        is_certified=True
    )
    nursery2 = models.Nursery(
        name="Kalmeshwar Mandarin Nursery",
        license_number="MH-NGP-NUR-2023-119",
        state="Maharashtra",
        district="Nagpur",
        taluka="Kalmeshwar",
        village="Dhapewada",
        contact_person="Pravin Thakre",
        phone="9890112233",
        latitude=21.2330,
        longitude=78.9180,
        is_certified=True
    )
    db.add_all([nursery1, nursery2])
    db.commit()

    # 3. Batches
    batch1 = models.Batch(
        batch_code="NGP-2026-B01",
        nursery_id=nursery1.id,
        variety="Nagpur Mandarin (Santra)",
        rootstock="Rangpur Lime",
        sowing_date="2025-04-10",
        grafting_date="2025-11-20",
        total_saplings=1200,
        certified_count=980,
        questionable_count=140,
        rejected_count=80
    )
    batch2 = models.Batch(
        batch_code="NGP-2026-B02",
        nursery_id=nursery1.id,
        variety="Nagpur Mandarin (Santra)",
        rootstock="Rough Lemon (Jambhiri)",
        sowing_date="2025-05-15",
        grafting_date="2025-12-05",
        total_saplings=850,
        certified_count=710,
        questionable_count=90,
        rejected_count=50
    )
    batch3 = models.Batch(
        batch_code="KLM-2026-B03",
        nursery_id=nursery2.id,
        variety="Nagpur Mandarin (Santra)",
        rootstock="Rangpur Lime",
        sowing_date="2025-06-01",
        grafting_date="2025-12-18",
        total_saplings=600,
        certified_count=490,
        questionable_count=65,
        rejected_count=45
    )
    db.add_all([batch1, batch2, batch3])
    db.commit()

    # 4. Orange Book Articles
    from .seed_orange_book import ARTICLES_DATA
    for art_data in ARTICLES_DATA:
        db.add(models.OrangeBookArticle(**art_data))
    db.commit()

    # 5. Disease Catalog
    from .seed_diseases import DISEASES_DATA
    for dis_data in DISEASES_DATA:
        db.add(models.DiseaseCatalog(**dis_data))
    db.commit()

    # 6. Sample Plants, Scans & Plant Passports
    # Plant 1: Suitable plant with QR Plant Passport
    plant1 = models.Plant(
        plant_uid="SS-NGP-2026-0042",
        batch_id=batch1.id,
        plant_type="sapling",
        age_months=11,
        variety="Nagpur Mandarin",
        rootstock="Rangpur Lime",
        current_status="suitable"
    )
    db.add(plant1)
    db.commit()

    scan1 = models.Scan(
        scan_uid="SCN-2026-0042",
        plant_id=plant1.id,
        batch_id=batch1.id,
        nursery_id=nursery1.id,
        user_id=operator.id,
        scan_mode="sapling",
        growth_stage="Budded Sapling (11 mo)",
        variety="Nagpur Mandarin",
        rootstock="Rangpur Lime",
        irrigation_method="Micro-sprinkler",
        soil_type="Sterilized Sand-Soil-FYM Compost",
        symptoms_observed="None. Normal green foliage and straight bud joint.",
        overall_verdict="suitable",
        confidence_score=0.94,
        growth_score="Strong",
        leaf_score="Strong",
        graft_score="Strong",
        primary_condition="Clean Foliage & Vigorous Graft Union",
        condition_category="healthy",
        recovery_advisory={
            "summary_en": "Plant shows excellent nursery vigour. Maintain standard preventive care.",
            "summary_hi": "पौधा उत्कृष्ट नर्सरी गुणवत्ता प्रदर्शित करता है। मानक निवारक देखभाल बनाए रखें।",
            "summary_mr": "रोप उत्कृष्ट रोपवाटिका गुणवत्ता दर्शवते. मानक प्रतिबंधात्मक काळजी घ्या.",
            "immediate_actions": [
                {
                    "title_en": "QR Plant Passport Issuance",
                    "title_hi": "क्यूआर प्लांट पासपोर्ट जारी करना",
                    "title_mr": "क्यूआर प्लांट पासपोर्ट देणे",
                    "description_en": "Certified for farmer orchard supply.",
                    "description_hi": "किसान आपूर्ति हेतु प्रमाणित।",
                    "description_mr": "शेतकऱ्यांना विक्रीसाठी प्रमाणित.",
                    "urgency": "immediate"
                }
            ],
            "prevention_measures": ["Keep nursery bags on benches", "Disinfect grafting blades"],
            "recommended_reading_slugs": ["anatomy-graft-union"],
            "disclaimer": "SantraScan is an AI screening aid."
        },
        weather_snapshot={
            "temperature_c": 30.2,
            "relative_humidity_percent": 64.0,
            "citrus_disease_risk": "Low"
        },
        status="completed"
    )
    db.add(scan1)
    db.commit()

    # Create Plant Passport for Plant 1
    passport_uid_1 = "PSP-NGP-77421"
    qr_img_path = generate_passport_qr(passport_uid_1)
    v_hash = compute_verification_hash(plant1.plant_uid, batch1.batch_code, nursery1.name, "suitable")
    
    passport1 = models.PlantPassport(
        passport_uid=passport_uid_1,
        plant_id=plant1.id,
        scan_id=scan1.id,
        qr_code_path=qr_img_path,
        verification_hash=v_hash,
        nursery_name=nursery1.name,
        batch_code=batch1.batch_code,
        variety=batch1.variety,
        rootstock=batch1.rootstock,
        verdict="suitable",
        review_status="Direct AI Certified",
        survival_status="alive",
        survival_updated_at=datetime.datetime.utcnow() - datetime.timedelta(days=5)
    )
    db.add(passport1)
    db.commit()

    # Add a farmer survival log for passport1
    s_log = models.SurvivalLog(
        passport_id=passport1.id,
        farmer_name="Ganesh Wankhede (शेतकरी, काटोल)",
        farmer_phone="9823456789",
        status="alive",
        days_since_planting=45,
        orchard_location="Katol Orchard Block 4",
        notes="All saplings from batch B01 established healthy new flush with 100% survival rate."
    )
    db.add(s_log)
    db.commit()

    # Plant 2: Questionable plant in expert review queue
    plant2 = models.Plant(
        plant_uid="SS-NGP-2026-0089",
        batch_id=batch1.id,
        plant_type="sapling",
        age_months=10,
        variety="Nagpur Mandarin",
        rootstock="Rangpur Lime",
        current_status="questionable"
    )
    db.add(plant2)
    db.commit()

    scan2 = models.Scan(
        scan_uid="SCN-2026-0089",
        plant_id=plant2.id,
        batch_id=batch1.id,
        nursery_id=nursery1.id,
        user_id=operator.id,
        scan_mode="sapling",
        growth_stage="Budded Sapling (10 mo)",
        variety="Nagpur Mandarin",
        rootstock="Rangpur Lime",
        symptoms_observed="Interveinal yellowing on upper leaves, mild leaf curl",
        overall_verdict="questionable",
        confidence_score=0.76,
        growth_score="OK",
        leaf_score="OK",
        graft_score="Strong",
        primary_condition="Interveinal chlorosis (Zinc deficiency vs early mite injury)",
        condition_category="nutrient",
        recovery_advisory={
            "summary_en": "Plant requires quarantine observation. Suspected nutrient imbalance.",
            "summary_hi": "पौधे को निगरानी में रखने की आवश्यकता है। पोषक तत्वों की कमी की संभावना।",
            "summary_mr": "रोपाला देखरेखीखाली ठेवणे आवश्यक आहे. सूक्ष्मअन्नद्रव्यांची कमतरता असण्याची शक्यता.",
            "immediate_actions": [
                {
                    "title_en": "Isolate from Certified Lot",
                    "title_hi": "प्रमाणित लॉट से अलग करें",
                    "title_mr": "प्रमाणित लॉटपासून वेगळे ठेवा",
                    "description_en": "Segregate for 14-21 days and re-scan after micronutrient application.",
                    "description_hi": "14-21 दिनों के लिए अलग रखें।",
                    "description_mr": "१४-२१ दिवस वेगळे ठेवून सूक्ष्मअन्नद्रव्यांची फवारणी करावी.",
                    "urgency": "immediate"
                }
            ],
            "prevention_measures": ["Do not distribute until expert review confirms"],
            "recommended_reading_slugs": ["zinc-iron-deficiency-citrus"],
            "disclaimer": "Under expert review queue."
        },
        status="pending_review"
    )
    db.add(scan2)
    db.commit()

    # Plant 3: Reject plant (Phytophthora blight)
    plant3 = models.Plant(
        plant_uid="SS-NGP-2026-0114",
        batch_id=batch2.id,
        plant_type="sapling",
        age_months=9,
        variety="Nagpur Mandarin",
        rootstock="Rough Lemon",
        current_status="reject"
    )
    db.add(plant3)
    db.commit()

    scan3 = models.Scan(
        scan_uid="SCN-2026-0114",
        plant_id=plant3.id,
        batch_id=batch2.id,
        nursery_id=nursery1.id,
        user_id=operator.id,
        scan_mode="sapling",
        growth_stage="Budded Sapling (9 mo)",
        variety="Nagpur Mandarin",
        rootstock="Rough Lemon",
        symptoms_observed="Collar dark lesions, leaf wilting, stem canker marks",
        overall_verdict="reject",
        confidence_score=0.92,
        growth_score="Weak",
        leaf_score="Weak",
        graft_score="Weak",
        primary_condition="Phytophthora Damping-off & Stem Lesions",
        condition_category="disease",
        recovery_advisory={
            "summary_en": "Do NOT plant or distribute. High risk of pathogen contamination.",
            "summary_hi": "रोपण या वितरण न करें। कवक रोग का उच्च जोखिम।",
            "summary_mr": "लागवड किंवा विक्री करू नका. रोगाचा प्रादुर्भाव पसरण्याचा मोठा धोका आहे.",
            "immediate_actions": [
                {
                    "title_en": "Quarantine & Destruction Protocol",
                    "title_hi": "पृथक्करण और निस्तारण",
                    "title_mr": "क्वारंटाईन व सुरक्षित विल्हेवाट",
                    "description_en": "Immediately remove diseased sapling from nursery beds and incinerate safely.",
                    "description_hi": "नर्सरी क्यारियों से तुरंत निकालें और सुरक्षित निस्तारण करें।",
                    "description_mr": "रोपवाटिकेमधून बाधित रोप त्वरित काढून नष्ट करा.",
                    "urgency": "immediate"
                }
            ],
            "prevention_measures": ["Sterilize potting mix", "Keep polybags on raised gravel benches"],
            "recommended_reading_slugs": ["damping-off-phytophthora-nursery"],
            "disclaimer": "CRITICAL: Rejected material must never be sold to farmers."
        },
        status="completed"
    )
    db.add(scan3)
    db.commit()

    # System notifications
    notifications = [
        models.SystemNotification(
            title="Questionable Sapling Flagged (SS-NGP-2026-0089)",
            message="Nursery operator scanned a plant with interveinal chlorosis requiring expert review.",
            notification_type="review_required",
            link="/reviews"
        ),
        models.SystemNotification(
            title="Nagpur Weather Alert: High Relative Humidity",
            message="Current air humidity is elevated. Monitor nursery polybags for Phytophthora damping-off.",
            notification_type="weather_alert",
            link="/dashboard"
        )
    ]
    db.add_all(notifications)
    db.commit()

    print(">>> Seed data created successfully with 4 users, 2 nurseries, 3 batches, 5 articles, 4 catalog diseases, and demo scans!")
