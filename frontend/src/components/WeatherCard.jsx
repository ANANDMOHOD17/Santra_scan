import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CloudRain, Wind, Droplets, Thermometer, ShieldAlert, Sparkles } from 'lucide-react';

export default function WeatherCard() {
  const { t, lang } = useLanguage();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/scans/1') // Or health endpoint/weather
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.weather_snapshot) {
          setWeather(data.weather_snapshot);
        } else {
          // Direct fetch from Open-Meteo
          fetch('https://api.open-meteo.com/v1/forecast?latitude=21.1458&longitude=79.0882&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=Asia%2FKolkata')
            .then(res => res.json())
            .then(wData => {
              const cur = wData.current || {};
              setWeather({
                temperature_c: cur.temperature_2m || 30.5,
                relative_humidity_percent: cur.relative_humidity_2m || 65.0,
                precipitation_mm: cur.precipitation || 0.0,
                wind_speed_kmh: cur.wind_speed_10m || 8.0,
                citrus_disease_risk: (cur.relative_humidity_2m > 75) ? 'High' : 'Low',
                risk_advice_en: 'Favorable nursery conditions. Standard misting.',
                risk_advice_hi: 'नर्सरी के लिए अनुकूल परिस्थितियां।',
                risk_advice_mr: 'रोपवाटिकेसाठी अनुकूल हवामान. नेहमीप्रमाणे पाणी व्यवस्थापन ठेवा.'
              });
            })
            .catch(() => {});
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !weather) return null;

  const isRiskHigh = weather.citrus_disease_risk === 'High';
  const advice = lang === 'mr' ? weather.risk_advice_mr : lang === 'hi' ? weather.risk_advice_hi : weather.risk_advice_en;

  return (
    <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper relative overflow-hidden bg-gradient-to-br from-white to-[#F7F2E6]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-ink/10 gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange/20 text-orange-deep flex items-center justify-center">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-ink">
              {t('weather.title')}
            </h4>
            <span className="text-[10px] text-muted font-medium">
              Nagpur Citrus Region (Open-Meteo Live API)
            </span>
          </div>
        </div>

        {/* Pathogen Risk Badge */}
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 self-start ${
          isRiskHigh
            ? 'bg-verdict-reject/15 text-verdict-reject border-verdict-reject/30 animate-pulse'
            : 'bg-leaf/15 text-leaf border-leaf/30'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isRiskHigh ? 'bg-verdict-reject' : 'bg-leaf'}`} />
          <span>{weather.citrus_disease_risk} Disease Risk</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-white/80 p-2.5 rounded-2xl border border-ink/10 text-center shadow-sm">
          <div className="flex items-center justify-center text-orange-deep mb-1">
            <Thermometer className="w-3.5 h-3.5" />
          </div>
          <div className="text-[10px] text-muted">{t('weather.temp')}</div>
          <div className="font-serif font-bold text-sm text-ink">{weather.temperature_c}°C</div>
        </div>

        <div className="bg-white/80 p-2.5 rounded-2xl border border-ink/10 text-center shadow-sm">
          <div className="flex items-center justify-center text-leaf mb-1">
            <Droplets className="w-3.5 h-3.5" />
          </div>
          <div className="text-[10px] text-muted">{t('weather.humidity')}</div>
          <div className="font-serif font-bold text-sm text-ink">{weather.relative_humidity_percent}%</div>
        </div>

        <div className="bg-white/80 p-2.5 rounded-2xl border border-ink/10 text-center shadow-sm">
          <div className="flex items-center justify-center text-soil mb-1">
            <CloudRain className="w-3.5 h-3.5" />
          </div>
          <div className="text-[10px] text-muted">Rain</div>
          <div className="font-serif font-bold text-sm text-ink">{weather.precipitation_mm} mm</div>
        </div>

        <div className="bg-white/80 p-2.5 rounded-2xl border border-ink/10 text-center shadow-sm">
          <div className="flex items-center justify-center text-muted mb-1">
            <Wind className="w-3.5 h-3.5" />
          </div>
          <div className="text-[10px] text-muted">Wind</div>
          <div className="font-serif font-bold text-sm text-ink">{weather.wind_speed_kmh} km/h</div>
        </div>
      </div>

      {/* Contextual Advisory */}
      <p className="text-xs text-ink/80 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-ink/5">
        💡 <span className="font-semibold">Orchard Tip:</span> {advice}
      </p>
    </div>
  );
}
