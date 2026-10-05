import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Info, BookOpen, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TreeAnatomy2D() {
  const { t, lang } = useLanguage();
  const [anatomyData, setAnatomyData] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    fetch('/api/orange-book/tree-anatomy')
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        setAnatomyData(data);
        if (data.length > 0) {
          // Select graft union as default showcase
          setSelectedPart(data.find(p => p.id === 'graft_union') || data[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="paper-card p-5 sm:p-7 border border-ink/10 shadow-paper">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-ink/10 gap-2">
        <div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink">
            {t('orange_book.anatomy_title')}
          </h3>
          <p className="text-xs sm:text-sm text-muted">
            {t('orange_book.anatomy_subtitle')}
          </p>
        </div>
        <div className="bg-chalk px-3 py-1.5 rounded-full text-xs font-semibold text-soil border border-ink/10 flex items-center space-x-1.5 self-start">
          <Sparkles className="w-3.5 h-3.5 text-orange-deep" />
          <span>Interactive 2D Botanical Model</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Botanical Diagram with Hotspots */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[340px] aspect-[3/4] bg-[#F7F2E6] rounded-3xl border-2 border-soil/20 p-4 shadow-inner flex items-center justify-center overflow-hidden">
            
            {/* SVG Tree & Sapling Silhouette */}
            <svg viewBox="0 0 300 400" className="w-full h-full">
              <defs>
                <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5B3A1E" />
                  <stop offset="50%" stopColor="#7E522C" />
                  <stop offset="100%" stopColor="#4A2E16" />
                </linearGradient>
                <linearGradient id="foliageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E8B4E" />
                  <stop offset="100%" stopColor="#174A27" />
                </linearGradient>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Roots System */}
              <g stroke="#6B4A2F" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d="M 150 320 Q 130 360 90 380" />
                <path d="M 150 320 Q 150 365 140 390" />
                <path d="M 150 320 Q 170 355 210 380" />
                <path d="M 145 340 Q 120 370 105 385" />
                <path d="M 155 340 Q 180 370 195 385" />
              </g>

              {/* Root Ball Polybag line */}
              <rect x="80" y="315" width="140" height="75" rx="8" fill="#1D2A1F" fillOpacity="0.08" stroke="#6B4A2F" strokeDasharray="4 4" strokeWidth="2" />
              <text x="150" y="375" textAnchor="middle" fill="#6B4A2F" fontSize="10" fontFamily="sans-serif">Nursery Polybag Medium</text>

              {/* Lower Trunk (Rootstock: Rangpur Lime / Jambhiri) */}
              <path d="M 143 320 L 144 260 L 156 260 L 157 320 Z" fill="url(#trunkGrad)" />
              
              {/* Graft Union Interface (15-20 cm mark) */}
              <ellipse cx="150" cy="255" rx="10" ry="7" fill="#F08A00" stroke="#B35B00" strokeWidth="2" />
              <line x1="100" y1="255" x2="140" y2="255" stroke="#F08A00" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="95" y="258" textAnchor="end" fill="#D96F00" fontSize="10" fontWeight="bold">Bud Union</text>

              {/* Upper Scion Trunk (Nagpur Mandarin) */}
              <path d="M 145 250 L 147 170 L 153 170 L 155 250 Z" fill="url(#trunkGrad)" />

              {/* Main Branches */}
              <path d="M 150 170 Q 120 130 80 110" stroke="url(#trunkGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 150 170 Q 180 130 220 110" stroke="url(#trunkGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 150 150 Q 150 110 150 80" stroke="url(#trunkGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Lush Canopy Foliage Clouds */}
              <circle cx="150" cy="90" r="45" fill="url(#foliageGrad)" />
              <circle cx="105" cy="115" r="40" fill="url(#foliageGrad)" opacity="0.95" />
              <circle cx="195" cy="115" r="40" fill="url(#foliageGrad)" opacity="0.95" />
              <circle cx="150" cy="60" r="35" fill="#3FBF6B" opacity="0.85" />

              {/* Oranges (Fruits) */}
              <circle cx="115" cy="120" r="10" fill="#F08A00" stroke="#D96F00" strokeWidth="1.5" />
              <circle cx="185" cy="125" r="10" fill="#F08A00" stroke="#D96F00" strokeWidth="1.5" />
              <circle cx="145" cy="70" r="9" fill="#FFC15C" stroke="#D96F00" strokeWidth="1.5" />

              {/* Clickable Interactive Hotspot Indicators */}
              {anatomyData.map((part) => {
                const isSelected = selectedPart?.id === part.id;
                // Scale SVG percentages (cx, cy) to 300x400
                const px = (part.cx / 100) * 300;
                const py = (part.cy / 100) * 400;

                return (
                  <g 
                    key={part.id} 
                    onClick={() => setSelectedPart(part)}
                    className="cursor-pointer transition-transform hover:scale-125"
                  >
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 16 : 12}
                      className={isSelected ? 'fill-orange stroke-white stroke-2 animate-pulse' : 'fill-white stroke-soil stroke-2 opacity-90 hover:opacity-100'}
                    />
                    <circle
                      cx={px}
                      cy={py}
                      r={4}
                      fill={isSelected ? '#FFFFFF' : '#1D2A1F'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Instruction tooltip */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-soil border border-soil/20 shadow">
              Tap any hotspot node
            </div>
          </div>
        </div>

        {/* Selected Part Details Drawer */}
        <div className="md:col-span-6 space-y-4">
          {selectedPart ? (
            <div className="bg-chalk/60 rounded-3xl p-5 border border-ink/10 animate-in fade-in slide-in-from-right-3">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-deep bg-orange/15 px-2.5 py-0.5 rounded-full">
                    Anatomical Checkpoint
                  </span>
                  <h4 className="font-serif font-bold text-xl text-ink mt-1">
                    {lang === 'mr' ? selectedPart.name_mr : lang === 'hi' ? selectedPart.name_hi : selectedPart.name_en}
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-ink/85 leading-relaxed mb-4 bg-white/70 p-3 rounded-2xl border border-ink/5">
                {selectedPart.role}
              </p>

              {/* Key Diseases & Vulnerabilities */}
              {selectedPart.key_diseases?.length > 0 && (
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase text-muted mb-2">Priority Conditions To Monitor:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPart.key_diseases.map((d, i) => (
                      <span key={i} className="text-xs bg-white text-ink font-semibold px-2.5 py-1 rounded-xl border border-ink/10 shadow-sm">
                        ⚠️ {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Link to Orange Book */}
              <Link
                to={`/orange-book`}
                className="w-full py-3 bg-soil text-white hover:bg-soil/90 font-serif font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full ICAR-CCRI Guide on this Organ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="p-8 text-center text-muted">
              Select any organ hotspot on the tree to inspect details.
            </div>
          )}

          {/* Quick organ pills for easy mobile accessibility */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {anatomyData.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedPart?.id === part.id
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-ink/80 border-ink/10 hover:bg-chalk'
                }`}
              >
                {lang === 'mr' ? part.name_mr : lang === 'hi' ? part.name_hi : part.name_en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
