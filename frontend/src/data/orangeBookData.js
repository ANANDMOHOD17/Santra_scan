// Comprehensive, ICAR-CCRI & Dr. PDKV Akola aligned Nagpur Mandarin Knowledge Base
// Trilingual support: English, Marathi, Hindi

export const TREE_ANATOMY_PARTS = [
  {
    id: "foliage",
    name_en: "Foliage & Leaf Canopy",
    name_hi: "पत्तियां व पर्णसमूह",
    name_mr: "पाने व पर्णसंभार",
    role: "Primary engine of photosynthesis and transpiration. Foliar tissues are primary indicators of micronutrient status (interveinal zinc chlorosis, iron deficiency) and fungal/bacterial pathogens.",
    key_diseases: ["Citrus Greening (HLB)", "Bacterial Canker", "Zinc/Iron Chlorosis", "Citrus Leaf Miner"],
    article_slug: "canopy-foliage-branching",
    cx: 50,
    cy: 22,
    radius: 18
  },
  {
    id: "fruits",
    name_en: "Fruit Clusters (Ambia & Mrig)",
    name_hi: "फल गुच्छ (अंबिया एवं मृग)",
    name_mr: "फळांचे घड (अंबिया व मृग बहार)",
    role: "The commercial yield of Nagpur Mandarin. Nagpur oranges are characterized by easy-peeling loose rind, 10-12 segments, rich sweetness, and balanced acidity (TSS 10-12° Brix).",
    key_diseases: ["Premature Fruit Drop", "Citrus Thrips Ring Scarring", "Fruit Sucking Moth", "Fruit Fly"],
    article_slug: "orange-fruit-development",
    cx: 72,
    cy: 38,
    radius: 14
  },
  {
    id: "branches",
    name_en: "Scaffold Branches & Scion Framework",
    name_hi: "मुख्य शाखाएं एवं सायन ढांचा",
    name_mr: "मुख्य फांद्या व सायन रचना",
    role: "Structural support of the canopy. Requires 45° to 60° branch crotch angles to bear 40-60 kg fruit load per mature tree without tearing the wood.",
    key_diseases: ["Twig Dieback (Colletotrichum)", "Bark Borer", "Anthracnose", "Water Sprout Proliferation"],
    article_slug: "pruning-training-canopy-hygiene",
    cx: 34,
    cy: 42,
    radius: 14
  },
  {
    id: "trunk",
    name_en: "Main Trunk (Vascular Conduction)",
    name_hi: "मुख्य तना (संवहनी ऊतक)",
    name_mr: "मुख्य खोड (जल व अन्न वहन)",
    role: "Transports water and mineral nutrients upward via xylem and photosynthates downward via phloem. Trunk bark must be protected against direct sun scalding and Phytophthora gummosis.",
    key_diseases: ["Phytophthora Gummosis (Foot Rot)", "Bark Eating Caterpillar", "Sun Scald"],
    article_slug: "damping-off-phytophthora-nursery",
    cx: 50,
    cy: 64,
    radius: 12
  },
  {
    id: "graft_union",
    name_en: "Graft Union (Bud Union Point)",
    name_hi: "कलमी जोड़ (बड यूनियन)",
    name_mr: "कलमी सांधा (बडिंग पॉईंट)",
    role: "The vital surgical junction between the Nagpur Mandarin scion and the hardy rootstock (Rangpur Lime or Jambhiri). Must sit cleanly 15-20 cm above the soil collar line.",
    key_diseases: ["Delayed Incompatibility", "Bark Constriction", "Soil Splash Infection"],
    article_slug: "anatomy-graft-union",
    cx: 50,
    cy: 76,
    radius: 12
  },
  {
    id: "roots",
    name_en: "Root Collar & Rootstock Anchor",
    name_hi: "जड़ कॉलर व रूटस्टॉक बेस",
    name_mr: "मुळांचा कॉलर भाग व रूटस्टॉक",
    role: "Rangpur Lime (Citrus limonia) rootstock confers high Phytophthora tolerance and salt resistance in Vidarbha's deep black clay soils, while Rough Lemon (Jambhiri) provides vigorous early anchorage.",
    key_diseases: ["Phytophthora Collar Rot", "Citrus Nematodes", "Root Asphyxiation (Waterlogging)"],
    article_slug: "citrus-rootstock-scion-mechanics",
    cx: 50,
    cy: 88,
    radius: 16
  }
];

export const SEASONAL_CALENDAR_DATA = [
  {
    month: "January",
    month_mr: "जानेवारी",
    bahar: "Ambia Bahar",
    action_en: "Break water stress (tan) for Ambia crop. Provide first light irrigation followed by nitrogen-phosphorus fertigation. Paint trunk with Bordeaux paste up to 2 feet.",
    action_hi: "अंबिया बहार के लिए पानी का तनाव तोड़ें। हल्की सिंचाई करें और नाइट्रोजन-फास्फोरस खाद दें। तने पर बोर्डो पेस्ट लगाएं।",
    action_mr: "अंबिया बहारासाठी पाण्याचा ताण तोडणे. पहिली हलकी ओल देऊन नत्र व स्फुरदयुक्त खते द्यावीत. खोडाला २ फुटांपर्यंत बोर्डो पेस्ट लावावी.",
    disease_alert: "Monitor for Asian Citrus Psyllid & leaf miner on tender emerging vegetative flush."
  },
  {
    month: "February",
    month_mr: "फेब्रुवारी",
    bahar: "Ambia Bahar",
    action_en: "Peak blooming and honeybee activity. STRICTLY avoid chemical insecticide sprays during anthesis to protect natural pollinators.",
    action_hi: "फूलों का खिलना। मधुमक्खी परागण के दौरान कीटनाशकों का छिड़काव बिल्कुल न करें।",
    action_mr: "संत्रा झाडांवर पूर्ण बहर. मधमाशांच्या परागीभवनासाठी या काळात रासायनिक कीटकनाशक फवारणी पूर्णपणे टाळावी.",
    disease_alert: "Watch for powdery mildew if night temperatures fluctuate with morning dew."
  },
  {
    month: "March",
    month_mr: "मार्च",
    bahar: "Ambia Bahar",
    action_en: "Pea-sized fruitlet set stage. Spray potassium nitrate (13-0-45 @ 10g/L) and micronutrient cocktail (Zn 0.5% + Fe 0.2% + Lime 0.25%) to minimize early fruit drop.",
    action_hi: "मटर के आकार की फलोत्पत्ति। पोटेशियम नाइट्रेट और सूक्ष्म पोषक तत्वों का छिड़काव करें।",
    action_mr: "वाटाण्याच्या आकाराची फळधारणा. फळगळ रोखण्यासाठी पोटॅशियम नायट्रेट व सूक्ष्मअन्नद्रव्यांची फवारणी करावी.",
    disease_alert: "Citrus thrips feeding on tender fruit buttons causing ring scar blemish."
  },
  {
    month: "April - May",
    month_mr: "एप्रिल - मे",
    bahar: "Mrig Bahar Preparation",
    action_en: "Withhold irrigation for 40-45 days to impose water stress (tan) on orchards intended for Mrig Bahar. Apply Kaolin clay (5%) to prevent southwest canopy sunburn.",
    action_hi: "मृग बहार के लिए 40-45 दिनों तक सिंचाई बंद रखें। सनबर्न से बचाव के लिए काओलिन क्ले का छिड़काव करें।",
    action_mr: "मृग बहाराच्या बागांना ४०-४५ दिवस पाण्याचा कडक ताण द्यावा. तीव्र उन्हापासून संरक्षणासाठी केओलिन ५% ची फवारणी करावी.",
    disease_alert: "High temperature stress and bark borer activity in dry wood."
  },
  {
    month: "June",
    month_mr: "जून",
    bahar: "Mrig Bahar & Monsoon Flush",
    action_en: "Onset of monsoon breaks Mrig stress naturally. Vigorous new flowering starts. Ensure trenches around tree basins are clear of standing water.",
    action_hi: "मानसून की पहली बारिश से तनाव समाप्त। नए फूलों का आगमन। जल निकासी नालियां साफ रखें।",
    action_mr: "मान्सूनच्या पावसाने ताण तुटून मृग बहार फुटतो. झाडांभोवती पाणी साचू न देता पाण्याचा निचरा योग्य ठेवा.",
    disease_alert: "CRITICAL: Phytophthora collar rot and damping-off threat in waterlogged soils."
  },
  {
    month: "July - August",
    month_mr: "जुलै - ऑगस्ट",
    bahar: "Monsoon Management",
    action_en: "Apply balanced NPK fertilizer (400g N, 200g P2O5, 200g K2O per mature tree) around drip-line. Spray 1% Bordeaux mixture on leaves to protect against fungal infections.",
    action_hi: "खत का संतुलित प्रयोग करें। फफूंद जनित रोगों से सुरक्षा हेतु 1% बोर्डो मिश्रण का छिड़काव करें।",
    action_mr: "झाडाच्या परिघावर शिफारशीत खतांची मात्रा द्यावी. बुरशीजन्य रोग प्रतिबंधासाठी १% बोर्डो मिश्रणाची फवारणी करावी.",
    disease_alert: "Citrus canker lesions spreading on young leaves due to rain splash and leaf miner injuries."
  },
  {
    month: "September - October",
    month_mr: "सप्टेंबर - ऑक्टोबर",
    bahar: "Ambia Harvest & Mrig Sizing",
    action_en: "Ambia fruits turn brilliant golden orange (harvesting begins). Maintain steady drip irrigation for developing Mrig crop to prevent fruit splitting.",
    action_hi: "अंबिया संतरा पकने की अवस्था। तुड़ाई की तैयारी। मृग फलों के लिए नियमित ड्रिप सिंचाई।",
    action_mr: "अंबिया संत्रा पक्व होऊन केशरी-पिवळा रंग धारण करतो (काढणी सुरू). मृग फळे तडकणे रोखण्यासाठी नियमित पाणी द्यावे.",
    disease_alert: "Fruit Sucking Moth attacks ripening Ambia fruits at dusk. Install light traps."
  },
  {
    month: "November - December",
    month_mr: "नोव्हेंबर - डिसेंबर",
    bahar: "Post-Harvest Sanitation",
    action_en: "Sanitize orchard post-harvest. Prune all dead twigs, water sprouts, and criss-cross branches. Disinfect pruning shears with 70% alcohol and seal cuts with Bordeaux paste.",
    action_hi: "फलों की तुड़ाई के बाद छंटाई (प्रूनिंग)। सूखी शाखाओं को हटाएं और बोर्डो पेस्ट लगाएं।",
    action_mr: "अंबिया काढणीनंतर बागेची स्वच्छता. वाळलेल्या फांद्या व वॉटर स्प्राऊट्स छाटावेत. कापलेल्या भागावर बोर्डो पेस्ट लावावी.",
    disease_alert: "Twig dieback fungus progressing down into main scaffold branches."
  }
];

