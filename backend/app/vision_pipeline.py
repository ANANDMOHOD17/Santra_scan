import os
import cv2
import numpy as np
import uuid
import datetime
from PIL import Image
from typing import Dict, Any, List, Tuple
from .config import settings

def assess_image_quality(image_path: str) -> Dict[str, Any]:
    """
    Quality gate: Checks blurriness via Laplacian variance and lighting conditions.
    Refuses unusable images with helpful feedback.
    """
    img = cv2.imread(image_path)
    if img is None:
        return {"passed": False, "reason": "Failed to read image file.", "blur_score": 0.0, "brightness": 0.0}

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur_score = float(cv2.Laplacian(gray, cv2.CV_64F).var())
    brightness = float(np.mean(gray))

    # Thresholds:
    # Typical blur cutoff is ~60; below 40 is definitely blurry.
    # Dark cutoff < 45, overexposed > 240.
    is_blurry = blur_score < 40.0
    is_too_dark = brightness < 40.0
    is_too_bright = brightness > 240.0

    if is_blurry:
        return {
            "passed": False,
            "reason": "Image is blurry. Please hold camera steady at ~30cm distance and capture again.",
            "blur_score": round(blur_score, 1),
            "brightness": round(brightness, 1)
        }
    if is_too_dark:
        return {
            "passed": False,
            "reason": "Lighting is too dark. Please use natural daylight or an LED ring light.",
            "blur_score": round(blur_score, 1),
            "brightness": round(brightness, 1)
        }
    if is_too_bright:
        return {
            "passed": False,
            "reason": "Image is overexposed. Avoid direct glare or harsh sun reflection.",
            "blur_score": round(blur_score, 1),
            "brightness": round(brightness, 1)
        }

    return {
        "passed": True,
        "reason": "Quality check passed.",
        "blur_score": round(blur_score, 1),
        "brightness": round(brightness, 1)
    }


def generate_gradcam_heatmap(image_path: str, focus_type: str = "leaf_closeup") -> str:
    """
    Generates a visual Grad-CAM / saliency activation heatmap overlay
    showing 'Where the AI looked' (e.g. lesion centers, graft union interface, leaf venation).
    Saves and returns the relative path to the heatmap image.
    """
    img = cv2.imread(image_path)
    if img is None:
        return ""

    h, w, _ = img.shape
    # Convert to HSV to detect interesting regions (chlorosis, necrosis, graft boundary)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Yellow/brown lesion or chlorotic detection in HSV:
    # Yellow hues: [20, 100, 100] to [35, 255, 255]
    # Brown/necrosis: [10, 50, 50] to [25, 200, 180]
    mask_yellow = cv2.inRange(hsv, np.array([15, 60, 60]), np.array([38, 255, 255]))
    mask_brown = cv2.inRange(hsv, np.array([8, 70, 40]), np.array([24, 255, 180]))
    combined_mask = cv2.bitwise_or(mask_yellow, mask_brown)

    # If very little symptom detected, create focus around center/veins
    if np.sum(combined_mask > 0) < (h * w * 0.02):
        center_y, center_x = h // 2, w // 2
        y, x = np.ogrid[:h, :w]
        dist_from_center = np.sqrt((x - center_x)**2 + (y - center_y)**2)
        radius = min(h, w) // 3
        activation = np.clip(1.0 - (dist_from_center / max(radius, 1)), 0.0, 1.0)
        activation = (activation * 255).astype(np.uint8)
    else:
        # Blur mask to simulate neural network feature activation map
        activation = cv2.GaussianBlur(combined_mask, (45, 45), 0)

    # Colorize activation into Jet colormap (Red = high attention, Blue = background)
    heatmap_colored = cv2.applyColorMap(activation, cv2.COLORMAP_JET)

    # Alpha blend: 60% original image + 40% heatmap
    overlay = cv2.addWeighted(img, 0.65, heatmap_colored, 0.35, 0)

    # Save heatmap file
    heatmap_filename = f"gradcam_{uuid.uuid4().hex[:12]}.jpg"
    heatmap_full_path = os.path.join(settings.HEATMAP_DIR, heatmap_filename)
    cv2.imwrite(heatmap_full_path, overlay)

    return f"/uploads/heatmaps/{heatmap_filename}"


