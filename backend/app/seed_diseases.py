import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.app.database import SessionLocal
from backend.app import models

DISEASES_DATA = [
    {
        "code": "PHY-DAMP",
        "category": "disease",
        "name_en": "Damping-Off & Collar Rot",
        "name_hi": "आद्र-गलन और कॉलर रॉट",
        "name_mr": "मर रोग व खोडकूज",
        "severity_level": "high",
        "scientific_name": "Phytophthora nicotianae / P. palmivora",
        "description_en": "Pre-emergence and post-emergence death of nursery seedlings caused by soil-borne oomycete fungi.",
        "description_hi": "मिट्टी जनित कवक के कारण नर्सरी के पौधों का सूखना और नष्ट होना।",
        "description_mr": "मातीतील बुरशीमुळे रोपे कोलमडणे आणि खोडाचा जमिनीलगतचा भाग कुजणे.",
        "key_symptoms": ["Water-soaked stem lesions", "Seedling wilt", "Brown root sloughing"],
        "immediate_actions": ["Remove affected plants", "Drench with Trichoderma viride (10g/L)", "Reduce watering frequency"],
        "prevention_measures": ["Use raised wire-mesh benches", "Sterilize potting mix", "Avoid water splashes"],
        "verified_treatment_available": True,
        "treatment_details": {"biological": "Trichoderma harzianum or T. viride enriched FYM"},
        "verified_source": "ICAR-CCRI Citrus Disease Bulletin"
    },
    {
        "code": "PHY-GUMM",
        "category": "disease",
        "name_en": "Phytophthora Gummosis & Foot Rot",
        "name_hi": "फाइटोफ्थोरा गमोसिस (डिंक्या रोग)",
        "name_mr": "डिंक्या रोग (फायटोफ्थोरा खोडकूज)",
        "severity_level": "high",
        "scientific_name": "Phytophthora citrophthora / P. nicotianae",
        "description_en": "Severe oozing of amber gum from trunk bark, vertical bark cracking, and yellowing foliage.",
        "description_hi": "तने की छाल से गोंद का निकलना, छाल का फटना और पत्तियों का पीला पड़ना।",
        "description_mr": "खोडाच्या सालीतून तपकिरी डिंक वाहणे, साल उभी तडकणे आणि झाडाची पाने पिवळी पडणे.",
        "key_symptoms": ["Exudation of gum from bark", "Brown lesions extending to cambium", "Canopy chlorosis"],
        "immediate_actions": ["Scrape diseased bark and apply Bordeaux paste (1:1:10)", "Keep irrigation water away from trunk"],
        "prevention_measures": ["Budding height 15-20cm", "Use Rangpur Lime rootstock", "Bordeaux whitewash twice a year"],
        "verified_treatment_available": True,
        "treatment_details": {"chemical": "Bordeaux paste 10% (1kg copper sulphate + 1kg lime + 10L water)"},
        "verified_source": "ICAR-CCRI Technical Advisory No. 14"
    },
    {
        "code": "HLB-GREEN",
        "category": "disease",
        "name_en": "Citrus Greening (Huanglongbing - HLB)",
        "name_hi": "सिट्रस ग्रीनिंग (एचएलबी रोग)",
        "name_mr": "सिट्रस ग्रीनिंग (HLB - पिवळा रोग)",
        "severity_level": "quarantine",
        "scientific_name": "Candidatus Liberibacter asiaticus",
        "description_en": "Bacterial phloem-limited disease transmitted by Asian Citrus Psyllid. Incurable once established.",
        "description_hi": "सिट्रस साइला द्वारा फैलने वाला लाइलाज जीवाणु रोग।",
        "description_mr": "सिट्रस सायला किडीमुळे पसरणारा अतिशय घातक जिवाणू रोग ज्यावर कोणताही खात्रीशीर रासायनिक इलाज नाही.",
        "key_symptoms": ["Asymmetric blotchy mottle", "Vein corking", "Bitter lopsided small fruits"],
        "immediate_actions": ["Isolate plant immediately", "Send leaf sample to ICAR-CCRI", "Strictly do not distribute"],
        "prevention_measures": ["Screenhouse for mother blocks", "Yellow sticky traps for psyllid vectors"],
        "verified_treatment_available": False,
        "treatment_details": {"quarantine": "Mandatory isolation and eradication"},
        "verified_source": "National Citrus Quarantine Network"
    },
    {
        "code": "BAC-CANK",
        "category": "disease",
        "name_en": "Citrus Bacterial Canker",
        "name_hi": "सिट्रस कैंकर (जीवाणु रोग)",
        "name_mr": "सिट्रस कॅन्कर (जिवाणू खैऱ्या रोग)",
        "severity_level": "high",
        "scientific_name": "Xanthomonas axonopodis pv. citri",
        "description_en": "Raised corky crater pustules with yellow chlorotic halos on leaves, twigs, and fruit.",
        "description_hi": "पत्तियों, टहनियों और फलों पर उभरे हुए खुरदुरे धब्बे जिनके चारों ओर पीला छल्ला होता है।",
        "description_mr": "पाने, फांद्या व फळांवर खडबडीत खपल्यासारखे चट्टे पडतात ज्याभोवती पिवळे कडे असते.",
        "key_symptoms": ["Raised corky lesions", "Yellow chlorotic halo around spots", "Premature fruit drop in monsoon"],
        "immediate_actions": ["Prune infected twigs before monsoon", "Spray Copper Oxychloride 2.5g/L + Streptocycline 100ppm"],
        "prevention_measures": ["Control citrus leaf miner", "Casuarina windbreaks on borders"],
        "verified_treatment_available": True,
        "treatment_details": {"bactericide": "COC 50 WP (2.5 g/L) + Streptocycline (100 ppm)"},
        "verified_source": "Dr. PDKV Akola Citrus Research Station"
    },
    {
        "code": "PEST-PSYLLA",
        "category": "pest",
        "name_en": "Asian Citrus Psyllid",
        "name_hi": "एशियन सिट्रस साइला (कीट)",
        "name_mr": "सिट्रस सायला (रसशोषक कीड)",
        "severity_level": "high",
        "scientific_name": "Diaphorina citri Kuwayama",
        "description_en": "Primary natural insect vector transmitting deadly Citrus Greening (HLB).",
        "description_hi": "संतरा के नए पत्तों का रस चूसने वाला छोटा कीट, जो सिट्रस ग्रीनिंग रोग का मुख्य संवाहक है।",
        "description_mr": "संत्र्याच्या कोवळ्या पालवीतील रस शोषून घेणारी अत्यंत लहान कीड जी ग्रीनिंग रोगाचा मुख्य प्रसार करते.",
        "key_symptoms": ["Adults feeding at 45 degree tilt", "White waxy honeydew curls", "Twisted curly foliage"],
        "immediate_actions": ["Spray Imidacloprid 17.8 SL (0.5 mL/L) at flush emergence", "Hang yellow sticky traps"],
        "prevention_measures": ["Install yellow sticky traps (15/acre)", "Regular scout in Jan and June"],
        "verified_treatment_available": True,
        "treatment_details": {"chemical": "Imidacloprid 17.8 SL (0.5 mL/L) or Thiamethoxam 25 WG (0.3 g/L)"},
        "verified_source": "ICAR-CCRI Entomology Division"
    },
    {
        "code": "PEST-MINER",
        "category": "pest",
        "name_en": "Citrus Leaf Miner",
        "name_hi": "सिट्रस लीफ माइनर (चित्रकिडा)",
        "name_mr": "संत्रा लीफ मायनर (नागअळी)",
        "severity_level": "medium",
        "scientific_name": "Phyllocnistis citrella Stainton",
        "description_en": "Larvae mine serpentine silvery galleries under leaf epidermis, predisposing trees to canker.",
        "description_hi": "सुंडी नई कोमल पत्तियों के भीतर सर्पाकार चांदी जैसी सुरंगें बनाती है।",
        "description_mr": "अळी कोवळ्या पानाच्या पापुद्र्याखाली वळणदार चंदेरी रंगाचे भुयार तयार करते.",
        "key_symptoms": ["Silvery zigzag mines on leaves", "Distorted, curled leaves", "Stunted sapling growth"],
        "immediate_actions": ["Spray 5% NSKE or Neem Oil 10,000 ppm (1 mL/L)", "Foliar spray Spinosad 45 SC (0.3 mL/L)"],
        "prevention_measures": ["Synchronize flushes by pruning", "Avoid late nitrogen fertilization"],
        "verified_treatment_available": True,
        "treatment_details": {"organic": "NSKE 5%", "chemical": "Spinosad 45 SC (0.3 mL/L)"},
        "verified_source": "ICAR-CCRI Integrated Pest Management Guide"
    },
    {
        "code": "PEST-MOTH",
        "category": "pest",
        "name_en": "Fruit Sucking Moth",
        "name_hi": "फल चूसक पतंगा",
        "name_mr": "फळे शोषणारा पतंग (रसशोषक पतंग)",
        "severity_level": "high",
        "scientific_name": "Eudocima materna / E. fullonia",
        "description_en": "Nocturnal moths pierce ripening oranges at dusk, causing secondary rot and premature drop.",
        "description_hi": "रात में उड़ने वाला पतंगा जो पकते हुए फलों में छेद करके रस चूसता है।",
        "description_mr": "संध्याकाळनंतर येणारा निशाचर पतंग जो पक्व संत्र्याला छिद्र पाडतो, ज्यामुळे फळ कूज होऊन गळते.",
        "key_symptoms": ["Pinhole punctures weeping sap", "Premature fruit drop under trees at dusk", "Soft secondary rot"],
        "immediate_actions": ["Set up 100W light traps over kerosene trays from 7 to 10 PM", "Hang poison bait bottles"],
        "prevention_measures": ["Eradicate Gulwel (Tinospora cordifolia) wild creepers within 2 km", "Bag fruit clusters"],
        "verified_treatment_available": True,
        "treatment_details": {"bait": "200g jaggery + 10mL Malathion in 2L water hung in bottles"},
        "verified_source": "ICAR-CCRI & PDKV Orchard Advisory"
    },
    {
        "code": "NUT-ZN-FE",
        "category": "nutrient_deficiency",
        "name_en": "Zinc & Iron Chlorosis",
        "name_hi": "जिंक और आयरन की कमी",
        "name_mr": "जस्त (झिंक) व लोह कमतरता",
        "severity_level": "medium",
        "scientific_name": "Micronutrient imbalance",
        "description_en": "Deficiency prevalent in alkaline clay (Vertisol) soils of Vidarbha, causing bright interveinal yellowing on new leaves.",
        "description_hi": "विदर्भ की काली मिट्टी में अधिक पीएच के कारण जिंक व लोहे की उपलब्धता कम होना।",
        "description_mr": "विदर्भातील काळ्या चुनखडीयुक्त जमिनीत जस्त व लोहाची कमतरता प्रकर्षाने जाणवते.",
        "key_symptoms": ["Interveinal yellowing with sharp green veins", "Reduced leaf size", "Rosetting of terminal twigs"],
        "immediate_actions": ["Apply Zinc Sulphate 0.5% + Slaked Lime 0.25% foliar spray on tender shoots"],
        "prevention_measures": ["Enrich potting mix with FYM and ZSB", "Maintain potting soil pH 6.5-7.5"],
        "verified_treatment_available": True,
        "treatment_details": {"spray_protocol": "Zinc Sulphate 0.5% + Slaked Lime 0.25% in water during new flush"},
        "verified_source": "PDKV Akola & ICAR-CCRI Micronutrient Guidelines"
    }
]

def seed_diseases():
    db = SessionLocal()
    try:
        existing_codes = {d.code for d in db.query(models.DiseaseCatalog).all()}
        for data in DISEASES_DATA:
            code = data["code"]
            if code in existing_codes:
                item = db.query(models.DiseaseCatalog).filter(models.DiseaseCatalog.code == code).first()
                for k, v in data.items():
                    setattr(item, k, v)
            else:
                item = models.DiseaseCatalog(**data)
                db.add(item)
        db.commit()
        print(f"Diseases seeded. Total diseases in DB now: {db.query(models.DiseaseCatalog).count()}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_diseases()
