import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RealtimeProvider, useRealtime } from './context/RealtimeContext';

// Components
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import LoadingIntro from './components/LoadingIntro';

// Pages
import Dashboard from './pages/Dashboard';
import ScanPage from './pages/ScanPage';
import ResultPage from './pages/ResultPage';
import PassportPage from './pages/PassportPage';
import HistoryPage from './pages/HistoryPage';
import ReviewerQueuePage from './pages/ReviewerQueuePage';
import OrangeBookPage from './pages/OrangeBookPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

function RealtimeToastBanner() {
  const { toastEvent, dismissToast } = useRealtime();
  if (!toastEvent) return null;

  const isSuitable = toastEvent.verdict === 'suitable' || toastEvent.verdict === 'healthy_looking';
  const isQuestionable = toastEvent.verdict === 'questionable' || toastEvent.verdict === 'warning_signs';

  return (
    <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 max-w-sm w-full p-1 pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-paper-lg border border-ink/15 flex items-start space-x-3 text-xs">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
          isSuitable ? 'bg-leaf/20 text-leaf' : isQuestionable ? 'bg-orange/20 text-orange-deep' : 'bg-verdict-reject/20 text-verdict-reject'
        }`}>
          {isSuitable ? '✓' : isQuestionable ? '?' : '✕'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-leaf animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Live Intake Stream
            </span>
          </div>
          <div className="font-bold text-ink truncate">
            {toastEvent.nursery_name} ({toastEvent.taluka})
          </div>
          <div className="text-[11px] text-muted truncate">
            {toastEvent.variety} • <span className="font-semibold text-ink">{toastEvent.primary_condition}</span> ({toastEvent.confidence}%)
          </div>
        </div>
        <button
          onClick={dismissToast}
          className="text-muted hover:text-ink text-sm px-1 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function MainAppShell() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // FR1: Loading intro shown once per session (3-4 seconds)
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('santrascan_intro_seen');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('santrascan_intro_seen', 'true');
    setShowIntro(false);
  };

  // If loading intro is still running, show intro first
  if (showIntro) {
    return <LoadingIntro onComplete={handleIntroComplete} />;
  }

  // Public exception: allow viewing public Plant Passports without mandatory login
  const isPublicPassportView = location.pathname.startsWith('/passport/');

  // If not logged in and not viewing a public passport, present Login & Create Account screen first
  if (!isAuthenticated && !isPublicPassportView) {
    return <LoginPage onLoginSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-orange/20 selection:text-ink">
      <Navbar />
      <RealtimeToastBanner />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/scans/:id" element={<ResultPage />} />
          <Route path="/passport/:passport_uid" element={<PassportPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/reviews" element={<ReviewerQueuePage />} />
          <Route path="/orange-book" element={<OrangeBookPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={() => {}} />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RealtimeProvider>
        <LanguageProvider>
          <Router>
            <MainAppShell />
          </Router>
        </LanguageProvider>
      </RealtimeProvider>
    </AuthProvider>
  );
}
