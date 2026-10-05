import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home, 
  ScanLine, 
  Clock, 
  ClipboardList, 
  BookOpen, 
  BarChart3 
} from 'lucide-react';

export default function BottomNav() {
  const { t } = useLanguage();
  const [pendingCount, setPendingCount] = useState(1);

  // Poll review queue count
  useEffect(() => {
    fetch('/api/reviews/queue')
      .then(r => r.ok ? r.json() : [])
      .then(data => setPendingCount(data.length))
      .catch(() => {});
  }, []);

  const navItems = [
    { to: '/', label: t('nav.dashboard'), icon: Home },
    { to: '/history', label: t('nav.history'), icon: Clock },
    { to: '/scan', label: t('nav.scan'), icon: ScanLine, isPrimary: true },
    { to: '/reviews', label: t('nav.reviews'), icon: ClipboardList, badge: pendingCount },
    { to: '/orange-book', label: t('nav.orange_book'), icon: BookOpen },
    { to: '/analytics', label: t('nav.analytics'), icon: BarChart3 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-3 pointer-events-none no-print">
      <div className="max-w-xl mx-auto pointer-events-auto liquid-glass rounded-3xl p-1.5 shadow-glass border border-ink/15 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.isPrimary) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative -top-3 w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-transform active:scale-95 shadow-paper-lg ${
                    isActive
                      ? 'bg-orange-deep text-white scale-105'
                      : 'bg-leaf text-white hover:bg-leaf-forest'
                  }`
                }
              >
                <Icon className="w-7 h-7" />
                <span className="text-[9px] font-bold mt-0.5 tracking-tight uppercase">Scan</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all ${
                  isActive
                    ? 'text-orange-deep font-bold bg-white/70 shadow-sm'
                    : 'text-ink/75 hover:text-ink hover:bg-white/40'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-verdict-reject text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
