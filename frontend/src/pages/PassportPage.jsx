import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  Printer, 
  Calendar, 
  MapPin, 
  AlertCircle,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function PassportPage() {
  const { passport_uid } = useParams();
  const { t, lang } = useLanguage();

  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Farmer survival log form states
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [survivalStatus, setSurvivalStatus] = useState('alive');
  const [daysPlanted, setDaysPlanted] = useState(45);
  const [orchardLoc, setOrchardLoc] = useState('');
  const [farmerNotes, setFarmerNotes] = useState('');
  const [logSubmitting, setLogSubmitting] = useState(false);
  const [logSuccessMsg, setLogSuccessMsg] = useState(null);

  const fetchPassport = () => {
    fetch(`/api/passports/${passport_uid}`)
      .then((r) => {
        if (!r.ok) throw new Error("Plant Passport not found.");
        return r.json();
      })
      .then((data) => setPassport(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPassport();
  }, [passport_uid]);

  const handleSurvivalSubmit = async (e) => {
    e.preventDefault();
    setLogSubmitting(true);
    setLogSuccessMsg(null);

    try {
      const resp = await fetch(`/api/passports/${passport_uid}/survival`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_name: farmerName,
          farmer_phone: farmerPhone,
          status: survivalStatus,
          days_since_planting: Number(daysPlanted),
          orchard_location: orchardLoc,
          notes: farmerNotes
        })
      });

      if (!resp.ok) throw new Error("Failed to record survival feedback.");
      setLogSuccessMsg("Survival feedback recorded successfully. Thank you for strengthening nursery traceability!");
      setFarmerName('');
      setFarmerPhone('');
      setFarmerNotes('');
      fetchPassport();
    } catch (err) {
      alert(err.message);
    } finally {
      setLogSubmitting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🍊 Verified SantraScan QR Plant Passport\nPlant ID: ${passport?.plant_uid}\nNursery: ${passport?.nursery_name}\nBatch: ${passport?.batch_code}\nVerification: ${passport?.verification_hash}\nVerify online: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-leaf border-t-transparent animate-spin mx-auto mb-4" />
        <p className="font-serif font-bold text-ink">Verifying digital Plant Passport...</p>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-verdict-reject mx-auto" />
        <h2 className="font-serif text-xl font-bold text-ink">Passport Not Found</h2>
        <p className="text-xs text-muted">This QR code or Passport UID does not match any certified record.</p>
        <Link to="/" className="text-sm font-bold text-orange-deep underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Top Controls */}
      <div className="flex items-center justify-between no-print">
        <Link to="/" className="text-xs font-semibold text-muted hover:text-ink">
          ← Return to Dashboard
        </Link>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#E4F4E8] text-leaf hover:bg-leaf hover:text-white border border-leaf/30 text-xs font-bold transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t('passport.whatsapp_share')}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-chalk text-ink hover:bg-white border border-ink/15 text-xs font-bold transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t('passport.print_passport')}</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Container */}
      <div className="passport-print-box bg-white rounded-3xl p-6 sm:p-8 border-2 border-forest/30 shadow-paper-lg relative overflow-hidden">
        
        {/* Certificate Decorative Border Stamp */}
        <div className="border border-forest/20 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-paper/40 to-white relative">
          
          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-forest/20">
            <div className="inline-flex items-center space-x-2 bg-leaf/10 border border-leaf/30 px-3 py-1 rounded-full text-xs font-bold text-leaf-forest mb-2">
              <ShieldCheck className="w-4 h-4 text-leaf" />
              <span>{t('passport.certified_badge')}</span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-ink tracking-tight">
              {t('passport.title')}
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Nagpur Mandarin Planting Material Traceability • Build Bridge
            </p>
          </div>

          {/* QR Code and Identity Strip */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-ink/10">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[11px] font-bold uppercase text-muted tracking-wider">Plant Identifier</span>
              <div className="font-serif font-bold text-2xl text-ink">
                {passport.plant_uid}
              </div>
              <div className="text-xs font-semibold text-leaf flex items-center justify-center sm:justify-start space-x-1.5 mt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Status: {passport.verdict.toUpperCase()} (Certified Healthy)</span>
              </div>
              <div className="text-[11px] text-muted">
                {passport.review_status} • Verified {passport.issue_date}
              </div>
            </div>

            {/* Real QR Code Display */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 p-2 bg-paper rounded-2xl border-2 border-ink/20 shadow-inner flex items-center justify-center">
                {passport.qr_code_path ? (
                  <img
                    src={passport.qr_code_path}
                    alt="Plant Passport QR Code"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <QrCode className="w-24 h-24 text-ink" />
                )}
              </div>
              <span className="text-[10px] font-bold text-muted mt-1 uppercase tracking-tight">
                {t('passport.scan_me')}
              </span>
            </div>
          </div>

          {/* Lineage & Batch Traceability Details */}
          <div className="grid grid-cols-2 gap-4 py-5 border-b border-ink/10 text-xs">
            <div>
              <span className="text-muted uppercase font-bold text-[10px]">{t('passport.nursery')}</span>
              <div className="font-bold text-ink text-sm mt-0.5">{passport.nursery_name}</div>
            </div>

            <div>
              <span className="text-muted uppercase font-bold text-[10px]">{t('passport.batch')}</span>
              <div className="font-bold text-ink text-sm mt-0.5">{passport.batch_code}</div>
            </div>

            <div>
              <span className="text-muted uppercase font-bold text-[10px]">{t('passport.variety')}</span>
              <div className="font-bold text-ink text-sm mt-0.5">{passport.variety}</div>
            </div>

            <div>
              <span className="text-muted uppercase font-bold text-[10px]">{t('passport.rootstock')}</span>
              <div className="font-bold text-ink text-sm mt-0.5">{passport.rootstock}</div>
            </div>
          </div>

          {/* Tamper-Proof Cryptographic Hash */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-muted uppercase font-bold text-[10px]">{t('passport.verification_hash')}</span>
              <div className="font-mono text-xs font-bold text-ink tracking-wider bg-chalk px-2.5 py-1 rounded-lg border border-ink/10 inline-block mt-0.5">
                {passport.verification_hash}
              </div>
            </div>

            <div className="text-[10px] text-muted text-right">
              Issued under ICAR-CCRI Nursery Guidelines • Nagpur RISE Cohort
            </div>
          </div>
        </div>

        {/* Disclaimer on Certificate */}
        <div className="mt-4 text-[10px] text-muted/80 text-center italic">
          {passport.disclaimer}
        </div>
      </div>

      {/* Field Survival Logging Section (PRD Section 6 Farmer flow) */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4 no-print">
        <div className="flex items-center space-x-2.5 pb-2 border-b border-ink/10">
          <HeartHandshake className="w-5 h-5 text-orange-deep" />
          <h3 className="font-serif font-bold text-lg text-ink">
            {t('passport.log_survival_title')}
          </h3>
        </div>

        <p className="text-xs text-muted">
          Farmers who purchase certified saplings can report field survival. This feedback holds nurseries accountable and calibrates the AI model.
        </p>

        {logSuccessMsg && (
          <div className="p-3 bg-leaf/15 border border-leaf/30 rounded-2xl text-leaf-forest text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{logSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleSurvivalSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1">
                {t('passport.farmer_name')}
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="उदा. गजानन देशमुख"
                className="w-full px-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1">
                {t('passport.farmer_phone')}
              </label>
              <input
                type="tel"
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                placeholder="9822XXXXXX"
                className="w-full px-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1">
                {t('passport.status_select')}
              </label>
              <select
                value={survivalStatus}
                onChange={(e) => setSurvivalStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <option value="alive">🌱 {t('passport.alive')}</option>
                <option value="weak">⚠️ {t('passport.weak')}</option>
                <option value="died">🍂 {t('passport.died')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1">
                {t('passport.days_planted')}
              </label>
              <input
                type="number"
                value={daysPlanted}
                onChange={(e) => setDaysPlanted(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted mb-1">
              {t('passport.orchard_loc')}
            </label>
            <input
              type="text"
              value={orchardLoc}
              onChange={(e) => setOrchardLoc(e.target.value)}
              placeholder="उदा. काटोल, नागपूर"
              className="w-full px-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted mb-1">
              {t('passport.notes')}
            </label>
            <input
              type="text"
              value={farmerNotes}
              onChange={(e) => setFarmerNotes(e.target.value)}
              placeholder="e.g. Excellent vigorous flush emergence after 4 weeks."
              className="w-full px-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          <button
            type="submit"
            disabled={logSubmitting}
            className="w-full py-3 bg-leaf hover:bg-leaf-forest text-white font-serif font-bold text-xs rounded-xl shadow-paper active:scale-95 transition-all"
          >
            {logSubmitting ? "Recording Feedback..." : t('passport.submit_survival')}
          </button>
        </form>

        {/* Existing Survival Log History */}
        {passport.survival_logs?.length > 0 && (
          <div className="pt-3 border-t border-ink/10 space-y-2">
            <span className="text-[11px] font-bold uppercase text-muted">Field Observation History</span>
            {passport.survival_logs.map((log) => (
              <div key={log.id} className="p-3 bg-chalk/50 rounded-xl border border-ink/10 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-ink">{log.farmer_name} ({log.orchard_location || 'Nagpur'})</div>
                  <div className="text-muted text-[11px]">{log.notes || 'Status confirmed'}</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    log.status === 'alive' ? 'bg-leaf/15 text-leaf' : 'bg-verdict-reject/15 text-verdict-reject'
                  }`}>
                    {log.status.toUpperCase()}
                  </span>
                  <div className="text-[10px] text-muted mt-0.5">{log.created_at}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