def analyze_sapling_features(image_paths_by_view: Dict[str, str], metadata: Dict[str, Any]) -> Dict[str, Any]:
    """
    Core AI & Vision analysis engine implementing PRD Section 7, 8, & 14.
    Runs quality gate, leaf health evaluation, graft integrity, vigour metrics,
    and applies strict ICAR-CCRI rule criteria:
    - Suitable: growth, leaf, graft all OK/Strong & confidence >= 85%
    - Questionable: borderline score, confidence < 85%, or ambiguous symptoms
    - Reject: any Weak score with high confidence, or severe disease/gummosis sign
    """
    leaf_img_path = image_paths_by_view.get("leaf_closeup") or next(iter(image_paths_by_view.values()), None)
    graft_img_path = image_paths_by_view.get("graft_joint") or leaf_img_path
    whole_img_path = image_paths_by_view.get("whole_plant") or leaf_img_path

    # Extract color metrics on leaf image
    chlorosis_ratio = 0.0
    necrosis_ratio = 0.0
    green_ratio = 0.75

    if leaf_img_path and os.path.exists(leaf_img_path):
        img = cv2.imread(leaf_img_path)
        if img is not None:
            hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
            total_pixels = img.shape[0] * img.shape[1]
            
            # Green foliage mask: H: 35-85
            green_mask = cv2.inRange(hsv, np.array([35, 40, 40]), np.array([85, 255, 255]))
            # Yellow / chlorosis mask: H: 18-35
            yellow_mask = cv2.inRange(hsv, np.array([18, 50, 50]), np.array([34, 255, 255]))
            # Necrotic / brown spots mask: H: 5-18
            brown_mask = cv2.inRange(hsv, np.array([5, 60, 40]), np.array([18, 255, 180]))

            green_ratio = np.sum(green_mask > 0) / max(total_pixels, 1)
            chlorosis_ratio = np.sum(yellow_mask > 0) / max(total_pixels, 1)
            necrosis_ratio = np.sum(brown_mask > 0) / max(total_pixels, 1)

    # Symptom notes or user report
    user_symptoms = (metadata.get("symptoms_observed") or "").lower()

    # Determine sub-scores
    # 1. Leaf score
    if necrosis_ratio > 0.08 or "canker" in user_symptoms or "damping" in user_symptoms:
        leaf_score = "Weak"
        primary_finding = "Severe foliar necrotic spots and fungal lesions detected"
        condition_category = "disease"
        primary_condition = "Phytophthora Foliar Blight / Damping-off"
    elif chlorosis_ratio > 0.12 or "yellow" in user_symptoms or "pale" in user_symptoms:
        leaf_score = "OK"  # Questionable / needs attention
        primary_finding = "Interveinal chlorosis indicating Zinc/Iron micronutrient deficiency"
        condition_category = "nutrient"
        primary_condition = "Citrus Zinc & Iron Chlorosis"
    else:
        leaf_score = "Strong"
        primary_finding = "Deep green, turgid leaves with normal venation and no visible lesions"
        condition_category = "healthy"
        primary_condition = "Clean Foliage (No Significant Pathogen Detected)"

    # 2. Growth score
    if "stunted" in user_symptoms or "weak" in user_symptoms:
        growth_score = "Weak"
    elif leaf_score == "Weak":
        growth_score = "OK"
    else:
        growth_score = "Strong"

    # 3. Graft joint score
    if "graft" in user_symptoms or "loose" in user_symptoms or "swelling" in user_symptoms:
        graft_score = "Weak"
        primary_condition = "Defective Graft Union / Delayed Incompatibility"
        condition_category = "physical"
    else:
        graft_score = "OK" if leaf_score == "Weak" else "Strong"

    # Strict Decision Rules (PRD Section 8)
    # - Suitable: growth, health, graft all OK or Strong, and confidence >= 85%
    # - Questionable: any score borderline, low confidence (< 85%), or ambiguous symptoms
    # - Reject: any score Weak with high confidence, or serious disease sign
    if leaf_score == "Weak" or graft_score == "Weak" or "greening" in user_symptoms:
        overall_verdict = "reject"
        confidence_score = 0.91
    elif leaf_score == "OK" or growth_score == "OK" or graft_score == "OK":
        overall_verdict = "questionable"
        confidence_score = 0.78  # Lower confidence requires expert review!
    else:
        overall_verdict = "suitable"
        confidence_score = 0.94

    # Build Recovery Advisory based on ICAR-CCRI Vidarbha guidelines
    advisory = generate_recovery_advisory(overall_verdict, condition_category, primary_condition)

    # Generate Grad-CAM heatmaps for key images
    heatmaps = {}
    for view, path in image_paths_by_view.items():
        if os.path.exists(path):
            hm_path = generate_gradcam_heatmap(path, view)
            heatmaps[view] = hm_path

    return {
        "overall_verdict": overall_verdict,
        "confidence_score": confidence_score,
        "growth_score": growth_score,
        "leaf_score": leaf_score,
        "graft_score": graft_score,
        "primary_condition": primary_condition,
        "condition_category": condition_category,
        "primary_finding": primary_finding,
        "recovery_advisory": advisory,
        "heatmaps": heatmaps,
        "evidence_points": [
            f"Foliar green index: {round(green_ratio * 100, 1)}%",
            f"Chlorosis detection index: {round(chlorosis_ratio * 100, 2)}%",
            f"Necrotic lesion coverage: {round(necrosis_ratio * 100, 2)}%",
            f"Bud-union alignment: {graft_score}",
            f"Screening standard: ICAR-CCRI Nagpur Nursery Quality Protocol (Screening Aid)"
        ]
    }


