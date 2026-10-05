from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/orange-book", tags=["Orange Book Knowledge Centre"])

@router.get("/articles")
def get_articles(
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """FR17: Search and filter Orange Book knowledge articles."""
    query = db.query(models.OrangeBookArticle)

    if category and category != "all":
        query = query.filter(models.OrangeBookArticle.category == category)

    if search:
        search_term = f"%{search.lower()}%"
        query = query.filter(
            (models.OrangeBookArticle.title_en.ilike(search_term)) |
            (models.OrangeBookArticle.title_hi.ilike(search_term)) |
            (models.OrangeBookArticle.title_mr.ilike(search_term)) |
            (models.OrangeBookArticle.summary_en.ilike(search_term)) |
            (models.OrangeBookArticle.content_en.ilike(search_term))
        )

    articles = query.all()
    return [
        {
            "id": a.id,
            "slug": a.slug,
            "category": a.category,
            "title_en": a.title_en,
            "title_hi": a.title_hi,
            "title_mr": a.title_mr,
            "summary_en": a.summary_en,
            "summary_hi": a.summary_hi,
            "summary_mr": a.summary_mr,
            "verified_date": a.verified_date,
            "source_attribution": a.source_attribution
        }
        for a in articles
    ]


@router.get("/articles/{slug}")
def get_article_by_slug(slug: str, db: Session = Depends(get_db)):
    article = db.query(models.OrangeBookArticle).filter(models.OrangeBookArticle.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return {
        "id": article.id,
        "slug": article.slug,
        "category": article.category,
        "title_en": article.title_en,
        "title_hi": article.title_hi,
        "title_mr": article.title_mr,
        "summary_en": article.summary_en,
        "summary_hi": article.summary_hi,
        "summary_mr": article.summary_mr,
        "content_en": article.content_en,
        "content_hi": article.content_hi,
        "content_mr": article.content_mr,
        "symptoms": article.symptoms,
        "prevention": article.prevention,
        "management": article.management,
        "source_attribution": article.source_attribution,
        "verified_date": article.verified_date
    }


@router.get("/diseases")
def list_diseases(category: Optional[str] = None, db: Session = Depends(get_db)):
    """Controlled disease, pest & nutrient deficiency catalog."""
    query = db.query(models.DiseaseCatalog)
    if category and category != "all":
        query = query.filter(models.DiseaseCatalog.category == category)
    
    items = query.all()
    return [
        {
            "id": d.id,
            "code": d.code,
            "category": d.category,
            "name_en": d.name_en,
            "name_hi": d.name_hi,
            "name_mr": d.name_mr,
            "severity_level": d.severity_level,
            "scientific_name": d.scientific_name,
            "description_en": d.description_en,
            "description_hi": d.description_hi,
            "description_mr": d.description_mr,
            "key_symptoms": d.key_symptoms,
            "immediate_actions": d.immediate_actions,
            "prevention_measures": d.prevention_measures,
            "treatment_details": d.treatment_details,
            "verified_source": d.verified_source
        }
        for d in items
    ]


@router.get("/tree-anatomy")
def get_tree_anatomy_data():
    """FR17: 2D Interactive Citrus Tree & Sapling Anatomy definitions."""
    return [
        {
            "id": "leaves",
            "name_en": "Foliage & Leaves",
            "name_hi": "पत्तियां व पर्णसमूह",
            "name_mr": "पाने व पर्णसंभार",
            "role": "Photosynthesis, nutrient indicators (chlorosis, mottled spots)",
            "key_diseases": ["Citrus Greening (HLB)", "Canker", "Zinc/Iron Chlorosis", "Leaf Miner"],
            "article_slug": "zinc-iron-deficiency-citrus",
            "cx": 50, "cy": 25, "radius": 18
        },
        {
            "id": "graft_union",
            "name_en": "Graft Union (Budding Point)",
            "name_hi": "कलमी जोड़ (बडिंग बिंदु)",
            "name_mr": "कलमी सांधा (डोळा भरण्याची जागा)",
            "role": "Critical junction between scion (Nagpur mandarin) & rootstock (Rangpur lime / Jambhiri). Must be 15-20cm above ground.",
            "key_diseases": ["Incompatibility Kinks", "Bark Splitting", "Delayed Phloem Necrosis"],
            "article_slug": "anatomy-graft-union",
            "cx": 50, "cy": 68, "radius": 12
        },
        {
            "id": "trunk",
            "name_en": "Main Trunk & Scion",
            "name_hi": "मुख्य तना",
            "name_mr": "मुख्य खोड",
            "role": "Vascular conduction (Xylem/Phloem). Sensitive to gum exudation and bark beetles.",
            "key_diseases": ["Phytophthora Gummosis (Foot rot)", "Bark Borer"],
            "article_slug": "damping-off-phytophthora-nursery",
            "cx": 50, "cy": 52, "radius": 14
        },
        {
            "id": "roots",
            "name_en": "Root System & Collar",
            "name_hi": "जड़ तंत्र और कॉलर क्षेत्र",
            "name_mr": "मुळांचे जाळे व कॉलर भाग",
            "role": "Anchorage and water/nutrient uptake. Rangpur lime imparts Phytophthora tolerance; Jambhiri offers deep rooting.",
            "key_diseases": ["Damping-off", "Nematodes", "Collar Rot"],
            "article_slug": "damping-off-phytophthora-nursery",
            "cx": 50, "cy": 88, "radius": 20
        },
        {
            "id": "fruits",
            "name_en": "Fruit & Blossoms (Mature Stage)",
            "name_hi": "फल एवं फूल",
            "name_mr": "फळे आणि फुले",
            "role": "Ambia (Jan flower / Oct harvest) & Mrig (June flower / Feb harvest) crops.",
            "key_diseases": ["Fruit Drop", "Thrips scarring", "Citrus Greening lopsided fruit"],
            "article_slug": "seasonal-calendar-nagpur",
            "cx": 75, "cy": 32, "radius": 10
        }
    ]


@router.get("/seasonal-calendar")
def get_seasonal_calendar():
    """FR17: Month-by-month calendar for Vidarbha / Nagpur."""
    return [
        {
            "month": "January",
            "month_mr": "जानेवारी",
            "bahar": "Ambia Bahar",
            "action_en": "Water stress breaking for Ambia crop. Apply first light irrigation followed by nitrogen fertigation.",
            "action_hi": "अंबिया बहार के लिए पानी का तनाव तोड़ें। हल्की सिंचाई करें।",
            "action_mr": "अंबिया बहारासाठी ताण तोडणे. पहिली हलकी ओल द्यावी व नत्रयुक्त खते द्यावीत.",
            "disease_alert": "Monitor for Citrus Psylla during vegetative flush emergence."
        },
        {
            "month": "February",
            "month_mr": "फेब्रुवारी",
            "bahar": "Ambia Bahar",
            "action_en": "Peak blooming season. Avoid chemical insecticide spraying during active honeybee pollination.",
            "action_hi": "फूल खिलने का समय। मधुमक्खी परागण के दौरान कीटनाशक छिड़काव से बचें।",
            "action_mr": "पूर्ण बहरण्याचा काळ. मधमाशांच्या परागीभवनासाठी कीटकनाशक फवारणी टाळावी.",
            "disease_alert": "Watch for powdery mildew if nighttime humidity rises."
        },
        {
            "month": "March",
            "month_mr": "मार्च",
            "bahar": "Ambia Bahar",
            "action_en": "Pea-size fruitlet set. Apply potassium nitrate and micronutrient foliar spray (Zn + Fe + Mn).",
            "action_hi": "मटर के आकार का फल। पोटेशियम नाइट्रेट और सूक्ष्म पोषक तत्वों का छिड़काव करें।",
            "action_mr": "वाटाण्याच्या आकाराची फळधारणा. पोटॅशियम नायट्रेट व सूक्ष्मअन्नद्रव्यांची फवारणी करावी.",
            "disease_alert": "Thrips monitoring on tender fruit surfaces."
        },
        {
            "month": "April - May",
            "month_mr": "एप्रिल - मे",
            "bahar": "Mrig Bahar Preparation",
            "action_en": "Impose 40-45 days water stress for Mrig crop. Whitewash tree trunks with Bordeaux paste (1:1:10) up to 2 ft.",
            "action_hi": "मृग बहार के लिए 40-45 दिनों का पानी का तनाव दें। तने पर बोर्डो पेस्ट लगाएं।",
            "action_mr": "मृग बहारासाठी ४०-४५ दिवस पाण्याचा ताण द्यावा. खोडाला २ फुटांपर्यंत बोर्डो पेस्ट लावावी.",
            "disease_alert": "Sun scald protection using kaolin clay spray on western canopy."
        },
        {
            "month": "June",
            "month_mr": "जून",
            "bahar": "Mrig Bahar",
            "action_en": "Monsoon onset breaks Mrig stress. Heavy flowering follows. Drain excess runoff from polybags.",
            "action_hi": "मानसून से तनाव टूटना। नए फूलों का आना। अतिरिक्त पानी की निकासी।",
            "action_mr": "मान्सून सुरू होऊन ताण तुटतो. भरपूर फुले येतात. रोपवाटिकेत पाण्याचा निचरा योग्य ठेवा.",
            "disease_alert": "CRITICAL: Phytophthora collar rot & damping-off danger."
        },
        {
            "month": "July - August",
            "month_mr": "जुलै - ऑगस्ट",
            "bahar": "Inter-monsoon Care",
            "action_en": "Ensure high aeration in nursery beds. Keep sapling polybags on raised gravel stands.",
            "action_hi": "नर्सरी में वायु संचार सुनिश्चित करें। पॉलीथीन बैग्स को कंक्रीट बेंच पर रखें।",
            "action_mr": "रोपवाटिकेत हवा खेळती ठेवा. पिशव्या लोखंडी मांडवावर किंवा गिट्टीच्या थरावर ठेवा.",
            "disease_alert": "Fungal leaf spots and bacterial canker spread by rain splashes."
        },
        {
            "month": "September - October",
            "month_mr": "सप्टेंबर - ऑक्टोबर",
            "bahar": "Ambia Harvest & Mrig Sizing",
            "action_en": "Ambia fruits turn golden orange (harvest begins). Mrig fruits reach lemon size; provide regular drip irrigation.",
            "action_hi": "अंबिया फलों की तुड़ाई शुरू। मृग फलों का विकास।",
            "action_mr": "अंबिया संत्रा काढणी सुरू. मृग फळांची वाढ, ठिबक सिंचनाने नियमित पाणी द्यावे.",
            "disease_alert": "Fruit sucking moth attacks on ripening Ambia crop at dusk."
        },
        {
            "month": "November - December",
            "month_mr": "नोव्हेंबर - डिसेंबर",
            "bahar": "Post-Harvest Pruning",
            "action_en": "Prune dried twigs and water sprouts. Spray 1% Bordeaux mixture on pruned cuts.",
            "action_hi": "सूखी शाखाओं की छंटाई। कटे हुए हिस्सों पर 1% बोर्डो मिश्रण का छिड़काव।",
            "action_mr": "वाळलेल्या फांद्यांची छाटणी करावी. छाटलेल्या भागावर १% बोर्डो मिश्रणाची फवारणी करावी.",
            "disease_alert": "Dieback fungus progression if pruning cuts are left unprotected."
        }
    ]
