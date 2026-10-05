import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage();

  const options = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' }
  ];

  return (
    <div className="inline-flex items-center bg-chalk/80 p-1 rounded-xl border border-ink/10 shadow-sm">
      {!compact && <Globe className="w-4 h-4 text-muted ml-1.5 mr-1" />}
      {options.map((opt) => {
        const isActive = lang === opt.code;
        return (
          <button
            key={opt.code}
            onClick={() => setLang(opt.code)}
            className={`px-2.5 py-1 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              isActive
                ? 'bg-ink text-paper shadow-sm font-semibold'
                : 'text-ink/80 hover:text-ink hover:bg-white/60'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
