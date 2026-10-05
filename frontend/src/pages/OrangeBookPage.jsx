import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TreeAnatomy2D from '../components/TreeAnatomy2D';
import SeasonalCalendar from '../components/SeasonalCalendar';
import { ALL_ARTICLES, DEFAULT_DISEASES } from '../data/orangeBookData';
import orangeTreeImg from '../assets/orange_tree.png';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  X,
  ShieldCheck,
  AlertCircle,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function OrangeBookPage() {
  const { t, lang } = useLanguage();
  const [articles, setArticles] = useState(ALL_ARTICLES);
  const [diseases, setDiseases] = useState(DEFAULT_DISEASES);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState('articles'); // 'articles', 'anatomy', 'calendar', 'diseases'
  const [loading, setLoading] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: ALL_ARTICLES.length };
    ALL_ARTICLES.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filterFallbackArticles = (cat, search) => {
    let list = ALL_ARTICLES;
    if (cat && cat !== 'all') {
      list = list.filter(a => a.category.toLowerCase() === cat.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a =>
        a.title_en?.toLowerCase().includes(q) ||
        a.title_hi?.toLowerCase().includes(q) ||
        a.title_mr?.toLowerCase().includes(q) ||
        a.summary_en?.toLowerCase().includes(q) ||
        a.summary_hi?.toLowerCase().includes(q) ||
        a.summary_mr?.toLowerCase().includes(q) ||
        a.content_en?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.symptoms?.some(s => s.toLowerCase().includes(q))
      );
    }
    return list;
  };

  const fetchArticles = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.append('category', selectedCategory);
    if (searchQuery) params.append('search', searchQuery);

    fetch(`/api/orange-book/articles?${params.toString()}`)
      .then(r => {
        if (!r.ok) throw new Error('API unavailable');
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        } else {
          // Robust client fallback
          setArticles(filterFallbackArticles(selectedCategory, searchQuery));
        }
      })
      .catch(() => {
        setArticles(filterFallbackArticles(selectedCategory, searchQuery));
      })
      .finally(() => setLoading(false));
  };

  const fetchDiseases = () => {
    fetch('/api/orange-book/diseases')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDiseases(data);
        } else {
          setDiseases(DEFAULT_DISEASES);
        }
      })
      .catch(() => {
        setDiseases(DEFAULT_DISEASES);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const openFullArticle = (slug) => {
    // Try to find in loaded articles or fallback
    const local = ALL_ARTICLES.find(a => a.slug === slug);
    if (local) {
      setSelectedArticle(local);
      return;
    }

    fetch(`/api/orange-book/articles/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setSelectedArticle(data);
        else setSelectedArticle(local);
      })
      .catch(() => {
        if (local) setSelectedArticle(local);
      });
  };

  const categories = [
    'all',
    'Anatomy',
    'Cultivation',
    'Diseases',
    'Pests',
    'Nutrient Deficiencies',
    'Seasonal Care Calendar'
  ];

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Anatomy':
        return 'bg-soil/15 text-soil border-soil/25';
      case 'Cultivation':
        return 'bg-leaf/15 text-leaf border-leaf/25';
      case 'Diseases':
        return 'bg-verdict-reject/15 text-verdict-reject border-verdict-reject/25';
      case 'Pests':
        return 'bg-orange-deep/15 text-orange-deep border-orange/30';
      case 'Nutrient Deficiencies':
        return 'bg-amber-600/15 text-amber-700 border-amber-600/30';
      case 'Seasonal Care Calendar':
        return 'bg-sky-600/15 text-sky-700 border-sky-600/30';
      default:
        return 'bg-ink/10 text-ink border-ink/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7 pb-28">
      {/* Premium Hero Banner featuring Orange Tree image */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C3322] via-[#24422D] to-[#362312] text-white p-6 sm:p-8 shadow-paper-lg border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-leaf/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-orange-mango border border-white/15">
              <Award className="w-3.5 h-3.5" />
              <span>ICAR-CCRI & Dr. PDKV Akola Verified Knowledge Base</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl sm:text-4xl">📖</span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {t('orange_book.title')}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl font-sans">
              {lang === 'mr' 
                ? 'विदर्भातील संत्रा उत्पादकांसाठी अस्सल डिजिटल ज्ञानकोश. शरीरशास्त्र, लागवड तंत्रज्ञान, रोग व कीड नियंत्रण आणि १२ महिन्यांचे हंगामी नियोजन.'
                : lang === 'hi'
                ? 'विदर्भ के संतरा उत्पादकों के लिए प्रामाणिक डिजिटल ज्ञान केंद्र। शारीरिक संरचना, खेती तकनीक, रोग एवं कीट नियंत्रण और 12 महीने का फसल कैलेंडर।'
                : 'Central India’s definitive digital citrus knowledge centre. Master botanical anatomy, Rangpur Lime rootstocks, precision fertigation, disease eradication, and 12-month Ambia & Mrig care protocols.'}
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-mango" />
                <span className="font-bold">25 Detailed Guides</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-leaf" />
                <span className="font-bold">6 Knowledge Domains</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="font-bold">Trilingual (मराठी • हिन्दी • English)</span>
              </div>
            </div>
          </div>

          {/* High-Resolution Orange Tree Visual Showcase */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative group cursor-pointer" onClick={() => setViewTab('anatomy')}>
              <div className="absolute inset-0 bg-orange/20 rounded-full blur-xl group-hover:bg-orange/35 transition-all" />
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white/10 backdrop-blur-md p-3 border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={orangeTreeImg} 
                  alt="Nagpur Mandarin Orange Tree" 
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
                <div className="absolute bottom-2 inset-x-2 bg-ink/75 backdrop-blur-sm text-center py-1 rounded-xl text-[10px] font-bold text-orange-mango tracking-wider uppercase border border-white/10">
                  Tap to Inspect 2D Anatomy ↗
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-ink/10">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-orange-deep" />
          <h2 className="font-serif font-bold text-xl text-ink">
            {viewTab === 'articles' && 'Curated Knowledge Library'}
            {viewTab === 'anatomy' && 'Interactive Citrus Botanical Anatomy'}
            {viewTab === 'calendar' && 'Vidarbha 12-Month Care Advisory'}
            {viewTab === 'diseases' && 'Controlled Citrus Disease & Pest Catalog'}
          </h2>
        </div>

        {/* View Switcher Tabs */}
        <div className="inline-flex bg-chalk p-1 rounded-2xl border border-ink/10 self-start shadow-sm">
          <button
            onClick={() => setViewTab('articles')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'articles' ? 'bg-ink text-white shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            Articles ({ALL_ARTICLES.length})
          </button>
          <button
            onClick={() => setViewTab('anatomy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'anatomy' ? 'bg-soil text-white font-bold shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            2D Tree Anatomy
          </button>
          <button
            onClick={() => setViewTab('calendar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'calendar' ? 'bg-orange-deep text-white font-bold shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            Seasonal Calendar
          </button>
          <button
            onClick={() => setViewTab('diseases')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'diseases' ? 'bg-leaf text-white font-bold shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            Disease Catalog ({diseases.length})
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      {viewTab === 'anatomy' ? (
        <TreeAnatomy2D />
      ) : viewTab === 'calendar' ? (
        <SeasonalCalendar />
      ) : viewTab === 'diseases' ? (
        // Controlled Disease & Pest Catalog
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-muted bg-chalk/60 p-3 rounded-2xl border border-ink/10">
            <ShieldCheck className="w-4 h-4 text-leaf flex-shrink-0" />
            <span>ICAR-CCRI & Dr. PDKV Akola Verified Citrus Pathology & Pest Defense Catalog</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diseases.map((d) => {
              const name = lang === 'mr' ? d.name_mr : lang === 'hi' ? d.name_hi : d.name_en;
              const desc = lang === 'mr' ? d.description_mr : lang === 'hi' ? d.description_hi : d.description_en;
              const isHigh = d.severity_level === 'high' || d.severity_level === 'quarantine';

              return (
                <div key={d.id || d.code} className="paper-card p-5 border border-ink/10 shadow-sm space-y-3 flex flex-col justify-between hover:border-orange/40 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        d.severity_level === 'quarantine' 
                          ? 'bg-red-600/15 text-red-700 border-red-300' 
                          : isHigh 
                          ? 'bg-verdict-reject/15 text-verdict-reject border-verdict-reject/20' 
                          : 'bg-[#FFF1D6] text-[#A86A00] border-amber-200'
                      }`}>
                        {d.severity_level.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-muted bg-chalk px-2 py-0.5 rounded-md">
                        {d.code}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-ink">{name}</h3>
                    <div className="text-[11px] text-muted italic font-serif">{d.scientific_name}</div>

                    <p className="text-xs text-ink/80 leading-relaxed bg-chalk/50 p-2.5 rounded-xl border border-ink/5">
                      {desc}
                    </p>

                    {d.key_symptoms && (
                      <div>
                        <div className="text-[10px] font-bold uppercase text-muted mb-1">Key Diagnostic Symptoms:</div>
                        <div className="flex flex-wrap gap-1">
                          {d.key_symptoms.map((s, i) => (
                            <span key={i} className="text-[11px] bg-white text-ink px-2 py-0.5 rounded-md border border-ink/10">
                              • {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {d.immediate_actions && (
                      <div className="pt-2">
                        <div className="text-[10px] font-bold uppercase text-soil mb-1">Immediate Actions:</div>
                        <ul className="text-[11px] text-ink/85 space-y-1">
                          {d.immediate_actions.map((act, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-leaf font-bold">✓</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-muted border-t border-ink/10 pt-2 flex items-center justify-between">
                    <span>Verified Source: <strong className="text-ink">{d.verified_source}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Articles View
        <div className="space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="paper-card p-3 border border-ink/10 shadow-sm flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('orange_book.search_placeholder')}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-muted hover:text-ink text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-ink hover:bg-ink/90 text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <span>Search</span>
            </button>
          </form>

          {/* Category Filter Pills with Item Counts */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || (cat === 'all' ? ALL_ARTICLES.length : 0);

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-orange-deep text-white border-orange shadow-sm font-bold'
                      : 'bg-white text-ink/75 border-ink/10 hover:bg-chalk'
                  }`}
                >
                  <span>{cat === 'all' ? t('orange_book.all_categories') : cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-chalk text-muted'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 rounded-full border-2 border-orange border-t-transparent animate-spin mx-auto mb-2" />
              <p className="text-xs text-muted">Searching Orange Book...</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((art) => {
                const title = lang === 'mr' ? art.title_mr : lang === 'hi' ? art.title_hi : art.title_en;
                const summary = lang === 'mr' ? art.summary_mr : lang === 'hi' ? art.summary_hi : art.summary_en;

                return (
                  <div
                    key={art.id || art.slug}
                    onClick={() => openFullArticle(art.slug)}
                    className="paper-card p-5 border border-ink/10 hover:border-orange/50 cursor-pointer shadow-sm hover:shadow-paper transition-all flex flex-col justify-between group hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(art.category)}`}>
                          {art.category}
                        </span>
                        <div className="flex items-center space-x-1 text-[10px] text-muted">
                          <Clock className="w-3 h-3" />
                          <span>3 min read</span>
                        </div>
                      </div>

                      <h3 className="font-serif font-bold text-base text-ink mb-2 leading-snug group-hover:text-orange-deep transition-colors">
                        {title}
                      </h3>

                      <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4 font-sans">
                        {summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-[11px] text-muted">
                      <span className="truncate max-w-[150px]">{art.verified_date}</span>
                      <span className="font-bold text-orange-deep flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="paper-card p-12 text-center space-y-3 border border-ink/10">
              <BookOpen className="w-12 h-12 text-muted mx-auto" />
              <h3 className="font-serif font-bold text-lg text-ink">No Articles Found</h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                No matching citrus guides found for your query. Try selecting 'All Sections' or reset the search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-soil text-white rounded-xl text-xs font-bold hover:bg-soil/90 active:scale-95 transition-all inline-flex items-center space-x-1.5"
              >
                <span>Reset to All Sections</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm">
          <div className="bg-paper rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-glass border border-ink/15 relative space-y-5 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-chalk hover:bg-white text-ink active:scale-95 transition-all shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(selectedArticle.category)}`}>
                  {selectedArticle.category}
                </span>
                <span className="text-[10px] text-muted">• ICAR-CCRI Technical Standard</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink mt-2">
                {lang === 'mr' ? selectedArticle.title_mr : lang === 'hi' ? selectedArticle.title_hi : selectedArticle.title_en}
              </h2>
              <div className="text-xs text-muted mt-1 flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-leaf" />
                <span>{selectedArticle.source_attribution}</span>
                <span>•</span>
                <span>{selectedArticle.verified_date}</span>
              </div>
            </div>

            {/* Summary Highlight */}
            <div className="p-3.5 rounded-2xl bg-orange/10 border border-orange/20 text-xs sm:text-sm text-ink/90 font-medium">
              {lang === 'mr' ? selectedArticle.summary_mr : lang === 'hi' ? selectedArticle.summary_hi : selectedArticle.summary_en}
            </div>

            {/* Full Content */}
            <div className="text-xs sm:text-sm leading-relaxed text-ink/90 whitespace-pre-line p-5 rounded-2xl bg-white border border-ink/10 shadow-sm font-sans">
              {lang === 'mr' ? selectedArticle.content_mr : lang === 'hi' ? selectedArticle.content_hi : selectedArticle.content_en}
            </div>

            {/* Observed Symptoms */}
            {selectedArticle.symptoms && selectedArticle.symptoms.length > 0 && (
              <div>
                <h4 className="font-serif font-bold text-sm text-ink mb-1.5 flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-orange-deep" />
                  <span>Key Symptoms & Diagnostic Signs</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.symptoms.map((s, i) => (
                    <span key={i} className="text-xs bg-chalk text-ink px-2.5 py-1 rounded-xl border border-ink/10">
                      • {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preventive Practices */}
            {selectedArticle.prevention && selectedArticle.prevention.length > 0 && (
              <div>
                <h4 className="font-serif font-bold text-sm text-ink mb-1.5 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>Preventive Best Practices (GAP)</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedArticle.prevention.map((p, i) => (
                    <li key={i} className="text-xs text-ink/85 flex items-start space-x-2 bg-chalk/40 p-2 rounded-xl border border-ink/5">
                      <span className="text-leaf font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Management & Treatment */}
            {selectedArticle.management && selectedArticle.management.length > 0 && (
              <div>
                <h4 className="font-serif font-bold text-sm text-ink mb-1.5 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-soil" />
                  <span>Actionable Management Protocol</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedArticle.management.map((m, i) => (
                    <li key={i} className="text-xs text-ink/85 flex items-start space-x-2 bg-chalk/40 p-2 rounded-xl border border-ink/5">
                      <span className="text-soil font-bold">→</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-3 bg-ink text-white font-serif font-bold text-xs rounded-xl shadow-sm hover:bg-ink/90 active:scale-95 transition-all"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
