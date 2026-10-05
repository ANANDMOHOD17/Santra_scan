import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.app.database import SessionLocal, engine
from backend.app import models

ARTICLES_DATA = [
    # Anatomy
    {
        "slug": "anatomy-graft-union",
        "category": "Anatomy",
        "title_en": "Graft Union & Bud Alignment Quality Standards",
        "title_hi": "कलमी जोड़ और बड संरेखण गुणवत्ता मानक",
        "title_mr": "कलमी सांधा व डोळा जोडणी गुणवत्ता निकष",
        "summary_en": "How to evaluate bud union integrity between Nagpur Mandarin scion and Rangpur Lime / Jambhiri rootstock.",
        "summary_hi": "नागपुर संतरा सायन और रंगपुर लाइम/जंभिरी रूटस्टॉक के बीच कलमी जोड़ की अखंडता का मूल्यांकन कैसे करें।",
        "summary_mr": "नागपूर संत्रा सायन आणि रंगपूर लाइम / जंभिरी रूटस्टॉक यांच्यातील कलमी सांध्याची गुणवत्ता कशी तपासावी.",
        "content_en": "In commercial citrus nurseries, the graft union (bud union) is the most critical anatomical checkpoint. The bud must be placed strictly 15 to 20 cm above the collar line to prevent soil-borne Phytophthora splash. The union must be smooth without acute kinks or fissures.",
        "content_hi": "संतरा नर्सरी में कलमी जोड़ चिकना, स्वस्थ और कॉलर लाइन से कम से कम 15 से 20 सेमी ऊपर होना चाहिए ताकि मिट्टी जनित फाइटोफ्थोरा से बचा जा सके।",
        "content_mr": "संत्रा रोपवाटिकेमध्ये कलमी सांधा स्वच्छ, निरोगी आणि जमिनीच्या कॉलर रेषेपासून किमान १५ ते २० सेमी उंचीवर असावा. यामुळे मातीतील फायटोफ्थोरा बुरशीचा प्रादुर्भाव कलमावर होत नाही.",
        "symptoms": ["Graft swelling", "Inward bark folding", "Stem cracking at union"],
        "prevention": ["Use certified disease-free rootstocks", "Keep budding height at 20 cm", "Sterilize grafting blades with 70% alcohol"],
        "management": ["Reject plants with abnormal graft kink", "Allow 60 days observation before field transfer"],
        "source_attribution": "ICAR - Central Citrus Research Institute (CCRI), Nagpur",
        "verified_date": "2026-03-15"
    },
    {
        "slug": "citrus-rootstock-scion-mechanics",
        "category": "Anatomy",
        "title_en": "Nagpur Mandarin Scion & Rootstock Compatibility Mechanics",
        "title_hi": "नागपुर संतरा सायन और रूटस्टॉक अनुकूलता यांत्रिकी",
        "title_mr": "नागपूर संत्रा सायन आणि रूटस्टॉक अनुकूलता व शरीरशास्त्र",
        "summary_en": "Detailed comparison of Rangpur Lime vs Rough Lemon (Jambhiri) rootstocks for Vidarbha's deep black cotton soils.",
        "summary_hi": "विदर्भ की भारी काली मिट्टी के लिए रंगपुर लाइम बनाम जंभिरी रूटस्टॉक का तुलनात्मक अध्ययन।",
        "summary_mr": "विदर्भातील भारी काळ्या जमिनीसाठी रंगपूर लाइम विरुद्ध जंभिरी रूटस्टॉकचे वैशिष्ट्ये व निवड.",
        "content_en": "Rangpur Lime is the gold standard rootstock for Vidarbha Vertisols, imparting high tolerance to Phytophthora foot rot and drought. Jambhiri offers deep vigorous anchorage but is susceptible to gummosis in poorly drained soils.",
        "content_hi": "रंगपुर लाइम विदर्भ की भारी मिट्टी के लिए सर्वोत्तम है। यह फाइटोफ्थोरा और सूखे के प्रति सहनशील है। जंभिरी केवल हल्की और अच्छी जलनिकासी वाली जमीन के लिए उपयुक्त है।",
        "content_mr": "रंगपूर लाइम विदर्भातील काळ्या जमिनीत डिंक्या रोगास अत्यंत प्रतिकारक्षम आहे. जंभिरी रूटस्टॉक हलक्या जमिनीसाठी योग्य आहे.",
        "symptoms": ["Collar rot under poor drainage", "Lime-induced chlorosis"],
        "prevention": ["Select Rangpur Lime rootstock", "Inspect taproot without J-curling"],
        "management": ["Ensure surface drainage", "Plant on raised mounds"],
        "source_attribution": "ICAR-CCRI & Dr. PDKV Akola",
        "verified_date": "2026-03-10"
    },
    {
        "slug": "canopy-foliage-branching",
        "category": "Anatomy",
        "title_en": "Canopy Architecture, Sun Exposure & Ambia Flowering",
        "title_hi": "कैनोपी संरचना, सूर्य का प्रकाश और अंबिया फूल प्रबंधन",
        "title_mr": "झाडाचा विस्तार (कॅनॉपी), सूर्यप्रकाश आणि अंबिया बहर व्यवस्थापन",
        "summary_en": "How scaffold framework, leaf area index (LAI), and sunlight penetration drive fruit set and prevent internal canopy death.",
        "summary_hi": "शाखाओं का सही कोण और पत्तियों तक धूप का पहुंचना भरपूर फलोत्पादन के लिए क्यों जरूरी है।",
        "summary_mr": "झाडाचा योग्य आकार, सूर्यप्रकाशाचे योग्य वितरण आणि भरपूर अंबिया बहरासाठी फांद्यांचे व्यवस्थापन.",
        "content_en": "Retain 3-4 primary scaffold branches originating at 45-75 cm height spiraling around the trunk at 45-60 degree angles. Remove vertical water sprouts to maintain open center architecture for light penetration.",
        "content_hi": "पेड़ के अंदर धूप पहुंचने के लिए मध्य की कांटेदार अनुपयोगी शाखाओं को हटाएं। मुख्य शाखाओं का कोण 45 से 60 डिग्री होना चाहिए।",
        "content_mr": "झाडाच्या आतील भागापर्यंत ऊन पोहोचण्यासाठी मध्यभागी वाढणारे वॉटर स्प्राऊट्स वेळोवेळी छाटावेत.",
        "symptoms": ["Internal twig drying", "Dense umbrella shading"],
        "prevention": ["Post-harvest pruning", "Remove vertical water shoots"],
        "management": ["Spray 1% Bordeaux mixture post pruning"],
        "source_attribution": "ICAR-CCRI Canopy Architecture Bulletin",
        "verified_date": "2026-02-28"
    },
    {
        "slug": "orange-fruit-development",
        "category": "Anatomy",
        "title_en": "Citrus Fruit Anatomy & Maturity Indicators",
        "title_hi": "संतरा फल की शारीरिक संरचना और परिपक्वता के संकेत",
        "title_mr": "संत्रा फळाची अंतर्गत रचना व पक्वतेची अचूक लक्षणे",
        "summary_en": "Anatomy of the hesperidium: flavedo, albedo, juice sacs, TSS:acid ratio, and harvesting indicators for Nagpur Mandarin.",
        "summary_hi": "संतरा फल के भीतरी भाग, रस की थैलियां, मिठास अनुपात और तुड़ाई के वैज्ञानिक लक्षण।",
        "summary_mr": "संत्रा फळाची साल, अंतर्गत रसाच्या पिशव्या, साखर-आम्ल प्रमाण आणि काढणीची वैज्ञानिक लक्षणे.",
        "content_en": "Nagpur Mandarin has a loose rind (flavedo + albedo) with 10-12 easily separable segments. Maturity criteria: TSS 10-12 Brix, acidity 0.6-0.8%, TSS:acid ratio > 12:1, juice content > 40%.",
        "content_hi": "नागपुर संतरा आसानी से छीलने योग्य फल है। परिपक्वता पर TSS 10-12 डिग्री ब्रिक्स और रस 40% से अधिक होना चाहिए।",
        "content_mr": "नागपूर संत्र्याची साल सैल असल्याने ती सहज सोलली जाते. पक्वतेच्या वेळी TSS १० ते १२ ब्रिक्स आणि रसाचे प्रमाण ४०% पेक्षा जास्त असावे.",
        "symptoms": ["Thick coarse rind from excess N", "Granulated juice vesicles"],
        "prevention": ["Avoid late nitrogen application", "Steady drip rounds in September"],
        "management": ["Harvest with curved clippers leaving 2mm button"],
        "source_attribution": "ICAR-CCRI Post-Harvest Technology Division",
        "verified_date": "2026-03-01"
    },

    # Cultivation
    {
        "slug": "nagpur-mandarin-soil-climate",
        "category": "Cultivation",
        "title_en": "Ideal Soils & Agro-Climatic Parameters in Vidarbha",
        "title_hi": "विदर्भ में आदर्श मिट्टी और कृषि-जलवायु परिस्थितियां",
        "title_mr": "विदर्भातील संत्रा लागवडीसाठी योग्य जमीन व हवामान निकष",
        "summary_en": "Soil depth, drainage, Vertisol clay dynamics, and temperature requirements that give Nagpur Santra its unique GI flavor.",
        "summary_hi": "नागपुर संतरे के अनूठे स्वाद और उत्पादन के लिए आवश्यक मिट्टी की गहराई, जल निकासी और मौसम की जानकारी।",
        "summary_mr": "नागपूर संत्र्याच्या जीआय (GI) दर्जासाठी आवश्यक काळी कसदार जमीन, निचरा आणि हवामानाचे घटक.",
        "content_en": "Nagpur Mandarin thrives in deep black cotton soils (60-120 cm depth) with pH 6.5-7.8 and excellent drainage. Hot dry summers (38-44C) induce water stress for Mrig Bahar while mild winters (10-18C) enhance Ambia fruit coloring.",
        "content_hi": "60 से 120 सेमी गहरी मध्यम से भारी काली मिट्टी। जल निकासी उत्तम होनी चाहिए। शुष्क गर्मियां और सुहानी सर्दियां संतरा के लिए सबसे अच्छी हैं।",
        "content_mr": "६० ते १२० सेमी खोल काळी जमीन, सामू ६.५ ते ७.८ आणि उत्तम पाण्याचा निचरा आवश्यक आहे.",
        "symptoms": ["Chlorosis on calcareous soils", "Water stagnation shock"],
        "prevention": ["Test soil profile before pit digging", "Avoid low-lying flood-prone spots"],
        "management": ["Incorporate green manure crops like Dhaincha"],
        "source_attribution": "ICAR-CCRI & NBSS & LUP Nagpur",
        "verified_date": "2026-02-15"
    },
    {
        "slug": "micro-drip-irrigation-fertigation",
        "category": "Cultivation",
        "title_en": "Precision Drip Irrigation & Fertigation Protocol",
        "title_hi": "सूक्ष्म ड्रिप सिंचाई और फर्टिगेशन प्रोटोकॉल",
        "title_mr": "ठिबक सिंचन व विद्राव्य खत व्यवस्थापन (फर्टिगेशन)",
        "summary_en": "Stage-wise water budgeting per mature tree, inline drip line placement, and soluble NPK schedule to maximize grade-A fruit yield.",
        "summary_hi": "प्रत्येक पेड़ के लिए पानी की सटीक मात्रा, ड्रिप लाइन की सही स्थिति और घुलनशील उर्वरकों की समय सारणी।",
        "summary_mr": "प्रत्येक संत्रा झाडासाठी पाणी व्यवस्थापन, ठिबक नळ्यांची मांडणी आणि टप्प्याटप्प्याने खते देण्याचे वेळापत्रक.",
        "content_en": "Install double lateral drip lines at canopy drip line (1.0-1.5m from trunk). Keep trunk collar zone completely dry. Daily water need: 40-60 L in winter, 100-140 L in peak summer. Annual fertigation per tree: 600g N, 200g P2O5, 300g K2O.",
        "content_hi": "तने से 1-1.5 मीटर दूर दोहरी ड्रिप लाइन लगाएं। तना सूखा रखें। वयस्क पेड़ को गर्मी में 100-140 लीटर और सर्दी में 40-60 लीटर पानी प्रति दिन दें।",
        "content_mr": "खोडापासून १ ते १.५ मीटर अंतरावर सावलीच्या परिघावर दोन इनलाइन नळ्या टाकाव्यात. खोड नेहमी कोरडे ठेवावे.",
        "symptoms": ["Over-irrigation chlorosis", "Fruit splitting from irregular watering"],
        "prevention": ["Flush drip laterals every 15 days", "Use sand media and disc filters"],
        "management": ["Adjust drip timing by pan evaporation rates"],
        "source_attribution": "ICAR-CCRI Precision Farming Development Center",
        "verified_date": "2026-03-05"
    },
    {
        "slug": "orchard-layout-planting-density",
        "category": "Cultivation",
        "title_en": "Orchard Establishment, Spacing & High-Density Planting",
        "title_hi": "बगीचे की स्थापना, पौधों की दूरी और सघन बागवानी (HDP)",
        "title_mr": "नवीन संत्रा बाग लागवड, अंतर आणि सघन लागवड (HDP) तंत्रज्ञान",
        "summary_en": "Standard 6m x 6m square planting vs High-Density 5m x 3m planting on Rangpur lime, pit preparation, and staking.",
        "summary_hi": "परंपरागत 6x6 मीटर बनाम आधुनिक 5x3 मीटर सघन बागवानी, गड्ढों की तैयारी और रोपाई का सही तरीका।",
        "summary_mr": "पारंपरिक ६ x ६ मीटर आणि आधुनिक ५ x ३ मीटर सघन लागवड पद्धत, खड्डे भरणे व लागवड नियोजन.",
        "content_en": "Traditional square spacing is 6m x 6m (277 trees/ha). High Density Planting (HDP) at 5m x 3m (666 trees/ha) produces early commercial yields. Dig 1x1x1m pits in April-May, expose to sun 30 days, fill with topsoil, 40kg FYM, 1kg SSP, 2kg neem cake, and Trichoderma.",
        "content_hi": "6x6 मीटर (पारंपरिक) या 5x3 मीटर (सघन बागवानी)। 1x1x1 मीटर के गड्ढे खोदकर 40 किलो गोबर खाद और ट्राइकोडर्मा मिलाकर भरें।",
        "content_mr": "पारंपरिक ६x६ मीटर किंवा सघन ५x३ मीटर अंतर. खड्ड्यात ४० किलो शेणखत, १ किलो सुपर फॉस्फेट आणि ट्रायकोडर्मा भरावे.",
        "symptoms": ["Crowding in unpruned HDP", "Termite damage"],
        "prevention": ["North-south row orientation for sunlight", "Drench Chlorpyrifos if termites seen"],
        "management": ["Stake young saplings with bamboo stakes"],
        "source_attribution": "ICAR-CCRI & Dr. PDKV Akola Horticulture Guidelines",
        "verified_date": "2026-01-30"
    },
    {
        "slug": "pruning-training-canopy-hygiene",
        "category": "Cultivation",
        "title_en": "Scientific Pruning, Trunk Care & Bordeaux Paste Application",
        "title_hi": "वैज्ञानिक छंटाई (प्रूनिंग), तने की देखभाल और बोर्डो पेस्ट",
        "title_mr": "शास्त्रीय छाटणी (प्रूनिंग), खोड निगा व बोर्डो पेस्ट लेप तंत्रज्ञान",
        "summary_en": "Post-harvest pruning protocol, water sprout suppression, Bordeaux paste (1:1:10) recipe, and trunk whitewashing.",
        "summary_hi": "फलों की तुड़ाई के बाद छंटाई का सही समय, बोर्डो पेस्ट बनाने की विधि और तने पर लेप लगाने के लाभ।",
        "summary_mr": "काढणीनंतर शास्त्रीय छाटणी, वॉटर स्प्राऊट्स काढणे, १:१:१० बोर्डो पेस्ट तयार करण्याची पद्धत व खोडाला लेप देणे.",
        "content_en": "Prune all dried diseased twigs 2 inches into green wood post-harvest. Paint trunk up to 2 feet with Bordeaux paste (1kg copper sulphate + 1kg quicklime + 10L water) twice a year: pre-monsoon (May) and post-monsoon (October).",
        "content_hi": "तुड़ाई के बाद सूखी शाखाओं को काटें। साल में दो बार (मई और अक्टूबर) तने पर 2 फीट तक 1:1:10 बोर्डो पेस्ट का लेप लगाएं।",
        "content_mr": "काढणीनंतर वाळलेल्या फांद्या छाटाव्यात. वर्षातून दोनदा (मे व ऑक्टोबर) खोडाला २ फुटांपर्यंत १:१:१० बोर्डो पेस्ट लावावी.",
        "symptoms": ["Dieback descending from untreated cuts", "Sunburn on exposed trunk"],
        "prevention": ["Spray 1% Bordeaux mixture on canopy post-pruning", "Burn pruned infected debris"],
        "management": ["Seal cuts >2cm with copper oxychloride paste"],
        "source_attribution": "ICAR-CCRI Plant Pathology Division",
        "verified_date": "2026-02-20"
    },
    {
        "slug": "intercropping-companion-crops",
        "category": "Cultivation",
        "title_en": "Profitable Intercropping in Young Citrus Orchards (Years 1-4)",
        "title_hi": "छोटे संतरा बाग में लाभदायक अंतरवर्तीय फसलें (वर्ष 1-4)",
        "title_mr": "नवीन संत्रा बागेत फायदेशीर आंतरपिके (पहिले ४ वर्षे)",
        "summary_en": "Compatible legumes, marigold for nematode suppression, green manures, and strict crops to avoid (cotton, solanaceae, sugarcane).",
        "summary_hi": "संतरे के साथ उगाई जाने वाली उपयुक्त दलहनी फसलें, गेंदा और कौन सी फसलें (कपास, मिर्च, गन्ना) बिल्कुल न लगाएं।",
        "summary_mr": "संत्रा बागेत मूग, उडीद, हरभरा, झेंडू यांसारखी फायदेशीर आंतरपिके आणि कोणती पिके (कापूस, मिरची, ऊस) लावू नयेत.",
        "content_en": "Grow short legumes (Moong, Urad, Gram) and African Marigold to suppress nematodes in orchards up to 4 years old. Strictly avoid cotton, chilli, tomato, brinjal, sugarcane, and banana.",
        "content_hi": "मूंग, उड़द, चना और गेंदा लगाएं। कपास, मिर्च, टमाटर, बैंगन और गन्ना कभी न लगाएं।",
        "content_mr": "सुरुवातीच्या ४ वर्षांत मूग, उडीद, हरभरा व झेंडू आंतरपिके घ्यावीत. कापूस, मिरची, वांगी व ऊस अजिबात घेऊ नयेत.",
        "symptoms": ["Nematode root galls from solanaceous crops"],
        "prevention": ["Keep 1.5m buffer zone around citrus row", "Incorporate green manure at 50% bloom"],
        "management": ["Prevent intercrop water from touching tree collar"],
        "source_attribution": "Dr. PDKV Akola Agronomy Guidelines",
        "verified_date": "2026-02-10"
    },

    # Diseases
    {
        "slug": "citrus-greening-hlb",
        "category": "Diseases",
        "title_en": "Citrus Greening (Huanglongbing - HLB) Quarantine Vigilance",
        "title_hi": "सिट्रस ग्रीनिंग (एचएलबी) सतर्कता और क्वारंटाइन प्रबंधन",
        "title_mr": "सिट्रस ग्रीनिंग (HLB रोग) दक्षता व रोपवाटिका क्वारंटाईन",
        "summary_en": "Detailed diagnostic guide for Candidatus Liberibacter asiaticus, leaf mottle identification, vector ecology, and eradication protocols.",
        "summary_hi": "सिट्रस ग्रीनिंग जीवाणु रोग के लक्षण, साइला कीट की रोकथाम और संक्रमित पौधों का वैज्ञानिक प्रबंधन।",
        "summary_mr": "सिट्रस ग्रीनिंग जिवाणू रोग ओळखणे, सायला किडीचे नियंत्रण आणि बागेचे रक्षण करण्याचे वैज्ञानिक उपाय.",
        "content_en": "HLB causes asymmetric blotchy mottle on leaves, corky swollen veins, small bitter lopsided fruits, and tree decline. It is spread by Asian Citrus Psyllid. No chemical cure exists once inside the tree; eradication of infected plants is mandatory.",
        "content_hi": "पत्तियों पर असमान पीलापन (ब्लॉची मोटल), नसों का मोटा होना और कड़वे फल। इसका वाहक साइला कीट है। संक्रमित पौधे उखाड़कर नष्ट करें।",
        "content_mr": "पानांवर डाव्या-उजव्या बाजूला असमान पिवळे चट्टे पडतात. सायला किडीमुळे हा रोग पसरतो. रोगाची लागण झालेली झाडे नष्ट करावीत.",
        "symptoms": ["Asymmetric blotchy mottle", "Vein corking", "Lopsided small fruit", "Twig dieback"],
        "prevention": ["Screen mother blocks with 40-mesh netting", "Yellow sticky traps for psyllids", "PCR indexing"],
        "management": ["Zero-tolerance eradication of infected trees"],
        "source_attribution": "ICAR-CCRI & National Citrus Quarantine Network",
        "verified_date": "2026-03-12"
    },
    {
        "slug": "damping-off-phytophthora-nursery",
        "category": "Diseases",
        "title_en": "Damping-Off & Foot Rot in Citrus Nurseries",
        "title_hi": "संतरा नर्सरी में आद्र-गलन (डैम्पिंग-ऑफ) और फुट रॉट",
        "title_mr": "संत्रा रोपवाटिकेत मर रोग (डॅम्पिंग-ऑफ) व खोडकूज व्यवस्थापन",
        "summary_en": "Epidemiology of Phytophthora species in polybag nurseries, raised nursery bench design, and Trichoderma bio-control.",
        "summary_hi": "नर्सरी में मिट्टी जनित फफूंद से होने वाले पौधों के सूखने का कारण, बेंच की ऊंचाई और ट्राइकोडर्मा का उपयोग।",
        "summary_mr": "रोपवाटिकेत फायटोफ्थोरा बुरशीमुळे होणारा मर रोग, मांडवांची रचना आणि ट्रायकोडर्मा जैविक बुरशीनाशकाचा वापर.",
        "content_en": "Phytophthora attacks seedlings at collar level causing water-soaked lesions and collapse. Use raised wire mesh benches 60 cm above ground, solarize potting soil 30 days in May, and enrich with Trichoderma viride.",
        "content_hi": "पॉलीथीन बैग्स को जमीन से 2 फीट ऊंचे बेंच पर रखें। मई में मिट्टी का सौरीकरण करें और ट्राइकोडर्मा मिलाएं।",
        "content_mr": "पिशव्या जमिनीवर न ठेवता २ फूट उंचीच्या मांडवावर ठेवाव्यात. मातीत ट्रायकोडर्मा जैविक बुरशीनाशक मिसळावे.",
        "symptoms": ["Water-soaked collar lesion", "Seedling wilt", "Brown root decay"],
        "prevention": ["Raised nursery benches", "Avoid overhead sprinkler splashing", "Soil solarization"],
        "management": ["Drench Copper Oxychloride (2.5 g/L) or Trichoderma viride"],
        "source_attribution": "ICAR-CCRI Technical Bulletin on Citrus Protection",
        "verified_date": "2026-03-01"
    },
    {
        "slug": "citrus-canker-xanthomonas",
        "category": "Diseases",
        "title_en": "Citrus Bacterial Canker (Xanthomonas axonopodis)",
        "title_hi": "सिट्रस कैंकर जीवाणु रोग प्रबंधन",
        "title_mr": "सिट्रस कॅन्कर (खैऱ्या रोग) एकात्मिक नियंत्रण",
        "summary_en": "Identification of corky crater lesions with chlorotic halos, copper-streptocycline spray schedules, and leaf miner synergy.",
        "summary_hi": "कैंकर के उभरे हुए खुरदुरे धब्बों की पहचान, कॉपर और स्ट्रेप्टोसाइक्लिन का छिड़काव शेड्यूल।",
        "summary_mr": "पाने व फळांवरील खैऱ्या रोगाचे चट्टे, कॉपर ऑक्झिक्लोराईड व स्ट्रेप्टोसायक्लिन फवारणीचे वेळापत्रक.",
        "content_en": "Raised rough corky lesions surrounded by yellow chlorotic halos on leaves, twigs, and fruit. Enters via wounds made by leaf miner. Spray Copper Oxychloride (2.5 g/L) + Streptocycline (100 ppm) in June-July.",
        "content_hi": "पत्तियों और फलों पर खुरदुरे उभरे धब्बे जिनके चारों ओर पीला छल्ला होता है। कॉपर ऑक्सीक्लोराइड + स्ट्रेप्टोसाइक्लिन का छिड़काव करें।",
        "content_mr": "पाने व फळांवर तांबूस खडबडीत चट्टे येतात ज्याभोवती पिवळे कडे असते. कॉपर ऑक्झिक्लोराईड व स्ट्रेप्टोसायक्लिन फवारावे.",
        "symptoms": ["Corky raised craters", "Bright yellow chlorotic halo", "Premature fruit drop"],
        "prevention": ["Prune canker twigs before monsoon", "Control citrus leaf miner", "Windbreaks"],
        "management": ["Spray Copper Oxychloride (2.5 g/L) + Streptocycline (100 ppm)"],
        "source_attribution": "Dr. PDKV Akola Citrus Pathology",
        "verified_date": "2026-02-18"
    },
    {
        "slug": "twig-dieback-anthracnose",
        "category": "Diseases",
        "title_en": "Twig Blight, Anthracnose & Dieback (Colletotrichum)",
        "title_hi": "टहनी का सूखा रोग (डाईबैक) और एन्थ्रेक्नोज प्रबंधन",
        "title_mr": "फांदी वाळ (डायबॅक) व करपा रोग व्यवस्थापन",
        "summary_en": "Progressive tip drying of shoots, acervuli fruiting bodies, moisture stress triggers, and systemic fungicidal rescue.",
        "summary_hi": "टहनियों का ऊपर से नीचे की ओर सूखना, कवक की रोकथाम और सही फफूंदनाशक का प्रयोग।",
        "summary_mr": "संत्रा झाडांच्या फांद्या टोकाकडून खाली वाळत जाणे (डायबॅक), पाण्याचा ताण व बुरशीनाशक फवारणी नियोजन.",
        "content_en": "Drying of terminal shoots progressing downwards from tips. Ash-gray twigs with black fungal pinpoints. Prune dead wood 2 inches into green tissue and spray Carbendazim 50 WP (1 g/L) or 1% Bordeaux mixture.",
        "content_hi": "टहनियां ऊपर से नीचे की ओर सूखती हैं। सूखी टहनियों को काटकर कार्बेन्डाजिम (1 ग्राम/लीटर) का छिड़काव करें।",
        "content_mr": "फांद्या शेंड्याकडून खाली वाळत येतात. वाळलेल्या फांद्या कापून कार्बेन्डाझिम किंवा बोर्डो मिश्रण फवारावे.",
        "symptoms": ["Progressive tip drying", "Ash-gray dead twigs with black pinpoints"],
        "prevention": ["Avoid summer water stress beyond 45 days", "Sanitize secateurs"],
        "management": ["Prune and spray Carbendazim 50 WP (1 g/L)"],
        "source_attribution": "ICAR-CCRI Fungal Pathology Section",
        "verified_date": "2026-02-25"
    },
    {
        "slug": "citrus-tristeza-virus-ctv",
        "category": "Diseases",
        "title_en": "Citrus Tristeza Virus (CTV) & Stem Pitting Identification",
        "title_hi": "सिट्रस ट्रिस्टेज़ा वायरस (सीटीवी) और तने में गड्ढे पड़ना",
        "title_mr": "सिट्रस ट्रायस्टेझा विषाणू (CTV) व खोडावर खड्डे पडणे",
        "summary_en": "Vector transmission by black citrus aphid (Toxoptera citricida), quick decline symptoms, and rootstock resistance.",
        "summary_hi": "काले माहू (एफिड) द्वारा फैलने वाला वायरस, पेड़ों का अचानक सूखना और प्रतिरोधी रूटस्टॉक का चयन।",
        "summary_mr": "काळा मावा किडीमुळे पसरणारा ट्रायस्टेझा विषाणू, झाडाचा अचानक ऱ्हास आणि प्रतिकारक्षम रूटस्टॉक.",
        "content_en": "Vectored by black citrus aphid. Causes vein clearing on tender leaves and longitudinal stem pitting grooves under the bark. Rangpur Lime rootstock is tolerant.",
        "content_hi": "एफिड द्वारा फैलता है। नई पत्तियों की नसों में पारदर्शी रेखाएं और तने में गड्ढे दिखाई देते हैं।",
        "content_mr": "काळा मावा किडीमुळे पसरतो. लाकडावर उभे खड्डे पडतात. रंगपूर लाइम रूटस्टॉक प्रतिकारक्षम आहे.",
        "symptoms": ["Vein clearing flecks", "Stem pitting in wood", "Tree decline"],
        "prevention": ["Certified virus-tested budwood", "Control aphids"],
        "management": ["Eradicate declining trees to eliminate reservoirs"],
        "source_attribution": "ICAR-CCRI Virology Laboratory",
        "verified_date": "2026-03-08"
    },

    # Pests
    {
        "slug": "asian-citrus-psyllid-vector",
        "category": "Pests",
        "title_en": "Asian Citrus Psyllid (Diaphorina citri) Vector Ecology",
        "title_hi": "एशियन सिट्रस साइला (कीट) पारिस्थितिकी और नियंत्रण",
        "title_mr": "सिट्रस सायला किडीचे जीवनचक्र व एकात्मिक नियंत्रण",
        "summary_en": "Seasonal population dynamics, feeding behavior, vector role in Citrus Greening, and threshold-based chemical controls.",
        "summary_hi": "साइला कीट की पहचान, नए पत्तों पर हमला, ग्रीनिंग रोग फैलाने में भूमिका और नियंत्रण उपाय।",
        "summary_mr": "सायला किडीची ओळख, कोवळ्या पालवीवरील प्रादुर्भाव, ग्रीनिंग रोगाचा प्रसार व नियंत्रण पद्धती.",
        "content_en": "Adults tilt at 45 degrees while sucking sap from tender flushes. Nymphs produce white waxy honeydew curls. Primary vector of HLB. Spray Imidacloprid 17.8 SL (0.5 mL/L) or Thiamethoxam 25 WG (0.3 g/L) at new flush emergence.",
        "content_hi": "वयस्क कीट 45 डिग्री के कोण पर बैठकर रस चूसता है। यह ग्रीनिंग रोग का मुख्य वाहक है। नई कोपलें आते ही इमिडाक्लोप्रिड का छिड़काव करें।",
        "content_mr": "प्रौढ कीड ४५ अंशांच्या कोनात बसून रस शोषते. ग्रीनिंग रोगाचा प्रसार करते. नवीन पालवीवर इमिडाक्लोप्रिडची फवारणी करावी.",
        "symptoms": ["Adults tilted at 45 degrees", "White waxy honeydew filaments", "Twisted curly shoots"],
        "prevention": ["Yellow sticky traps (15/acre)", "Prune asynchronous water shoots"],
        "management": ["Spray Imidacloprid 17.8 SL (0.5 mL/L) or Thiamethoxam 25 WG (0.3 g/L)"],
        "source_attribution": "ICAR-CCRI Entomology Division",
        "verified_date": "2026-03-02"
    },
    {
        "slug": "citrus-leaf-miner",
        "category": "Pests",
        "title_en": "Citrus Leaf Miner (Phyllocnistis citrella) Management",
        "title_hi": "सिट्रस लीफ माइनर (चित्रकिडा) का वैज्ञानिक नियंत्रण",
        "title_mr": "संत्र्यावरील नागअळी (लीफ मायनर) प्रभावी नियंत्रण",
        "summary_en": "Serpentine leaf tunnels, distortion of nursery sapling foliage, predisposal to citrus canker, and neem-based IPM schedules.",
        "summary_hi": "पत्तियों में चांदी जैसी टेढ़ी-मेढ़ी सुरंगें, नर्सरी के पौधों का मुड़ना और नीम आधारित नियंत्रण।",
        "summary_mr": "पानांमधील चंदेरी नागमोडी भुयारे, पानांचा चुरगळा होणे, कॅन्कर रोगाचा शिरकाव आणि निंबोळी अर्क फवारणी.",
        "content_en": "Larvae mine serpentine silvery galleries under leaf epidermis, distorting leaves and opening entry wounds for canker bacteria. Spray 5% NSKE or Neem Oil (1 mL/L) at bud swell, followed by Spinosad 45 SC (0.3 mL/L) if infestation exceeds 20%.",
        "content_hi": "पत्तियों में चांदी जैसी सुरंगें बनाती है। नई पत्तियों पर 5% नीम अर्क (NSKE) या स्पिनोसैड (0.3 मिली/लीटर) छिड़कें।",
        "content_mr": "पानांमध्ये चंदेरी नागमोडी भुयारे होतात. ५% निंबोळी अर्क किंवा स्पिनोसॅड फवारावे.",
        "symptoms": ["Silvery serpentine galleries", "Curling distortion of young foliage"],
        "prevention": ["Spray 5% NSKE at first bud swell", "Avoid late excess nitrogen"],
        "management": ["Spray Spinosad 45 SC (0.3 mL/L) or Abamectin 1.9 EC (0.5 mL/L)"],
        "source_attribution": "ICAR-CCRI Integrated Pest Management Bulletin",
        "verified_date": "2026-02-12"
    },
    {
        "slug": "lemon-butterfly-caterpillar",
        "category": "Pests",
        "title_en": "Lemon Butterfly (Papilio demoleus) Defoliation Defense",
        "title_hi": "नींबू तितली (कैटरपिलर) द्वारा पत्तियों को खाने से बचाव",
        "title_mr": "लिंबू फुलपाखरू (सुरवंट) पान कुरतडणारी अळी नियंत्रण",
        "summary_en": "Bird-dropping camouflage in early larval instars, voracious nursery defoliation, hand picking, and bio-insecticides.",
        "summary_hi": "पक्षी की बीट जैसी दिखने वाली सुंडी, पूरी पत्तियां चट कर जाना और जैविक नियंत्रण के तरीके।",
        "summary_mr": "पक्ष्यांच्या विष्ठेसारखी दिसणारी सुरवंट, झाडाची संपूर्ण पाने कुरतडणे आणि जैविक उपाय.",
        "content_en": "Early caterpillar instars mimic bird droppings; mature larvae are bright green with horn-like osmeterium. Defoliate young nursery saplings voraciously. Hand-pick in nursery beds; spray Bacillus thuringiensis (Bt @ 1.5 g/L) or Quinalphos 25 EC (1.5 mL/L).",
        "content_hi": "पक्षी की बीट जैसी दिखने वाली सुंडी पत्तियों को खा जाती है। हाथ से चुनकर नष्ट करें या बीटी (Bt) कीटनाशक (1.5 ग्राम/लीटर) छिड़कें।",
        "content_mr": "सुरवंट संपूर्ण पाने खाऊन फक्त मध्यशीर ठेवते. हाताने वेचून नष्ट कराव्यात किंवा बीटी (Bt) ची फवारणी करावी.",
        "symptoms": ["Defoliated shoots with bare midribs", "Bird-dropping mimic larvae"],
        "prevention": ["Mosquito net screen nursery beds", "Morning hand-picking"],
        "management": ["Spray Bacillus thuringiensis (Bt) @ 1.5 g/L or Quinalphos 25 EC @ 1.5 mL/L"],
        "source_attribution": "Dr. PDKV Akola Entomology Advisory",
        "verified_date": "2026-02-05"
    },
    {
        "slug": "citrus-fruit-sucking-moth",
        "category": "Pests",
        "title_en": "Fruit Sucking Moth (Eudocima materna) Night Orchard Defense",
        "title_hi": "फल चूसक पतंगा - रात्रि प्रबंधन और सुरक्षा उपाय",
        "title_mr": "फळे शोषणारा पतंग (रसशोषक पतंग) रात्रीचे व्यवस्थापन",
        "summary_en": "Nocturnal proboscis piercing of ripening oranges, secondary fungal rot, light traps, poison baits, and host weed eradication.",
        "summary_hi": "रात में संतरा फलों में छेद करने वाले पतंगे से बचाव, लाइट ट्रैप और जहरीले चारे का उपयोग।",
        "summary_mr": "रात्रीच्या वेळी पक्व संत्र्याला छिद्र पाडणारा पतंग, फळकूज, प्रकाश सापळे व विषारी आमिष तंत्रज्ञान.",
        "content_en": "Nocturnal moths drill pinholes into ripening Ambia fruits between dusk and 10 PM. Wounds rot and fruit drops within 48-72 hours. Install 100W light traps over kerosene trays on boundaries, hang jaggery-malathion poison bait bottles, and eradicate Gulwel creepers within 2 km.",
        "content_hi": "रात में पके फलों में छेद करता है जिससे फल सड़कर गिर जाते हैं। लाइट ट्रैप लगाएं, गुड़-मैलाथियान का जहरीला चारा रखें और गुलवेल बेल नष्ट करें।",
        "content_mr": "संध्याकाळी पक्व फळांना छिद्र पाडून रस शोषतो. प्रकाश सापळे लावावेत, विषारी आमिष बाटल्या टांगाव्यात व गुळवेल नष्ट करावी.",
        "symptoms": ["Pinhole punctures weeping sap", "Premature fruit drop at dusk", "Soft secondary rot"],
        "prevention": ["Destroy Gulwel (Tinospora cordifolia) wild creepers", "Bag fruit clusters with nylon nets"],
        "management": ["Operate incandescent light traps at dusk", "Hang poison bait bottles"],
        "source_attribution": "ICAR-CCRI Fruit Protection Guidelines",
        "verified_date": "2026-03-10"
    },
    {
        "slug": "citrus-thrips-mites",
        "category": "Pests",
        "title_en": "Citrus Thrips & Rust Mites Foliar Damage Control",
        "title_hi": "सिट्रस थ्रिप्स और रस्ट माइट (मकड़ी) की रोकथाम",
        "title_mr": "संत्र्यावरील थ्रिप्स (फुलकिडे) व लाल कोळी नियंत्रण",
        "summary_en": "Ring scars around fruit button/calyx, silvering of foliage, wettable sulfur application, and natural predator conservation.",
        "summary_hi": "फल के डंठल के चारों ओर छल्लेदार दाग, पत्तियों पर चांदी जैसा रंग और सल्फर का उपयोग।",
        "summary_mr": "फळाच्या देठाभोवती पांढुरका गोलाकार चट्टा (रिंग), पानांवरील चंदेरीपणा व विद्राव्य गंधक फवारणी.",
        "content_en": "Thrips feeding under fruit calyx produces a silvery ring scar blemish around fruit stem end. Rust mites cause russet bronzing. Spray Wettable Sulphur 80 WDG (3 g/L) or Spiromesifen 22.9 SC (0.7 mL/L) at pea-sized fruit stage.",
        "content_hi": "फल के डंठल के चारों ओर गोल छल्ला बन जाता है। फूल झड़ने के बाद घुलनशील सल्फर (3 ग्राम/लीटर) या फिप्रोनिल छिड़कें।",
        "content_mr": "फळाच्या देठाभोवती गोलाकार पांढरा चट्टा पडतो. विद्राव्य गंधक (३ ग्रॅम/लिटर) किंवा फिप्रोनिल फवारावे.",
        "symptoms": ["Silvery ring scar around fruit button", "Russet bronzing of rind"],
        "prevention": ["Maintain drip rounds", "Conserve predatory mites"],
        "management": ["Spray Wettable Sulphur 80 WDG (3 g/L) or Spiromesifen 22.9 SC (0.7 mL/L)"],
        "source_attribution": "ICAR-CCRI Acarology & Entomology Section",
        "verified_date": "2026-02-14"
    },

    # Nutrient Deficiencies
    {
        "slug": "zinc-iron-deficiency-citrus",
        "category": "Nutrient Deficiencies",
        "title_en": "Zinc & Iron Chlorosis in Vidarbha Alkaline Vertisols",
        "title_hi": "विदर्भ की काली मिट्टी में जिंक और आयरन की कमी के लक्षण",
        "title_mr": "विदर्भातील काळ्या जमिनीत जस्त (झिंक) व लोह कमतरता लक्षणे",
        "summary_en": "High pH and free calcium carbonate fix micronutrients in Nagpur soils; foliar correction protocols with neutralizing slaked lime.",
        "summary_hi": "नागपुर की चूनेदार मिट्टी में सूक्ष्म पोषक तत्वों का बंध जाना, पत्तियों का पीलापन और चूने के साथ जिंक का छिड़काव।",
        "summary_mr": "विदर्भातील चुनखडीयुक्त जमिनीत जस्त व लोहाची कमतरता, पानांमधील पिवळेपणा आणि चुन्यासह झिंक फवारणी पद्धत.",
        "content_en": "High soil pH (>7.8) and free calcium carbonate in Vidarbha Vertisols fix zinc and iron. Interveinal chlorosis shows young leaves turning creamy yellow while main veins stay dark green. Spray 0.5% Zinc Sulphate neutralized with 0.25% Slaked Lime twice on new flushes.",
        "content_hi": "विदर्भ की मिट्टी में उच्च pH के कारण जिंक और लोहा बंध जाता है। नई पत्तियों पर नसों के बीच पीलापन आता है। जिंक सल्फेट 0.5% + चूना 0.25% का छिड़काव करें।",
        "content_mr": "काळ्या जमिनीत सामू जास्त असल्याने जस्त व लोहाची कमतरता होते. झिंक सल्फेट ०.५% + कळीचा चुना ०.२५% ची फवारणी करावी.",
        "symptoms": ["Interveinal chlorosis with dark green veins", "Little leaf syndrome", "Shortened internodes"],
        "prevention": ["Incorporate well-decomposed FYM with ZSB", "Avoid excessive phosphorus"],
        "management": ["Foliar spray Zinc Sulphate 0.5% + Slaked Lime 0.25% during new flush"],
        "source_attribution": "ICAR-CCRI Nagpur Soil Health Advisory",
        "verified_date": "2026-03-01"
    },
    {
        "slug": "boron-calcium-deficiency",
        "category": "Nutrient Deficiencies",
        "title_en": "Boron & Calcium Imbalance: Fruit Hardening & Splitting",
        "title_hi": "बोरॉन और कैल्शियम असंतुलन: फल का फटना और कठोर होना",
        "title_mr": "बोरॉन व कॅल्शियम कमतरता: फळे तडकणे व कडक होणे",
        "summary_en": "Hard misshapen fruit, internal gum pockets in albedo, peel rupture from fluctuating moisture, and foliar Solubor correction.",
        "summary_hi": "संतरे के फल का सख्त होना, छिलके में गोंद की थैलियां और पानी के उतार-चढ़ाव से फलों का फटना।",
        "summary_mr": "संत्रा फळे कडक होणे, सालीच्या आत डिंकाच्या गाठी आणि अनियमित पाण्यामुळे फळे तडकणे.",
        "content_en": "Boron deficiency causes hard, misshapen, undersized fruit with brown gum pockets inside albedo. Calcium deficiency causes longitudinal fruit splitting during monsoon dry spells. Spray Solubor (1 g/L) at marble stage and apply Calcium Nitrate (200g/tree).",
        "content_hi": "बोरॉन की कमी से फल सख्त और बेडौल होते हैं, कैल्शियम की कमी से फल फटते हैं। बोरॉन (1 ग्राम/लीटर) और कैल्शियम नाइट्रेट दें।",
        "content_mr": "बोरॉन कमतरतेने फळे कडक होतात व डिंकाच्या गाठी होतात. कॅल्शियम कमतरतेने फळे तडकतात. बोरॉन १ ग्रॅम/लिटर फवारावे.",
        "symptoms": ["Hard lumpy fruit with gum pockets in albedo", "Longitudinal fruit splitting"],
        "prevention": ["Steady drip irrigation to avoid rind stress", "Solubor spray at pea size"],
        "management": ["Foliar spray Solubor 0.1% + Calcium Nitrate 0.2%"],
        "source_attribution": "ICAR-CCRI Micronutrient Division",
        "verified_date": "2026-02-16"
    },
    {
        "slug": "nitrogen-phosphorus-potassium-npk",
        "category": "Nutrient Deficiencies",
        "title_en": "Macronutrient (NPK) Balance for Nagpur Mandarin",
        "title_hi": "नागपुर संतरा के लिए मुख्य पोषक तत्व (NPK) संतुलन",
        "title_mr": "नागपूर संत्रा बागेसाठी मुख्य अन्नद्रव्ये (NPK) संतुलित मात्रा",
        "summary_en": "Tree age-specific NPK dosages, ring application method, and role of Potassium in fruit sizing and TSS sugar enhancement.",
        "summary_hi": "पेड़ की उम्र के अनुसार खाद की मात्रा, खाद देने का सही तरीका और फल के आकार व मिठास के लिए पोटाश का महत्व।",
        "summary_mr": "झाडाच्या वयानुसार रासायनिक खतांची शिफारशीत मात्रा, बांगडी पद्धत आणि फळांच्या गोडीसाठी पालाशचे महत्त्व.",
        "content_en": "Annual NPK per mature tree (8+ yrs): 600g N (1300g Urea), 200g P2O5 (1250g SSP), 300g K2O (500g MOP) + 40-50kg FYM. Apply in shallow trench around canopy drip line 1.5m away from trunk. Potassium spray (13-0-45 @ 10g/L) in Aug-Sept maximizes fruit size and TSS.",
        "content_hi": "वयस्क पेड़ के लिए: 600g N, 200g P, 300g K और 40-50kg गोबर खाद। तने से 1.5m दूर रिंग बनाकर डालें। अगस्त-सितंबर में पोटाश छिड़कें।",
        "content_mr": "मोठ्या झाडासाठी: ६०० ग्रॅम नत्र, २०० ग्रॅम स्फुरद, ३०० ग्रॅम पालाश व ४०-५० किलो शेणखत. खोडापासून १.५ मी दूर बांगडी पद्धतीने द्यावे.",
        "symptoms": ["Pale yellow older leaves (low N)", "Small sour fruit (low K)"],
        "prevention": ["Annual leaf tissue analysis", "Split nitrogen into 3 doses"],
        "management": ["Foliar spray Potassium Nitrate 13-0-45 (10 g/L) at fruit sizing"],
        "source_attribution": "ICAR-CCRI Soil Science & Agronomy Guidelines",
        "verified_date": "2026-03-04"
    },

    # Seasonal Care Calendar
    {
        "slug": "seasonal-calendar-nagpur",
        "category": "Seasonal Care Calendar",
        "title_en": "12-Month Nagpur Mandarin Agro-Advisory Calendar",
        "title_hi": "नागपुर संतरा 12 माह की संपूर्ण कृषि-मार्गदर्शिका",
        "title_mr": "नागपूर संत्रा १२ महिन्यांचे संपूर्ण कृषी वेळापत्रक (विदर्भ)",
        "summary_en": "Comprehensive month-by-month checklist for Vidarbha growers covering water stress, pest vigilance, fertilization, and harvest.",
        "summary_hi": "विदर्भ के किसानों के लिए माह-वार संतरा बाग प्रबंधन, सिंचाई, खाद और कीट नियंत्रण की विस्तृत चेकलिस्ट।",
        "summary_mr": "विदर्भातील संत्रा उत्पादकांसाठी महिनानिहाय पाण्याचा ताण, खते, फवारण्या आणि काढणीचे परिपूर्ण वेळापत्रक.",
        "content_en": "Comprehensive 12-month guide for Ambia (Jan flowering, Oct harvest) and Mrig (June flowering, Feb harvest). Covers water-stress (tan) management, Bordeaux whitewashing, fruit sizing drip, and harvest.",
        "content_hi": "अंबिया और मृग बहार के लिए 12 महीने का प्रबंधन: पानी का तनाव, बोर्डो पेस्ट लेप, पोषण और सही समय पर तुड़ाई।",
        "content_mr": "अंबिया व मृग बहारासाठी १२ महिन्यांचे नियोजन: पाण्याचा ताण, खोडाला बोर्डो पेस्ट, खते आणि काढणी व्यवस्थापन.",
        "symptoms": ["Seasonal water stress mismanagement", "Fruit drop on sudden flooding"],
        "prevention": ["Follow ICAR-CCRI weather-linked advisory", "Ensure surface drainage"],
        "management": ["Adhere to monthly agro-input checklist"],
        "source_attribution": "ICAR-CCRI Package of Practices for Nagpur Mandarin",
        "verified_date": "2026-03-20"
    },
    {
        "slug": "ambia-vs-mrig-bahar-guide",
        "category": "Seasonal Care Calendar",
        "title_en": "Selecting Between Ambia Bahar and Mrig Bahar in Vidarbha",
        "title_hi": "अंबिया बहार बनाम मृग बहार: सही बहार का चयन कैसे करें",
        "title_mr": "अंबिया बहार की मृग बहार? विदर्भातील योग्य बहार निवड मार्गदर्शक",
        "summary_en": "Strategic decision guide based on irrigation security, summer water table, pest pressures, and seasonal market price realization.",
        "summary_hi": "पानी की उपलब्धता, गर्मी के मौसम में कुएं के जलस्तर और बाजार भाव के आधार पर सही बहार का चुनाव।",
        "summary_mr": "पाण्याची उपलब्धता, उन्हाळ्यातील विहिरीची पातळी आणि बाजारभावाच्या आधारावर योग्य बहाराची निवड.",
        "content_en": "Commercial growers must choose only ONE main bahar per year. Ambia gives highest fruit yield and quality with Diwali market demand, but requires guaranteed water through scorching summer (March-May). Mrig flowers naturally on monsoon rains, ideal for limited summer water.",
        "content_hi": "साल में एक ही मुख्य बहार लें। यदि गर्मी में भरपूर पानी है तो अंबिया बहार लें। यदि गर्मी में पानी कम है तो मृग बहार लें।",
        "content_mr": "झाडाचे आयुष्य टिकवण्यासाठी वर्षातून एकच बहर धरावा. मुबलक पाणी असल्यास अंबिया आणि उन्हाळ्यात पाण्याची टंचाई असल्यास मृग बहार धरावा.",
        "symptoms": ["Dual cropping exhausting tree reserves", "Catastrophic summer fruit drop on water deficit"],
        "prevention": ["Never take both Ambia and Mrig on same tree in one year"],
        "management": ["Thin excess fruitlets if tree vigor is low"],
        "source_attribution": "Dr. PDKV Akola & ICAR-CCRI Economics & Extension",
        "verified_date": "2026-02-28"
    },
    {
        "slug": "post-harvest-grading-marketing",
        "category": "Seasonal Care Calendar",
        "title_en": "Harvesting, Desapping, Washing & Waxing for Market",
        "title_hi": "तुड़ाई, ग्रेडिंग, धुलाई, वैक्सिंग और बाजार प्रबंधन",
        "title_mr": "संत्रा काढणी, प्रतवारी, धुलाई, वॅक्सिंग व बाजारपेठ व्यवस्थापन",
        "summary_en": "Clipper harvesting protocol, ethylene degreening, sorting by size and blemish score, food-grade waxing, and cold storage parameters.",
        "summary_hi": "क्लिपर से वैज्ञानिक तुड़ाई, एथिलीन से रंग निखारना, ग्रेडिंग, वैक्सिंग और कोल्ड स्टोरेज के नियम।",
        "summary_mr": "कटरने काढणी, नैसर्गिक रंग आणणे, आकारानुसार प्रतवारी, फूड-ग्रेड वॅक्सिंग आणि शीतगृह साठवणूक.",
        "content_en": "Harvest using curved-tip clippers leaving 2mm button. NEVER pull fruits by hand as tearing rind triggers Penicillium molds. Wash in chlorinated water, coat with food-grade carnauba wax to prevent moisture loss, and store at 5-7C and 85-90% RH for 45-60 days.",
        "content_hi": "हाथ से कभी न तोड़ें; विशेष कैंची से 2 मिमी डंठल छोड़कर काटें। साफ पानी में धोकर फूड-ग्रेड वैक्स लगाएं। 5-7 डिग्री सेल्सियस पर स्टोर करें।",
        "content_mr": "हात ओढून संत्रा तोडू नये, कटरने २ मिमी देठ ठेवून कापावा. स्वच्छ धुवून फूड-ग्रेड वॅक्सिंग करावे. ५ ते ७ अंश तापमानात साठवावे.",
        "symptoms": ["Stem-end rot from pulling tears", "Green and blue transit mold"],
        "prevention": ["Clipper harvest only into padded crates", "Never harvest wet morning fruit"],
        "management": ["Dip in Imazalil 500 ppm before cold chain dispatch"],
        "source_attribution": "ICAR-CCRI Post-Harvest Engineering Division",
        "verified_date": "2026-03-18"
    }
]

def seed_database():
    db = SessionLocal()
    try:
        # Check existing slugs
        existing_slugs = {a.slug for a in db.query(models.OrangeBookArticle).all()}
        added_count = 0
        updated_count = 0

        for art_data in ARTICLES_DATA:
            slug = art_data["slug"]
            if slug in existing_slugs:
                # Update
                art = db.query(models.OrangeBookArticle).filter(models.OrangeBookArticle.slug == slug).first()
                for k, v in art_data.items():
                    setattr(art, k, v)
                updated_count += 1
            else:
                art = models.OrangeBookArticle(**art_data)
                db.add(art)
                added_count += 1

        db.commit()
        print(f"Seeded successfully: {added_count} added, {updated_count} updated. Total articles now: {db.query(models.OrangeBookArticle).count()}")
    except Exception as e:
        db.rollback()
        print(f"Error seeding: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
