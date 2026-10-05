import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import CameraCapture from '../components/CameraCapture';
import LiveAnalysisModal from '../components/LiveAnalysisModal';
import { 
  ScanLine, 
  TreePine, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function ScanPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // FR4: Mode selector (sapling or mature_tree)
  const initialMode = searchParams.get('mode') === 'mature_tree' ? 'mature_tree' : 'sapling';
  const [scanMode, setScanMode] = useState(initialMode);

  // Metadata form states
  const [plantUid, setPlantUid] = useState(`SS-NGP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [batchCode, setBatchCode] = useState('NGP-2026-B01');
  const [variety, setVariety] = useState('Nagpur Mandarin (Santra)');
  const [rootstock, setRootstock] = useState('Rangpur Lime');
  const [growthStage, setGrowthStage] = useState('Budded Sapling (10-12 months)');
  const [soilType, setSoilType] = useState('Sterilized Potting Mix (Sand-Soil-FYM)');
  const [irrigation, setIrrigation] = useState('Micro-sprinkler / Drip');
  const [symptomsObserved, setSymptomsObserved] = useState('');
  const [recentFertilizer, setRecentFertilizer] = useState('FYM + 19:19:19 fertigation');
  const [recentPesticide, setRecentPesticide] = useState('Trichoderma viride drench');

  // Captured photos from CameraCapture
  const [capturedPhotos, setCapturedPhotos] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentScanId, setCurrentScanId] = useState(null);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePhotosReady = (photos) => {
    setCapturedPhotos(photos);
  };

  const handleScanSubmit = async (e) => {
    e.preventDefault();
    if (!capturedPhotos?.whole_plant || !capturedPhotos?.leaf_closeup || !capturedPhotos?.graft_joint || !capturedPhotos?.fruit_shoot) {
      alert("Please capture all 4 required angles before submitting analysis.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append('scan_mode', scanMode);
      formData.append('plant_uid', plantUid);
      formData.append('batch_code', batchCode);
      formData.append('variety', variety);
      formData.append('rootstock', rootstock);
      formData.append('growth_stage', growthStage);
      formData.append('soil_type', soilType);
      formData.append('irrigation_method', irrigation);
      formData.append('symptoms_observed', symptomsObserved);
      formData.append('recent_fertilizer', recentFertilizer);
      formData.append('recent_pesticide', recentPesticide);

      formData.append('whole_plant', capturedPhotos.whole_plant);
      formData.append('leaf_closeup', capturedPhotos.leaf_closeup);
      formData.append('graft_joint', capturedPhotos.graft_joint);
      formData.append('fruit_shoot', capturedPhotos.fruit_shoot);

      // Step 1: Upload (FR6)
      const uploadResp = await fetch('/api/scans/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadResp.ok) {
        throw new Error('Upload failed. Please check network and image formats.');
      }

      const uploadData = await uploadResp.json();
      setCurrentScanId(uploadData.scan_id);
      setShowLiveModal(true);

      // Step 2: Trigger AI Analysis (FR7)
      const analyzeResp = await fetch(`/api/scans/${uploadData.scan_id}/analyze`, {
        method: 'POST'
      });

      if (!analyzeResp.ok) {
        console.warn("Analyze completed via background pipeline.");
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error occurred during scan submission.');
      setIsSubmitting(false);
    }
  };

  const handleAnalysisCompleted = () => {
    setShowLiveModal(false);
    navigate(`/scans/${currentScanId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-1">
          {t('scan.title')}
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Follow the 4-photo guide to assess foliar health, graft alignment, and nursery vigour.
        </p>
      </div>

      {/* Mode Switcher Cards (PRD FR4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setScanMode('sapling')}
          className={`p-4 rounded-3xl border-2 text-left transition-all ${
            scanMode === 'sapling'
              ? 'bg-[#E4F4E8] border-leaf shadow-sm ring-2 ring-leaf/20'
              : 'bg-white border-ink/10 hover:bg-chalk/50'
          }`}
        >
          <div className="flex items-center space-x-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-leaf/20 text-leaf flex items-center justify-center">
              <ScanLine className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-base text-ink">
              {t('scan.mode_sapling')}
            </span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            {t('scan.mode_sapling_desc')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setScanMode('mature_tree')}
          className={`p-4 rounded-3xl border-2 text-left transition-all ${
            scanMode === 'mature_tree'
              ? 'bg-[#FFF1D6] border-orange shadow-sm ring-2 ring-orange/20'
              : 'bg-white border-ink/10 hover:bg-chalk/50'
          }`}
        >
          <div className="flex items-center space-x-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-orange/20 text-orange-deep flex items-center justify-center">
              <TreePine className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-base text-ink">
              {t('scan.mode_tree')}
            </span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            {t('scan.mode_tree_desc')}
          </p>
        </button>
      </div>

      {/* 4-Step Device Camera / File Upload Component */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper">
        <h3 className="font-serif font-bold text-lg text-ink mb-1 flex items-center space-x-2">
          <span>{t('scan.capture_step')}</span>
          <span className="text-xs font-normal text-muted">(Required 4 views)</span>
        </h3>
        <p className="text-xs text-muted mb-4">
          Natural diffused daylight produces the highest AI classification accuracy.
        </p>

        <CameraCapture onPhotosReady={handlePhotosReady} />
      </div>

      {/* Plant & Orchard Metadata Form */}
      <form onSubmit={handleScanSubmit} className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
        <h3 className="font-serif font-bold text-lg text-ink mb-3">
          Plant & Nursery Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-muted mb-1">
              {t('scan.plant_id_label')}
            </label>
            <input
              type="text"
              value={plantUid}
              onChange={(e) => setPlantUid(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted mb-1">
              {t('scan.batch_label')}
            </label>
            <input
              type="text"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted mb-1">
              {t('scan.variety_label')}
            </label>
            <select
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
            >
              <option value="Nagpur Mandarin (Santra)">Nagpur Mandarin (Santra)</option>
              <option value="Mosambi (Sweet Orange)">Mosambi (Sweet Orange)</option>
              <option value="Acid Lime (Kagzi Nimboo)">Acid Lime (Kagzi Nimboo)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted mb-1">
              {t('scan.rootstock_label')}
            </label>
            <select
              value={rootstock}
              onChange={(e) => setRootstock(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
            >
              <option value="Rangpur Lime">Rangpur Lime (Phytophthora tolerant)</option>
              <option value="Rough Lemon (Jambhiri)">Rough Lemon / Jambhiri (Deep rooting)</option>
              <option value="Alemow (Citrus macrophylla)">Alemow</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-muted mb-1">
            {t('scan.symptoms_label')}
          </label>
          <input
            type="text"
            value={symptomsObserved}
            onChange={(e) => setSymptomsObserved(e.target.value)}
            placeholder={t('scan.symptoms_placeholder')}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-verdict-reject/10 border border-verdict-reject/30 text-verdict-reject text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-leaf hover:bg-leaf-forest text-white font-serif font-bold text-lg rounded-2xl shadow-paper-lg active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 text-orange-mango" />
          <span>{isSubmitting ? t('scan.analyzing') : t('scan.start_analysis')}</span>
        </button>
      </form>

      {/* Live SSE Analysis Progress Modal */}
      {showLiveModal && (
        <LiveAnalysisModal
          scanId={currentScanId}
          onComplete={handleAnalysisCompleted}
        />
      )}
    </div>
  );
}