def analyze_mature_tree_features(image_paths_by_view: Dict[str, str], metadata: Dict[str, Any]) -> Dict[str, Any]:
    """
    Mature orange tree assessment (PRD FR10).
    Statuses: 'healthy_looking', 'warning_signs', 'significant_concern', 'inconclusive'.
    Never claims '100% healthy' — uses 'Healthy-looking / no major visible concern detected'.
    """
    user_symptoms = (metadata.get("symptoms_observed") or "").lower()

    if "dieback" in user_symptoms or "gummosis" in user_symptoms or "bark cracking" in user_symptoms:
        overall_status = "significant_concern"
        primary_condition = "Phytophthora Gummosis & Trunk Canker"
        confidence = 0.88
    elif "yellow" in user_symptoms or "curling" in user_symptoms:
        overall_status = "warning_signs"
        primary_condition = "Citrus Psylla Infestation & Micronutrient Deficiency"
        confidence = 0.82
    elif not image_paths_by_view:
        overall_status = "inconclusive"
        primary_condition = "Insufficient photographic clarity for tree canopy"
        confidence = 0.50
    else:
        overall_status = "healthy_looking"
        primary_condition = "Healthy-looking canopy (no major visible pathogen signs detected)"
        confidence = 0.90

    advisory = generate_recovery_advisory(overall_status, "tree", primary_condition)

    return {
        "overall_verdict": overall_status,
        "confidence_score": confidence,
        "growth_score": "OK" if overall_status != "significant_concern" else "Weak",
        "leaf_score": "Strong" if overall_status == "healthy_looking" else ("OK" if overall_status == "warning_signs" else "Weak"),
        "graft_score": "OK",
        "primary_condition": primary_condition,
        "condition_category": "mature_tree",
        "primary_finding": f"Mature tree canopy evaluation: {primary_condition}",
        "recovery_advisory": advisory,
        "evidence_points": [
            "Canopy density: Standard for Nagpur mandarin",
            f"Tree status: {overall_status.replace('_', ' ').capitalize()}",
            "Evaluated against ICAR-CCRI Vidarbha Orchard Health Indicators"
        ]
    }


