import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  ClipboardList, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FlaskConical, 
  Layers, 
  Info,
  Check,
  Sparkles
} from 'lucide-react';

export default function ReviewerQueuePage() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState(null);

  // Review submission form states
  const [expertVerdict, setExpertVerdict] = useState('suitable');
  const [diagnosisCode, setDiagnosisCode] = useState('EXPERT_CHLOROSIS_RESOLVED');
  const [expertNotes, setExpertNotes] = useState('');
  const [labRequested, setLabRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const fetchQueue = () => {
    setLoading(true);
    fetch('/api/reviews/queue')
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        setQueue(data);
        if (data.length > 0 && !selectedScan) {
          setSelectedScan(data[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedScan) return;

    setSubmitting(true);
    setFeedbackMsg(null);

    try {
      const resp = await fetch(`/api/reviews/${selectedScan.scan_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expert_verdict: expertVerdict,
          diagnosis_code: diagnosisCode,
          expert_notes: expertNotes,
          lab_test_requested: labRequested
        })
      });

      if (!resp.ok) throw new Error("Failed to record expert decision.");
      const result = await resp.json();

      setFeedbackMsg(`Determination recorded. Final Verdict: ${expertVerdict.toUpperCase()}. Active training label created!`);
      setSelectedScan(null);
      fetchQueue();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-orange/20 text-orange-deep flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            {t('review_queue.title')}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted">
          {t('review_queue.subtitle')}
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-4 bg-leaf/15 border border-leaf/30 rounded-2xl text-leaf-forest text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-orange border-t-transparent animate-spin mx-auto mb-2" />
          <p className="text-xs text-muted">Loading review queue...</p>
        </div>
      ) : queue.length === 0 ? (
        <div className="paper-card p-12 text-center space-y-3 border border-ink/10">
          <CheckCircle2 className="w-12 h-12 text-leaf mx-auto" />
          <h3 className="font-serif font-bold text-lg text-ink">
            {t('review_queue.empty')}
          </h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            All nursery scans are currently resolved. Questionable or low-confidence assessments will automatically populate here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Queue List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold uppercase text-muted">
              Pending Items ({queue.length})
            </span>

            {queue.map((item) => {
              const isSelected = selectedScan?.scan_id === item.scan_id;
              return (
                <div
                  key={item.scan_id}
                  onClick={() => setSelectedScan(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-orange shadow-paper ring-2 ring-orange/30'
                      : 'bg-chalk/50 hover:bg-white border-ink/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-serif font-bold text-sm text-ink">{item.scan_uid}</div>
                      <div className="text-xs text-muted">Plant: <span className="font-semibold text-ink">{item.plant_uid}</span></div>
                      <div className="text-[11px] text-muted">{item.nursery_name}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#FFF1D6] text-[#A86A00] font-bold text-[10px] border border-[#A86A00]/20">
                      {item.overall_verdict.toUpperCase()} ({Math.round(item.confidence_score * 100)}%)
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-medium text-soil truncate">
                    Finding: {item.primary_condition}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Side-by-Side Review Workspace */}
          {selectedScan && (
            <div className="lg:col-span-7 paper-card p-5 sm:p-7 border border-ink/10 shadow-paper space-y-5">
              <div className="flex items-start justify-between border-b border-ink/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-deep bg-orange/15 px-2 py-0.5 rounded-full">
                    Expert Inspection Station
                  </span>
                  <h3 className="font-serif font-bold text-xl text-ink mt-1">
                    {selectedScan.scan_uid}
                  </h3>
                  <div className="text-xs text-muted mt-0.5">
                    Batch: {selectedScan.batch_code} • Variety: {selectedScan.variety} • Rootstock: {selectedScan.rootstock}
                  </div>
                </div>
              </div>

              {/* Photos Gallery */}
              <div>
                <span className="text-[11px] font-bold uppercase text-muted block mb-2">
                  {t('review_queue.inspect_images')}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedScan.images?.map((img, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden aspect-video bg-ink/10 border border-ink/10">
                      <img src={img.heatmap_path || img.file_path} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">
                        {img.view_type.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Initial AI Evaluation */}
              <div className="p-3.5 bg-chalk/70 rounded-2xl border border-ink/10 text-xs space-y-1.5">
                <div className="font-bold text-ink flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-orange" />
                  <span>{t('review_queue.ai_verdict')}: {selectedScan.overall_verdict.toUpperCase()}</span>
                </div>
                <p className="text-muted leading-relaxed">
                  Reason for Questionable status: {selectedScan.primary_condition}. Growth: {selectedScan.growth_score}, Leaf: {selectedScan.leaf_score}, Graft: {selectedScan.graft_score}.
                </p>
              </div>

              {/* Expert Resolution Form (PRD FR15) */}
              <form onSubmit={handleReviewSubmit} className="space-y-4 pt-2">
                <span className="text-[11px] font-bold uppercase text-muted block">
                  {t('review_queue.expert_action')}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExpertVerdict('suitable')}
                    className={`py-3 px-3 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      expertVerdict === 'suitable'
                        ? 'bg-[#E4F4E8] text-[#1F7A3D] border-[#1F7A3D] shadow-sm'
                        : 'bg-white text-ink border-ink/10 hover:bg-chalk'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-leaf" />
                    <span>{t('review_queue.approve_suitable')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpertVerdict('reject')}
                    className={`py-3 px-3 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      expertVerdict === 'reject'
                        ? 'bg-[#FDE6E4] text-[#B3261E] border-[#B3261E] shadow-sm'
                        : 'bg-white text-ink border-ink/10 hover:bg-chalk'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-verdict-reject" />
                    <span>{t('review_queue.confirm_reject')}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="labCheck"
                    checked={labRequested}
                    onChange={(e) => setLabRequested(e.target.checked)}
                    className="w-4 h-4 rounded text-orange focus:ring-orange accent-orange"
                  />
                  <label htmlFor="labCheck" className="text-xs font-medium text-ink cursor-pointer flex items-center space-x-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-orange-deep" />
                    <span>{t('review_queue.request_lab')}</span>
                  </label>
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={expertNotes}
                    onChange={(e) => setExpertNotes(e.target.value)}
                    placeholder={t('review_queue.notes_placeholder')}
                    className="w-full p-3 rounded-2xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-ink hover:bg-ink/90 text-white font-serif font-bold text-sm rounded-2xl shadow-paper active:scale-95 transition-all"
                >
                  {submitting ? "Recording Expert Label..." : t('review_queue.submit_review')}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