export const DEFAULT_DISEASES = [
  {
    id: 1,
    code: "PHY-GUMM",
    category: "disease",
    name_en: "Phytophthora Gummosis & Foot Rot",
    name_hi: "फाइटोफ्थोरा गमोसिस (डिंक्या रोग)",
    name_mr: "डिंक्या रोग (फायटोफ्थोरा खोडकूज)",
    severity_level: "high",
    scientific_name: "Phytophthora nicotianae / P. citrophthora",
    description_en: "A devastating soil-borne fungal disease in Vidarbha Vertisols causing dark amber gum oozing from tree trunks, longitudinal bark cracking, and progressive canopy decline.",
    description_hi: "तने से अंबर रंग का गोंद निकलना, छाल का फटना और धीरे-धीरे पूरे पेड़ का सूखना।",
    description_mr: "काळ्या जमिनीत पाण्याचा निचरा न झाल्यास खोडातून तपकिरी डिंक वाहतो, साल उभी तडकते आणि झाड वाळते.",
    key_symptoms: ["Amber gum exudation on lower trunk", "Dark brown cambium staining", "Sudden leaf yellowing and leaf drop"],
    immediate_actions: [
      "Scrape diseased necrotic bark with a sharp sanitized knife until healthy green wood is exposed.",
      "Immediately apply freshly prepared 10% Bordeaux paste (1 kg Copper Sulphate + 1 kg Quicklime + 10 L water).",
      "Convert flood basins to double-ring system to prevent water touching the trunk directly."
    ],
    prevention_measures: [
      "Budding height must strictly be 15 to 20 cm above soil level.",
      "Use resistant Rangpur lime rootstocks.",
      "Paint tree trunks twice annually (pre-monsoon and post-monsoon) with Bordeaux paste."
    ],
    treatment_details: {
      "fungicide": "Fosetyl-Al (Aliette) @ 2.5 g/L foliar spray or Metalaxyl-M drenching",
      "cultural": "Double-ring drip irrigation system"
    },
    verified_source: "ICAR-Central Citrus Research Institute (CCRI), Nagpur"
  },
  {
    id: 2,
    code: "HLB-GREEN",
    category: "disease",
    name_en: "Citrus Greening (Huanglongbing - HLB)",
    name_hi: "सिट्रस ग्रीनिंग (एचएलबी रोग)",
    name_mr: "सिट्रस ग्रीनिंग (HLB - पिवळा रोग)",
    severity_level: "quarantine",
    scientific_name: "Candidatus Liberibacter asiaticus",
    description_en: "A destructive, incurable phloem-limited bacterium vectored by the Asian Citrus Psyllid. Causes characteristic blotchy mottle leaf patterns, vein corking, and bitter, deformed fruit.",
    description_hi: "एशियन सिट्रस साइला द्वारा फैलने वाला अति-घातक लाइलाज जीवाणु रोग। पत्तियों पर असममित पीलापन दिखाई देता है।",
    description_mr: "सिट्रस सायला किडीद्वारे पसरणारा अत्यंत घातक जिवाणू रोग. पानांवर असममित पिवळे चट्टे पडतात व झाडाचा ऱ्हास होतो.",
    key_symptoms: ["Asymmetric blotchy mottle crossing leaf veins", "Thickened, corky leaf veins", "Small, lopsided fruit with aborted dark seeds", "Canopy dieback unaffected by fertilizers"],
    immediate_actions: [
      "Immediately quarantine sapling or tree; do not transport or propagate from this material.",
      "Notify ICAR-CCRI pathology division and submit leaf samples for PCR indexing.",
      "Eradicate confirmed infected trees to safeguard surrounding orchards."
    ],
    prevention_measures: [
      "Erect 40-mesh insect-proof screenhouses over nursery mother blocks.",
      "Install yellow sticky traps (15 traps/acre) to suppress Citrus Psyllid vectors.",
      "Procure only CCRI-certified disease-free budwood."
    ],
    treatment_details: {
      "quarantine": "Strict phytosanitary isolation; no chemical cure exists once inside xylem/phloem."
    },
    verified_source: "National Citrus Quarantine Network & ICAR-CCRI"
  },
  {
    id: 3,
    code: "BAC-CANK",
    category: "disease",
    name_en: "Citrus Bacterial Canker",
    name_hi: "सिट्रस कैंकर (जीवाणु रोग)",
    name_mr: "सिट्रस कॅन्कर (जिवाणू खैऱ्या रोग)",
    severity_level: "high",
    scientific_name: "Xanthomonas axonopodis pv. citri",
    description_en: "Bacterial pathogen causing raised, rough, corky crater-like pustules surrounded by oily or chlorotic yellow halos on leaves, twigs, and maturing fruits.",
    description_hi: "पत्तियों, टहनियों और फलों पर उभरे हुए खुरदुरे धब्बे जिनके चारों ओर पीला छल्ला होता है।",
    description_mr: "पाने, फांद्या व फळांवर खडबडीत खपल्यासारखे चट्टे पडतात ज्याभोवती पिवळे कडे असते. फळांची प्रत खराब होते.",
    key_symptoms: ["Raised corky lesions on upper & lower leaf surfaces", "Distinct yellow chlorotic halo around lesions", "Premature fruit drop during monsoon"],
    immediate_actions: [
      "Prune and burn heavily infected twigs before the onset of monsoon rains.",
      "Apply foliar spray of Copper Oxychloride (2.5 g/L) + Streptocycline (100 ppm / 1 g per 10 L water)."
    ],
    prevention_measures: [
      "Control citrus leaf miner aggressively, as larval feeding mines act as primary entry wounds for bacteria.",
      "Plant Casuarina or Sesbania windbreaks on orchard borders to stop wind-blown rain spread."
    ],
    treatment_details: {
      "bactericide": "Streptomycin sulphate 90% + Tetracycline 10% (100 ppm) + COC 50WP (2.5 g/L)"
    },
    verified_source: "Dr. PDKV Akola Citrus Research Station"
  },
  {
    id: 4,
    code: "PEST-PSYLLA",
    category: "pests",
    name_en: "Asian Citrus Psyllid (Diaphorina citri)",
    name_hi: "एशियन सिट्रस साइला (कीट)",
    name_mr: "सिट्रस सायला (रसशोषक कीड)",
    severity_level: "high",
    scientific_name: "Diaphorina citri Kuwayama",
    description_en: "A small sap-sucking hemipteran insect that is the primary natural vector transmitting the deadly Citrus Greening (HLB) pathogen across Central India orchards.",
    description_hi: "संतरा के नए पत्तों का रस चूसने वाला छोटा कीट, जो सिट्रस ग्रीनिंग रोग का मुख्य संवाहक है।",
    description_mr: "संत्र्याच्या कोवळ्या पालवीतील रस शोषून घेणारी अत्यंत लहान कीड जी ग्रीनिंग रोगाचा मुख्य प्रसार करते.",
    key_symptoms: ["Nymphs congregating on tender shoots with white waxy honeydew curls", "Adults feeding at a 45-degree angle to stem surface", "Curled and twisted tender foliage"],
    immediate_actions: [
      "Spray Imidacloprid 17.8% SL @ 0.5 mL/L or Thiamethoxam 25% WG @ 0.3 g/L at the initiation of new flush.",
      "Release natural predators like Ladybird beetles (Cheilomenes sexmaculata)."
    ],
    prevention_measures: [
      "Hang bright yellow sticky traps at canopy height (10-15 per acre).",
      "Regularly scout flushes in January (Ambia) and June (Mrig)."
    ],
    treatment_details: {
      "chemical": "Imidacloprid 17.8 SL (0.5 mL/L) or Dimethoate 30 EC (1.5 mL/L)"
    },
    verified_source: "ICAR-CCRI Entomology Division"
  },
  {
    id: 5,
    code: "PEST-MINER",
    category: "pests",
    name_en: "Citrus Leaf Miner",
    name_hi: "सिट्रस लीफ माइनर (चित्रकिडा)",
    name_mr: "संत्रा लीफ मायनर (नागअळी)",
    severity_level: "medium",
    scientific_name: "Phyllocnistis citrella Stainton",
    description_en: "Larvae mine serpentine silvery galleries under the epidermal layer of tender young leaves, causing leaves to curl, distort, and predispose to bacterial canker.",
    description_hi: "सुंडी नई कोमल पत्तियों के भीतर सर्पाकार चांदी जैसी सुरंगें बनाती है, जिससे पत्तियां मुड़ जाती हैं।",
    description_mr: "अळी कोवळ्या पानाच्या पापुद्र्याखाली वळणदार चंदेरी रंगाचे भुयार तयार करते. पाने आकसतात व कॅन्करचा प्रादुर्भाव वाढतो.",
    key_symptoms: ["Silvery glistening zigzag mines on leaves", "Distorted, curled and crinkled leaf blades", "Severe stunting of young nursery saplings"],
    immediate_actions: [
      "Spray 5% Neem Seed Kernel Extract (NSKE) or Azadirachtin 10,000 ppm @ 1 mL/L upon flush emergence.",
      "For severe infestation: Foliar spray of Spinosad 45% SC @ 0.3 mL/L or Abamectin 1.9% EC @ 0.5 mL/L."
    ],
    prevention_measures: [
      "Synchronize flushes through systematic pruning.",
      "Avoid staggered flushes by managing nitrogen fertilizer timing."
    ],
    treatment_details: {
      "organic": "NSKE 5% or Neem Oil 10,000 ppm",
      "chemical": "Spinosad 45 SC (0.3 mL/L)"
    },
    verified_source: "ICAR-CCRI Integrated Pest Management Guide"
  },
  {
    id: 6,
    code: "PEST-MOTH",
    category: "pests",
    name_en: "Fruit Sucking Moth (Eudocima materna)",
    name_hi: "फल चूसक पतंगा",
    name_mr: "फळे शोषणारा पतंग (रसशोषक पतंग)",
    severity_level: "high",
    scientific_name: "Eudocima materna / E. fullonia",
    description_en: "Stout nocturnal adult moths with a strong proboscis capable of drilling pinholes into mature ripening orange fruits at dusk, causing secondary rotting and severe drop.",
    description_hi: "रात में उड़ने वाला पतंगा जो पकते हुए फलों में छेद करके रस चूसता है, जिससे फल सड़कर गिर जाते हैं।",
    description_mr: "संध्याकाळनंतर येणारा निशाचर पतंग जो टोकदार सोंडेने पक्व संत्र्याला छिद्र पाडतो, ज्यामुळे फळ कूज होऊन गळते.",
    key_symptoms: ["Pinhole punctures on ripening fruits weeping sap", "Premature fruit drop under trees at harvest", "Soft rot around puncture wounds"],
    immediate_actions: [
      "Set up incandescent light traps (100W bulbs over kerosene-water pans) on orchard boundaries from 7 PM to 10 PM.",
      "Smoke orchards at dusk using dried leaves and neem cakes to deter flying moths."
    ],
    prevention_measures: [
      "Eradicate larval host weed plants (Tinospora cordifolia / Gulwel and Cocculus hirsutus) within a 2 km radius.",
      "Cover high-value fruit clusters with insect-proof nylon bagging."
    ],
    treatment_details: {
      "bait": "Poison bait: 200g jaggery + 10mL Malathion 50EC in 2L water hung in wide-mouthed bottles"
    },
    verified_source: "ICAR-CCRI & PDKV Orchard Advisory"
  },
  {
    id: 7,
    code: "NUT-ZN",
    category: "nutrient_deficiencies",
    name_en: "Zinc Deficiency (Mottle Leaf)",
    name_hi: "जिंक की कमी (मोटल लीफ)",
    name_mr: "जस्त (झिंक) कमतरता (पाने पिवळी पडणे)",
    severity_level: "medium",
    scientific_name: "Zinc Micronutrient Depletion",
    description_en: "Very common in Vidarbha's calcareous black cotton soils where high pH (>7.8) and free calcium fix zinc, leading to sharp interveinal yellowing with stark green veins.",
    description_hi: "विदर्भ की चूनेदार मिट्टी में जिंक की अनुपलब्धता से नई पत्तियों की नसें हरी और बाकी भाग पीला हो जाता है।",
    description_mr: "चुनखडीयुक्त काळ्या जमिनीत सामू जास्त असल्याने जस्त शोषले जात नाही. नवीन पानांच्या शिरांमधील भाग पिवळा पडतो.",
    key_symptoms: ["Interveinal chlorosis with dark green network of veins", "Small, narrow and pointed terminal leaves (little leaf)", "Shortened internodes and bushy branch tops"],
    immediate_actions: [
      "Foliar spray of Zinc Sulphate (ZnSO4 21%) @ 5 g/L neutralized with Slaked Lime @ 2.5 g/L in clean water.",
      "Spray during active vegetative flush when new leaves are 2/3rd expanded."
    ],
    prevention_measures: [
      "Incorporate 10-15 tonnes/ha of well-decomposed FYM enriched with zinc solubilizing bacteria (ZSB).",
      "Avoid excess phosphorus application which exacerbates zinc fixation."
    ],
    treatment_details: {
      "foliar": "0.5% Zinc Sulphate + 0.25% Lime spray twice at 15-day intervals"
    },
    verified_source: "ICAR-CCRI Nagpur Soil Health Advisory"
  },
  {
    id: 8,
    code: "NUT-FE",
    category: "nutrient_deficiencies",
    name_en: "Iron Chlorosis (Lime-Induced)",
    name_hi: "आयरन (लोहा) की कमी",
    name_mr: "लोह (आयर्न) कमतरता (पाने पांढरट पिवळी)",
    severity_level: "medium",
    scientific_name: "Iron Bioavailability Lockup",
    description_en: "Under high calcium carbonate conditions, iron is immobilized. Newly emerging leaves turn ivory-white or uniform pale yellow while mature leaves remain deep green.",
    description_hi: "अधिक चूने वाली मिट्टी में नए पत्ते पूरी तरह से हल्के पीले या सफेद हो जाते हैं।",
    description_mr: "मातीमध्ये चुनखडीचे प्रमाण जास्त असल्यास नवीन फुटलेली पाने पूर्णपणे पांढरट-पिवळी पडतात.",
    key_symptoms: ["Youngest terminal leaves turn uniformly pale creamy yellow or ivory white", "Scorched leaf margins under bright sunlight", "Canopy growth stagnation"],
    immediate_actions: [
      "Apply chelated Iron (Fe-EDDHA 6%) @ 25-50 g per mature tree as soil application around the drip-line.",
      "Alternatively, foliar spray Ferrous Sulphate (FeSO4) @ 3 g/L + Citric acid @ 1 g/L."
    ],
    prevention_measures: [
      "Avoid waterlogging which increases bicarbonate ions and blocks iron absorption.",
      "Apply sulfur-enriched organic compost to lower rhizosphere pH."
    ],
    treatment_details: {
      "chelate": "Fe-EDDHA (soil drench) or Ferrous Sulphate 0.3% + Citric Acid 0.1% (foliar spray)"
    },
    verified_source: "Dr. PDKV Akola Micronutrient Package"
  }
];

