import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Clock, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Calendar,
  Layers
} from 'lucide-react';

export default function HistoryPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  const fetchScans = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.append('status_filter', statusFilter);
    if (modeFilter !== 'all') params.append('mode_filter', modeFilter);
    if (searchTerm) params.append('search', searchTerm);

    fetch(`/api/scans?${params.toString()}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setScans(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchScans();
  }, [statusFilter, modeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchScans();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            {t('nav.history')}
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Searchable, audit-grade historical archive of all citrus scans.
          </p>
        </div>

        <button
          onClick={() => navigate('/scan')}
          className="self-start py-2.5 px-4 bg-orange hover:bg-orange-deep text-white font-serif font-bold text-xs rounded-xl shadow-paper flex items-center space-x-1.5 transition-all"
        >
          <span>+ New Scan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="paper-card p-4 border border-ink/10 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Scan UID, variety, condition..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-ink text-white text-xs font-bold rounded-xl shadow-sm hover:bg-ink/90 active:scale-95"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="text-[11px] font-bold uppercase text-muted mr-1 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </div>

          {/* Status Pills */}
          {['all', 'suitable', 'questionable', 'reject'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize border transition-all ${
                statusFilter === st
                  ? 'bg-orange-deep text-white border-orange shadow-sm'
                  : 'bg-white text-ink/75 border-ink/10 hover:bg-chalk'
              }`}
            >
              {st}
            </button>
          ))}

          <span className="text-ink/20">|</span>

          {/* Mode Pills */}
          {['all', 'sapling', 'mature_tree'].map((m) => (
            <button
              key={m}
              onClick={() => setModeFilter(m)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize border transition-all ${
                modeFilter === m
                  ? 'bg-soil text-white border-soil shadow-sm'
                  : 'bg-white text-ink/75 border-ink/10 hover:bg-chalk'
              }`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Scans List / Table */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-orange border-t-transparent animate-spin mx-auto mb-2" />
          <p className="text-xs text-muted font-medium">Fetching scans...</p>
        </div>
      ) : scans.length > 0 ? (
        <div className="space-y-3">
          {scans.map((s) => {
            const isSuitable = s.overall_verdict === 'suitable' || s.overall_verdict === 'healthy_looking';
            const isQuestionable = s.overall_verdict === 'questionable' || s.overall_verdict === 'warning_signs';

            return (
              <div
                key={s.id}
                onClick={() => navigate(`/scans/${s.id}`)}
                className="paper-card p-4 sm:p-5 border border-ink/10 hover:border-orange/50 cursor-pointer transition-all active:scale-[0.99] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0 ${
                    isSuitable ? 'bg-[#E4F4E8] text-[#1F7A3D]' : isQuestionable ? 'bg-[#FFF1D6] text-[#A86A00]' : 'bg-[#FDE6E4] text-[#B3261E]'
                  }`}>
                    {isSuitable ? <CheckCircle2 className="w-6 h-6" /> : isQuestionable ? <AlertTriangle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif font-bold text-base text-ink">{s.scan_uid}</span>
                      <span className="text-[10px] uppercase font-bold bg-chalk px-2 py-0.5 rounded text-muted">
                        {s.scan_mode}
                      </span>
                    </div>

                    <div className="text-xs text-muted mt-0.5">
                      Plant Tag: <span className="font-semibold text-ink">{s.plant_uid}</span> • Batch: <span className="font-medium text-ink">{s.batch_code}</span>
                    </div>

                    {s.primary_condition && (
                      <div className="text-xs font-medium text-soil mt-1">
                        Condition: {s.primary_condition}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-ink/10">
                  <div className="text-left sm:text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                      isSuitable ? 'bg-[#E4F4E8] text-[#1F7A3D]' : isQuestionable ? 'bg-[#FFF1D6] text-[#A86A00]' : 'bg-[#FDE6E4] text-[#B3261E]'
                    }`}>
                      {s.overall_verdict.toUpperCase()} ({Math.round(s.confidence_score * 100)}%)
                    </span>
                    <div className="text-[10px] text-muted mt-1">
                      {new Date(s.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-muted" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="paper-card p-12 text-center space-y-3 border border-ink/10">
          <Clock className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-serif font-bold text-base text-ink">No Scans Found</h3>
          <p className="text-xs text-muted">Try clearing the search query or status filter.</p>
        </div>
      )}
    </div>
  );
}
