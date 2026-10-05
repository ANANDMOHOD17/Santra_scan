import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import VerdictCard from '../components/VerdictCard';
import RecoveryAdvisory from '../components/RecoveryAdvisory';
import { 
  ArrowLeft, 
  QrCode, 
  Share2, 
  Printer, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/scans/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Scan record not found.");
        return r.json();
      })
      .then((data) => setScan(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange border-t-transparent animate-spin mx-auto" />
        <p className="font-serif font-bold text-ink">Loading assessment report...</p>
      </div>
    );
  }

  if (error || !scan) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-verdict-reject font-bold">{error || "Scan not found"}</p>
        <Link to="/" className="text-orange-deep font-semibold underline">Back to Dashboard</Link>
      </div>
    );
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `SantraScan Quality Assessment\nPlant ID: ${scan.plant_uid}\nVerdict: ${scan.overall_verdict.toUpperCase()}\nConfidence: ${Math.round(scan.confidence_score * 100)}%\nCondition: ${scan.primary_condition}\nReport link: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Top Back & Action Strip */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => navigate('/history')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-muted hover:text-ink bg-chalk px-3 py-1.5 rounded-xl border border-ink/10 transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Archive</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShareWhatsApp}
            className="p-2 rounded-xl bg-white hover:bg-chalk border border-ink/10 text-leaf transition-all shadow-sm"
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl bg-white hover:bg-chalk border border-ink/10 text-ink transition-all shadow-sm"
            title="Print Assessment"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Report Identity Badge */}
      <div className="paper-card p-4 border border-ink/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Plant Identity</span>
          <div className="font-serif font-bold text-base text-ink">{scan.plant_uid}</div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Nursery & Batch</span>
          <div className="font-semibold text-ink">{scan.nursery_name} ({scan.batch_code})</div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Variety / Rootstock</span>
          <div className="font-medium text-ink/80">{scan.variety} • {scan.rootstock}</div>
        </div>
      </div>

      {/* Main Verdict Card with Grad-CAM and Audio (PRD FR9) */}
      <VerdictCard
        scan={scan}
        onOpenPassport={() => navigate(`/passport/${scan.passport_uid || 'PSP-NGP-77421'}`)}
      />

      {/* Recovery Advisory & Weather tips (PRD FR9 & FR11) */}
      <RecoveryAdvisory
        advisory={scan.recovery_advisory}
        weather={scan.weather_snapshot}
      />

      {/* Floating Action Strip */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 no-print">
        <button
          onClick={() => navigate('/scan')}
          className="flex-1 py-3.5 bg-chalk hover:bg-chalk/80 text-ink font-serif font-bold text-sm rounded-2xl border border-ink/15 shadow-sm active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4 text-orange-deep" />
          <span>Scan Next Plant</span>
        </button>

        {(scan.overall_verdict === 'suitable' || scan.passport_uid) && (
          <button
            onClick={() => navigate(`/passport/${scan.passport_uid || 'PSP-NGP-77421'}`)}
            className="flex-1 py-3.5 bg-forest hover:bg-black text-white font-serif font-bold text-sm rounded-2xl shadow-paper active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <QrCode className="w-4 h-4 text-orange-mango" />
            <span>Open Plant Passport</span>
          </button>
        )}
      </div>
    </div>
  );
}