export const ALL_ARTICLES = [
  // ANATOMY (4 articles)
  {
    id: 1,
    slug: "anatomy-graft-union",
    category: "Anatomy",
    title_en: "Graft Union & Bud Alignment Quality Standards",
    title_hi: "कलमी जोड़ और बड संरेखण गुणवत्ता मानक",
    title_mr: "कलमी सांधा व डोळा जोडणी गुणवत्ता निकष",
    summary_en: "How to evaluate bud union integrity between Nagpur Mandarin scion and Rangpur Lime / Jambhiri rootstock to ensure orchard longevity.",
    summary_hi: "नागपुर संतरा सायन और रंगपुर लाइम/जंभिरी रूटस्टॉक के बीच कलमी जोड़ की अखंडता और मजबूती की जांच कैसे करें।",
    summary_mr: "नागपूर संत्रा सायन आणि रंगपूर लाइम / जंभिरी रूटस्टॉक यांच्यातील कलमी सांध्याची गुणवत्ता व दीर्घायुष्य तपासणी मार्गदर्शक.",
    content_en: `In commercial citrus nurseries, the graft union (bud union) is the most critical anatomical checkpoint. 

Quality Standards established by ICAR-CCRI:
1. Graft Height: The bud must be inserted strictly 15 to 20 cm above the root collar line. Buds placed below 15 cm are susceptible to soil-borne Phytophthora splash, which destroys the trunk. Buds placed above 25 cm induce dwarfing and weak vigor.
2. Union Symmetry: The callus bridge between scion and rootstock must be completely healed without longitudinal fissures, acute zig-zag kinks, or overgrowth swellings.
3. Angle of Scion: The Nagpur Mandarin scion shoot must emerge erect with no more than a 15-degree departure from the rootstock vertical axis.
4. Vascular Connectivity: A slight, smooth swelling is normal as cambium connects, but spongy bulging or oozing amber gum indicates delayed incompatibility. Such saplings must be culled before planting.`,
    content_hi: `व्यावसायिक संतरा नर्सरी में कलमी जोड़ (बड यूनियन) सबसे महत्वपूर्ण शारीरिक जांच बिंदु है।

भाकृअनुप-सीसीआरआई द्वारा निर्धारित गुणवत्ता मानक:
1. कलमी की ऊंचाई: बडिंग बिंदु जमीन की सतह से ठीक 15 से 20 सेमी ऊपर होना चाहिए। 15 सेमी से कम ऊंचाई पर जमीन से फाइटोफ्थोरा कवक के छींटे पड़ने का खतरा रहता है।
2. जोड़ की एकरूपता: सायन और रूटस्टॉक के बीच का जोड़ पूरी तरह से भरा हुआ और चिकना होना चाहिए। इसमें कोई दरार या असामान्य सूजन नहीं होनी चाहिए।
3. सायन का कोण: मुख्य शाखा बिल्कुल सीधी (अधिकतम 15 डिग्री विचलन) होनी चाहिए।
4. संवहनी जुड़ाव: जाइलम और फ्लोएम का जुड़ाव मजबूत होना चाहिए। कमजोर जोड़ वाले पौधे बड़े होकर फलों का भार नहीं संभाल पाते।`,
    content_mr: `संत्रा रोपवाटिकेमध्ये कलमी सांधा (बडिंग पाँईंट) हा रोपाचा सर्वात नाजूक आणि महत्त्वाचा अवयव आहे.

केंद्रीय लिंबूवर्गीय संशोधन संस्था (ICAR-CCRI) चे निकष:
१. कलमाची उंची: डोळा भरण्याची जागा जमिनीच्या पृष्ठभागापासून किमान १५ ते २० सेमी उंचीवर असावी. १५ सेमीपेक्षा कमी उंची असल्यास पावसाळ्यात मातीतील बुरशीचे पाणी उडून डिंक्या रोगाचा धोका वाढतो.
२. सांध्याची मजबुती: सांधा पूर्णपणे भरलेला, गुळगुळीत आणि सरळ असावा. सांध्यामध्ये वाक, भेगा किंवा अतिसूज नसावी.
३. वाढीचा कोन: सायनची मुख्य फांदी सरळ वर वाढलेली असावी (जास्तीत जास्त १५ अंश कोन).
४. अन्नवहनाची क्षमता: रूटस्टॉक आणि सायनमधील अन्न व पाण्याचे वहन सुरळीत होण्यासाठी निरोगी कलमांचीच निवड करावी.`,
    symptoms: ["Graft swelling beyond 1.5x stem caliper", "Longitudinal bark fissures at union", "Acute elbow kink > 25 degrees", "Gum exudation at join"],
    prevention: [
      "Use certified virus-tested Rangpur Lime rootstock",
      "Employ inverted T-budding or shield budding by skilled grafters",
      "Sanitize budding knives in 70% ethyl alcohol between batches",
      "Ensure polybag soil stays below the root collar"
    ],
    management: [
      "Strictly reject saplings with uneven bud union",
      "Stake saplings with bamboo supports during nursery transport",
      "Keep saplings under 50% shade net for 4 weeks post-budding"
    ],
    source_attribution: "ICAR - Central Citrus Research Institute (CCRI), Nagpur",
    verified_date: "2026-03-15"
  },
  {
    id: 2,
    slug: "citrus-rootstock-scion-mechanics",
    category: "Anatomy",
    title_en: "Nagpur Mandarin Scion & Rootstock Compatibility Mechanics",
    title_hi: "नागपुर संतरा सायन और रूटस्टॉक अनुकूलता यांत्रिकी",
    title_mr: "नागपूर संत्रा सायन आणि रूटस्टॉक अनुकूलता व शरीरशास्त्र",
    summary_en: "Detailed comparison of Rangpur Lime vs Rough Lemon (Jambhiri) rootstocks for Vidarbha's deep black cotton soils.",
    summary_hi: "विदर्भ की भारी काली मिट्टी के लिए रंगपुर लाइम बनाम जंभिरी रूटस्टॉक का तुलनात्मक अध्ययन।",
    summary_mr: "विदर्भातील भारी काळ्या जमिनीसाठी रंगपूर लाइम विरुद्ध जंभिरी रूटस्टॉकचे वैशिष्ट्ये व निवड.",
    content_en: `The foundation of every productive Nagpur Mandarin orchard is the rootstock.

1. Rangpur Lime (Citrus limonia Osbeck):
The Gold Standard for Vidarbha. Imparts remarkable tolerance to Phytophthora foot rot, root rot, and moderate tolerance to soil salinity and drought. Trees on Rangpur Lime produce medium-to-large fruit with superior juice percentage (42-45%) and high TSS.

2. Rough Lemon / Jambhiri (Citrus jambhiri Lush.):
Characterized by vigorous taproot and rapid early growth. Highly susceptible to Phytophthora gummosis in poorly drained heavy Vertisols. Trees on Jambhiri tend to have coarse rind and slightly lower TSS. Recommended only for light, gravelly, well-drained soils.

3. Trifoliate Hybrids (Carrizo / Troyer Citrange):
Induce dwarfing suitable for high-density planting, but sensitive to high soil lime (calcium carbonate > 10%) causing severe chlorosis in Nagpur soils.`,
    content_hi: `प्रत्येक सफल संतरा बाग की नींव उसका रूटस्टॉक (मूलवृंत) होता है।

1. रंगपुर लाइम (रंगपुर नींबू):
विदर्भ के लिए सर्वोत्तम। यह फाइटोफ्थोरा रोग, जड़ गलन, और सूखे के प्रति अत्यधिक सहनशील है। इस पर फल का रस और मिठास (TSS) बेहतरीन होती है।

2. जंभिरी (रफ लेमन):
यह बहुत तेजी से बढ़ता है लेकिन भारी काली मिट्टी में फाइटोफ्थोरा रोग के प्रति बहुत संवेदनशील है। यह केवल अच्छी जल निकासी वाली हल्की मिट्टी के लिए उपयुक्त है।`,
    content_mr: `संत्रा बागेचे आयुष्य आणि उत्पादन हे प्रामुख्याने वापरलेल्या रूटस्टॉकवर अवलंबून असते.

१. रंगपूर लाइम (रंगपूर लिंबू):
विदर्भासाठी सर्वोत्कृष्ट रूटस्टॉक. काळ्या जमिनीत डिंक्या व मूळकूज रोगास अत्यंत प्रतिकारक्षम. फळांमध्ये रसाचे प्रमाण उत्तम (४२-४५%) आणि गोडी जास्त असते.

२. जंभिरी:
सुरुवातीला जोमदार वाढ होते, परंतु पाण्याचा निचरा न होणाऱ्या काळ्या जमिनीत यावर डिंक्या रोगाचा प्रादुर्भाव खूप जास्त होतो. हलक्या जमिनीसाठीच योग्य.`,
    symptoms: ["Collar rot under poor drainage", "Lime-induced chlorosis on sensitive rootstocks", "Delayed graft incompatibility"],
    prevention: [
      "Select Rangpur Lime for all heavy clay soils in Nagpur, Amravati, and Wardha",
      "Inspect nursery polybag to ensure straight taproot without J-root curling",
      "Verify mother tree source with CCRI budwood certification"
    ],
    management: [
      "Ensure soil drainage before planting",
      "Raise planting mound 15 cm above ground level"
    ],
    source_attribution: "ICAR-CCRI & Dr. PDKV Akola",
    verified_date: "2026-03-10"
  },
  {
    id: 3,
    slug: "canopy-foliage-branching",
    category: "Anatomy",
    title_en: "Canopy Architecture, Sun Exposure & Ambia Flowering",
    title_hi: "कैनोपी संरचना, सूर्य का प्रकाश और अंबिया फूल प्रबंधन",
    title_mr: "झाडाचा विस्तार (कॅनॉपी), सूर्यप्रकाश आणि अंबिया बहर व्यवस्थापन",
    summary_en: "How scaffold framework, leaf area index (LAI), and sunlight penetration drive fruit set and prevent internal canopy death.",
    summary_hi: "शाखाओं का सही कोण और पत्तियों तक धूप का पहुंचना भरपूर फलोत्पादन के लिए क्यों जरूरी है।",
    summary_mr: "झाडाचा योग्य आकार, सूर्यप्रकाशाचे योग्य वितरण आणि भरपूर अंबिया बहरासाठी फांद्यांचे व्यवस्थापन.",
    content_en: `Sunlight is the primary fuel for citrus flowering and sugar accumulation. An overgrown, dense umbrella canopy blocks sunlight from penetrating the interior, creating an unproductive dead center where fungal spores thrive.

Key Canopy Principles:
- Scaffold Selection: Retain 3 to 4 well-spaced primary scaffold branches originating between 45 cm and 75 cm above ground, spiraling around the trunk at 45° to 60° angles.
- Center Opening: Remove vertical water sprouts (vigorous thorny non-bearing shoots) emerging from the main scaffold. Maintain an open center / modified central leader architecture.
- Light Interception: At least 30% photosynthetically active radiation (PAR) must reach the interior canopy to stimulate flower bud differentiation for Ambia and Mrig crops.`,
    content_hi: `संतरे के फल में मिठास और फूलों के आने के लिए पेड़ के अंदरूनी हिस्से तक धूप पहुंचना अनिवार्य है।

कैनोपी के नियम:
- तने से 45 से 75 सेमी की ऊंचाई पर 3-4 मजबूत शाखाओं को चारों दिशाओं में फैलने दें।
- शाखाओं का कोण 45 से 60 डिग्री के बीच होना चाहिए।
- पेड़ के बीच से निकलने वाली गैर-उत्पादक 'वॉटर स्प्राउट' (सीधी बढ़ने वाली कांटेदार शाखाएं) को तुरंत काट दें।`,
    content_mr: `संत्र्याला भरपूर फुले लागण्यासाठी आणि फळांत गोडी निर्माण होण्यासाठी झाडाच्या आतील भागापर्यंत सूर्यप्रकाश पोहोचणे गरजेचे आहे.

कॅनॉपीचे महत्त्वाचे नियम:
- खोडापासून ४५ ते ७५ सेमी उंचीवर ३ ते ४ मुख्य उपफांद्या वेगवेगळ्या दिशेने वाढू द्याव्यात.
- फांद्यांचा कोन ४५ ते ६० अंश असावा जेणेकरून त्या फळांचे वजन पेलू शकतील.
- झाडाच्या मध्यभागातून सरळ वर वाढणारे कांटेदार वॉटर स्प्राऊट्स वेळोवेळी छाटावेत.`,
    symptoms: ["Internal twig drying and defoliation", "Dense umbrella shading", "Fruit setting restricted only to exterior periphery"],
    prevention: [
      "Prune immediately after Ambia harvest in December-January",
      "Remove all vertical water sprouts at pencil thickness",
      "Sterilize pruning tools with 10% sodium hypochlorite"
    ],
    management: [
      "Apply 1% Bordeaux mixture spray immediately after pruning",
      "Paint large cut wounds (>2cm diameter) with Bordeaux paste"
    ],
    source_attribution: "ICAR-CCRI Canopy Architecture Bulletin",
    verified_date: "2026-02-28"
  },
  {
    id: 4,
    slug: "orange-fruit-development",
    category: "Anatomy",
    title_en: "Citrus Fruit Anatomy & Maturity Indicators",
    title_hi: "संतरा फल की शारीरिक संरचना और परिपक्वता के संकेत",
    title_mr: "संत्रा फळाची अंतर्गत रचना व पक्वतेची अचूक लक्षणे",
    summary_en: "Anatomy of the hesperidium: flavedo, albedo, juice sacs, TSS:acid ratio, and harvesting indicators for Nagpur Mandarin.",
    summary_hi: "संतरा फल के भीतरी भाग, रस की थैलियां, मिठास अनुपात और तुड़ाई के वैज्ञानिक लक्षण।",
    summary_mr: "संत्रा फळाची साल, अंतर्गत रसाच्या पिशव्या, साखर-आम्ल प्रमाण आणि काढणीची वैज्ञानिक लक्षणे.",
    content_en: `The Nagpur Mandarin fruit is botanically a hesperidium — a specialized modified berry.

1. Flavedo (Exocarp):
The outer colored rind containing hundreds of essential oil glands (limonene). It changes from dark green to bright golden orange as night temperatures fall below 18°C in October-November (natural degreening).

2. Albedo (Mesocarp):
The white spongy spongy inner layer beneath the flavedo. In Nagpur mandarin, it is thin and loose, facilitating effortless peeling by hand.

3. Endocarp & Juice Vesicles:
Divided into 10 to 12 easily separable segments. Each segment contains thousands of spindle-shaped juice vesicles packed with sugars, ascorbic acid (Vitamin C), and citric acid.

4. Maturity Standards:
- Total Soluble Solids (TSS): Minimum 10° to 12° Brix.
- Acidity: 0.6% to 0.8%.
- TSS-to-Acid Ratio: Minimum 12:1 to 14:1.
- Juice Recovery: Greater than 40% of total fruit weight.`,
    content_hi: `नागपुर संतरा एक विशेष बेरी फल है।

1. छिलका (फ्लेवेडो): बाहरी नारंगी परत जिसमें सुगंधित तेल ग्रंथियां होती हैं। रात का तापमान 18 डिग्री से नीचे जाने पर इसका रंग हरा से गहरा नारंगी होता है।
2. भीतरी सफेद भाग (अल्बेडो): यह पतला और ढीला होता है, जिससे नागपुर संतरे को हाथ से आसानी से छीला जा सकता है।
3. रस के खंड: फल में 10 से 12 फांके होती हैं जिनमें रस भरा होता है।
4. परिपक्वता मानक: TSS (मिठास) 10-12 डिग्री ब्रिक्स और रस की मात्रा 40% से अधिक होनी चाहिए।`,
    content_mr: `नागपूर संत्र्याची फळ रचना अतिशय वैशिष्ट्यपूर्ण आहे.

१. बाह्य साल (फ्लेव्हेडो): रंगाची बाहेरील साल ज्यामध्ये तेलाच्या ग्रंथी असतात. ऑक्टोबर-नोव्हेंबरमध्ये रात्रीचे तापमान १८ अंशांपेक्षा खाली आल्यास साल पिवळी-सोनेरी होते.
२. आतील पांढरा थर (अल्बेडो): नागपूर संत्र्याची साल सैल (लूज स्किन) असल्याने ती हाताने सहज सोलली जाते.
३. रसाच्या फाका: फळामध्ये १० ते १२ सुट्या फाका असतात, ज्यांमध्ये रसाने भरलेल्या बारीक पिशव्या असतात.
४. पक्वतेचे निकष: एकूण विद्राव्य घटक (TSS) १० ते १२ ब्रिक्स, आणि रसाचे प्रमाण ४०% पेक्षा जास्त असावे.`,
    symptoms: ["Thick coarse rind from excess nitrogen", "Dry granulated juice vesicles from delayed harvest", "Sunken oil gland pitting"],
    prevention: [
      "Avoid late nitrogen application after fruit sizing",
      "Maintain consistent drip irrigation during September sizing stage"
    ],
    management: [
      "Harvest using sharp citrus clippers leaving 2mm button",
      "Never pull fruit by hand as it tears the rind (plugging)"
    ],
    source_attribution: "ICAR-CCRI Post-Harvest Technology Division",
    verified_date: "2026-03-01"
  },

  // CULTIVATION (5 articles)
  {
    id: 5,
    slug: "nagpur-mandarin-soil-climate",
    category: "Cultivation",
    title_en: "Ideal Soils & Agro-Climatic Parameters in Vidarbha",
    title_hi: "विदर्भ में आदर्श मिट्टी और कृषि-जलवायु परिस्थितियां",
    title_mr: "विदर्भातील संत्रा लागवडीसाठी योग्य जमीन व हवामान निकष",
    summary_en: "Soil depth, drainage, Vertisol clay dynamics, and temperature requirements that give Nagpur Santra its unique GI flavor.",
    summary_hi: "नागपुर संतरे के अनूठे स्वाद और उत्पादन के लिए आवश्यक मिट्टी की गहराई, जल निकासी और मौसम की जानकारी।",
    summary_mr: "नागपूर संत्र्याच्या जीआय (GI) दर्जासाठी आवश्यक काळी कसदार जमीन, निचरा आणि हवामानाचे घटक.",
    content_en: `The distinctive sweet-tart balance of Nagpur Mandarin (GI certified) is directly tied to the unique agro-ecology of the Vidarbha basin (Nagpur, Amravati, Wardha).

1. Soil Characteristics:
- Type: Deep black cotton soils (Vertisols) or medium black loams with depth between 60 cm and 120 cm.
- Drainage: Uncompromising surface and sub-surface drainage. A hard caliche or impermeable murrum layer within 60 cm causes root asphyxiation and collar rot.
- pH & Electrical Conductivity: Ideal pH is 6.5 to 7.8. Salinity (EC) must be < 1.0 dS/m. Free calcium carbonate (CaCO3) should not exceed 10-12%.

2. Climatic Regimes:
- Elevation: 200 m to 450 m above MSL.
- Temperatures: Thrives in hot, dry summers (38-44°C) which induce stress for Mrig Bahar, followed by mild, crisp winters (10-18°C) that trigger Ambia flowering and rind coloring.
- Annual Rainfall: 800 mm to 1100 mm concentrated during July-September.`,
    content_hi: `नागपुर संतरा (GI टैग प्राप्त) का अनूठा स्वाद विदर्भ की विशेष जलवायु और मिट्टी की देन है।

1. मिट्टी:
- 60 से 120 सेमी गहरी मध्यम से भारी काली मिट्टी।
- जल निकासी उत्तम होनी चाहिए। 60 सेमी के भीतर सख्त मुरुम या चूने की परत नहीं होनी चाहिए।
- मिट्टी का pH 6.5 से 7.8 के बीच होना चाहिए।

2. जलवायु:
- गर्म और शुष्क गर्मियां (38-44°C) जो मृग बहार के तनाव के लिए जरूरी हैं।
- सुखद सर्दियां (10-18°C) जो अंबिया बहार में फूलों और रंग के विकास को बढ़ावा देती हैं।
- 800 से 1100 मिमी वार्षिक वर्षा।`,
    content_mr: `नागपूर संत्र्याची विशिष्ट चव (GI टॅग) ही विदर्भातील हवामान व जमिनीच्या वैशिष्ट्यामुळे तयार होते.

१. जमिनीचे निकष:
- ६० ते १२० सेमी खोल मध्यम ते भारी काळी कसदार जमीन.
- पाण्याचा उत्तम निचरा असणे अत्यंत आवश्यक. ६० सेमीच्या आत कठीण मुरुमाचा किंवा चुनखडीचा थर नसावा.
- जमिनीचा सामू ६.५ ते ७.८ च्या दरम्यान असावा.

२. हवामानाचे निकष:
- उन्हाळ्यात कोरडे व उष्ण हवामान (३८-४४ अंश से.), ज्यामुळे झाडाला मृग बहारासाठी चांगला ताण बसतो.
- हिवाळ्यात थंड हवामान (१०-१८ अंश से.), ज्यामुळे अंबिया बहाराची फुले फुटतात व फळांना पिवळा रंग येतो.`,
    symptoms: ["Chlorosis on high lime soils", "Stagnant water injury after monsoons", "Salt encrustation around basins"],
    prevention: [
      "Conduct complete soil profile testing before digging planting pits",
      "Avoid low-lying flood-prone locations without drainage outlets"
    ],
    management: [
      "Incorporate green manuring crops (Sunhemp / Dhaincha) before planting",
      "Add gypsum if soil exchangeable sodium percentage (ESP) is high"
    ],
    source_attribution: "ICAR-CCRI & National Bureau of Soil Survey (NBSS & LUP), Nagpur",
    verified_date: "2026-02-15"
  },
  {
    id: 6,
    slug: "micro-drip-irrigation-fertigation",
    category: "Cultivation",
    title_en: "Precision Drip Irrigation & Fertigation Protocol",
    title_hi: "सूक्ष्म ड्रिप सिंचाई और फर्टिगेशन प्रोटोकॉल",
    title_mr: "ठिबक सिंचन व विद्राव्य खत व्यवस्थापन (फर्टिगेशन)",
    summary_en: "Stage-wise water budgeting per mature tree, inline drip line placement, and soluble NPK schedule to maximize grade-A fruit yield.",
    summary_hi: "प्रत्येक पेड़ के लिए पानी की सटीक मात्रा, ड्रिप लाइन की सही स्थिति और घुलनशील उर्वरकों की समय सारणी।",
    summary_mr: "प्रत्येक संत्रा झाडासाठी पाणी व्यवस्थापन, ठिबक नळ्यांची मांडणी आणि टप्प्याटप्प्याने खते देण्याचे वेळापत्रक.",
    content_en: `Flood irrigation in heavy black cotton soils leads to water stagnation, foot rot, and wastage of 60% irrigation water. Automated drip fertigation is mandatory for profitable commercial citrus farming.

1. Drip System Layout:
- Mature Trees (5+ years): Install two lateral drip lines per tree row positioned at the drip-circle (canopy perimeter), roughly 1.0 m to 1.5 m from the trunk.
- Emitters: 4 pressure-compensating (PC) drippers per tree delivering 4 to 8 Liters/hour.
- NEVER place drippers against the tree trunk. The collar zone must remain completely dry.

2. Daily Water Requirement (per mature tree):
- Winter (Ambia blooming/early fruit): 40 to 60 Liters/day.
- Peak Summer (April-May): 100 to 140 Liters/day (if maintaining crop).
- Monsoon (July-Aug): Only during dry spells.
- Post-Monsoon (Sept-Oct fruit sizing): 60 to 80 Liters/day.

3. Fertigation Schedule (Ambia crop, per mature tree/year):
- Total: 600g N, 200g P2O5, 300g K2O.
- February (Flower & Fruit Set): 30% N + 50% P2O5.
- April-May (Fruit Growth): 40% N + 30% K2O.
- August-September (Sizing & TSS): 30% N + 50% P2O5 + 70% K2O.`,
    content_hi: `काली मिट्टी में खुली सिंचाई से पानी जमा होकर तना गलन रोग होता है। ड्रिप सिंचाई से 60% पानी की बचत और 35% अधिक उत्पादन मिलता है।

1. ड्रिप लाइन की स्थापना:
- वयस्क पेड़ों (5+ वर्ष) के लिए तने से 1 से 1.5 मीटर दूर (छांव के घेरे पर) दोहरी ड्रिप लाइन लगाएं।
- तने के पास ड्रिपर कभी न लगाएं, तना सूखा रहना चाहिए।

2. पानी की दैनिक आवश्यकता:
- सर्दी (फूल व छोटा फल): 40-60 लीटर/दिन।
- गर्मी (अप्रैल-मई): 100-140 लीटर/दिन।
- फल विकास (सितंबर-अक्टूबर): 60-80 लीटर/दिन।`,
    content_mr: `काळ्या जमिनीत मोकळे पाणी दिल्यास पाणी साचून डिंक्या रोग होतो. ठिबक सिंचनामुळे पाण्याची मोठी बचत होते आणि झाडाची वाढ निरोगी राहते.

१. ठिबकची मांडणी:
- ५ वर्षांवरील झाडांसाठी खोडापासून १ ते १.५ मीटर अंतरावर झाडाच्या सावलीच्या परिघावर दोन इनलाइन नळ्या टाकाव्यात.
- खोडाजवळ ड्रिपर कधीही नसावा, खोडाचा भाग नेहमी कोरडा राहिला पाहिजे.

२. पाण्याची दैनंदिन गरज (प्रति मोठे झाड):
- हिवाळा (फुलधारणा व लहान फळे): ४० ते ६० लिटर/दिवस.
- उन्हाळा (एप्रिल-मे): १०० ते १४० लिटर/दिवस.
- फळांची वाढ (सप्टेंबर-ऑक्टोबर): ६० ते ८० लिटर/दिवस.`,
    symptoms: ["Yellowing from over-irrigation", "Fruit splitting from irregular watering", "Salt buildup around emitter holes"],
    prevention: [
      "Use sand media filter + disc filter to prevent dripper clogging",
      "Flush lateral drip lines every 15 days with 0.1% phosphoric acid"
    ],
    management: [
      "Adjust drip running hours weekly according to CCRI evapotranspiration tables"
    ],
    source_attribution: "ICAR-CCRI Precision Farming Development Center (PFDC)",
    verified_date: "2026-03-05"
  },
  {
    id: 7,
    slug: "orchard-layout-planting-density",
    category: "Cultivation",
    title_en: "Orchard Establishment, Spacing & High-Density Planting",
    title_hi: "बगीचे की स्थापना, पौधों की दूरी और सघन बागवानी (HDP)",
    title_mr: "नवीन संत्रा बाग लागवड, अंतर आणि सघन लागवड (HDP) तंत्रज्ञान",
    summary_en: "Standard 6m x 6m square planting vs High-Density 5m x 3m planting on Rangpur lime, pit preparation, and staking.",
    summary_hi: "परंपरागत 6x6 मीटर बनाम आधुनिक 5x3 मीटर सघन बागवानी, गड्ढों की तैयारी और रोपाई का सही तरीका।",
    summary_mr: "पारंपरिक ६ x ६ मीटर आणि आधुनिक ५ x ३ मीटर सघन लागवड पद्धत, खड्डे भरणे व लागवड नियोजन.",
    content_en: `Proper planting layout determines orchard productivity for the next 25-30 years.

1. Spacing Geometries:
- Traditional Square System: 6 m x 6 m spacing = 277 trees/hectare (112 trees/acre). Best suited for standard tractor tillage and wide intercropping.
- High-Density Planting (HDP): 5 m x 3 m or 6 m x 3 m spacing = 555 to 666 trees/hectare. Delivers double the yield in years 4 to 10. Requires annual summer mechanical topping and hedge pruning.

2. Pit Excavation & Solarization:
- Dimensions: 1 m x 1 m x 1 m pits dug in April-May.
- Exposure: Leave open to intense summer sun for 30 days to sterilize soil and eliminate grubs.

3. Potting Mixture per Pit:
- Topsoil (50%) + Well-rotted Farmyard Manure (40 kg) + Single Super Phosphate (1 kg) + Neem cake (2 kg) + Trichoderma viride culture (50 g) to suppress soil pathogens.`,
    content_hi: `संतरा बाग लगाने का सही तरीका अगले 25-30 वर्षों तक बंपर पैदावार सुनिश्चित करता है।

1. पौधों की दूरी:
- परंपरागत पद्धति: 6 मीटर x 6 मीटर (112 पौधे प्रति एकड़)।
- सघन बागवानी (HDP): 5 मीटर x 3 मीटर (225 पौधे प्रति एकड़)। इसमें पहले 10 वर्षों में दोगुना उत्पादन मिलता है।

2. गड्ढों की तैयारी:
- मई में 1x1x1 मीटर के गड्ढे खोदकर 30 दिन धूप में तपने दें।
- गड्ढे भरते समय 40 किलो सड़ी गोबर की खाद, 1 किलो एसएसपी, 2 किलो नीम की खली और 50 ग्राम ट्राइकोडर्मा मिलाएं।`,
    content_mr: `संत्रा बागेचे योग्य नियोजन पुढील २५ ते ३० वर्षांचे उत्पादन ठरवते.

१. लागवडीचे अंतर:
- पारंपरिक पद्धत: ६ मीटर x ६ मीटर (एकरमध्ये ११२ झाडे). ट्रॅक्टर फिरवण्यासाठी व आंतरपिकांसाठी उत्तम.
- सघन पद्धत (HDP): ५ मीटर x ३ मीटर (एकरमध्ये २२५ ते २५० झाडे). सुरुवातीच्या वर्षांत दुप्पट नफा मिळतो.

२. खड्डे तयार करणे:
- मे महिन्यात १ x १ x १ मीटर आकाराचे खड्डे खोदून महिनाभर उन्हात तापू द्यावेत.
- खड्ड्यात ४० किलो शेणखत, १ किलो सिंगल सुपर फॉस्फेट, २ किलो निंबोळी पेंड आणि ५० ग्रॅम ट्रायकोडर्मा मिसळून भरावे.`,
    symptoms: ["Crowded canopy crossing at 8 years in unpruned HDP", "Termite attack on dry organic matter in pit"],
    prevention: [
      "Use north-south row orientation for maximum morning and evening solar interception",
      "Apply Chlorpyrifos 20 EC drenching around pits if termite presence is noted"
    ],
    management: [
      "Stake young saplings firmly with sturdy bamboo stakes",
      "Remove rootstock sprouts (below graft union) every week"
    ],
    source_attribution: "ICAR-CCRI & Dr. PDKV Akola Horticulture Guidelines",
    verified_date: "2026-01-30"
  },
  {
    id: 8,
    slug: "pruning-training-canopy-hygiene",
    category: "Cultivation",
    title_en: "Scientific Pruning, Trunk Care & Bordeaux Paste Application",
    title_hi: "वैज्ञानिक छंटाई (प्रूनिंग), तने की देखभाल और बोर्डो पेस्ट",
    title_mr: "शास्त्रीय छाटणी (प्रूनिंग), खोड निगा व बोर्डो पेस्ट लेप तंत्रज्ञान",
    summary_en: "Post-harvest pruning protocol, water sprout suppression, Bordeaux paste (1:1:10) recipe, and trunk whitewashing.",
    summary_hi: "फलों की तुड़ाई के बाद छंटाई का सही समय, बोर्डो पेस्ट बनाने की विधि और तने पर लेप लगाने के लाभ।",
    summary_mr: "काढणीनंतर शास्त्रीय छाटणी, वॉटर स्प्राऊट्स काढणे, १:१:१० बोर्डो पेस्ट तयार करण्याची पद्धत व खोडाला लेप देणे.",
    content_en: `Orchard sanitation is the single most cost-effective measure in citrus disease prevention.

1. Annual Post-Harvest Pruning (Dec-Jan):
- Cut all dried, dead, diseased twigs (dieback) 2 inches into healthy green wood.
- Prune interior criss-crossing branches that rub against each other.
- Remove all water sprouts and rootstock shoots immediately.
- Disinfect secateurs in 70% surgical spirit between trees to prevent spreading Citrus Tristeza Virus (CTV).

2. Bordeaux Paste Formulation (1:1:10):
- Copper Sulphate: 1.0 kg (dissolved in 5 L clean water in a plastic bucket).
- Quicklime (Choona): 1.0 kg (slaked in 5 L water in a separate container).
- Mix by pouring copper solution into lime solution slowly while stirring with a wooden stick.
- Never use iron or metal buckets.

3. Trunk Whitewashing:
- Paint tree trunks with Bordeaux paste up to 60 cm (2 feet) above soil level twice a year:
  1) Before monsoon in May-June.
  2) After monsoon in October-November.
- Protects against Phytophthora infection, trunk borers, and sun scald.`,
    content_hi: `संत्रा बाग की स्वच्छता और प्रूनिंग रोगों को रोकने का सबसे सस्ता और प्रभावी तरीका है।

1. छंटाई का समय (दिसंबर-जनवरी):
- सभी सूखी, रोगग्रस्त और आपस में उलझी शाखाओं को काटें।
- तने से निकलने वाली कांटेदार अनुपयोगी शाखाओं (वॉटर स्प्राउट) को हटा दें।
- औजारों को समय-समय पर सैनिटाइज करें।

2. बोर्डो पेस्ट बनाने की विधि (1:1:10):
- 1 किलो नीला थोथा (कॉपर सल्फेट) को 5 लीटर पानी में घोलें (प्लास्टिक की बाल्टी में)।
- 1 किलो बिना बुझा चूना 5 लीटर पानी में अलग घोलें।
- दोनों को मिलाकर लकड़ी के डंडे से अच्छी तरह चलाएं।

3. तने पर लेप:
- साल में दो बार (मई और अक्टूबर) जमीन से 2 फीट ऊंचाई तक तने पर बोर्डो पेस्ट का लेप लगाएं।`,
    content_mr: `बागेची स्वच्छता आणि छाटणी हा संत्रा पिकातील रोगांचा प्रादुर्भाव रोखण्याचा मुख्य पाया आहे.

१. छाटणीची वेळ (डिसेंबर-जानेवारी):
- वाळलेल्या, रोगट आणि एकमेकांवर घासणाऱ्या फांद्या हिरव्या भागापर्यंत २ इंच मागे कापून घ्याव्यात.
- खोडावरून सरळ वर जाणारे वॉटर स्प्राऊट्स वेळच्या वेळी काढावेत.
- कात्री किंवा सिकेटर ७०% अल्कोहोलने स्वच्छ ठेवावे.

२. बोर्डो पेस्ट तयार करण्याची पद्धत (१:१:१०):
- १ किलो मोरचूद ५ लिटर पाण्यात प्लास्टिकच्या बादलीत रात्रभर भिजत घालावे.
- १ किलो कळीचा चुना ५ लिटर पाण्यात वेगळा विरघळावा.
- मोरचुदाचे द्रावण चुन्याच्या द्रावणात हळूहळू ओतून लाकडी काठीने चांगले ढवळावे (लोखंडी भांडे वापरू नये).

३. खोडाला लेप:
- वर्षातून दोनदा (मे आणि ऑक्टोबर) जमिनीपासून २ फुटांपर्यंत खोडाला बोर्डो पेस्टचा घट्ट लेप लावावा.`,
    symptoms: ["Dieback descending from untreated cuts", "Sunburn cracking on exposed south-facing trunks"],
    prevention: [
      "Always spray 1% Bordeaux mixture on the entire canopy immediately after pruning",
      "Burn or bury all pruned infected debris far away from the orchard"
    ],
    management: [
      "Coat cut surfaces wider than 2 cm with copper oxychloride paste"
    ],
    source_attribution: "ICAR-CCRI Plant Pathology Division",
    verified_date: "2026-02-20"
  },
  {
    id: 9,
    slug: "intercropping-companion-crops",
    category: "Cultivation",
    title_en: "Profitable Intercropping in Young Citrus Orchards (Years 1-4)",
    title_hi: "छोटे संतरा बाग में लाभदायक अंतरवर्तीय फसलें (वर्ष 1-4)",
    title_mr: "नवीन संत्रा बागेत फायदेशीर आंतरपिके (पहिले ४ वर्षे)",
    summary_en: "Compatible legumes, marigold for nematode suppression, green manures, and strict crops to avoid (cotton, solanaceae, sugarcane).",
    summary_hi: "संतरे के साथ उगाई जाने वाली उपयुक्त दलहनी फसलें, गेंदा और कौन सी फसलें (कपास, मिर्च, गन्ना) बिल्कुल न लगाएं।",
    summary_mr: "संत्रा बागेत मूग, उडीद, हरभरा, झेंडू यांसारखी फायदेशीर आंतरपिके आणि कोणती पिके (कापूस, मिरची, ऊस) लावू नयेत.",
    content_en: `Young citrus saplings take 4 to 5 years to enter commercial bearing. Intercropping provides interim farm cash flow while improving soil health if crops are chosen scientifically.

1. Recommended Legume Intercrops:
- Kharif (Monsoon): Green gram (Moong), Black gram (Urad), Soybean. These legumes fix 40-60 kg atmospheric nitrogen per hectare and do not compete for height.
- Rabi (Winter): Gram (Chana), Peas, Linseed, Fenugreek.

2. Bio-fumigation & Nematode Control:
- African Marigold (Tagetes erecta): Roots secrete alpha-terthienyl, which is highly nematicidal and suppresses citrus root nematodes (Tylenchulus semipenetrans).

3. STRICTLY PROHIBITED Crops in Citrus:
- Cotton (Kapas): Major host of bollworms, mealybugs, and whiteflies. Depletes soil moisture severely.
- Solanaceous crops (Chilli, Tomato, Brinjal, Tobacco): Alternate hosts of viruses, bacterial wilt, and nematodes.
- Sugarcane & Banana: Heavy water consumers that cause water stagnation and Phytophthora outbreak.`,
    content_hi: `संतरे के पौधे 4 से 5 साल में फल देना शुरू करते हैं। इस दौरान अंतरवर्तीय फसलों से आमदनी बढ़ाई जा सकती है।

1. अनुशंसित फसलें:
- खरीफ: मूंग, उड़द, सोयाबीन (ये मिट्टी में नाइट्रोजन जोड़ती हैं)।
- रबी: चना, मटर, अलसी।
- गेंदा (मैरीगोल्ड): गेंदे की जड़ें निमेटोड (कृमि) को नष्ट करती हैं।

2. कौन सी फसलें बिल्कुल न लगाएं:
- कपास: यह कीटों को आकर्षित करती है और नमी सोख लेती है।
- मिर्च, टमाटर, बैंगन: इनमें वायरस और निमेटोड पनपते हैं जो संतरे को नुकसान पहुंचाते हैं।
- गन्ना और केला: इनमें बहुत अधिक पानी लगता है जिससे संतरे में तना गलन रोग हो जाता है।`,
    content_mr: `संत्रा झाडांना व्यावसायिक फळधारणा सुरू होण्यासाठी ४ ते ५ वर्षे लागतात. यादरम्यान आंतरपिकांच्या माध्यमातून उत्पन्न मिळवता येते.

१. शिफारशीत आंतरपिके:
- खरीप: मूग, उडीद, सोयाबीन (जमिनीची सुपीकता वाढवणारी व नत्र स्थिर करणारी पिके).
- रब्बी: हरभरा, वाटाणा, जवस, मेथी.
- झेंडू: झेंडूच्या मुळांमधून निघणाऱ्या घटकांमुळे संत्र्याच्या मुळांना होणाऱ्या सूत्रकृमींचा (निमेटोड) नायनाट होतो.

२. कोणती पिके अजिबात घेऊ नयेत:
- कापूस: पांढरी माशी व इतर किडींचा प्रादुर्भाव वाढतो आणि जमीन कोरडी पडते.
- मिरची, वांगी, टोमॅटो: या पिकांमुळे विषाणूजन्य रोग आणि सूत्रकृमींचा धोका वाढतो.
- ऊस व केळी: अतिपाण्यामुळे संत्र्याला पाणी साचून डिंक्या रोग होतो.`,
    symptoms: ["Nematode galls on citrus roots from solanaceous intercropping", "Pest buildup from cotton"],
    prevention: [
      "Keep a clear 1.5-meter buffer zone on both sides of the citrus tree row free from intercrops",
      "Incorporate green manure into soil at 50% flowering"
    ],
    management: [
      "Ensure intercrop irrigation never wets the citrus tree collar zone"
    ],
    source_attribution: "Dr. PDKV Akola Agronomy Guidelines",
    verified_date: "2026-02-10"
  },

  // DISEASES (6 articles)
  {
    id: 10,
    slug: "citrus-greening-hlb",
    category: "Diseases",
    title_en: "Citrus Greening (Huanglongbing - HLB) Quarantine Vigilance",
    title_hi: "सिट्रस ग्रीनिंग (एचएलबी) सतर्कता और क्वारंटाइन प्रबंधन",
    title_mr: "सिट्रस ग्रीनिंग (HLB रोग) दक्षता व रोपवाटिका क्वारंटाईन",
    summary_en: "Detailed diagnostic guide for Candidatus Liberibacter asiaticus, leaf mottle identification, vector ecology, and eradication protocols.",
    summary_hi: "सिट्रस ग्रीनिंग जीवाणु रोग के लक्षण, साइला कीट की रोकथाम और संक्रमित पौधों का वैज्ञानिक प्रबंधन।",
    summary_mr: "सिट्रस ग्रीनिंग जिवाणू रोग ओळखणे, सायला किडीचे नियंत्रण आणि बागेचे रक्षण करण्याचे वैज्ञानिक उपाय.",
    content_en: `Citrus Greening (HLB) is widely acknowledged as the most devastating disease affecting citrus worldwide. It is caused by the unculturable phloem-restricted bacterium Candidatus Liberibacter asiaticus and vectored by the Asian Citrus Psyllid (Diaphorina citri).

Key Diagnostics:
1. Foliar Symptoms:
- Asymmetric blotchy mottle on mature leaves: Yellow patches that do NOT match on either side of the midrib. This distinguishes HLB from uniform zinc or iron deficiency.
- Vein corking: Midrib and main lateral veins become swollen, yellow, and develop rough corky ridges.
- Upright 'rabbit-ear' hardened leaves on stunted twigs.

2. Fruit Symptoms:
- Lopsided, asymmetrical fruit shape.
- Color inversion: Fruit starts coloring from the stem end while the stylar end remains green (hence the name 'Greening').
- Extreme bitterness and small aborted dark seeds.

Management:
- ZERO TOLERANCE: There is no chemical cure once systemic infection occurs.
- Remove and incinerate infected nursery saplings immediately.
- Maintain vector-free mother orchards under 40-mesh insect-proof screenhouses.`,
    content_hi: `सिट्रस ग्रीनिंग (HLB) दुनिया भर में संतरे का सबसे खतरनाक रोग है। यह जीवाणु द्वारा फैलता है जिसका वाहक सिट्रस साइला कीट है।

पहचान के मुख्य लक्षण:
1. पत्तियों पर लक्षण:
- पत्तियों पर टेढ़ा-मेढ़ा पीलापन (ब्लॉची मोटल) जो नस के दोनों ओर समान नहीं होता।
- नसों का मोटा होना और कॉर्क जैसा खुरदुरा हो जाना।
- नई पत्तियां छोटी, सख्त और खड़ी हो जाती हैं।

2. फलों पर लक्षण:
- फल टेढ़े-मेढ़े (असममित) हो जाते हैं।
- फल नीचे से हरा रहता है और ऊपर से पकता है। स्वाद कड़वा हो जाता है और बीज काले पड़ जाते हैं।

रोकथाम:
- इस रोग का कोई रासायनिक इलाज नहीं है।
- संक्रमित पौधों को तुरंत उखाड़कर जला दें।
- साइला कीट को नियंत्रित करने के लिए इमिडाक्लोप्रिड का छिड़काव करें।`,
    content_mr: `सिट्रस ग्रीनिंग (HLB) हा संत्रा पिकावरील जागतिक पातळीवर सर्वात घातक मानला जाणारा जिवाणू रोग आहे. हा सिट्रस सायला या किडीमार्फत वेगाने पसरतो.

रोगाची अचूक लक्षणे:
१. पानांवरील लक्षणे:
- पानांवर असमान पिवळे चट्टे (Blotchy Mottle): मुख्य शिरेच्या दोन्ही बाजूला पिवळेपणा सारखा नसतो.
- शिरा फुगणे: पानांची मुख्य शीर फुगून खडबडीत होते.
- पाने लहान, जाड व वरच्या दिशेने उभी राहतात (सशाच्या कानासारखी).

२. फळांवरील लक्षणे:
- फळे एका बाजूने चपटी किंवा वाकडी होतात.
- फळाचा देठाकडील भाग पिवळा होतो आणि खालचा भाग हिरवाच राहतो. फळाची चव कडू होते आणि बिया काळ्या पडून वाळतात.

उपाययोजना:
- या रोगावर कोणताही रासायनिक उपचार उपलब्ध नाही.
- लागण झालेली रोपे किंवा झाडे त्वरित उपटून जाळून नष्ट करावीत.
- सायला किडीच्या नियंत्रणासाठी इमिडाक्लोप्रिडची वेळीच फवारणी करावी.`,
    symptoms: ["Asymmetric blotchy mottle", "Corky swollen leaf veins", "Lopsided bitter fruit with aborted dark seeds", "Canopy dieback"],
    prevention: [
      "Erect 40-mesh screenhouses over budwood mother blocks",
      "Monitor Asian Citrus Psyllid with yellow sticky traps",
      "Test foundation stock by PCR at ICAR-CCRI"
    ],
    management: [
      "Strictly destroy infected plants; do not graft from suspicious mother trees"
    ],
    source_attribution: "ICAR-CCRI & National Citrus Quarantine Network",
    verified_date: "2026-03-12"
  },
  {
    id: 11,
    slug: "damping-off-phytophthora-nursery",
    category: "Diseases",
    title_en: "Damping-Off & Foot Rot in Citrus Nurseries",
    title_hi: "संतरा नर्सरी में आद्र-गलन (डैम्पिंग-ऑफ) और फुट रॉट",
    title_mr: "संत्रा रोपवाटिकेत मर रोग (डॅम्पिंग-ऑफ) व खोडकूज व्यवस्थापन",
    summary_en: "Epidemiology of Phytophthora species in polybag nurseries, raised nursery bench design, and Trichoderma bio-control.",
    summary_hi: "नर्सरी में मिट्टी जनित फफूंद से होने वाले पौधों के सूखने का कारण, बेंच की ऊंचाई और ट्राइकोडर्मा का उपयोग।",
    summary_mr: "रोपवाटिकेत फायटोफ्थोरा बुरशीमुळे होणारा मर रोग, मांडवांची रचना आणि ट्रायकोडर्मा जैविक बुरशीनाशकाचा वापर.",
    content_en: `Damping-off caused by Phytophthora nicotianae and Pythium spp. is responsible for up to 40% seedling mortality in poorly managed Vidarbha nurseries.

Epidemiology:
Fungal zoospores swim in surface water films. When polybags rest on bare ground during heavy monsoon rains, water splashes spores onto seedling collars, causing rapid rotting.

Management Protocols:
1. Raised Nursery Stands: Polybags must never sit directly on bare soil. Place polybags on galvanized iron mesh benches 60 cm above the ground or on a 10 cm layer of coarse river gravel.
2. Soil Solarization: Cover moist potting mix (soil:sand:FYM in 1:1:1 ratio) with 25-micron transparent UV-stabilized polythene sheet for 30-40 days during the peak May sun (temperatures exceed 52°C in soil).
3. Biological Fortification: Mix Trichoderma harzianum or T. viride @ 5 kg per tonne of potting mix before bagging.`,
    content_hi: `विदर्भ की संतरा नर्सरी में डैम्पिंग-ऑफ से 40% तक छोटे पौधे नष्ट हो जाते हैं।

कारण:
जब पॉलीथीन बैग्स को सीधे जमीन पर रखा जाता है, तो बारिश का पानी फफूंद के बीजाणुओं को तने तक पहुंचा देता है जिससे पौधा गल जाता है।

रोकथाम के उपाय:
1. पॉलीबैग्स को कभी जमीन पर न रखें। इन्हें जमीन से 2 फीट ऊंचे लोहे के बेंच या कंक्रीट स्टैंड पर रखें।
2. मई के महीने में मिट्टी को प्लास्टिक शीट से 30-40 दिन तक ढककर सौरीकरण (सोलराइजेशन) करें।
3. पॉटिंग मिश्रण में 5 किलो प्रति टन की दर से ट्राइकोडर्मा जैविक कल्चर मिलाएं।`,
    content_mr: `विदर्भातील संत्रा रोपवाटिकांमध्ये पावसाळ्यात पाण्याचा निचरा न झाल्यामुळे मर रोगाने ४०% पर्यंत लहान रोपे मरतात.

कारणे:
पिशव्या थेट जमिनीवर ठेवल्यास पावसाच्या पाण्याचे शिंतोडे उडून फायटोफ्थोरा बुरशी लहान खोडावर हल्ला करते आणि रोप अचानक कोलमडते.

उपाययोजना:
१. रोपवाटिकेतील पिशव्या जमिनीवर न ठेवता २ फूट उंचीच्या लोखंडी मांडवावर किंवा खडीच्या थरावर ठेवाव्यात.
२. मे महिन्यात मातीचे निर्जंतुकीकरण करण्यासाठी प्लास्टिक कागद टाकून ४० दिवस कडक उन्हात सोलरायझेशन करावे.
३. मातीत प्रति टन ५ किलो ट्रायकोडर्मा व्हिरिडी जैविक बुरशीनाशक मिसळावे.`,
    symptoms: ["Water-soaked collar lesions", "Seedling collapse while leaves are still green", "Brown root decay and sloughing"],
    prevention: [
      "Grow seedlings on raised wire-mesh benches",
      "Avoid excess overhead sprinkler irrigation during monsoon",
      "Use sand:soil:FYM potting ratio of 1:1:1"
    ],
    management: [
      "Drench nursery beds with Copper Oxychloride (2.5 g/L) or Metalaxyl-MZ (2 g/L)",
      "Remove and burn infected seedlings immediately"
    ],
    source_attribution: "ICAR-CCRI Technical Bulletin on Citrus Protection",
    verified_date: "2026-03-01"
  },
  {
    id: 12,
    slug: "citrus-canker-xanthomonas",
    category: "Diseases",
    title_en: "Citrus Bacterial Canker (Xanthomonas axonopodis)",
    title_hi: "सिट्रस कैंकर जीवाणु रोग प्रबंधन",
    title_mr: "सिट्रस कॅन्कर (खैऱ्या रोग) एकात्मिक नियंत्रण",
    summary_en: "Identification of corky crater lesions with chlorotic halos, copper-streptocycline spray schedules, and leaf miner synergy.",
    summary_hi: "कैंकर के उभरे हुए खुरदुरे धब्बों की पहचान, कॉपर और स्ट्रेप्टोसाइक्लिन का छिड़काव शेड्यूल।",
    summary_mr: "पाने व फळांवरील खैऱ्या रोगाचे चट्टे, कॉपर ऑक्झिक्लोराईड व स्ट्रेप्टोसायक्लिन फवारणीचे वेळापत्रक.",
    content_en: `Citrus canker is caused by the bacterium Xanthomonas axonopodis pv. citri. It spreads rapidly during monsoon storms via wind-blown rain droplets and enters through stomata and wound punctures made by leaf miner caterpillars.

Diagnostic Features:
- Leaves: Small, slightly raised blister spots that enlarge into rough, brown, corky craters surrounded by an unmistakable bright yellow chlorotic halo.
- Fruit: Raised scabby eruptions. While canker does not impair internal juice quality, it ruins fresh-market appeal and causes severe premature fruit drop during August-September.

Control Schedule:
1. Spray 1: Immediately after post-harvest pruning in January (Copper Oxychloride 50 WP @ 2.5 g/L).
2. Spray 2: At new flush emergence along with leaf miner insecticide.
3. Spray 3: Monsoon onset in June (Copper Oxychloride 2.5 g/L + Streptocycline 1 g / 10 L water).
4. Spray 4: Repeat 30 days later in July.`,
    content_hi: `सिट्रस कैंकर जीवाणु जनित रोग है जो बारिश के दिनों में हवा और पत्ती सुरंग कीट (लीफ माइनर) के घावों के जरिए फैलता है।

पहचान:
- पत्तियों और फलों पर भूरे, खुरदुरे उभरे हुए धब्बे बनते हैं जिनके चारों ओर पीला छल्ला होता है।
- फलों पर दाग लगने से उनका बाजार मूल्य गिर जाता है और फल समय से पहले गिर जाते हैं।

नियंत्रण:
- जून और जुलाई में कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) + स्ट्रेप्टोसाइक्लिन (1 ग्राम प्रति 10 लीटर पानी) का छिड़काव करें।
- लीफ माइनर कीट को तुरंत नियंत्रित करें।`,
    content_mr: `सिट्रस कॅन्कर हा झँथोमोनस जिवाणूमुळे होणारा रोग असून पावसाळ्यात वाऱ्यासह पडणाऱ्या पावसाच्या थेंबांमुळे व नागअळीच्या जखमांमधून वेगाने पसरतो.

लक्षणे:
- पानांवर आणि फळांवर तांबूस-तपकिरी रंगाचे खडबडीत फोड येतात, ज्यांभोवती ठळक पिवळे कडे दिसते.
- फळांवर डाग पडल्यामुळे बाजारभाव मिळत नाही आणि फळगळ वाढते.

नियंत्रण वेळापत्रक:
- जून व जुलै महिन्यात कॉपर ऑक्झिक्लोराईड (२.५ ग्रॅम/लिटर) + स्ट्रेप्टोसायक्लिन (१ ग्रॅम प्रति १० लिटर पाणी) यांची फवारणी करावी.
- नागअळीचे नियंत्रण वेळेवर करावे कारण तिच्या भुयारांमधून जिवाणू सहज आत शिरतात.`,
    symptoms: ["Corky raised craters on leaves and fruit", "Bright yellow chlorotic halo around spots", "Premature fruit drop in monsoon"],
    prevention: [
      "Prune canker-infected twigs before the monsoon onset",
      "Control citrus leaf miner during new flushes",
      "Plant windbreak trees on southwest boundary"
    ],
    management: [
      "Apply Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (100 ppm)",
      "Repeat spray at 21-day intervals during wet weather"
    ],
    source_attribution: "Dr. PDKV Akola Citrus Pathology",
    verified_date: "2026-02-18"
  },
  {
    id: 13,
    slug: "twig-dieback-anthracnose",
    category: "Diseases",
    title_en: "Twig Blight, Anthracnose & Dieback (Colletotrichum)",
    title_hi: "टहनी का सूखा रोग (डाईबैक) और एन्थ्रेक्नोज प्रबंधन",
    title_mr: "फांदी वाळ (डायबॅक) व करपा रोग व्यवस्थापन",
    summary_en: "Progressive tip drying of shoots, acervuli fruiting bodies, moisture stress triggers, and systemic fungicidal rescue.",
    summary_hi: "टहनियों का ऊपर से नीचे की ओर सूखना, कवक की रोकथाम और सही फफूंदनाशक का प्रयोग।",
    summary_mr: "संत्रा झाडांच्या फांद्या टोकाकडून खाली वाळत जाणे (डायबॅक), पाण्याचा ताण व बुरशीनाशक फवारणी नियोजन.",
    content_en: `Citrus dieback is a disease complex triggered by fungal infection (Colletotrichum gloeosporioides and Lasiodiplodia theobromae) in trees predisposed by malnutrition, water stress, or nematode damage.

Symptoms:
- Drying of terminal twigs progresses from the tip downward into main scaffold limbs.
- Affected twigs turn ash-gray with tiny black specks (fungal fruiting bodies).
- Leaves turn yellow, wither, and drop, leaving naked skeletons of dead wood.

Management:
1. Pruning: Cut dead wood 2 inches below the point of infection into healthy tissue.
2. Fungicide: Spray Carbendazim 50 WP @ 1 g/L or Azoxystrobin 23% SC @ 1 mL/L immediately after pruning.
3. Micronutrients: Apply balanced zinc, iron, and manganese foliar sprays to restore tree vigor.`,
    content_hi: `डाईबैक में टहनियां ऊपर से नीचे की ओर सूखने लगती हैं। यह कमजोर, कुपोषित या तनावग्रस्त पेड़ों पर अधिक हमला करता है।

रोकथाम:
1. सूखी टहनियों को स्वस्थ हरे भाग से 2 इंच पीछे से काटें।
2. छंटाई के तुरंत बाद कार्बेन्डाजिम (1 ग्राम/लीटर) या एजॉक्सीस्ट्रोबिन (1 मिली/लीटर) का छिड़काव करें।
3. सूक्ष्म पोषक तत्वों का छिड़काव करके पेड़ की रोग प्रतिरोधक क्षमता बढ़ाएं।`,
    content_mr: `डायबॅक रोगामध्ये झाडाच्या फांद्या शेंड्याकडून खोडाकडे वाळत येतात. अन्नद्रव्यांची कमतरता किंवा पाण्याचा अयोग्य ताण यामुळे झाड कमजोर झाल्यावर बुरशीचा हल्ला होतो.

उपाययोजना:
१. वाळलेल्या फांद्या निरोगी हिरव्या भागाच्या २ इंच मागे छाटून घ्याव्यात.
२. छाटणीनंतर लगेच कार्बेन्डाझिम (१ ग्रॅम/लिटर) किंवा अझॉक्सीस्ट्रॉबिन (१ मिली/लिटर) ची फवारणी करावी.
३. झाडाची ताकद वाढवण्यासाठी सूक्ष्मअन्नद्रव्यांची फवारणी करावी.`,
    symptoms: ["Progressive tip drying downward", "Ash-gray dead twigs with black pinpoints", "Twig skeletonization"],
    prevention: [
      "Avoid excessive water stress beyond 45 days during summer",
      "Sterilize secateur blades with 70% alcohol"
    ],
    management: [
      "Prune dead twigs and burn outside orchard",
      "Spray 1% Bordeaux mixture or Carbendazim 50 WP (1 g/L)"
    ],
    source_attribution: "ICAR-CCRI Fungal Pathology Section",
    verified_date: "2026-02-25"
  },
  {
    id: 14,
    slug: "citrus-tristeza-virus-ctv",
    category: "Diseases",
    title_en: "Citrus Tristeza Virus (CTV) & Stem Pitting Identification",
    title_hi: "सिट्रस ट्रिस्टेज़ा वायरस (सीटीवी) और तने में गड्ढे पड़ना",
    title_mr: "सिट्रस ट्रायस्टेझा विषाणू (CTV) व खोडावर खड्डे पडणे",
    summary_en: "Vector transmission by black citrus aphid (Toxoptera citricida), quick decline symptoms, and rootstock resistance.",
    summary_hi: "काले माहू (एफिड) द्वारा फैलने वाला वायरस, पेड़ों का अचानक सूखना और प्रतिरोधी रूटस्टॉक का चयन।",
    summary_mr: "काळा मावा किडीमुळे पसरणारा ट्रायस्टेझा विषाणू, झाडाचा अचानक ऱ्हास आणि प्रतिकारक्षम रूटस्टॉक.",
    content_en: `Citrus Tristeza Virus (Closteroviridae) is transmitted semi-persistently by the brown citrus aphid (Toxoptera citricida). In Vidarbha, severe strains cause stem pitting on scion wood and quick decline when sour orange rootstock is used.

Key Diagnostic Checkpoints:
- Vein Clearing: Young tender leaves show translucid elongated clearings along lateral veinlets (pinhead chlorotic flecks).
- Stem Pitting: When bark is stripped from twigs or trunk, elongated grooves, pits, and honeycombing can be seen in the underlying cambium.
- Quick Decline: Trees on susceptible rootstocks suddenly wilt and die with dry leaves clinging to branches.

Management:
- Use tolerant rootstocks: Rangpur Lime and Rough Lemon are tolerant to Tristeza-induced quick decline.
- Control aphid vectors using Dimethoate 30 EC @ 1.5 mL/L or Imidacloprid @ 0.5 mL/L during flush.`,
    content_hi: `सिट्रस ट्रिस्टेज़ा वायरस एफिड (माहू) कीट द्वारा फैलता है।

पहचान:
- नई पत्तियों की नसों में प्रकाश के सामने देखने पर पारदर्शी रेखाएं दिखाई देती हैं।
- छाल हटाने पर लकड़ी में लंबे गड्ढे (स्टेम पिटिंग) दिखाई देते हैं।
- पेड़ अचानक मुरझाकर सूख जाते हैं।

रोकथाम:
- रंगपुर लाइम रूटस्टॉक का प्रयोग करें जो इस वायरस के प्रति सहनशील है।
- एफिड्स (माहू) के नियंत्रण के लिए कीटनाशक का छिड़काव करें।`,
    content_mr: `सिट्रस ट्रायस्टेझा हा विषाणूजन्य रोग काळा मावा या किडीमार्फत वेगाने पसरतो.

लक्षणे:
- कोवळ्या पानांवर उजेडात पाहिल्यास शिरांच्या बाजूला पारदर्शक रेषा दिसतात (Vein Clearing).
- झाडाची साल काढल्यास लाकडावर उभे खड्डे किंवा मधमाशांच्या पोळ्यासारखे छिद्र दिसतात (Stem Pitting).
- झाड अचानक सुकते.

उपाययोजना:
- रंगपूर लाइम या प्रतिकारक्षम रूटस्टॉकचाच वापर करावा.
- मावा किडीच्या नियंत्रणासाठी डायमेथोएट किंवा इमिडाक्लोप्रिडची फवारणी करावी.`,
    symptoms: ["Vein clearing flecks on tender leaves", "Longitudinal grooves/pits in peeled wood", "General tree chlorosis"],
    prevention: [
      "Propagate only from certified cross-protected or virus-tested CCRI budwood",
      "Control aphid vectors promptly"
    ],
    management: [
      "Eradicate declining trees to eliminate virus reservoirs"
    ],
    source_attribution: "ICAR-CCRI Virology Laboratory",
    verified_date: "2026-03-08"
  },

  // PESTS (5 articles)
  {
    id: 15,
    slug: "asian-citrus-psyllid-vector",
    category: "Pests",
    title_en: "Asian Citrus Psyllid (Diaphorina citri) Vector Ecology",
    title_hi: "एशियन सिट्रस साइला (कीट) पारिस्थितिकी और नियंत्रण",
    title_mr: "सिट्रस सायला किडीचे जीवनचक्र व एकात्मिक नियंत्रण",
    summary_en: "Seasonal population dynamics, feeding behavior, vector role in Citrus Greening, and threshold-based chemical controls.",
    summary_hi: "साइला कीट की पहचान, नए पत्तों पर हमला, ग्रीनिंग रोग फैलाने में भूमिका और नियंत्रण उपाय।",
    summary_mr: "सायला किडीची ओळख, कोवळ्या पालवीवरील प्रादुर्भाव, ग्रीनिंग रोगाचा प्रसार व नियंत्रण पद्धती.",
    content_en: `The Asian Citrus Psyllid is the most dangerous citrus insect pest in India because it acts as the primary vector for Candidatus Liberibacter asiaticus (Citrus Greening).

Biology & Identification:
- Adults are small (3-4 mm long), grayish-brown, and feed on tender leaves with their abdomen tilted upwards at a characteristic 45-degree angle.
- Nymphs are flat, yellowish-orange, and feed exclusively on unexpanded tender shoots, secreting distinctive white waxy coiled honeydew filaments.

Economic Threshold Level (ETL):
- 2 psyllids per shoot during flush stage justifies immediate treatment.

Chemical & Biological Control:
- First Spray: At vegetative flush emergence: Thiamethoxam 25% WG @ 0.3 g/L or Imidacloprid 17.8% SL @ 0.5 mL/L.
- Second Spray: 15 days later if population persists: Chlorpyrifos 20% EC @ 2 mL/L.
- Biological: Conserve natural syrphid flies, chrysoperla, and ladybird beetles.`,
    content_hi: `एशियन सिट्रस साइला सबसे खतरनाक कीट है क्योंकि यह सिट्रस ग्रीनिंग रोग का मुख्य वाहक है।

पहचान:
- वयस्क कीट 3-4 मिमी लंबा, भूरे रंग का होता है और पत्ती पर 45 डिग्री के कोण पर बैठकर रस चूसता है।
- इसके बच्चे (निम्फ) कोमल शाखाओं पर सफेद मोम जैसे धागे छोड़ते हैं।

नियंत्रण:
- नई कोपलें निकलते ही थायामेथोक्सम (0.3 ग्राम/लीटर) या इमिडाक्लोप्रिड (0.5 मिली/लीटर) का छिड़काव करें।
- पीले चिपचिपे ट्रैप (येलो स्टिकी ट्रैप) लगाएं।`,
    content_mr: `सिट्रस सायला ही संत्र्यावरील सर्वात विनाशकारी कीड आहे कारण ती सिट्रस ग्रीनिंग रोगाचा प्रसार करते.

ओळख:
- प्रौढ कीड ३-४ मिमी लांब, तपकिरी रंगाची असून पाठीचा भाग ४५ अंशांच्या कोनात वर उचलून रस शोषते.
- पिल्ले कोवळ्या पानांवर राहून पांढऱ्या मेणासारख्या बारीक नळ्या बाहेर सोडतात.

नियंत्रण:
- नवीन पालवी फुटताच थायामेथॉक्झाम (०.३ ग्रॅम/लिटर) किंवा इमिडाक्लोप्रिड (०.५ मिली/लिटर) ची फवारणी करावी.
- बागेत एकरी १५ पिवळे चिकट सापळे लावावेत.`,
    symptoms: ["Adults feeding at 45-degree tilt", "White waxy coiled honeydew filaments on tender shoots", "Twisted curly young leaves"],
    prevention: [
      "Install yellow sticky traps at canopy level",
      "Prune out of season asynchronous water shoots"
    ],
    management: [
      "Foliar spray of Imidacloprid 17.8 SL (0.5 mL/L) or Thiamethoxam 25 WG (0.3 g/L)"
    ],
    source_attribution: "ICAR-CCRI Entomology Division",
    verified_date: "2026-03-02"
  },
  {
    id: 16,
    slug: "citrus-leaf-miner",
    category: "Pests",
    title_en: "Citrus Leaf Miner (Phyllocnistis citrella) Management",
    title_hi: "सिट्रस लीफ माइनर (चित्रकिडा) का वैज्ञानिक नियंत्रण",
    title_mr: "संत्र्यावरील नागअळी (लीफ मायनर) प्रभावी नियंत्रण",
    summary_en: "Serpentine leaf tunnels, distortion of nursery sapling foliage, predisposal to citrus canker, and neem-based IPM schedules.",
    summary_hi: "पत्तियों में चांदी जैसी टेढ़ी-मेढ़ी सुरंगें, नर्सरी के पौधों का मुड़ना और नीम आधारित नियंत्रण।",
    summary_mr: "पानांमधील चंदेरी नागमोडी भुयारे, पानांचा चुरगळा होणे, कॅन्कर रोगाचा शिरकाव आणि निंबोळी अर्क फवारणी.",
    content_en: `Citrus Leaf Miner is the chief pest of nursery seedlings and young flush flushes in Central India.

Damage Mechanism:
The tiny micro-lepidopteran larva feeds under the epidermal cuticle, excavating silvery serpentine mines. Damaged leaves curl, deform, and undergo chlorosis. Crucially, the epidermal ruptures made by leaf miner larvae serve as open portals for the entry of Xanthomonas canker bacteria.

IPM Protocol:
1. Cultural: Synchronize flush emergence. Avoid staggered high-nitrogen doses which produce continuous tender growth.
2. Botanical Spray: Apply 5% Neem Seed Kernel Extract (NSKE) or Azadirachtin 10,000 ppm @ 1 mL/L as soon as flush buds swell to 1 cm.
3. Targeted Chemistry: If mines exceed 20% of flush leaves, spray Spinosad 45% SC @ 0.3 mL/L or Abamectin 1.9% EC @ 0.5 mL/L.`,
    content_hi: `लीफ माइनर नर्सरी के छोटे पौधों और नई पत्तियों का प्रमुख कीट है।

नुकसान:
इसकी छोटी सुंडी पत्तियों के ऊपरी हिस्से के नीचे चांदी जैसी टेढ़ी-मेढ़ी सुरंगें बनाती है। पत्तियां मुड़कर सिकुड़ जाती हैं और इन घावों से कैंकर रोग फैलता है।

नियंत्रण:
- नई पत्तियां आते ही 5% नीम के बीज का अर्क (NSKE) या नीम का तेल (1 मिली/लीटर) छिड़कें।
- अधिक प्रकोप होने पर स्पिनोसैड (0.3 मिली/लीटर) का छिड़काव करें।`,
    content_mr: `नागअळी हा संत्रा रोपवाटिका आणि लहान बागांमधील प्रमुख उपद्रवी कीटक आहे.

नुकसानीचे स्वरूप:
लहान अळी कोवळ्या पानाच्या पापुद्र्याखाली राहून नागमोडी चंदेरी रंगाचे भुयार करते. पाने आकसतात, चुरगळतात आणि या जखमांमधून कॅन्करचे जिवाणू आत शिरतात.

एकात्मिक नियंत्रण:
- नवीन पालवी येताच ५% निंबोळी अर्क (NSKE) किंवा निंबोळी तेल १ मिली/लिटर फवारावे.
- प्रादुर्भाव जास्त असल्यास स्पिनोसॅड ४५% एससी (०.३ मिली/लिटर) ची फवारणी करावी.`,
    symptoms: ["Silvery winding mines inside leaf blades", "Curling and cup-shaped distortion of foliage", "Stunted sapling growth"],
    prevention: [
      "Spray 5% NSKE at the first sign of bud swelling",
      "Avoid excess nitrogen fertilizer which prolongs tender flush period"
    ],
    management: [
      "Foliar spray Spinosad 45 SC (0.3 mL/L) or Emamectin Benzoate 5 SG (0.4 g/L)"
    ],
    source_attribution: "ICAR-CCRI Integrated Pest Management Bulletin",
    verified_date: "2026-02-12"
  },
  {
    id: 17,
    slug: "lemon-butterfly-caterpillar",
    category: "Pests",
    title_en: "Lemon Butterfly (Papilio demoleus) Defoliation Defense",
    title_hi: "नींबू तितली (कैटरपिलर) द्वारा पत्तियों को खाने से बचाव",
    title_mr: "लिंबू फुलपाखरू (सुरवंट) पान कुरतडणारी अळी नियंत्रण",
    summary_en: "Bird-dropping camouflage in early larval instars, voracious nursery defoliation, hand picking, and bio-insecticides.",
    summary_hi: "पक्षी की बीट जैसी दिखने वाली सुंडी, पूरी पत्तियां चट कर जाना और जैविक नियंत्रण के तरीके।",
    summary_mr: "पक्ष्यांच्या विष्ठेसारखी दिसणारी सुरवंट, झाडाची संपूर्ण पाने कुरतडणे आणि जैविक उपाय.",
    content_en: `The Lemon Butterfly (Papilio demoleus) is a major defoliator in citrus nurseries and young orchards up to 3 years of age.

Life Stages & Camouflage:
- Early instars (1st to 3rd) mimic bird droppings (dark brown with white blotches), fooling natural avian predators.
- Final instar caterpillar is bright cylindrical green with horn-like osmeterium on its head that extrudes when threatened.
- A single caterpillar can consume entire shoots, leaving only bare midribs.

Control Measures:
1. Physical Hand-Picking: In nursery beds, manually hand-pick and destroy caterpillars in the early morning.
2. Microbial Control: Spray Bacillus thuringiensis (Bt) @ 1.5 g/L during active larval feeding. Bt is completely safe for non-target beneficial insects.
3. Chemical: Foliar spray of Quinalphos 25% EC @ 1.5 mL/L or Chlorantraniliprole 18.5% SC @ 0.3 mL/L for severe outbreaks.`,
    content_hi: `नींबू तितली का कैटरपिलर छोटे पौधों की पत्तियों को बहुत तेजी से खा जाता है।

पहचान:
- छोटी सुंडी पक्षी की बीट जैसी दिखती है (सफेद और भूरे धब्बे)।
- बड़ी होने पर यह चमकदार हरी हो जाती है।
- यह पूरी पत्ती को खाकर सिर्फ बीच की नस छोड़ देती है।

नियंत्रण:
- नर्सरी में सुबह के समय सुंडियों को हाथ से चुनकर नष्ट करें।
- बैसिलस थुरिंजिएंसिस (Bt) जैविक कीटनाशक (1.5 ग्राम/लीटर) का छिड़काव करें।
- क्यूनलफॉस (1.5 मिली/लीटर) का छिड़काव करें।`,
    content_mr: `लिंबू फुलपाखराची अळी (सुरवंट) रोपवाटिका व लहान बागांमधील सर्व पाने वेगाने फस्त करते.

ओळख:
- लहान असताना अळी हुबेहूब पक्ष्यांच्या विष्ठेसारखी (तपकिरी-पांढरी) दिसते.
- मोठी झाल्यावर ती पोपटी हिरवी बनते व संपूर्ण पान खाऊन केवळ मध्यशीर शिल्लक ठेवते.

उपाययोजना:
- लहान रोपवाटिकेत सकाळी अळ्या हाताने वेचून नष्ट कराव्यात.
- बॅसिलस थुरिनजिएन्सिस (Bt) जैविक कीटकनाशक (१.५ ग्रॅम/लिटर) फवारावे.
- प्रादुर्भाव जास्त असल्यास क्विनॉलफॉस २५% ईसी (१.५ मिली/लिटर) ची फवारणी करावी.`,
    symptoms: ["Completely defoliated shoots with bare midribs", "Bird-dropping mimic larvae on leaf surface", "Large cylindrical green horned caterpillars"],
    prevention: [
      "Screen nursery beds with fine nylon mosquito netting",
      "Regular morning hand-picking"
    ],
    management: [
      "Spray Bacillus thuringiensis (Bt) @ 1.5 g/L or Quinalphos 25 EC @ 1.5 mL/L"
    ],
    source_attribution: "Dr. PDKV Akola Entomology Advisory",
    verified_date: "2026-02-05"
  },
  {
    id: 18,
    slug: "citrus-fruit-sucking-moth",
    category: "Pests",
    title_en: "Fruit Sucking Moth (Eudocima materna) Night Orchard Defense",
    title_hi: "फल चूसक पतंगा - रात्रि प्रबंधन और सुरक्षा उपाय",
    title_mr: "फळे शोषणारा पतंग (रसशोषक पतंग) रात्रीचे व्यवस्थापन",
    summary_en: "Nocturnal proboscis piercing of ripening oranges, secondary fungal rot, light traps, poison baits, and host weed eradication.",
    summary_hi: "रात में संतरा फलों में छेद करने वाले पतंगे से बचाव, लाइट ट्रैप और जहरीले चारे का उपयोग।",
    summary_mr: "रात्रीच्या वेळी पक्व संत्र्याला छिद्र पाडणारा पतंग, फळकूज, प्रकाश सापळे व विषारी आमिष तंत्रज्ञान.",
    content_en: `The Fruit Sucking Moth is among the most catastrophic pests of maturing Ambia crop in Vidarbha during September-October.

Damage Symptoms:
Adult moths fly into orchards between dusk (7 PM) and 10 PM. With a stout, serrated proboscis, they drill pinholes into ripening fruits to suck juice. The puncture hole soon turns into an entry point for secondary bacterial and fungal pathogens, causing fruit to rot and drop within 48 to 72 hours.

Management Architecture:
1. Orchard Boundary Light Traps: Install 100-watt yellow incandescent bulbs suspended 1.5 meters above wide galvanized trays containing kerosene-mixed water along the orchard periphery.
2. Poison Baiting: Hang wide-mouthed bottles in the canopy containing: 200 g crushed jaggery + 10 mL Malathion 50% EC + 100 mL rotten orange juice in 2 Liters water.
3. Host Weed Eradication: The moth larvae feed strictly on wild creeper weeds (Gulwel - Tinospora cordifolia and Cocculus hirsutus). Eradicate these weeds within a 2-3 km radius around the orchard.`,
    content_hi: `विदर्भ में सितंबर-अक्टूबर में पकते हुए अंबिया संतरा पर फल चूसक पतंगा भारी तबाही मचाता है।

नुकसान:
यह पतंगा शाम 7 से रात 10 बजे के बीच आता है और अपनी मजबूत सोंड से पके फल में छेद करके रस चूसता है। छेद से कवक प्रवेश कर जाता है और 2-3 दिन में फल सड़कर गिर जाता है।

रोकथाम के 3 मुख्य उपाय:
1. प्रकाश प्रपंच (लाइट ट्रैप): बागीचे की मेड़ों पर 100 वाट के बल्ब के नीचे मिट्टी के तेल मिला पानी रखें।
2. विषैला चारा: 200 ग्राम गुड़ + 10 मिली मैलाथियान + 2 लीटर पानी को चौड़े मुंह की बोतलों में भरकर पेड़ों पर लटकाएं।
3. गुलवेल जैसी खरपतवार को बागीचे के 2 किमी के दायरे से नष्ट करें।`,
    content_mr: `सप्टेंबर-ऑक्टोबर महिन्यात अंबिया संत्रा पक्व होत असताना हा पतंग बागेत येऊन अतोनात नुकसान करतो.

नुकसानीचे स्वरूप:
हा निशाचर पतंग संध्याकाळी ७ ते १० या वेळेत बागेत शिरतो आणि टोकदार सोंडेने संत्र्याला छिद्र पाडून रस शोषतो. छिद्र पडलेल्या जागेवरून बुरशीचा शिरकाव होऊन ४८ ते ७२ तासांत संत्रा सडून खाली गळतो.

व्यवस्थापन तंत्र:
१. प्रकाश सापळे (Light Traps): बागेच्या कडेला १०० वॅटच्या दिव्याखाली रॉकेल मिश्रित पाण्याचे घमेले ठेवावे.
२. विषारी आमिष: २०० ग्रॅम गूळ + १० मिली मॅलॅथिऑन ५० ईसी + २ लिटर पाणी रुंद तोंडाच्या बाटल्यांमध्ये भरून बागेत झाडांवर टांगावे.
३. गुळवेल व वासनवेल या तणांचा नायनाट: पतंगाची अळी गुळवेलीवर पोसली जात असल्याने बागेभोवती २ किमी परिसरातील गुळवेल नष्ट करावी.`,
    symptoms: ["Pinhole punctures weeping sticky sap", "Sudden heavy fruit drop under trees at dusk", "Soft secondary rot around punctures"],
    prevention: [
      "Destroy Gulwel (Tinospora cordifolia) wild creepers in vicinity",
      "Cover individual high-value fruit clusters with nylon net bags"
    ],
    management: [
      "Operate light traps nightly from dusk until 10 PM",
      "Hang poisoned jaggery-malathion bait bottles throughout canopy"
    ],
    source_attribution: "ICAR-CCRI Fruit Protection Guidelines",
    verified_date: "2026-03-10"
  },
  {
    id: 19,
    slug: "citrus-thrips-mites",
    category: "Pests",
    title_en: "Citrus Thrips & Rust Mites Foliar Damage Control",
    title_hi: "सिट्रस थ्रिप्स और रस्ट माइट (मकड़ी) की रोकथाम",
    title_mr: "संत्र्यावरील थ्रिप्स (फुलकिडे) व लाल कोळी नियंत्रण",
    summary_en: "Ring scars around fruit button/calyx, silvering of foliage, wettable sulfur application, and natural predator conservation.",
    summary_hi: "फल के डंठल के चारों ओर छल्लेदार दाग, पत्तियों पर चांदी जैसा रंग और सल्फर का उपयोग।",
    summary_mr: "फळाच्या देठाभोवती पांढुरका गोलाकार चट्टा (रिंग), पानांवरील चंदेरीपणा व विद्राव्य गंधक फवारणी.",
    content_en: `Citrus Thrips (Scirtothrips citri) and Citrus Rust Mites (Phyllocoptruta oleivora) cause cosmetic surface scarring that degrades export-quality Nagpur Mandarin into local culls.

Symptoms:
- Fruit Scarring: Thrips feed under the fruit calyx (button) when the fruitlet is marble-sized, creating a distinctive silvery-gray circular ring scar around the stem end.
- Rust Mite Bronzing: Mites feed on epidermal flavedo cells, causing the rind to turn dull bronze or russet-brown ('sharkskin' texture).

Management:
1. Timing: Spray when 75% of petals have fallen and fruitlets are pea-sized.
2. Chemistry: Foliar spray of Wettable Sulphur 80% WDG @ 3 g/L or Spiromesifen 22.9% SC @ 0.7 mL/L.
3. For Thrips: Fipronil 5% SC @ 1.5 mL/L or Spinetoram 11.7% SC @ 0.8 mL/L.`,
    content_hi: `थ्रिप्स और माइट्स संतरे की ऊपरी त्वचा को नुकसान पहुंचाकर फल की चमक छीन लेते हैं।

लक्षण:
- छोटे फल के डंठल के चारों ओर गोल छल्लेदार सफेद-भूरा दाग बन जाता है।
- माइट्स के कारण फल की त्वचा तांबे जैसी खुरदुरी हो जाती है।

रोकथाम:
- फूल झड़ने के तुरंत बाद घुलनशील सल्फर (3 ग्राम/लीटर) या फिप्रोनिल (1.5 मिली/लीटर) का छिड़काव करें।`,
    content_mr: `थ्रिप्स (फुलकिडे) आणि लाल कोळी यांच्यामुळे संत्र्याच्या सालीवर डाग पडून फळांचा दर्जा घसरतो.

लक्षणे:
- वाटाण्याच्या आकाराच्या लहान फळाच्या देठाभोवती फुलकिडे रस शोषतात, ज्यामुळे फळावर पांढरा गोलाकार चट्टा पडतो.
- कोळीच्या प्रादुर्भावामुळे संत्र्याची साल तांबूस-तपकिरी व खडबडीत बनते.

नियंत्रण:
- झाडाची फुले गळून वाटाण्याएवढी फळे होताच विद्राव्य गंधक ८०% (३ ग्रॅम/लिटर) किंवा फिप्रोनिल ५% (१.५ मिली/लिटर) ची फवारणी करावी.`,
    symptoms: ["Silvery circular ring scar around fruit button", "Russet bronzing of outer rind", "Distorted young leaf flush"],
    prevention: [
      "Avoid dry microclimate by maintaining regular drip rounds",
      "Conserve predatory phytoseiid mites"
    ],
    management: [
      "Spray Wettable Sulphur 80 WDG (3 g/L) or Spiromesifen 22.9 SC (0.7 mL/L)"
    ],
    source_attribution: "ICAR-CCRI Acarology & Entomology Section",
    verified_date: "2026-02-14"
  },

  // NUTRIENT DEFICIENCIES (3 articles)
  {
    id: 20,
    slug: "zinc-iron-deficiency-citrus",
    category: "Nutrient Deficiencies",
    title_en: "Zinc & Iron Chlorosis in Vidarbha Alkaline Vertisols",
    title_hi: "विदर्भ की काली मिट्टी में जिंक और आयरन की कमी के लक्षण",
    title_mr: "विदर्भातील काळ्या जमिनीत जस्त (झिंक) व लोह कमतरता लक्षणे",
    summary_en: "High pH and free calcium carbonate fix micronutrients in Nagpur soils; foliar correction protocols with neutralizing slaked lime.",
    summary_hi: "नागपुर की चूनेदार मिट्टी में सूक्ष्म पोषक तत्वों का बंध जाना, पत्तियों का पीलापन और चूने के साथ जिंक का छिड़काव।",
    summary_mr: "विदर्भातील चुनखडीयुक्त जमिनीत जस्त व लोहाची कमतरता, पानांमधील पिवळेपणा आणि चुन्यासह झिंक फवारणी पद्धत.",
    content_en: `Over 70% of citrus orchards in Vidarbha suffer from subclinical or acute micronutrient deficiencies, predominantly Zinc (Zn) and Iron (Fe).

Soil Chemistry Context:
The deep black cotton soils (Vertisols) have a pH between 7.8 and 8.6 and contain high calcium carbonate. Under alkaline conditions, zinc forms insoluble zinc hydroxide/carbonate, preventing root uptake.

Foliar Correction Protocol (ICAR-CCRI Formulation):
- Zinc Sulphate (21% Zn): 500 g
- Ferrous Sulphate (19% Fe): 250 g
- Manganese Sulphate: 200 g
- Slaked Lime (Choona): 500 g (MANDATORY: Neutralizes acidity to prevent leaf burning)
- Dissolve in 100 Liters of water.
- Spray twice: First at 50% expansion of new flush; second 15 days later.`,
    content_hi: `विदर्भ के 70% संतरा बागों में जिंक और लोहे की कमी पाई जाती है। मिट्टी का उच्च pH (7.8 से अधिक) इन तत्वों को जड़ों द्वारा सोखने नहीं देता।

पत्तियों पर छिड़काव का नुस्खा (100 लीटर पानी के लिए):
- जिंक सल्फेट: 500 ग्राम
- फेरस सल्फेट (लोहा): 250 ग्राम
- मैंगनीज सल्फेट: 200 ग्राम
- बुझा हुआ चूना: 500 ग्राम (पत्तियों को जलने से बचाने के लिए चूना मिलाना अनिवार्य है)
- नई पत्तियों के आने पर 15 दिन के अंतराल पर दो बार छिड़कें।`,
    content_mr: `विदर्भातील ७०% पेक्षा जास्त संत्रा बागांमध्ये जस्त (झिंक) आणि लोह (आयर्न) या सूक्ष्मअन्नद्रव्यांची तीव्र कमतरता दिसून येते.

मातीचे कारण:
काळ्या जमिनीचा सामू जास्त (७.८ ते ८.६) आणि चुनखडीचे प्रमाण जास्त असल्याने मुळांना हे अन्नद्रव्य मिळत नाही.

फवारणीचे अचूक प्रमाण (१०० लिटर पाण्यासाठी):
- झिंक सल्फेट (२१%): ५०० ग्रॅम
- फेरस सल्फेट (हिराकस): २५० ग्रॅम
- मँगनीज सल्फेट: २०० ग्रॅम
- कळीचा चुना: ५०० ग्रॅम (पाने करपू नयेत म्हणून चुना मिसळणे अत्यंत आवश्यक आहे)
- नवीन पालवी फुटल्यावर १५ दिवसांच्या अंतराने दोन फवारण्या कराव्यात.`,
    symptoms: ["Mottled leaf yellowing with sharp green veins", "Little leaf syndrome", "Terminal twig dieback"],
    prevention: [
      "Incorporate well-decomposed FYM enriched with Zinc Solubilizing Bacteria",
      "Avoid over-fertilizing with phosphorus which blocks zinc uptake"
    ],
    management: [
      "Foliar spray Zinc Sulphate 0.5% + Lime 0.25% at 50% leaf flush expansion"
    ],
    source_attribution: "ICAR-CCRI Nagpur Soil Health Advisory",
    verified_date: "2026-03-01"
  },
  {
    id: 21,
    slug: "boron-calcium-deficiency",
    category: "Nutrient Deficiencies",
    title_en: "Boron & Calcium Imbalance: Fruit Hardening & Splitting",
    title_hi: "बोरॉन और कैल्शियम असंतुलन: फल का फटना और कठोर होना",
    title_mr: "बोरॉन व कॅल्शियम कमतरता: फळे तडकणे व कडक होणे",
    summary_en: "Hard misshapen fruit, internal gum pockets in albedo, peel rupture from fluctuating moisture, and foliar Solubor correction.",
    summary_hi: "संतरे के फल का सख्त होना, छिलके में गोंद की थैलियां और पानी के उतार-चढ़ाव से फलों का फटना।",
    summary_mr: "संत्रा फळे कडक होणे, सालीच्या आत डिंकाच्या गाठी आणि अनियमित पाण्यामुळे फळे तडकणे.",
    content_en: `Boron (B) and Calcium (Ca) are structural components of cell walls in developing citrus fruit.

Deficiency Symptoms:
1. Boron Deficiency:
- Developing fruits become hard, lumpy, misshapen, and undersized.
- Brownish gum pockets form inside the white albedo layer and fruit core.
- Leaves show yellow corky veins that crack on the upper surface.

2. Calcium Deficiency & Fruit Splitting:
- Longitudinal rupture of the rind during August-September when dry spells are followed by heavy downpours.
- Rapid swelling of pulp outpaces rigid calcium-deficient flavedo, tearing the fruit.

Correction:
- Foliar spray of Solubor / Borax (20% B) @ 1.0 to 1.5 g/L during marble stage.
- Soil application of Calcium Nitrate @ 200 g per tree in split doses.`,
    content_hi: `बोरॉन और कैल्शियम की कमी से फलों की गुणवत्ता खराब हो जाती है।

लक्षण:
1. बोरॉन की कमी: फल सख्त और बेडौल हो जाते हैं, छिलके के अंदर गोंद की गांठे बन जाती हैं।
2. कैल्शियम की कमी: अगस्त-सितंबर में अनियमित बारिश के कारण फल बीच से फटने लगते हैं।

उपाय:
- बोरॉन (घुलनशील बोरान 20%) 1 से 1.5 ग्राम/लीटर का छिड़काव करें।
- ड्रिप से कैल्शियम नाइट्रेट 200 ग्राम प्रति पेड़ दें।`,
    content_mr: `बोरॉन आणि कॅल्शियम हे फळांच्या पेशींची भिंत मजबूत ठेवणारे महत्त्वाचे घटक आहेत.

लक्षणे:
१. बोरॉन कमतरता: फळे लहान, कडक व वेडीवाकडी होतात. पांढऱ्या सालीच्या आत डिंकाच्या तपकिरी गाठी तयार होतात.
२. कॅल्शियम कमतरता व फळे तडकणे: ऑगस्ट-सप्टेंबरमध्ये पावसाचा खंड पडून पुन्हा पाऊस आल्यास फळे उभी तडकतात.

उपाय:
- वाटाण्याच्या आकाराची फळे असताना विद्राव्य बोरॉन (२०%) १ ते १.५ ग्रॅम/लिटरची फवारणी करावी.
- जमिनीतून कॅल्शियम नायट्रेट २०० ग्रॅम प्रति झाड द्यावे.`,
    symptoms: ["Hard lumpy fruit with brown gum pockets in peel", "Longitudinal fruit splitting", "Corky veins on older leaves"],
    prevention: [
      "Maintain consistent soil moisture via drip irrigation to avoid rind tension",
      "Apply Solubor spray at pea-sized fruit stage"
    ],
    management: [
      "Foliar spray Borax 0.1% + Calcium Nitrate 0.2%"
    ],
    source_attribution: "ICAR-CCRI Micronutrient Division",
    verified_date: "2026-02-16"
  },
  {
    id: 22,
    slug: "nitrogen-phosphorus-potassium-npk",
    category: "Nutrient Deficiencies",
    title_en: "Macronutrient (NPK) Balance for Nagpur Mandarin",
    title_hi: "नागपुर संतरा के लिए मुख्य पोषक तत्व (NPK) संतुलन",
    title_mr: "नागपूर संत्रा बागेसाठी मुख्य अन्नद्रव्ये (NPK) संतुलित मात्रा",
    summary_en: "Tree age-specific NPK dosages, ring application method, and role of Potassium in fruit sizing and TSS sugar enhancement.",
    summary_hi: "पेड़ की उम्र के अनुसार खाद की मात्रा, खाद देने का सही तरीका और फल के आकार व मिठास के लिए पोटाश का महत्व।",
    summary_mr: "झाडाच्या वयानुसार रासायनिक खतांची शिफारशीत मात्रा, बांगडी पद्धत आणि फळांच्या गोडीसाठी पालाशचे महत्त्व.",
    content_en: `Citrus trees have high nutrient requirements across their 25-30 year productive lifespan.

Standard Annual Doses per Mature Tree (8+ years):
- Nitrogen (N): 600 grams (equivalent to 1300 g Urea)
- Phosphorus (P2O5): 200 grams (equivalent to 1250 g Single Super Phosphate - SSP)
- Potassium (K2O): 300 grams (equivalent to 500 g Muriate of Potash - MOP)
- Organic Manure: 40-50 kg well-rotted FYM or 10 kg Vermicompost.

Role of Potassium:
Potassium is directly responsible for water regulation, rind toughness, fruit size, and TSS sugar accumulation. Applying potassium nitrate (13-0-45 @ 10 g/L) as a foliar spray in August and September significantly increases export-grade fruit percentage.

Application Method:
Never broadcast fertilizers touching the tree trunk. Apply in a shallow circular ring (trench) dug under the drip-line (outer edge of tree canopy), 1.5 meters away from the trunk.`,
    content_hi: `वयस्क संतरा पेड़ (8 वर्ष से अधिक) के लिए वार्षिक खाद की सिफारिश:

- नाइट्रोजन: 600 ग्राम (लगभग 1300 ग्राम यूरिया)
- फास्फोरस: 200 ग्राम (1250 ग्राम सिंगल सुपर फास्फेट)
- पोटाश: 300 ग्राम (500 ग्राम म्यूरेट ऑफ पोटाश)
- गोबर की सड़ी खाद: 40 से 50 किलो।

पोटाश का महत्व:
पोटाश फल के आकार, छिलके की मजबूती और मिठास (TSS) को बढ़ाता है।

खाद देने का सही तरीका:
खाद को कभी भी तने के पास न डालें। तने से 1.5 मीटर दूर छांव के घेरे (ड्रिप लाइन) में रिंग बनाकर डालें और मिट्टी से ढक दें।`,
    content_mr: `मोठ्या संत्रा झाडासाठी (८ वर्षांवरील) वार्षिक खतांची शिफारस:

- नत्र: ६०० ग्रॅम (१३०० ग्रॅम युरिया)
- स्फुरद: २०० ग्रॅम (१२५० ग्रॅम सिंगल सुपर फॉस्फेट)
- पालाश: ३०० ग्रॅम (५०० ग्रॅम म्युरिएट ऑफ पोटॅश)
- चांगले कुजलेले शेणखत: ४० ते ५० किलो किंवा गांडूळ खत १० किलो.

पालाशचे (Potash) महत्त्व:
पालाशमुळे फळांचा आकार मोठा होतो, साल चकचकीत राहते आणि रसातील गोडी (TSS) वाढते.

खत देण्याची पद्धत:
खते कधीही खोडाजवळ टाकू नयेत. खोडापासून १ ते १.५ मीटर अंतरावर झाडाच्या परिघावर बांगडी पद्धतीने चर खोदून खते द्यावीत व मातीने झाकून पाणी द्यावे.`,
    symptoms: ["Pale yellow older leaves from nitrogen deficiency", "Small sour fruit from low potassium", "Dull leaves with purple tint from low phosphorus"],
    prevention: [
      "Conduct annual leaf tissue analysis in July-August to adjust fertigation",
      "Split nitrogen into three doses: blooming, fruit set, and monsoon"
    ],
    management: [
      "Foliar spray Potassium Nitrate 13-0-45 (10 g/L) at fruit marble stage"
    ],
    source_attribution: "ICAR-CCRI Soil Science & Agronomy Guidelines",
    verified_date: "2026-03-04"
  },

  // SEASONAL CARE CALENDAR (3 articles)
  {
    id: 23,
    slug: "seasonal-calendar-nagpur",
    category: "Seasonal Care Calendar",
    title_en: "12-Month Nagpur Mandarin Agro-Advisory Calendar",
    title_hi: "नागपुर संतरा 12 माह की संपूर्ण कृषि-मार्गदर्शिका",
    title_mr: "नागपूर संत्रा १२ महिन्यांचे संपूर्ण कृषी वेळापत्रक (विदर्भ)",
    summary_en: "Comprehensive month-by-month checklist for Vidarbha growers covering water stress, pest vigilance, fertilization, and harvest.",
    summary_hi: "विदर्भ के किसानों के लिए माह-वार संतरा बाग प्रबंधन, सिंचाई, खाद और कीट नियंत्रण की विस्तृत चेकलिस्ट।",
    summary_mr: "विदर्भातील संत्रा उत्पादकांसाठी महिनानिहाय पाण्याचा ताण, खते, फवारण्या आणि काढणीचे परिपूर्ण वेळापत्रक.",
    content_en: `Vidarbha citrus growers manage two principal crop seasons: Ambia Bahar (flowering Jan-Feb, harvest Oct-Dec) and Mrig Bahar (flowering June, harvest Feb-April).

Month-by-Month Milestone Summary:
- January: Water stress breaking for Ambia crop. Light irrigation + 30% N and 50% P2O5 fertigation.
- February: Full bloom. Protect honeybee pollinators; strictly avoid chemical insecticides during bloom.
- March: Pea-sized fruitlets. Spray Potassium Nitrate (1%) and Zn+Fe micronutrients to prevent fruit drop.
- April-May: Water stress imposition for Mrig Bahar (40-45 days). Whitewash trunks with Bordeaux paste up to 2 feet. Kaolin clay spray for sun scald protection.
- June: Monsoon onset triggers Mrig flowering. Ensure quick surface drainage; drench with Trichoderma to stop collar rot.
- July-August: Monsoon flush care. Spray 1% Bordeaux mixture to control canker and anthracnose.
- September-October: Ambia harvesting commences. High-alert for Fruit Sucking Moth at dusk. Maintain steady drip for sizing Mrig fruit.
- November-December: Post-harvest orchard sanitation. Scientific pruning of dead twigs and Bordeaux whitewashing.`,
    content_hi: `विदर्भ में संतरे की दो मुख्य फसलें होती हैं: अंबिया बहार और मृग बहार।

12 महीने का संक्षिप्त कैलेंडर:
- जनवरी: अंबिया बहार का पानी का तनाव तोड़ें। हल्की सिंचाई और खाद दें।
- फरवरी: फूल खिलने का समय। मधुमक्खियों की सुरक्षा के लिए कीटनाशक न छिड़कें।
- मार्च: मटर के दाने जितने फल। फलन बढ़ाने के लिए पोटेशियम नाइट्रेट और जिंक का छिड़काव।
- अप्रैल-मई: मृग बहार के लिए 40-45 दिन पानी रोकें (तनाव दें)। तने पर बोर्डो पेस्ट लगाएं।
- जून: बारिश से मृग बहार फूटेगा। जल निकासी सही रखें और ट्राइकोडर्मा का प्रयोग करें।
- जुलाई-अगस्त: 1% बोर्डो मिश्रण का छिड़काव करें ताकि कैंकर और फफूंद न लगे।
- सितंबर-अक्टूबर: अंबिया संतरा की तुड़ाई शुरू। रात में फल चूसक पतंगे से बचाव करें।
- नवंबर-दिसंबर: तुड़ाई के बाद सूखी शाखाओं की छंटाई करें और तने पर लेप लगाएं।`,
    content_mr: `विदर्भात प्रामुख्याने दोन बहार धरले जातात: अंबिया बहार आणि मृग बहार.

१२ महिन्यांचे सविस्तर कृषी नियोजन:
- जानेवारी: अंबिया बहाराचा ताण तोडणे. पहिली हलकी ओल देऊन नत्र व स्फुरद खते द्यावीत.
- फेब्रुवारी: पूर्ण फुलधारणा. परागीभवनासाठी कीटकनाशक फवारणी टाळावी.
- मार्च: वाटाण्याएवढी फळे. फळगळ रोखण्यासाठी पोटॅशियम नायट्रेट व झिंकची फवारणी करावी.
- एप्रिल-मे: मृग बहारासाठी ४०-४५ दिवस पाण्याचा कडक ताण द्यावा. खोडाला बोर्डो पेस्ट लावावी.
- जून: पावसाने ताण तुटून नवीन फुले येतात. खोडाजवळ पाणी साचू न देता ट्रायकोडर्मा वापरावे.
- जुलै-ऑगस्ट: कॅन्कर व करपा प्रतिबंधासाठी १% बोर्डो मिश्रणाची फवारणी करावी.
- सप्टेंबर-ऑक्टोबर: अंबिया संत्रा काढणी सुरू. संध्याकाळी रसशोषक पतंगाचा बंदोबस्त करावा.
- नोव्हेंबर-डिसेंबर: काढणीनंतर वाळलेल्या फांद्यांची छाटणी करून बागेची स्वच्छता करावी.`,
    symptoms: ["Seasonal water stress mismanagement", "Severe fruit drop from sudden overwatering", "Sun scald on southwest canopy"],
    prevention: [
      "Follow ICAR-CCRI weather-linked advisory bulletins weekly",
      "Ensure proper drainage before monsoon onset"
    ],
    management: [
      "Adhere strictly to recommended month-by-month agro-inputs"
    ],
    source_attribution: "ICAR-CCRI Package of Practices for Nagpur Mandarin",
    verified_date: "2026-03-20"
  },
  {
    id: 24,
    slug: "ambia-vs-mrig-bahar-guide",
    category: "Seasonal Care Calendar",
    title_en: "Selecting Between Ambia Bahar and Mrig Bahar in Vidarbha",
    title_hi: "अंबिया बहार बनाम मृग बहार: सही बहार का चयन कैसे करें",
    title_mr: "अंबिया बहार की मृग बहार? विदर्भातील योग्य बहार निवड मार्गदर्शक",
    summary_en: "Strategic decision guide based on irrigation security, summer water table, pest pressures, and seasonal market price realization.",
    summary_hi: "पानी की उपलब्धता, गर्मी के मौसम में कुएं के जलस्तर और बाजार भाव के आधार पर सही बहार का चुनाव।",
    summary_mr: "पाण्याची उपलब्धता, उन्हाळ्यातील विहिरीची पातळी आणि बाजारभावाच्या आधारावर योग्य बहाराची निवड.",
    content_en: `Nagpur Mandarin produces three natural flowerings annually (Ambia, Mrig, and Hasta). A commercial grower must select only ONE main bahar per year to avoid exhausting the tree.

1. Ambia Bahar (Jan-Feb Flowering, Oct-Dec Harvest):
- Pros: Produces the largest yield and highest fruit quality with classic golden rind color. High festival demand during Diwali.
- Requirements: Requires guaranteed assured irrigation throughout scorching summer months (March, April, May). If summer water fails, entire crop will drop.

2. Mrig Bahar (June Flowering, Feb-April Harvest):
- Pros: Flowering is driven by the natural monsoon rain, requiring zero irrigation during fruit set. High summer market prices in North India during March-April.
- Cons: Water stress must be given in peak May heat, which can sunburn branches. High fruit fly and canker pressure during early fruit development in rainy season.

Rule of Thumb:
- Assured Wells/Canal: Opt for Ambia Bahar.
- Limited Summer Water: Opt for Mrig Bahar.`,
    content_hi: `संतरे के पेड़ में साल में तीन बार फूल आते हैं लेकिन किसान को पेड़ की लंबी उम्र के लिए एक ही बहार लेना चाहिए।

1. अंबिया बहार (जनवरी-फरवरी फूल, अक्टूबर-दिसंबर तुड़ाई):
- लाभ: सबसे अधिक उत्पादन और बेहतरीन गुणवत्ता। दिवाली के समय अच्छी मांग।
- शर्त: मार्च, अप्रैल और मई में भरपूर पानी की सुविधा होनी चाहिए।

2. मृग बहार (जून फूल, फरवरी-अप्रैल तुड़ाई):
- लाभ: मानसून की बारिश से फूल आते हैं, गर्मी में पानी की बचत। मार्च-अप्रैल में उत्तर भारत में बहुत ऊंचे दाम मिलते हैं।
- जोखिम: बारिश के मौसम में फफूंद और कीटों का प्रकोप अधिक रहता है।

नियम:
- भरपूर पानी है तो अंबिया बहार लें।
- गर्मी में पानी कम है तो मृग बहार लें।`,
    content_mr: `संत्र्याला वर्षातून तीन वेळा बहर येतो, परंतु झाडाचे आयुष्य टिकवण्यासाठी वर्षातून एकच मुख्य बहर धरावा.

१. अंबिया बहार (जानेवारी-फेब्रुवारी फूल, ऑक्टोबर-डिसेंबर काढणी):
- फायदे: सर्वात जास्त उत्पादन, उत्कृष्ट चव आणि आकर्षक सोनेरी रंग. दिवाळीच्या काळात मोठी मागणी.
- अट: मार्च, एप्रिल आणि मे या कडक उन्हाळ्यात मुबलक पाण्याची सोय असणे अनिवार्य आहे.

२. मृग बहार (जून फूल, फेब्रुवारी-एप्रिल काढणी):
- फायदे: मान्सूनच्या नैसर्गिक पावसावर बहर येतो, त्यामुळे उन्हाळ्यात पाण्याचा ताण देणे सोपे जाते. उन्हाळ्यात (मार्च-एप्रिल) उत्तर भारतात संत्र्याला विक्रमी दर मिळतात.
- आव्हाने: पावसाळ्यात कॅन्कर व किडींचा प्रादुर्भाव जास्त असतो.

थोडक्यात:
- मुबलक पाणी उपलब्ध असल्यास अंबिया बहार धरावा.
- उन्हाळ्यात पाण्याची कमतरता असल्यास हमखास मृग बहार धरावा.`,
    symptoms: ["Dual cropping exhausting tree reserves", "Catastrophic summer fruit drop on water deficit"],
    prevention: [
      "Never attempt both Ambia and Mrig crops on the same tree in the same year"
    ],
    management: [
      "Thin excess fruitlets if tree vigor is low"
    ],
    source_attribution: "Dr. PDKV Akola & ICAR-CCRI Economics & Extension",
    verified_date: "2026-02-28"
  },
  {
    id: 25,
    slug: "post-harvest-grading-marketing",
    category: "Seasonal Care Calendar",
    title_en: "Harvesting, Desapping, Washing & Waxing for Market",
    title_hi: "तुड़ाई, ग्रेडिंग, धुलाई, वैक्सिंग और बाजार प्रबंधन",
    title_mr: "संत्रा काढणी, प्रतवारी, धुलाई, वॅक्सिंग व बाजारपेठ व्यवस्थापन",
    summary_en: "Clipper harvesting protocol, ethylene degreening, sorting by size and blemish score, food-grade waxing, and cold storage parameters.",
    summary_hi: "क्लिपर से वैज्ञानिक तुड़ाई, एथिलीन से रंग निखारना, ग्रेडिंग, वैक्सिंग और कोल्ड स्टोरेज के नियम।",
    summary_mr: "कटरने काढणी, नैसर्गिक रंग आणणे, आकारानुसार प्रतवारी, फूड-ग्रेड वॅक्सिंग आणि शीतगृह साठवणूक.",
    content_en: `Post-harvest losses in Nagpur Mandarin reach 20-25% when traditional rough handling is practiced. Scientific handling preserves shelf life up to 45-60 days.

1. Scientific Harvesting:
- Harvest using specialized curved-tip citrus clippers leaving a 2 mm button intact.
- NEVER yank, twist, or pull fruits by hand. Pulling tears the rind (plugging), allowing Penicillium blue and green molds to enter within hours.
- Harvest only on dry mornings after dew has evaporated. Never harvest wet fruit.

2. Washing & Fungicidal Dip:
- Wash harvested fruit in potable chlorinated water (100-150 ppm active chlorine).
- Dip in warm water (45°C) with Imazalil (500 ppm) or Thiabendazole for 2 minutes to control post-harvest stem-end rot and green mold.

3. Waxing & Grading:
- Coat with food-grade carnauba citrus wax containing 0.1% carbendazim. Waxing reduces transpiration weight loss by 60% and imparts a radiant natural gloss.
- Grade by diameter: Grade A (>70 mm), Grade B (65-70 mm), Grade C (<65 mm).

4. Cold Storage:
- Temperature: 5°C to 7°C (41-45°F).
- Relative Humidity: 85% to 90%. Avoid temperatures below 4°C to prevent chilling injury.`,
    content_hi: `सही तरीके से तुड़ाई और ग्रेडिंग करने से संतरा 45-60 दिनों तक ताजा रहता है।

1. तुड़ाई का तरीका:
- हाथ से खींचकर कभी न तोड़ें। विशेष कैंची (क्लिपर) से 2 मिमी डंठल छोड़कर काटें।
- सुबह ओस सूखने के बाद ही तुड़ाई करें।

2. धुलाई और वैक्सिंग:
- फलों को साफ पानी में धोएं।
- फूड-ग्रेड कार्नौबा वैक्स की परत चढ़ाएं। इससे फल में चमक आती है और नमी नहीं उड़ती।
- आकार के अनुसार ग्रेडिंग करें: ए-ग्रेड (70 मिमी से बड़ा), बी-ग्रेड (65-70 मिमी)।

3. कोल्ड स्टोरेज:
- तापमान 5 से 7 डिग्री सेल्सियस और आर्द्रता 85-90% होनी चाहिए।`,
    content_mr: `योग्य काढणी व हाताळणीमुळे संत्र्याचे आयुष्य ४५ ते ६० दिवसांपर्यंत वाढवता येते.

१. शास्त्रीय काढणी:
- संत्रा हाताने ओढून कधीही तोडू नये, कारण देठाजवळ साल फाटून बुरशीचा संसर्ग होतो.
- संत्रा कटरने (क्लिपर) देठाजवळ २ मिमी भाग ठेवून हळुवार कापावा.
- सकाळी दव सुकल्यानंतरच कोरड्या वातावरणात काढणी करावी.

२. धुलाई व वॅक्सिंग:
- फळे स्वच्छ पाण्यात धुवून फूड-ग्रेड कार्नौबा वॅक्सचा पातळ थर द्यावा. यामुळे फळांचे वजन घटत नाही व चमक वाढते.
- आकारानुसार प्रतवारी करावी: 'अ' ग्रेड (७० मिमी पेक्षा मोठे), 'ब' ग्रेड (६५ ते ७० मिमी).

३. शीतगृह साठवणूक:
- तापमान ५ ते ७ अंश से. आणि आर्द्रता ८५ ते ९०% ठेवावी.`,
    symptoms: ["Stem-end rot from rough harvest plugging", "Green and blue mold sporulation in transit", "Chilling injury pitting below 4°C"],
    prevention: [
      "Strictly mandate clipper harvesting with rubber-padded collection crates",
      "Do not expose harvested crates to direct scorching field sunlight"
    ],
    management: [
      "Dip in Imazalil 500 ppm before cold chain dispatch"
    ],
    source_attribution: "ICAR-CCRI Post-Harvest Engineering Division",
    verified_date: "2026-03-18"
  }
];
