import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ClipboardCheck, 
  ShieldCheck, 
  AlertCircle, 
  CloudRain, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecoveryAdvisory({ advisory, weather }) {
  const { t, lang } = useLanguage();

  if (!advisory) return null;

  // Localized summary
  const summary = lang === 'mr' 
    ? (advisory.summary_mr || advisory.summary_en)
    : lang === 'hi'
    ? (advisory.summary_hi || advisory.summary_en)
    : advisory.summary_en;

  const immediateActions = advisory.immediate_actions || [];
  const prevention = advisory.prevention_measures || [];
  const readingSlugs = advisory.recommended_reading_slugs || [];

  return (
    <div className="paper-card p-5 sm:p-7 border border-ink/10 shadow-paper space-y-6">
      <div className="flex items-center space-x-3 border-b border-ink/10 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-orange/20 text-orange-deep flex items-center justify-center">
          <ClipboardCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-ink">
            {t('advisory.title')}
          </h3>
          <p className="text-xs text-muted">
            {t('advisory.subtitle')}
          </p>
        </div>
      </div>

      {/* Advisory Overview Banner */}
      <div className="p-4 rounded-2xl bg-chalk/70 border border-ink/10 text-sm sm:text-base leading-relaxed text-ink font-medium">
        {summary}
      </div>

      {/* Weather Disease Risk Integration (PRD FR18) */}
      {weather && (
        <div className="p-4 rounded-2xl bg-leaf/10 border border-leaf/30 flex items-start space-x-3">
          <CloudRain className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold text-leaf-forest flex items-center space-x-2">
              <span>{t('advisory.weather_advisory')}</span>
              <span className="bg-leaf text-white px-2 py-0.5 rounded-full text-[10px]">
                {weather.citrus_disease_risk} Risk
              </span>
            </div>
            <p className="text-ink/80">
              {lang === 'mr' ? weather.risk_advice_mr : lang === 'hi' ? weather.risk_advice_hi : weather.risk_advice_en}
            </p>
          </div>
        </div>
      )}

      {/* Immediate Actions List (Prioritised) */}
      {immediateActions.length > 0 && (
        <div>
          <h4 className="font-serif font-bold text-base text-ink mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-verdict-reject" />
            <span>{t('advisory.immediate_actions')}</span>
          </h4>
          <div className="space-y-3">
            {immediateActions.map((act, idx) => {
              const title = lang === 'mr' ? act.title_mr : lang === 'hi' ? act.title_hi : act.title_en;
              const desc = lang === 'mr' ? act.description_mr : lang === 'hi' ? act.description_hi : act.description_en;

              return (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange/20 text-orange-deep font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-ink mb-1">{title}</h5>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prevention Measures */}
      {prevention.length > 0 && (
        <div>
          <h4 className="font-serif font-bold text-base text-ink mb-3 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-leaf" />
            <span>{t('advisory.prevention')}</span>
          </h4>
          <ul className="space-y-2">
            {prevention.map((prevText, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-ink/80">
                <span className="w-1.5 h-1.5 rounded-full bg-leaf flex-shrink-0 mt-2" />
                <span>{prevText}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Linked Orange Book Articles */}
      {readingSlugs.length > 0 && (
        <div className="bg-chalk/50 p-4 rounded-2xl border border-ink/10">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-orange-deep" />
            <span className="font-serif font-bold text-xs uppercase tracking-wide text-ink">
              Verified Orange Book Reference
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {readingSlugs.map((slug) => (
              <Link
                key={slug}
                to={`/orange-book`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-chalk border border-ink/15 rounded-xl text-xs font-semibold text-ink transition-all shadow-sm"
              >
                <span>Read Guide: {slug.replace(/-/g, ' ')}</span>
                <ExternalLink className="w-3 h-3 text-muted" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Regulatory / ICAR Disclaimer Note */}
      <div className="text-[11px] text-muted italic border-t border-ink/10 pt-3">
        {advisory.disclaimer || t('screening_disclaimer')}
      </div>
    </div>
  );
}