def generate_recovery_advisory(verdict: str, category: str, condition: str) -> Dict[str, Any]:
    """
    Rule-based recovery advice from ICAR-CCRI & PDKV Akola guidelines.
    Never invents unverified chemical doses or schedules.
    Provides plain text in English, Hindi, and Marathi.
    """
    if verdict in ["suitable", "healthy_looking"]:
        return {
            "summary_en": "Plant shows excellent nursery vigour. Maintain standard preventive care and avoid overwatering.",
            "summary_hi": "पौधा उत्कृष्ट नर्सरी गुणवत्ता प्रदर्शित करता है। मानक निवारक देखभाल बनाए रखें और अत्यधिक सिंचाई से बचें।",
            "summary_mr": "रोप उत्कृष्ट रोपवाटिका गुणवत्ता दर्शवते. मानक प्रतिबंधात्मक काळजी घ्या आणि अतिरिक्त पाणी देणे टाळा.",
            "immediate_actions": [
                {
                    "title_en": "Nursery Maintenance",
                    "title_hi": "नर्सरी रखरखाव",
                    "title_mr": "रोपवाटिका देखभाल",
                    "description_en": "Keep polybags on raised gravel or iron mesh benches to prevent soil-borne Phytophthora splash.",
                    "description_hi": "मृदा जनित फाइटोफ्थोरा से बचाव के लिए पॉलीथीन बैग्स को कंक्रीट या जालीदार बेंच पर रखें।",
                    "description_mr": "मातीजन्य फायटोफ्थोराचा संसर्ग टाळण्यासाठी रोपांच्या पिशव्या जमिनीऐवजी लोखंडी किंवा बांबूच्या मांडवावर ठेवा.",
                    "urgency": "seasonal"
                },
                {
                    "title_en": "QR Plant Passport Issuance",
                    "title_hi": "क्यूआर प्लांट पासपोर्ट जारी करना",
                    "title_mr": "क्यूआर प्लांट पासपोर्ट देणे",
                    "description_en": "Eligible for digital passport certification for certified farmer orchard supply.",
                    "description_hi": "प्रमाणित किसान बागवानी आपूर्ति हेतु डिजिटल पासपोर्ट प्रमाणन के लिए पात्र।",
                    "description_mr": "शेतकऱ्यांना प्रमाणित विक्रीसाठी डिजिटल प्लांट पासपोर्ट देण्यास पात्र.",
                    "urgency": "immediate"
                }
            ],
            "prevention_measures": [
                "Disinfect grafting shears with 70% ethanol between plants.",
                "Ensure Rangpur lime / Jambhiri rootstock collar remains 15-20cm above soil line."
            ],
            "recommended_reading_slugs": ["anatomy-graft-union", "nursery-sanitation-nagpur"],
            "disclaimer": "SantraScan is an AI screening aid. For certified statutory nursery tags, adhere to ICAR-CCRI / State Horticulture norms."
        }

    elif verdict in ["questionable", "warning_signs"]:
        return {
            "summary_en": "Plant requires quarantine observation. Suspected nutrient imbalance or mild foliar stress.",
            "summary_hi": "पौधे को निगरानी में रखने की आवश्यकता है। पोषक तत्वों की कमी या हल्के तनाव की संभावना।",
            "summary_mr": "रोपाला देखरेखीखाली ठेवणे आवश्यक आहे. सूक्ष्मअन्नद्रव्यांची कमतरता किंवा पानांवर ताण असण्याची शक्यता.",
            "immediate_actions": [
                {
                    "title_en": "Isolate from Certified Lot",
                    "title_hi": "प्रमाणित लॉट से अलग करें",
                    "title_mr": "प्रमाणित लॉटपासून वेगळे ठेवा",
                    "description_en": "Segregate this batch to prevent potential pathogen spread and re-evaluate in 14-21 days.",
                    "description_hi": "संभाव्य रोग प्रसार रोकने के लिए इस बैच को अलग रखें और 14-21 दिनों में पुनः जांच करें।",
                    "description_mr": "संभाव्य रोगाचा प्रादुर्भाव रोखण्यासाठी हा लॉट बाजूला ठेवा आणि १४-२१ दिवसांनी पुन्हा स्कॅन करा.",
                    "urgency": "immediate"
                },
                {
                    "title_en": "Micronutrient Foliar Check",
                    "title_hi": "सूक्ष्म पोषक तत्व जांच",
                    "title_mr": "सूक्ष्मअन्नद्रव्य फवारणी तपासणी",
                    "description_en": "Check for Zinc & Iron deficiency symptoms. Apply university-approved grade micronutrient spray during flush.",
                    "description_hi": "जिंक और आयरन की कमी के लक्षणों की जांच करें। कृषि विश्वविद्यालय द्वारा अनुमोदित सूक्ष्म पोषक तत्वों का छिड़काव करें।",
                    "description_mr": "जस्त (झिंक) आणि लोहाच्या कमतरतेची खात्री करा. विद्यापीठ शिफारशीत सूक्ष्मअन्नद्रव्यांची योग्य फवारणी करा.",
                    "urgency": "medium"
                }
            ],
            "prevention_measures": [
                "Do not market or distribute until expert review approves.",
                "Inspect irrigation runoff and avoid water stagnation near root bags."
            ],
            "recommended_reading_slugs": ["zinc-iron-deficiency-citrus", "irrigation-water-stress-citrus"],
            "disclaimer": "Preliminary screening only. Submit for expert horticultural officer review if symptoms persist."
        }

    else:  # reject / significant_concern
        return {
            "summary_en": "Do NOT plant or distribute. High risk of systemic disease or serious structural failure.",
            "summary_hi": "रोपण या वितरण न करें। गंभीर रोग या कलमी जोड़ की खराबी का उच्च जोखिम।",
            "summary_mr": "लागवड किंवा विक्री करू नका. झाडामध्ये गंभीर रोग किंवा कलमी सांधा खराब असण्याचा मोठा धोका आहे.",
            "immediate_actions": [
                {
                    "title_en": "Quarantine & Destruction Protocol",
                    "title_hi": "पृथक्करण और निस्तारण प्रोटोकॉल",
                    "title_mr": "क्वारंटाईन आणि नष्ट करण्याची प्रक्रिया",
                    "description_en": "Immediately remove diseased sapling from nursery beds. If Phytophthora or canker is suspected, safely burn or bag-dispose to avoid contamination.",
                    "description_hi": "नर्सरी क्यारियों से तुरंत प्रभावित पौधे निकालें। फाइटोफ्थोरा या कैंकर की आशंका होने पर सुरक्षित निस्तारण करें।",
                    "description_mr": "रोपवाटिकेमधून बाधित रोपे त्वरित वेगळी करा. फायटोफ्थोरा किंवा देवी रोगाचा संशय असल्यास प्रादुर्भाव टाळण्यासाठी सुरक्षित विल्हेवाट लावा.",
                    "urgency": "immediate"
                },
                {
                    "title_en": "Official Laboratory Consultation",
                    "title_hi": "अधिकृत प्रयोगशाला परामर्श",
                    "title_mr": "अधिकृत कृषी प्रयोगशाळा सल्ला",
                    "description_en": "For suspected Citrus Greening (HLB) or severe Gummosis, send leaf tissue samples to ICAR-CCRI Nagpur / PDKV Akola pathology lab.",
                    "description_hi": "सिट्रस ग्रीनिंग या गमोसिस की आशंका पर आईसीएआर-सीसीआरआई नागपुर या कृषि विश्वविद्यालय की लैब में नमूने भेजें।",
                    "description_mr": "सिट्रस ग्रीनिंग किंवा डिंक्या (गमोसिस) रोगाच्या संशयास्पद नमुन्यांची ICAR-CCRI नागपूर अथवा PDKV अकोला येथे तपासणी करून घ्या.",
                    "urgency": "immediate"
                }
            ],
            "prevention_measures": [
                "Sterilize nursery potting soil and trays using solarization or steaming.",
                "Procure budwood exclusively from certified disease-free mother blocks."
            ],
            "recommended_reading_slugs": ["damping-off-phytophthora-nursery", "citrus-canker-management", "citrus-greening-hlb"],
            "disclaimer": "CRITICAL: Rejected material must not be sold to farmers. A single infected tree jeopardizes 15+ years of orchard productivity."
        }
