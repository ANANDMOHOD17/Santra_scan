import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TreeAnatomy2D from '../components/TreeAnatomy2D';
import SeasonalCalendar from '../components/SeasonalCalendar';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function OrangeBookPage() {
  const { t, lang } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState('articles'); // 'articles', 'anatomy', 'calendar', 'diseases'
  const [loading, setLoading] = useState(true);

  const fetchArticles = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.append('category', selectedCategory);
    if (searchQuery) params.append('search', searchQuery);

    fetch(`/api/orange-book/articles?${params.toString()}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setArticles(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const fetchDiseases = () => {
    fetch('/api/orange-book/diseases')
      .then(r => r.ok ? r.json() : [])
      .then(data => setDiseases(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchArticles();
    fetchDiseases();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const openFullArticle = (slug) => {
    fetch(`/api/orange-book/articles/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setSelectedArticle(data))
      .catch(() => {});
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7 pb-28">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-ink/10">
        <div>
          <div className="flex items-center space-x-2.5 mb-1">
            <div className="w-9 h-9 rounded-2xl bg-orange/20 text-orange-deep flex items-center justify-center text-xl">
              📖
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              {t('orange_book.title')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            {t('orange_book.subtitle')}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="inline-flex bg-chalk p-1 rounded-2xl border border-ink/10 self-start">
          <button
            onClick={() => setViewTab('articles')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'articles' ? 'bg-ink text-white' : 'text-muted hover:text-ink'
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setViewTab('anatomy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'anatomy' ? 'bg-soil text-white font-bold' : 'text-muted hover:text-ink'
            }`}
          >
            2D Anatomy
          </button>
          <button
            onClick={() => setViewTab('calendar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'calendar' ? 'bg-orange-deep text-white font-bold' : 'text-muted hover:text-ink'
            }`}
          >
            Seasonal Calendar
          </button>
          <button
            onClick={() => setViewTab('diseases')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewTab === 'diseases' ? 'bg-leaf text-white font-bold' : 'text-muted hover:text-ink'
            }`}
          >
            Disease Catalog
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
          <div className="flex items-center space-x-2 text-xs text-muted">
            <ShieldCheck className="w-4 h-4 text-leaf" />
            <span>ICAR-CCRI & PDKV Akola Verified Citrus Disease Catalog</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diseases.map((d) => {
              const name = lang === 'mr' ? d.name_mr : lang === 'hi' ? d.name_hi : d.name_en;
              const desc = lang === 'mr' ? d.description_mr : lang === 'hi' ? d.description_hi : d.description_en;
              const isHigh = d.severity_level === 'high' || d.severity_level === 'quarantine';

              return (
                <div key={d.id} className="paper-card p-5 border border-ink/10 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isHigh ? 'bg-verdict-reject/15 text-verdict-reject' : 'bg-[#FFF1D6] text-[#A86A00]'
                      }`}>
                        {d.severity_level.toUpperCase()}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-ink mt-1">{name}</h3>
                      <div className="text-[11px] text-muted italic font-serif">{d.scientific_name}</div>
                    </div>
                  </div>

                  <p className="text-xs text-ink/80 leading-relaxed bg-chalk/40 p-2.5 rounded-xl">
                    {desc}
                  </p>

                  {d.key_symptoms && (
                    <div>
                      <div className="text-[10px] font-bold uppercase text-muted mb-1">Key Symptoms:</div>
                      <div className="flex flex-wrap gap-1">
                        {d.key_symptoms.map((s, i) => (
                          <span key={i} className="text-[11px] bg-white text-ink px-2 py-0.5 rounded-md border border-ink/10">
                            • {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-muted border-t border-ink/10 pt-2">
                    Verified Source: <span className="font-semibold text-ink">{d.verified_source}</span>
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
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-ink hover:bg-ink/90 text-white text-xs font-bold rounded-xl active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-deep text-white border-orange shadow-sm'
                    : 'bg-white text-ink/75 border-ink/10 hover:bg-chalk'
                }`}
              >
                {cat === 'all' ? t('orange_book.all_categories') : cat}
              </button>
            ))}
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
                    key={art.id}
                    onClick={() => openFullArticle(art.slug)}
                    className="paper-card p-5 border border-ink/10 hover:border-orange/50 cursor-pointer shadow-sm hover:shadow-paper transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-orange-deep bg-orange/15 px-2 py-0.5 rounded-full inline-block mb-2">
                        {art.category}
                      </span>
                      <h3 className="font-serif font-bold text-base text-ink mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                        {summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-[11px] text-muted">
                      <span>{art.verified_date}</span>
                      <span className="font-bold text-orange-deep hover:underline">Read →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="paper-card p-12 text-center space-y-2 border border-ink/10">
              <BookOpen className="w-10 h-10 text-muted mx-auto" />
              <h3 className="font-serif font-bold text-base text-ink">No Articles Found</h3>
              <p className="text-xs text-muted">Try a different search query or select 'All Sections'.</p>
            </div>
          )}
        </div>
      )}

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm">
          <div className="bg-paper rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-glass border border-ink/15 relative space-y-5 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-chalk hover:bg-white text-ink active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-orange-deep bg-orange/15 px-2.5 py-0.5 rounded-full">
                {selectedArticle.category}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink mt-2">
                {lang === 'mr' ? selectedArticle.title_mr : lang === 'hi' ? selectedArticle.title_hi : selectedArticle.title_en}
              </h2>
              <div className="text-xs text-muted mt-1">
                {t('orange_book.verified_by')} {selectedArticle.source_attribution} • {selectedArticle.verified_date}
              </div>
            </div>

            <div className="text-sm leading-relaxed text-ink/90 whitespace-pre-line p-4 rounded-2xl bg-white border border-ink/10">
              {lang === 'mr' ? selectedArticle.content_mr : lang === 'hi' ? selectedArticle.content_hi : selectedArticle.content_en}
            </div>

            {/* Symptoms and Management */}
            {selectedArticle.symptoms && (
              <div>
                <h4 className="font-serif font-bold text-sm text-ink mb-1.5">Observed Symptoms</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.symptoms.map((s, i) => (
                    <span key={i} className="text-xs bg-chalk text-ink px-2.5 py-1 rounded-xl border border-ink/10">
                      • {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedArticle.prevention && (
              <div>
                <h4 className="font-serif font-bold text-sm text-ink mb-1.5">Preventive Practices</h4>
                <ul className="space-y-1">
                  {selectedArticle.prevention.map((p, i) => (
                    <li key={i} className="text-xs text-ink/80 flex items-start space-x-2">
                      <span className="text-leaf font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-3 bg-ink text-white font-serif font-bold text-xs rounded-xl shadow-sm hover:bg-ink/90 active:scale-95 transition-all"
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
