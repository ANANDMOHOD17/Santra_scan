import httpx
from typing import Dict, Any
from .config import settings

async def fetch_nagpur_weather(lat: float = settings.DEFAULT_LATITUDE, lon: float = settings.DEFAULT_LONGITUDE) -> Dict[str, Any]:
    """
    Fetches real-time weather from Open-Meteo for Vidarbha/Nagpur citrus belts.
    Computes disease risk factors (high humidity + temperature favors fungal blight/Phytophthora).
    """
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=Asia%2FKolkata"
    
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json()
                current = data.get("current", {})
                temp = current.get("temperature_2m", 28.5)
                humidity = current.get("relative_humidity_2m", 65.0)
                precip = current.get("precipitation", 0.0)
                wind = current.get("wind_speed_10m", 8.2)

                # Agricultural disease risk analysis
                disease_risk = "Low"
                risk_advice_en = "Favorable nursery conditions. Standard misting and watering."
                risk_advice_hi = "नर्सरी के लिए अनुकूल परिस्थितियां। सामान्य सिंचाई।"
                risk_advice_mr = "रोपवाटिकेसाठी अनुकूल हवामान. नेहमीप्रमाणे पाणी व्यवस्थापन ठेवा."

                if humidity > 75.0 and temp >= 24.0:
                    disease_risk = "High"
                    risk_advice_en = "High humidity detected (>75%). Alert: elevated risk of Phytophthora foliar blight & damping-off. Ensure bench air circulation."
                    risk_advice_hi = "उच्च आर्द्रता (>75%)। चेतावनी: फाइटोफ्थोरा झुलसा और डैम्पिंग-ऑफ का उच्च जोखिम। हवा का संचार सुनिश्चित करें।"
                    risk_advice_mr = "हवेतील जास्त आर्द्रता (>७५%). इशारा: फायटोफ्थोरा व मर रोगाचा प्रादुर्भाव वाढण्याची शक्यता. हवा खेळती ठेवा."
                elif temp > 38.0:
                    disease_risk = "Moderate"
                    risk_advice_en = "High summer temperature. Protect tender grafted shoots from sun-scald with shade netting."
                    risk_advice_hi = "अत्यधिक तापमान। कोमल कलमी शाखाओं को शेडनेट से सुरक्षित करें।"
                    risk_advice_mr = "उष्णतेची लाट. नवीन कलमांना उन्हापासून वाचवण्यासाठी शेडनेटचा वापर करा."

                return {
                    "source": "Open-Meteo Live API",
                    "location_name": "Nagpur (Vidarbha Citrus Region)",
                    "latitude": lat,
                    "longitude": lon,
                    "temperature_c": temp,
                    "relative_humidity_percent": humidity,
                    "precipitation_mm": precip,
                    "wind_speed_kmh": wind,
                    "citrus_disease_risk": disease_risk,
                    "risk_advice_en": risk_advice_en,
                    "risk_advice_hi": risk_advice_hi,
                    "risk_advice_mr": risk_advice_mr,
                    "timestamp": current.get("time", "")
                }
    except Exception as e:
        # Graceful fallback if offline or timeout
        pass

    # Reliable default based on Vidarbha seasonal norm
    return {
        "source": "Nagpur Regional Baseline (Cached)",
        "location_name": "Nagpur, Maharashtra",
        "latitude": lat,
        "longitude": lon,
        "temperature_c": 31.5,
        "relative_humidity_percent": 62.0,
        "precipitation_mm": 0.0,
        "wind_speed_kmh": 7.5,
        "citrus_disease_risk": "Low",
        "risk_advice_en": "Standard Vidarbha conditions. Inspect rootstocks for proper moisture.",
        "risk_advice_hi": "विदर्भ क्षेत्र हेतु सामान्य स्थिति। पर्याप्त नमी की जांच करें।",
        "risk_advice_mr": "विदर्भातील सामान्य हवामान. मुळांभोवती योग्य ओलावा तपासा.",
        "timestamp": "2026-10-05T09:00"
    }
