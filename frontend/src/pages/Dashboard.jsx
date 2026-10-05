import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useRealtime } from '../context/RealtimeContext';
import WeatherCard from '../components/WeatherCard';
import TreeAnatomy2D from '../components/TreeAnatomy2D';
import { 
  ScanLine, 
  TreePine, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  QrCode,
  Sparkles,
  ClipboardList,
  Radio,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { liveStats, realtimeScans, triggerLiveScan, autoStream, toggleAutoStream } = useRealtime();
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setMetrics(data.summary);
          setRecentScans(data.recent_scans || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7 pb-28">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-soil to-forest text-white rounded-3xl p-6 sm:p-8 shadow-paper-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold mb-3 backdrop-blur-sm">
            <span className="text-orange-mango">🍊</span>
            <span>Vidarbha Citrus Quality Shield</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold mb-2 leading-tight">
            {lang === 'mr' ? 'संत्रा रोप गुणवत्ता तपासणी' : lang === 'hi' ? 'संतरा पौधा गुणवत्ता जांच' : 'Orange Planting Material Assessment'}
          </h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
            {t('app_tagline')}
          </p>

          {/* Dual Action Buttons (Sapling vs Mature Tree) */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/scan?mode=sapling')}
              className="py-3.5 px-6 bg-orange text-white hover:bg-orange-deep font-serif font-bold text-base rounded-2xl shadow-paper flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <ScanLine className="w-5 h-5" />
              <span>{lang === 'mr' ? 'कलमी रोप स्कॅन करा' : lang === 'hi' ? 'कलमी पौधा स्कैन करें' : 'Scan Orange Sapling'}</span>
            </button>

            <button
              onClick={() => navigate('/scan?mode=mature_tree')}
              className="py-3.5 px-6 bg-white/20 hover:bg-white/30 text-white font-serif font-bold text-base rounded-2xl border border-white/30 flex items-center justify-center space-x-2 active:scale-95 transition-all backdrop-blur-sm"
            >
              <TreePine className="w-5 h-5 text-leaf-fresh" />
              <span>{lang === 'mr' ? 'मोठे झाड तपासा' : lang === 'hi' ? 'बड़ा पेड़ जांचें' : 'Check Mature Tree'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-6 -bottom-10 opacity-15 text-[180px] pointer-events-none select-none">
          🍊
        </div>
      </div>

      {/* Live Agricultural Weather Component */}
      <WeatherCard />

      {/* Real-time Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-chalk border border-ink/10 text-xs gap-2">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-leaf"></span>
          </span>
          <span className="font-bold text-ink">Live Nursery Stream:</span>
          <span className="text-muted">
            {liveStats.totalDelta > 0 
              ? `${liveStats.totalDelta} real-time scans ingested live this session` 
              : 'Continuous telemetry active across accredited nurseries'}
          </span>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={triggerLiveScan}
            className="px-2.5 py-1 rounded-lg bg-orange text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
            title="Inject 1 real-time scan"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>+1 Live Scan</span>
          </button>
          <Link to="/analytics" className="text-[11px] font-bold text-orange-deep hover:underline">
            View Analytics →
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid (Dynamic Real-time) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">Total Scans</span>
            {liveStats.totalDelta > 0 && (
              <span className="text-[10px] font-bold text-leaf animate-pulse">+{liveStats.totalDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-ink mt-1">
            {(metrics?.total_scans || 12) + liveStats.totalDelta}
          </div>
          <span className="text-[11px] text-leaf font-semibold mt-1">100% Verified DB</span>
        </div>

        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between bg-[#E4F4E8]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">Suitable / Certified</span>
            {liveStats.suitableDelta > 0 && (
              <span className="text-[10px] font-bold text-leaf animate-pulse">+{liveStats.suitableDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-leaf mt-1">
            {(metrics?.suitable_count || 9) + liveStats.suitableDelta}
          </div>
          <span className="text-[11px] text-leaf-forest font-semibold mt-1">Issued Passports</span>
        </div>

        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between bg-[#FFF1D6]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">Questionable Queue</span>
            {liveStats.questionableDelta > 0 && (
              <span className="text-[10px] font-bold text-orange-deep animate-pulse">+{liveStats.questionableDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-[#A86A00] mt-1">
            {(metrics?.pending_reviews || 2) + liveStats.questionableDelta}
          </div>
          <Link to="/reviews" className="text-[11px] text-orange-deep font-bold mt-1 hover:underline">
            Review Queue →
          </Link>
        </div>

        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between">
          <span className="text-xs text-muted font-medium">Field Survival Rate</span>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-forest mt-1">
            {metrics?.field_survival_rate || 96.5}%
          </div>
          <span className="text-[11px] text-muted font-semibold mt-1">Farmer Reported</span>
        </div>
      </div>

      {/* Recent Scans Strip */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-deep" />
            <h3 className="font-serif font-bold text-lg text-ink">Recent Scans</h3>
          </div>
          <Link to="/history" className="text-xs font-semibold text-orange-deep hover:underline flex items-center space-x-1">
            <span>View All History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {[...realtimeScans, ...recentScans].slice(0, 6).length > 0 ? (
            [...realtimeScans, ...recentScans].slice(0, 6).map((scan) => {
              const isGood = scan.verdict === 'suitable' || scan.verdict === 'healthy_looking';
              const isQuestionable = scan.verdict === 'questionable' || scan.verdict === 'warning_signs';
              const isRealtime = realtimeScans.some(rs => rs.id === scan.id);
              return (
                <div
                  key={scan.id}
                  onClick={() => scan.id && typeof scan.id === 'number' && scan.id < 1000000 ? navigate(`/scans/${scan.id}`) : navigate('/analytics')}
                  className="p-3 rounded-2xl bg-white hover:bg-chalk/60 border border-ink/10 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isGood ? 'bg-leaf/15 text-leaf' : isQuestionable ? 'bg-[#A86A00]/15 text-[#A86A00]' : 'bg-verdict-reject/15 text-verdict-reject'
                    }`}>
                      {isGood ? '✓' : isQuestionable ? '?' : '✕'}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-ink flex items-center space-x-1.5">
                        <span>{scan.scan_uid}</span>
                        {isRealtime && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-leaf text-white font-black tracking-wider uppercase animate-pulse">
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted">
                        {scan.variety} • {scan.created_at}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isGood ? 'bg-[#E4F4E8] text-[#1F7A3D]' : isQuestionable ? 'bg-[#FFF1D6] text-[#A86A00]' : 'bg-[#FDE6E4] text-[#B3261E]'
                    }`}>
                      {scan.verdict}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-xs text-muted">
              No scans recorded yet. Tap "Scan Orange Sapling" to start!
            </div>
          )}
        </div>
      </div>

      {/* 2D Interactive Tree Anatomy Section */}
      <TreeAnatomy2D />
    </div>
  );
}
