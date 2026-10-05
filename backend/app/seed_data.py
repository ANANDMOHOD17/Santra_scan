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
    articles = [
        models.OrangeBookArticle(
            slug="anatomy-graft-union",
            category="Anatomy",
            title_en="Graft Union & Bud Alignment Quality Standards",
            title_hi="कलमी जोड़ और बड संरेखण गुणवत्ता मानक",
            title_mr="कलमी सांधा व डोळा जोडणी गुणवत्ता निकष",
            summary_en="How to evaluate the bud union integrity between Nagpur Mandarin scion and Rangpur Lime / Jambhiri rootstock.",
            summary_hi="नागपुर संतरा सायन और रंगपुर लाइम/जंभिरी रूटस्टॉक के बीच कलमी जोड़ की अखंडता का मूल्यांकन कैसे करें।",
            summary_mr="नागपूर संत्रा सायन आणि रंगपूर लाइम / जंभिरी रूटस्टॉक यांच्यातील कलमी सांध्याची गुणवत्ता कशी तपासावी.",
            content_en="In citrus nurseries, the graft union (bud union) should be smooth, healthy, and placed at least 15 to 20 cm above the collar line to prevent Phytophthora soil splash. A swelling, acute kink, or delayed incompatibility indicates poor vascular connection that fails under mature fruit loads.",
            content_hi="संतरा नर्सरी में कलमी जोड़ चिकना, स्वस्थ और कॉलर लाइन से कम से कम 15 से 20 सेमी ऊपर होना चाहिए ताकि मिट्टी जनित फाइटोफ्थोरा से बचा जा सके।",
            content_mr="संत्रा रोपवाटिकेमध्ये कलमी सांधा स्वच्छ, निरोगी आणि जमिनीच्या कॉलर रेषेपासून किमान १५ ते २० सेमी उंचीवर असावा. यामुळे मातीतील फायटोफ्थोरा बुरशीचा प्रादुर्भाव कलमावर होत नाही.",
            symptoms=["Graft swelling", "Inward bark folding", "Stem cracking at union"],
            prevention=["Use certified disease-free rootstocks", "Keep budding height at 20 cm", "Sterilize grafting blades with 70% alcohol"],
            management=["Reject plants with abnormal graft kink", "Allow 60 days observation before field transfer"],
            source_attribution="ICAR - Central Citrus Research Institute (CCRI), Nagpur",
            verified_date="2026-02-10"
        ),
        models.OrangeBookArticle(
            slug="damping-off-phytophthora-nursery",
            category="Diseases",
            title_en="Damping-Off & Foot Rot in Citrus Nurseries",
            title_hi="संतरा नर्सरी में आद्र-गलन (डैम्पिंग-ऑफ) और कॉलर रॉट",
            title_mr="संत्रा रोपवाटिकेत मर रोग (डॅम्पिंग-ऑफ) व खोडकूज",
            summary_en="Damping-off caused by Phytophthora species is the single most destructive disease in citrus nursery polybags in Vidarbha.",
            summary_hi="विदर्भ की संतरा नर्सरी में फाइटोफ्थोरा के कारण होने वाला डैम्पिंग-ऑफ सबसे विनाशकारी रोग है।",
            summary_mr="विदर्भातील संत्रा रोपवाटिकांमध्ये फायटोफ्थोरा बुरशीमुळे होणारा मर रोग हा सर्वाधिक नुकसानकारक रोग आहे.",
            content_en="Waterlogged conditions and contaminated soil trigger fungal attacks at the ground level, softening seedling stems and causing collapse. Seedlings wilt suddenly while leaves remain green or pale before toppling over.",
            content_hi="जलभराव और दूषित मिट्टी जमीन के स्तर पर कवक संक्रमण को ट्रिगर करती है, जिससे तना कमजोर होकर गिर जाता है।",
            content_mr="पाण्याचा निचरा न होणे आणि दूषित मातीमुळे खोडाजवळ बुरशीची वाढ होते. झाडाची पाने हिरवी असतानाच रोप अचानक मान टाकून वाळते.",
            symptoms=["Water-soaked lesion at collar", "Seedling toppling", "Brown root decay"],
            prevention=["Use raised benches with sand/gravel beds", "Soil solarization for 30 days during May heat", "Avoid overhead excessive sprinkler irrigation"],
            management=["Immediately remove and burn infected plants", "Apply university-recommended Trichoderma viride biological culture into nursery potting mix"],
            source_attribution="ICAR-CCRI Technical Bulletin on Citrus Protection & PDKV Akola",
            verified_date="2026-03-01"
        ),
        models.OrangeBookArticle(
            slug="zinc-iron-deficiency-citrus",
            category="Nutrient Deficiencies",
            title_en="Zinc & Iron Chlorosis in Vidarbha Black Cotton Soils",
            title_hi="विदर्भ की काली मिट्टी में जिंक और आयरन की कमी के लक्षण",
            title_mr="विदर्भातील काळ्या जमिनीत जस्त (झिंक) व लोह कमतरता लक्षणे",
            summary_en="High soil pH and calcium carbonate in Nagpur region lock up micronutrients, leading to pale leaves with prominent green veins.",
            summary_hi="नागपुर क्षेत्र की मिट्टी में उच्च पीएच के कारण सूक्ष्म पोषक तत्व बंध जाते हैं, जिससे पत्तियों में पीलापन आता है।",
            summary_mr="विदर्भातील जमिनीचा सामू जास्त असल्यामुळे जस्त आणि लोह मुळांना उपलब्ध होत नाही, परिणामी पाने पिवळी पडून शिरा हिरव्या राहतात.",
            content_en="Interveinal chlorosis is characterized by young terminal leaves turning creamy-yellow while main and secondary veins remain distinctively dark green. Often mistaken for viral infection, it severely stunts sapling photosynthetic capacity.",
            content_hi="नर्सरी के नए पत्तों पर नसों के बीच का भाग पीला हो जाता है जबकि नसें हरी रहती हैं। इसे अक्सर वायरस समझ लिया जाता है।",
            content_mr="नवीन येणाऱ्या कोवळ्या पानांवर शिरांमधील भाग पिवळसर होतो आणि मुख्य शिरा ठळक हिरव्या राहतात. झाडाची वाढ खुंटते.",
            symptoms=["Interveinal yellowing on new flushes", "Reduced leaf size (little leaf)", "Shortened internodes"],
            prevention=["Maintain soil organic carbon with well-decomposed FYM", "Avoid alkaline nursery potting soil (ideal pH 6.5 - 7.5)"],
            management=["Foliar spray of 0.5% Zinc Sulphate neutralized with 0.25% slaked lime during new flush emergence as per ICAR-CCRI package"],
            source_attribution="ICAR-CCRI Nagpur Soil Health Advisory",
            verified_date="2026-01-20"
        ),
        models.OrangeBookArticle(
            slug="citrus-greening-hlb",
            category="Diseases",
            title_en="Citrus Greening (HLB) Vigilance & Nursery Quarantine",
            title_hi="सिट्रस ग्रीनिंग (एचएलबी) सतर्कता और नर्सरी क्वारंटाइन",
            title_mr="सिट्रस ग्रीनिंग (HLB) दक्षता व रोपवाटिका क्वारंटाईन",
            summary_en="Candidatus Liberibacter asiaticus, spread by Asian citrus psyllid, is a quarantine threat that must never leave a nursery.",
            summary_hi="एशियन सिट्रस साइला द्वारा फैलने वाला यह रोग क्वारंटाइन खतरा है जिसे कभी भी नर्सरी से बाहर नहीं जाने देना चाहिए।",
            summary_mr="सिट्रस सायला किडीमुळे पसरणारा हा महाभयंकर जिवाणू रोग असून अशी रोपे रोपवाटिकेतून शेतकऱ्यांना कधीही दिली जाऊ नयेत.",
            content_en="Symptoms include blotchy mottle on leaves (asymmetric yellowing that crosses leaf veins, unlike uniform nutrient deficiency), upright hardened leaves, and zinc-like chlorosis that does not respond to foliar nutrition. Infected trees slowly decline and produce bitter, lopsided fruit.",
            content_hi="पत्तियों पर असममित पीलापन (ब्लॉची मोटल) दिखाई देता है जो पोषक तत्वों की कमी से अलग होता है।",
            content_mr="पानांवर डाव्या-उजव्या बाजूला असमान पिवळे चट्टे (Blotchy Mottle) पडतात. शिरा फुगतात आणि पाने जाड होतात.",
            symptoms=["Asymmetric blotchy mottle", "Vein corking", "Lopsided small fruit", "Twig dieback"],
            prevention=["Insect-proof screenhouse (40-mesh net) for nursery mother stock", "Regular monitoring for Citrus Psyllid vector with yellow sticky traps"],
            management=["STRICT ZERO-TOLERANCE: Eradicate infected plants immediately. Send sample to ICAR-CCRI for PCR confirmation. Do not sell."],
            source_attribution="ICAR-CCRI & National Citrus Quarantine Network",
            verified_date="2026-03-12"
        ),
        models.OrangeBookArticle(
            slug="seasonal-calendar-nagpur",
            category="Seasonal Care Calendar",
            title_en="12-Month Nagpur Mandarin Care Calendar (Vidarbha)",
            title_hi="नागपुर संतरा 12 माह की देखभाल कैलेंडर (विदर्भ)",
            title_mr="नागपूर संत्रा १२ महिन्यांचे हंगामी नियोजन (विदर्भ)",
            summary_en="Month-by-month guide covering Ambia bahar (Jan-Feb flowering) and Mrig bahar (June flowering) orchard practices.",
            summary_hi="अंबिया बहार और मृग बहार के लिए माह-वार संतरा बागवानी प्रबंधन मार्गदर्शिका।",
            summary_mr="अंबिया बहार आणि मृग बहार यांच्या व्यवस्थापनासाठी महिनानिहाय सविस्तर कृषी मार्गदर्शक.",
            content_en="Vidarbha farmers produce two main crops: Ambia Bahar (flowering in Jan-Feb, harvest Oct-Dec) and Mrig Bahar (flowering in June-July, harvest Feb-April). Water-stress (tan) management, Bordeaux paste application on trunks, and flush nutrition are critical seasonal milestones.",
            content_hi="विदर्भ में दो मुख्य बहारें होती हैं: अंबिया बहार और मृग बहार। पानी का तनाव (तान) और बोर्डो पेस्ट का प्रयोग अत्यंत महत्वपूर्ण है।",
            content_mr="विदर्भात प्रामुख्याने दोन बहार धरले जातात: अंबिया बहार आणि मृग बहार. योग्य पाण्याचा ताण तोडणे, खोडाला बोर्डो पेस्ट लावणे आणि अन्नद्रव्य व्यवस्थापन हे महत्त्वाचे टप्पे आहेत.",
            symptoms=["Seasonal water stress", "Fruit drop during summer", "Sun scald on southwest canopy"],
            prevention=["Apply 1% Bordeaux mixture before monsoon onset", "Paint tree trunks with Bordeaux paste (1:1:10) up to 2 feet"],
            management=["Adhere to ICAR-CCRI drip irrigation scheduling based on pan evaporation rates"],
            source_attribution="ICAR-CCRI Nagpur Package of Practices for Nagpur Mandarin",
            verified_date="2026-03-20"
        ),
    ]
    db.add_all(articles)
    db.commit()

    # 5. Disease Catalog
    diseases = [
        models.DiseaseCatalog(
            code="PHY-DAMP",
            category="disease",
            name_en="Damping-Off & Collar Rot",
            name_hi="आद्र-गलन और कॉलर रॉट",
            name_mr="मर रोग व खोडकूज",
            severity_level="high",
            scientific_name="Phytophthora nicotianae / P. palmivora",
            description_en="Pre-emergence and post-emergence death of nursery seedlings caused by soil-borne oomycete fungi.",
            description_hi="मिट्टी जनित कवक के कारण नर्सरी के पौधों का सूखना और नष्ट होना।",
            description_mr="मातीतील बुरशीमुळे रोपे कोलमडणे आणि खोडाचा जमिनीलगतचा भाग कुजणे.",
            key_symptoms=["Water-soaked stem lesions", "Seedling wilt", "Brown root sloughing"],
            immediate_actions=["Remove affected plants", "Drench nursery beds with Trichoderma viride (10g/L)", "Reduce watering frequency"],
            prevention_measures=["Use raised beds", "Sterilize potting mix", "Avoid contaminated surface runoff"],
            verified_treatment_available=True,
            treatment_details={"biological": "Trichoderma harzianum or T. viride enriched FYM", "cultural": "Solarized potting mixture (sand:soil:FYM in 1:1:1 ratio)"},
            verified_source="ICAR-CCRI Citrus Disease Bulletin"
        ),
        models.DiseaseCatalog(
            code="PHY-GUMM",
            category="disease",
            name_en="Phytophthora Gummosis (Foot Rot)",
            name_hi="फाइटोफ्थोरा गमोसिस (गोंद निकलना)",
            name_mr="डिंक्या रोग (फायटोफ्थोरा गमोसिस)",
            severity_level="high",
            scientific_name="Phytophthora citrophthora",
            description_en="Severe oozing of amber-colored gum from trunk bark, vertical bark cracking, and yellowing foliage.",
            description_hi="तने की छाल से गोंद का निकलना, छाल का फटना और पत्तियों का पीला पड़ना।",
            description_mr="खोडाच्या सालीतून तपकिरी डिंक वाहणे, साल उभी तडकणे आणि झाडाची पाने पिवळी पडणे.",
            key_symptoms=["Exudation of gum from bark", "Brown lesions extending to cambium", "Canopy chlorosis"],
            immediate_actions=["Scrape diseased bark with clean knife and apply Bordeaux paste (1:1:10)", "Avoid water stagnation touching the trunk"],
            prevention_measures=["Budding height minimum 20cm above ground", "Use resistant rootstocks like Rangpur Lime", "Paint trunks twice a year with Bordeaux paste"],
            verified_treatment_available=True,
            treatment_details={"cultural": "Double ring irrigation system to keep water away from trunk", "chemical": "Bordeaux paste 10% (Copper sulphate 1kg + Lime 1kg + Water 10L)"},
            verified_source="ICAR-CCRI Technical Advisory No. 14"
        ),
        models.DiseaseCatalog(
            code="HLB-GREEN",
            category="disease",
            name_en="Citrus Greening (Huanglongbing)",
            name_hi="सिट्रस ग्रीनिंग",
            name_mr="सिट्रस ग्रीनिंग रोग",
            severity_level="quarantine",
            scientific_name="Candidatus Liberibacter asiaticus",
            description_en="Bacterial phloem-limited disease transmitted by Citrus Psylla. Incurable once established in tree vascular tissue.",
            description_hi="सिट्रस साइला द्वारा फैलने वाला लाइलाज जीवाणु रोग।",
            description_mr="सिट्रस सायला किडीमुळे पसरणारा अतिशय घातक जिवाणू रोग ज्यावर कोणताही खात्रीशीर रासायनिक इलाज नाही.",
            key_symptoms=["Blotchy mottle yellowing", "Vein thickening and corking", "Bitter lopsided small fruits"],
            immediate_actions=["Mark and isolate plant immediately", "Send leaf sample to ICAR-CCRI pathology lab", "Strictly do not distribute"],
            prevention_measures=["Control Asian Citrus Psyllid vector with yellow sticky traps", "Propagate only from certified pathogen-free foundation mother blocks"],
            verified_treatment_available=False,
            treatment_details={"cultural": "Eradication of infected plants to protect nearby orchard health", "quarantine": "Mandatory isolation"},
            verified_source="National Citrus Quarantine Network"
        ),
        models.DiseaseCatalog(
            code="NUT-ZN-FE",
            category="nutrient_deficiency",
            name_en="Zinc & Iron Chlorosis",
            name_hi="जिंक और आयरन की कमी",
            name_mr="जस्त (झिंक) व लोह कमतरता",
            severity_level="medium",
            scientific_name="Micronutrient imbalance",
            description_en="Deficiency prevalent in alkaline clay (Vertisol) soils of Vidarbha, causing bright interveinal yellowing on new leaves.",
            description_hi="विदर्भ की काली मिट्टी में अधिक पीएच के कारण जिंक व लोहे की उपलब्धता कम होना।",
            description_mr="विदर्भातील काळ्या चुनखडीयुक्त जमिनीत जस्त व लोहाची कमतरता प्रकर्षाने जाणवते.",
            key_symptoms=["Interveinal yellowing with sharp green veins", "Reduced leaf size", "Rosetting of terminal twigs"],
            immediate_actions=["Apply university-standard foliar micronutrient spray on tender shoots", "Check nursery potting mix pH"],
            prevention_measures=["Enrich potting mix with vermicompost and cow dung manure", "Maintain potting mix pH between 6.5 and 7.5"],
            verified_treatment_available=True,
            treatment_details={"spray_protocol": "Zinc Sulphate 0.5% + Ferrous Sulphate 0.2% + Slaked Lime 0.25% in water during new flush"},
            verified_source="PDKV Akola & ICAR-CCRI Micronutrient Guidelines"
        ),
    ]
    db.add_all(diseases)
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
