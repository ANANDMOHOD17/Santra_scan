import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRealtime } from '../context/RealtimeContext';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Radio,
  Zap,
  Sparkles,
  Activity,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const { realtimeScans, latestEvent, autoStream, toggleAutoStream, triggerLiveScan, liveStats } = useRealtime();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(r => r.ok ? r.json() : null)
      .then(res => setData(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-orange border-t-transparent animate-spin mx-auto mb-2" />
        <p className="text-xs text-muted">Calculating database analytics...</p>
      </div>
    );
  }

  const { summary, verdict_breakdown, disease_distribution, nursery_performance } = data;

  // Real-time dynamic stats
  const totalScans = (summary.total_scans || 0) + liveStats.totalDelta;
  const suitableCount = (summary.suitable_count || 0) + liveStats.suitableDelta;
  const questionableCount = (summary.questionable_count || 0) + liveStats.questionableDelta;
  const rejectCount = (summary.reject_count || 0) + liveStats.rejectDelta;

  const currentVerdicts = [
    { name: "Suitable (Good)", value: suitableCount, color: "#1F7A3D" },
    { name: "Questionable (Check)", value: questionableCount, color: "#A86A00" },
    { name: "Reject (Do Not Plant)", value: rejectCount, color: "#B3261E" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-7 pb-28">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <BarChart3 className="w-6 h-6 text-orange-deep" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              {t('nav.analytics')} & Traceability Metrics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Real-time quality intelligence from accredited Vidarbha nursery scanning stations.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center space-x-2 bg-leaf/10 border border-leaf/30 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-leaf"></span>
          </span>
          <span className="text-xs font-bold text-leaf-forest">Live Data Stream Active</span>
        </div>
      </div>

      {/* Real-time Stream Banner & Ingestion Simulator */}
      <div className="paper-card p-4 sm:p-5 border-2 border-orange/20 bg-gradient-to-r from-orange/10 via-leaf/10 to-chalk shadow-paper-lg rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-orange-deep flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real-Time Nursery Telemetry Feed</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-leaf/20 text-leaf-forest font-bold">
                {liveStats.totalDelta > 0 ? `+${liveStats.totalDelta} Live Inspections Ingested` : 'Live Stream Ready'}
              </span>
            </div>
            <p className="text-xs text-muted">
              Auto-streams live inspection assessments directly into analytics from Nagpur & Amravati clusters.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            {/* Auto stream toggle */}
            <button
              type="button"
              onClick={toggleAutoStream}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer ${
                autoStream
                  ? 'bg-leaf text-white border-leaf shadow-sm'
                  : 'bg-white text-ink/70 border-ink/15 hover:bg-chalk'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${autoStream ? 'animate-pulse text-white' : 'text-muted'}`} />
              <span>{autoStream ? 'Auto-Feed: ON' : 'Auto-Feed: OFF'}</span>
            </button>

            {/* Manual 1-click trigger button */}
            <button
              type="button"
              onClick={triggerLiveScan}
              className="px-3.5 py-2 rounded-xl bg-orange text-white hover:bg-orange-deep font-bold text-xs shadow-paper active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Instantly generate and inject a real-time inspection scan"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>+1 Live Scan</span>
            </button>
          </div>
        </div>

        {/* Latest live event ticker line */}
        {latestEvent && (
          <div className="mt-3 pt-3 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5 animate-in fade-in slide-in-from-left-2">
            <div className="flex items-center space-x-2 truncate">
              <span className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 rounded border border-ink/10 text-ink">
                Latest Intake
              </span>
              <span className="font-bold text-ink truncate">
                {latestEvent.nursery_name} ({latestEvent.taluka})
              </span>
              <span className="text-muted hidden sm:inline">•</span>
              <span className="text-muted hidden sm:inline">{latestEvent.variety}</span>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                latestEvent.verdict === 'suitable' || latestEvent.verdict === 'healthy_looking'
                  ? 'bg-leaf/15 text-leaf'
                  : latestEvent.verdict === 'questionable' || latestEvent.verdict === 'warning_signs'
                  ? 'bg-orange/15 text-orange-deep'
                  : 'bg-verdict-reject/15 text-verdict-reject'
              }`}>
                {latestEvent.verdict} ({latestEvent.confidence}%)
              </span>
            </div>
            <span className="text-[10px] text-muted font-mono flex-shrink-0">
              {latestEvent.created_at}
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards (Dynamic with Live Stats) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted font-bold uppercase">Total Inspected</span>
            {liveStats.totalDelta > 0 && (
              <span className="text-[10px] font-bold text-leaf animate-pulse">+{liveStats.totalDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-3xl text-ink mt-1 key-metric-animate">
            {totalScans}
          </div>
          <span className="text-[11px] text-leaf font-medium mt-1">Nursery Saplings</span>
        </div>

        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between bg-[#E4F4E8]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted font-bold uppercase">Certified (Suitable)</span>
            {liveStats.suitableDelta > 0 && (
              <span className="text-[10px] font-bold text-leaf animate-pulse">+{liveStats.suitableDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-3xl text-leaf mt-1">
            {suitableCount}
          </div>
          <span className="text-[11px] text-leaf-forest font-semibold mt-1">
            {Math.round((suitableCount / Math.max(totalScans, 1)) * 100)}% Pass Rate
          </span>
        </div>

        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between bg-[#FFF1D6]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted font-bold uppercase">Questionable (Review)</span>
            {liveStats.questionableDelta > 0 && (
              <span className="text-[10px] font-bold text-orange-deep animate-pulse">+{liveStats.questionableDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-3xl text-[#A86A00] mt-1">
            {questionableCount}
          </div>
          <span className="text-[11px] text-orange-deep font-semibold mt-1">Pending Resolution</span>
        </div>

        <div className="paper-card p-4 border border-ink/10 flex flex-col justify-between bg-[#FDE6E4]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted font-bold uppercase">Rejected (Flagged)</span>
            {liveStats.rejectDelta > 0 && (
              <span className="text-[10px] font-bold text-verdict-reject animate-pulse">+{liveStats.rejectDelta} live</span>
            )}
          </div>
          <div className="font-serif font-bold text-3xl text-verdict-reject mt-1">
            {rejectCount}
          </div>
          <span className="text-[11px] text-verdict-reject font-semibold mt-1">Prevented Bad Stock</span>
        </div>
      </div>

      {/* Quality Breakdown & Disease Frequency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verdict Distribution Bars (Dynamic) */}
        <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
          <h3 className="font-serif font-bold text-base text-ink flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-orange-deep" />
            <span>Inspection Verdict Distribution (Live)</span>
          </h3>

          <div className="space-y-3 pt-2">
            {currentVerdicts.map((vb) => {
              const pct = Math.round((vb.value / Math.max(totalScans, 1)) * 100);
              return (
                <div key={vb.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span>{vb.name}</span>
                    <span>{vb.value} ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-chalk rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: vb.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Condition Frequency */}
        <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
          <h3 className="font-serif font-bold text-base text-ink flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-leaf" />
            <span>Observed Conditions & Symptoms</span>
          </h3>

          <div className="space-y-2.5 pt-1">
            {disease_distribution.length > 0 ? (
              disease_distribution.map((dis, idx) => (
                <div key={idx} className="p-3 bg-chalk/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink truncate max-w-[260px]">{dis.name}</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-ink/10 text-orange-deep">
                    {dis.count} scans
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-muted text-center py-6">Not enough condition data yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Live Feed Stream Card (Shows incoming live scans) */}
      {realtimeScans.length > 0 && (
        <div className="paper-card p-5 sm:p-6 border-2 border-orange/20 shadow-paper space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-ink/10">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-orange-deep" />
              <h3 className="font-serif font-bold text-base text-ink">
                Live Ingested Scans (थेट नोंदवलेले नमुने)
              </h3>
            </div>
            <span className="text-xs text-muted font-medium">
              Showing {realtimeScans.length} live stream items
            </span>
          </div>

          <div className="space-y-2">
            {realtimeScans.map((s) => {
              const isGood = s.verdict === 'suitable' || s.verdict === 'healthy_looking';
              const isWarning = s.verdict === 'questionable' || s.verdict === 'warning_signs';
              return (
                <div
                  key={s.id}
                  className="p-3 rounded-2xl bg-chalk/40 border border-ink/10 flex items-center justify-between text-xs animate-in fade-in slide-in-from-top-2"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                      isGood ? 'bg-leaf/20 text-leaf' : isWarning ? 'bg-orange/20 text-orange-deep' : 'bg-verdict-reject/20 text-verdict-reject'
                    }`}>
                      {isGood ? '✓' : isWarning ? '?' : '✕'}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-ink truncate flex items-center space-x-2">
                        <span>{s.scan_uid}</span>
                        <span className="text-[10px] font-normal text-muted">• {s.nursery_name} ({s.taluka})</span>
                      </div>
                      <div className="text-[11px] text-muted truncate">
                        {s.variety} • <span className="font-semibold text-ink">{s.primary_condition}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0 ml-2">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      isGood ? 'bg-[#E4F4E8] text-[#1F7A3D]' : isWarning ? 'bg-[#FFF1D6] text-[#A86A00]' : 'bg-[#FDE6E4] text-[#B3261E]'
                    }`}>
                      {s.verdict} ({s.confidence}%)
                    </span>
                    <span className="text-[10px] text-muted font-mono hidden sm:inline">
                      {s.created_at}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Accreditated Nurseries Performance Table */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-orange-deep" />
          <h3 className="font-serif font-bold text-base text-ink">
            Vidarbha Nursery Quality Benchmark
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-chalk/80 text-muted uppercase font-bold text-[10px] border-b border-ink/10">
              <tr>
                <th className="py-2.5 px-3">Nursery Name</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Inspected Saplings</th>
                <th className="py-2.5 px-3">Certification Rate</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {nursery_performance.map((n) => (
                <tr key={n.id} className="hover:bg-chalk/30">
                  <td className="py-3 px-3 font-bold text-ink">{n.name}</td>
                  <td className="py-3 px-3 text-muted">{n.taluka}, {n.district}</td>
                  <td className="py-3 px-3 font-semibold text-ink">{n.total_scans}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-leaf">{n.certification_rate}%</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-leaf/15 text-leaf font-bold text-[10px]">
                      Certified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
