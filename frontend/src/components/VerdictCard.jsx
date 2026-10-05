import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Volume2, 
  QrCode, 
  Eye, 
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VerdictCard({ scan, onOpenPassport }) {
  const { t, speakText, lang } = useLanguage();
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedImageView, setSelectedImageView] = useState('leaf_closeup');

  const verdict = scan?.overall_verdict || 'suitable';
  const confidence = Math.round((scan?.confidence_score || 0.9) * 100);

  // Verdict configs matching PRD Section 11 palette
  const verdictConfig = {
    suitable: {
      label: t('verdict.suitable'),
      desc: t('verdict.suitable_desc'),
      bg: 'bg-[#E4F4E8]',
      border: 'border-[#1F7A3D]/40',
      text: 'text-[#1F7A3D]',
      badgeBg: 'bg-[#1F7A3D] text-white',
      icon: CheckCircle2,
      farmerWord: 'योग्य (Good)',
    },
    questionable: {
      label: t('verdict.questionable'),
      desc: t('verdict.questionable_desc'),
      bg: 'bg-[#FFF1D6]',
      border: 'border-[#A86A00]/40',
      text: 'text-[#A86A00]',
      badgeBg: 'bg-[#A86A00] text-white',
      icon: AlertTriangle,
      farmerWord: 'पुन्हा तपासा (Check Again)',
    },
    reject: {
      label: t('verdict.reject'),
      desc: t('verdict.reject_desc'),
      bg: 'bg-[#FDE6E4]',
      border: 'border-[#B3261E]/40',
      text: 'text-[#B3261E]',
      badgeBg: 'bg-[#B3261E] text-white',
      icon: XCircle,
      farmerWord: 'लागवड करू नका (Do Not Plant)',
    },
    // Mature tree fallbacks
    healthy_looking: {
      label: t('verdict.healthy_looking'),
      desc: 'Canopy density and foliage meet healthy Vidarbha orchard standards.',
      bg: 'bg-[#E4F4E8]',
      border: 'border-[#1F7A3D]/40',
      text: 'text-[#1F7A3D]',
      badgeBg: 'bg-[#1F7A3D] text-white',
      icon: CheckCircle2,
      farmerWord: 'निरोगी (Healthy)',
    },
    warning_signs: {
      label: t('verdict.warning_signs'),
      desc: 'Early foliage curling or minor pest infestation noted. Treat early.',
      bg: 'bg-[#FFF1D6]',
      border: 'border-[#A86A00]/40',
      text: 'text-[#A86A00]',
      badgeBg: 'bg-[#A86A00] text-white',
      icon: AlertTriangle,
      farmerWord: 'सतर्कता (Warning)',
    },
    significant_concern: {
      label: t('verdict.significant_concern'),
      desc: 'Severe gummosis or canopy dieback symptoms. Immediate isolation required.',
      bg: 'bg-[#FDE6E4]',
      border: 'border-[#B3261E]/40',
      text: 'text-[#B3261E]',
      badgeBg: 'bg-[#B3261E] text-white',
      icon: XCircle,
      farmerWord: 'गंभीर रोग (Concern)',
    }
  };

  const config = verdictConfig[verdict] || verdictConfig.suitable;
  const VerdictIcon = config.icon;

  // Find image for Grad-CAM display
  const leafImage = scan?.images?.find(i => i.view_type === selectedImageView) || scan?.images?.[0];
  const heatmapUrl = leafImage?.heatmap_path || leafImage?.file_path;
  const originalUrl = leafImage?.file_path;

  // Trigger speech synthesis
  const handleVoiceReadout = () => {
    let summaryText = "";
    if (lang === 'mr') {
      summaryText = `संत्रा तपासणी निकाल: ${config.farmerWord}. रोपाची गुणवत्ता ${confidence} टक्के अचूकतेने नोंदवली गेली. सल्ला: ${scan?.recovery_advisory?.summary_mr || 'योग्य काळजी घ्या.'}`;
    } else if (lang === 'hi') {
      summaryText = `संतरा जांच परिणाम: ${config.label}. विश्वास स्कोर ${confidence} प्रतिशत है। सलाह: ${scan?.recovery_advisory?.summary_hi || 'उचित प्रबंधन करें।'}`;
    } else {
      summaryText = `SantraScan Assessment Verdict: ${config.label}, with ${confidence} percent confidence. Advisory: ${scan?.recovery_advisory?.summary_en || 'Follow recommended protocol.'}`;
    }
    speakText(summaryText);
  };

  // Helper for 3 sub-scores (Weak / OK / Strong)
  const renderScorePill = (scoreTitle, scoreValue) => {
    let style = "bg-leaf/15 text-leaf border-leaf/30";
    if (scoreValue === "Weak") style = "bg-verdict-reject/15 text-verdict-reject border-verdict-reject/30 font-bold";
    else if (scoreValue === "OK") style = "bg-[#A86A00]/15 text-[#A86A00] border-[#A86A00]/30 font-medium";

    return (
      <div className="bg-white/80 rounded-2xl p-2.5 sm:p-3 border border-ink/10 flex flex-col items-center text-center shadow-sm">
        <span className="text-[11px] text-muted font-medium mb-1">{scoreTitle}</span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs border ${style}`}>
          {scoreValue || 'OK'}
        </span>
      </div>
    );
  };

  return (
    <div className={`liquid-glass rounded-3xl p-5 sm:p-7 border-2 ${config.border} ${config.bg} shadow-paper-lg relative overflow-hidden transition-all duration-300`}>
      {/* Top Banner with Verdict & Audio */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-14 h-14 rounded-2xl ${config.badgeBg} flex items-center justify-center shadow-md flex-shrink-0`}>
            <VerdictIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
              AI Decision (PRD FR9)
            </div>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${config.text} leading-tight`}>
              {config.label}
            </h2>
            <div className="text-xs font-semibold text-ink/80 mt-0.5">
              {config.farmerWord}
            </div>
          </div>
        </div>

        {/* Audio Speech Button */}
        <button
          onClick={handleVoiceReadout}
          className="p-3 bg-white hover:bg-chalk border border-ink/10 rounded-2xl shadow-sm text-ink active:scale-95 transition-all flex items-center space-x-1.5"
          title={t('verdict.voice_readout')}
        >
          <Volume2 className="w-5 h-5 text-orange-deep" />
          <span className="hidden sm:inline text-xs font-semibold">Listen</span>
        </button>
      </div>

      <p className="text-ink/85 text-sm sm:text-base leading-relaxed mb-6 bg-white/70 p-3 rounded-2xl border border-ink/5">
        {config.desc}
      </p>

      {/* Confidence & 3 Sub-Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        <div className="bg-white/80 rounded-2xl p-2.5 sm:p-3 border border-ink/10 flex flex-col items-center text-center shadow-sm">
          <span className="text-[11px] text-muted font-medium mb-1">{t('verdict.confidence')}</span>
          <span className="text-sm font-bold text-ink bg-chalk px-2.5 py-0.5 rounded-full border border-ink/10">
            {confidence}%
          </span>
        </div>
        {renderScorePill(t('verdict.growth_score'), scan?.growth_score)}
        {renderScorePill(t('verdict.leaf_score'), scan?.leaf_score)}
        {renderScorePill(t('verdict.graft_score'), scan?.graft_score)}
      </div>

      {/* Primary Finding Tag */}
      {scan?.primary_condition && (
        <div className="bg-white/90 rounded-2xl p-3 border border-ink/10 mb-6 flex items-start space-x-2.5 shadow-sm">
          <Info className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-bold text-muted uppercase">Detected Condition / Quality Signal</div>
            <div className="font-serif font-bold text-ink text-sm sm:text-base">
              {scan.primary_condition}
            </div>
          </div>
        </div>
      )}

      {/* Grad-CAM Heatmap Section ("Where the AI looked") */}
      {leafImage && (
        <div className="bg-white rounded-2xl p-4 border border-ink/10 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-orange-deep" />
              <span className="font-serif font-bold text-sm text-ink">
                {t('verdict.toggle_heatmap')}
              </span>
            </div>

            {/* Toggle Heatmap vs Original */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold flex items-center space-x-1.5 transition-all ${
                  showHeatmap
                    ? 'bg-orange-deep text-white border-orange shadow-sm'
                    : 'bg-chalk text-ink border-ink/10 hover:bg-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showHeatmap ? 'Grad-CAM Attention' : t('verdict.original_view')}</span>
              </button>
            </div>
          </div>

          {/* Interactive Image Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-ink/10 flex items-center justify-center border border-ink/10 shadow-inner">
            <img
              src={showHeatmap ? (heatmapUrl || originalUrl) : originalUrl}
              alt="Scan feature observation"
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-medium flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-verdict-good animate-ping" />
              <span>{showHeatmap ? 'Red = High Model Focus (Lesions & Venation)' : 'Raw Nursery Capture'}</span>
            </div>
          </div>

          {/* View angle selector */}
          {scan?.images?.length > 1 && (
            <div className="flex items-center space-x-2 mt-3 overflow-x-auto">
              {scan.images.map((img) => (
                <button
                  key={img.view_type}
                  onClick={() => setSelectedImageView(img.view_type)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    selectedImageView === img.view_type
                      ? 'bg-ink text-white font-bold'
                      : 'bg-chalk text-muted hover:text-ink'
                  }`}
                >
                  {img.view_type.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {scan?.overall_verdict === 'suitable' || scan?.passport_uid ? (
          <button
            onClick={onOpenPassport}
            className="flex-1 py-3.5 bg-leaf hover:bg-leaf-forest text-white font-serif font-bold text-base rounded-2xl shadow-paper flex items-center justify-center space-x-2 active:scale-95 transition-all"
          >
            <QrCode className="w-5 h-5" />
            <span>{t('verdict.view_passport')}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        ) : scan?.overall_verdict === 'questionable' ? (
          <Link
            to="/reviews"
            className="flex-1 py-3.5 bg-orange hover:bg-orange-deep text-white font-serif font-bold text-base rounded-2xl shadow-paper flex items-center justify-center space-x-2 active:scale-95 transition-all text-center"
          >
            <span>Open Expert Review Queue</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        ) : null}

        <button
          onClick={() => window.print()}
          className="px-5 py-3.5 bg-white hover:bg-chalk text-ink font-semibold text-sm rounded-2xl border border-ink/15 shadow-sm active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>{t('verdict.print_report')}</span>
        </button>
      </div>
    </div>
  );
}
