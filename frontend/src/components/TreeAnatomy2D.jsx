import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Info, BookOpen, ArrowRight, X, ShieldCheck, Eye, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import orangeTreeImg from '../assets/orange_tree.png';
import { TREE_ANATOMY_PARTS } from '../data/orangeBookData';

export default function TreeAnatomy2D() {
  const { t, lang } = useLanguage();
  const [anatomyData, setAnatomyData] = useState(TREE_ANATOMY_PARTS);
  const [selectedPart, setSelectedPart] = useState(TREE_ANATOMY_PARTS[4]); // default to graft union
  const [displayMode, setDisplayMode] = useState('realistic'); // 'realistic' | 'schematic'

  useEffect(() => {
    fetch('/api/orange-book/tree-anatomy')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAnatomyData(data);
          setSelectedPart(data.find(p => p.id === 'graft_union') || data[0]);
        } else {
          setAnatomyData(TREE_ANATOMY_PARTS);
          setSelectedPart(TREE_ANATOMY_PARTS.find(p => p.id === 'graft_union') || TREE_ANATOMY_PARTS[0]);
        }
      })
      .catch(() => {
        setAnatomyData(TREE_ANATOMY_PARTS);
        setSelectedPart(TREE_ANATOMY_PARTS.find(p => p.id === 'graft_union') || TREE_ANATOMY_PARTS[0]);
      });
  }, []);

  return (
    <div className="paper-card p-5 sm:p-7 border border-ink/10 shadow-paper">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-ink/10 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink">
              {t('orange_book.anatomy_title')}
            </h3>
            <span className="bg-orange/20 text-orange-deep text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              HD Botanical
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            {t('orange_book.anatomy_subtitle')}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 self-start">
          <div className="bg-chalk p-1 rounded-2xl border border-ink/10 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setDisplayMode('realistic')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                displayMode === 'realistic'
                  ? 'bg-soil text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Real Orange Tree</span>
            </button>
            <button
              onClick={() => setDisplayMode('schematic')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                displayMode === 'schematic'
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vector Schematic</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive Centerpiece */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[360px] aspect-[4/5] bg-gradient-to-b from-[#F5F1E6] to-[#ECE5D3] rounded-3xl border-2 border-soil/20 p-4 shadow-inner flex items-center justify-center overflow-hidden">
            
            {displayMode === 'realistic' ? (
              // Realistic Orange Tree Mode
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={orangeTreeImg} 
                  alt="Nagpur Mandarin Botanical Tree"
                  className="w-full h-full object-contain filter drop-shadow-xl select-none"
                />

                {/* Hotspot Markers placed over tree image */}
                {anatomyData.map((part) => {
                  const isSelected = selectedPart?.id === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      style={{
                        left: `${part.cx}%`,
                        top: `${part.cy}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute group z-20 transition-all duration-300 ${
                        isSelected ? 'scale-125' : 'hover:scale-110'
                      }`}
                      aria-label={part.name_en}
                    >
                      {/* Pulsing Ring Effect */}
                      <span className={`absolute -inset-2 rounded-full ${
                        isSelected 
                          ? 'bg-orange animate-ping opacity-75' 
                          : 'bg-white opacity-40 group-hover:opacity-75'
                      }`} />
                      
                      {/* Main Center Node */}
                      <span className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-orange-deep text-white border-white ring-4 ring-orange/30'
                          : 'bg-white text-ink border-soil hover:border-orange'
                      }`}>
                        <span className="w-2 h-2 rounded-full bg-current" />
                      </span>

                      {/* Tooltip on Hover */}
                      <span className={`absolute left-1/2 -bottom-6 -translate-x-1/2 whitespace-nowrap bg-ink/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow pointer-events-none transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {lang === 'mr' ? part.name_mr : lang === 'hi' ? part.name_hi : part.name_en}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              // Vector Schematic SVG Mode
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
                <text x="150" y="375" textAnchor="middle" fill="#6B4A2F" fontSize="10" fontFamily="sans-serif">Rangpur Lime Rootzone</text>

                {/* Lower Trunk (Rootstock: Rangpur Lime / Jambhiri) */}
                <path d="M 143 320 L 144 260 L 156 260 L 157 320 Z" fill="url(#trunkGrad)" />
                
                {/* Graft Union Interface (15-20 cm mark) */}
                <ellipse cx="150" cy="255" rx="10" ry="7" fill="#F08A00" stroke="#B35B00" strokeWidth="2" />
                <line x1="100" y1="255" x2="140" y2="255" stroke="#F08A00" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="95" y="258" textAnchor="end" fill="#D96F00" fontSize="10" fontWeight="bold">Bud Union (15-20cm)</text>

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
            )}

            {/* Instruction tooltip */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-soil border border-soil/20 shadow">
              Tap any hotspot node to inspect
            </div>
          </div>
        </div>

        {/* Selected Part Details Drawer */}
        <div className="md:col-span-6 space-y-4">
          {selectedPart ? (
            <div className="bg-chalk/60 rounded-3xl p-5 border border-ink/10 animate-in fade-in slide-in-from-right-3 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-deep bg-orange/15 px-2.5 py-0.5 rounded-full">
                    Anatomical Checkpoint
                  </span>
                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-ink mt-1">
                    {lang === 'mr' ? selectedPart.name_mr : lang === 'hi' ? selectedPart.name_hi : selectedPart.name_en}
                  </h4>
                </div>
              </div>

              <div className="bg-white/80 p-3.5 rounded-2xl border border-ink/5 shadow-sm">
                <div className="text-[10px] font-bold uppercase text-muted mb-1">Physiological Function & Standard:</div>
                <p className="text-xs sm:text-sm text-ink/90 leading-relaxed font-sans">
                  {selectedPart.role}
                </p>
              </div>

              {/* Key Diseases & Vulnerabilities */}
              {selectedPart.key_diseases?.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase text-muted mb-2">Priority Conditions To Monitor:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPart.key_diseases.map((d, i) => (
                      <span key={i} className="text-xs bg-white text-ink font-semibold px-2.5 py-1 rounded-xl border border-ink/10 shadow-sm flex items-center space-x-1">
                        <span className="text-orange-deep">⚠️</span>
                        <span>{d}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Link to guide */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.querySelector(`[data-slug="${selectedPart.article_slug}"]`);
                    // Or navigate to Orange Book articles tab
                    window.location.hash = '#/orange-book';
                  }}
                  className="w-full py-3 bg-soil hover:bg-soil/90 text-white font-serif font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full ICAR-CCRI Guide on this Organ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted">
              Select any organ hotspot on the tree to inspect details.
            </div>
          )}

          {/* Quick organ pills for easy mobile accessibility */}
          <div>
            <div className="text-[10px] font-bold uppercase text-muted mb-1.5">Quick Select Organ:</div>
            <div className="flex flex-wrap gap-1.5">
              {anatomyData.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedPart?.id === part.id
                      ? 'bg-ink text-white border-ink shadow-sm'
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
    </div>
  );
}
