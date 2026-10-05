import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Scan, ShieldCheck, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';

export default function LoadingIntro({ onComplete }) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const slides = [
    {
      icon: Scan,
      title: t('intro.slide1_title'),
      desc: t('intro.slide1_desc'),
      bg: "bg-[#EFE8D8]",
      accent: "text-orange-deep",
    },
    {
      icon: ShieldCheck,
      title: t('intro.slide2_title'),
      desc: t('intro.slide2_desc'),
      bg: "bg-[#E4F4E8]",
      accent: "text-leaf",
    },
    {
      icon: CheckCircle2,
      title: t('intro.slide3_title'),
      desc: t('intro.slide3_desc'),
      bg: "bg-[#FFF1D6]",
      accent: "text-[#A86A00]",
    },
    {
      icon: QrCode,
      title: t('intro.slide4_title'),
      desc: t('intro.slide4_desc'),
      bg: "bg-[#FBF7EE]",
      accent: "text-forest",
    }
  ];

  // Auto advance slides and finish in 3.4s total (3 to 4 seconds loading intro)
  useEffect(() => {
    // Advance slides every 800ms: 0ms -> slide 0, 800ms -> slide 1, 1600ms -> slide 2, 2400ms -> slide 3
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < slides.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    // Auto curtain-up exit after exactly 3.4 seconds
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 3400);

    return () => {
      clearInterval(slideTimer);
      clearTimeout(exitTimer);
    };
  }, [slides.length]);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500); // 500ms smooth curtain-up transition
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 bg-paper transition-transform duration-700 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* 3.4-second Linear Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-ink/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange to-leaf transition-all duration-[3400ms] ease-linear"
          style={{ width: isExiting ? '100%' : '100%' }}
        />
      </div>

      {/* Top Bar with Skip */}
      <div className="flex justify-between items-center max-w-lg mx-auto w-full pt-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍊</span>
          <span className="font-serif font-bold text-xl text-ink">SantraScan</span>
        </div>
        <button
          onClick={handleFinish}
          className="text-sm font-semibold text-muted hover:text-ink px-3 py-1.5 rounded-full border border-ink/10 bg-white/60 active:scale-95 transition-all"
        >
          {t('intro.skip')}
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center py-6">
        <div className={`w-28 h-28 rounded-3xl ${slide.bg} flex items-center justify-center mb-8 shadow-paper transition-all duration-500 transform scale-105`}>
          <IconComponent className={`w-14 h-14 ${slide.accent}`} />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-4">
          {slide.title}
        </h2>
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-sm mb-6">
          {slide.desc}
        </p>

        {/* Slide Progress Dots */}
        <div className="flex items-center space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-orange-deep' : 'w-2.5 bg-ink/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="max-w-md mx-auto w-full pb-8">
        {currentSlide === slides.length - 1 ? (
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-leaf text-white font-serif font-bold text-lg rounded-2xl shadow-paper-lg hover:bg-leaf-forest active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>{t('intro.get_started')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
            className="w-full py-3.5 bg-orange text-white font-medium text-base rounded-2xl shadow-paper hover:bg-orange-deep active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
