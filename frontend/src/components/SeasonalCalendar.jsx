import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SeasonalCalendar() {
  const { t, lang } = useLanguage();
  const [calendar, setCalendar] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'Ambia Bahar', 'Mrig Bahar'

  useEffect(() => {
    fetch('/api/orange-book/seasonal-calendar')
      .then(r => r.ok ? r.json() : [])
      .then(data => setCalendar(data))
      .catch(() => {});
  }, []);

  const filteredItems = calendar.filter(item => {
    if (activeTab === 'all') return true;
    return item.bahar.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <div className="paper-card p-5 sm:p-7 border border-ink/10 shadow-paper space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ink/10 gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-orange/20 text-orange-deep flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-ink">
              {t('orange_book.calendar_title')}
            </h3>
            <p className="text-xs text-muted">
              {t('orange_book.calendar_subtitle')}
            </p>
          </div>
        </div>

        {/* Bahar Filter Pills */}
        <div className="inline-flex bg-chalk p-1 rounded-2xl border border-ink/10 self-start">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'all' ? 'bg-ink text-white' : 'text-muted hover:text-ink'
            }`}
          >
            All Months
          </button>
          <button
            onClick={() => setActiveTab('Ambia')}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'Ambia' ? 'bg-orange-deep text-white font-bold' : 'text-muted hover:text-ink'
            }`}
          >
            अंबिया बहार (Ambia)
          </button>
          <button
            onClick={() => setActiveTab('Mrig')}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'Mrig' ? 'bg-leaf text-white font-bold' : 'text-muted hover:text-ink'
            }`}
          >
            मृग बहार (Mrig)
          </button>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-3.5">
        {filteredItems.map((item, idx) => {
          const actionText = lang === 'mr' ? item.action_mr : lang === 'hi' ? item.action_hi : item.action_en;
          const monthText = lang === 'mr' ? item.month_mr : item.month;
          const isAmbia = item.bahar.includes('Ambia');

          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm hover:border-orange/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start space-x-3.5">
                <div className="min-w-[100px]">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isAmbia ? 'bg-orange/15 text-orange-deep' : 'bg-leaf/15 text-leaf'
                  }`}>
                    {item.bahar}
                  </span>
                  <div className="font-serif font-bold text-base text-ink mt-1">
                    {monthText}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-ink/90 leading-relaxed font-medium">
                    {actionText}
                  </p>
                </div>
              </div>

              {/* Disease Alert Pill */}
              {item.disease_alert && (
                <div className="sm:max-w-xs bg-chalk/80 rounded-xl p-2.5 border border-ink/10 flex items-start space-x-2 text-[11px] text-soil font-medium flex-shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-deep flex-shrink-0 mt-0.5" />
                  <span>{item.disease_alert}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
