import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Database, 
  Cpu, 
  Server, 
  CloudRain, 
  QrCode,
  HardDrive, 
  Sparkles, 
  Wifi,
  LogOut,
  User
} from 'lucide-react';

export default function SettingsPage() {
  const { t } = useLanguage();
  const { demoMode, toggleDemoMode, user, quickSwitchRole, isOnline, logout } = useAuth();
  const navigate = useNavigate();

  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastCheckTime, setLastCheckTime] = useState(null);

  const runHealthCheck = () => {
    setLoading(true);
    fetch('/api/health')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setHealthData(data);
        setLastCheckTime(new Date().toLocaleTimeString());
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-7 pb-28">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-ink/10">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Activity className="w-6 h-6 text-leaf" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              System Diagnostics & Settings
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Live infrastructure diagnostics (PRD FR22) & station configuration.
          </p>
        </div>

        <button
          onClick={runHealthCheck}
          className="self-start px-3.5 py-1.5 bg-chalk hover:bg-white text-ink text-xs font-bold rounded-xl border border-ink/15 shadow-sm active:scale-95 transition-all flex items-center space-x-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-orange' : ''}`} />
          <span>Run Live Ping</span>
        </button>
      </div>

      {/* Component Response Times (PRD FR22) */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-ink flex items-center space-x-2">
            <span>Component Health Matrix</span>
            <span className="w-2 h-2 rounded-full bg-leaf animate-ping" />
          </h3>
          <span className="text-[11px] text-muted">Last ping: {lastCheckTime || 'Just now'}</span>
        </div>

        {healthData?.components ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {/* 1. Backend API */}
            <div className="p-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
              <Server className="w-5 h-5 text-leaf mt-0.5" />
              <div className="text-xs flex-1">
                <div className="font-bold text-ink">FastAPI Backend Engine</div>
                <div className="text-muted text-[11px]">Status: {healthData.components.backend_api.status}</div>
                <div className="font-mono text-[10px] text-soil mt-1">Latency: {healthData.components.backend_api.latency_ms} ms</div>
              </div>
            </div>

            {/* 2. Database */}
            <div className="p-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
              <Database className="w-5 h-5 text-soil mt-0.5" />
              <div className="text-xs flex-1">
                <div className="font-bold text-ink">SQL Database</div>
                <div className="text-muted text-[11px]">Status: {healthData.components.database.status}</div>
                <div className="font-mono text-[10px] text-soil mt-1">Latency: {healthData.components.database.latency_ms} ms</div>
              </div>
            </div>

            {/* 3. AI Model */}
            <div className="p-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
              <Cpu className="w-5 h-5 text-orange-deep mt-0.5" />
              <div className="text-xs flex-1">
                <div className="font-bold text-ink">OpenCV & MobileNet Model</div>
                <div className="text-muted text-[11px]">Model: SantraScan-EffCitrus-v1.4</div>
                <div className="font-mono text-[10px] text-soil mt-1">Inference: {healthData.components.ai_vision_model.latency_ms} ms</div>
              </div>
            </div>

            {/* 4. Local Storage */}
            <div className="p-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
              <HardDrive className="w-5 h-5 text-muted mt-0.5" />
              <div className="text-xs flex-1">
                <div className="font-bold text-ink">Private Image Storage</div>
                <div className="text-muted text-[11px]">Status: {healthData.components.storage_service.status}</div>
                <div className="font-mono text-[10px] text-soil mt-1">Disk I/O: {healthData.components.storage_service.latency_ms} ms</div>
              </div>
            </div>

            {/* 5. Weather API */}
            <div className="p-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
              <CloudRain className="w-5 h-5 text-orange mt-0.5" />
              <div className="text-xs flex-1">
                <div className="font-bold text-ink">Open-Meteo Weather API</div>
                <div className="text-muted text-[11px]">Status: {healthData.components.weather_service.status}</div>
                <div className="font-mono text-[10px] text-soil mt-1">Latency: {healthData.components.weather_service.latency_ms} ms</div>
              </div>
            </div>

            {/* 6. QR Passport Service */}
            <div className="p-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start space-x-3">
              <QrCode className="w-5 h-5 text-forest mt-0.5" />
              <div className="text-xs flex-1">
                <div className="font-bold text-ink">Segno QR Passport Engine</div>
                <div className="text-muted text-[11px]">Status: {healthData.components.qr_passport_service.status}</div>
                <div className="font-mono text-[10px] text-soil mt-1">Latency: {healthData.components.qr_passport_service.latency_ms} ms</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted text-center py-4">Waiting for ping response...</div>
        )}
      </div>

      {/* Demo Mode Toggle (PRD FR23) */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base text-ink flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-orange-deep" />
              <span>Demo Presentation Mode</span>
            </h3>
            <p className="text-xs text-muted max-w-md leading-relaxed">
              When enabled, a prominent disclaimer banner is shown: <em>"DEMO DATA — NOT A REAL AI ASSESSMENT"</em>.
            </p>
          </div>

          <button
            onClick={toggleDemoMode}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
              demoMode ? 'bg-orange' : 'bg-ink/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                demoMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* User Account & Session (Log Out) */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange/20 border border-orange/40 flex items-center justify-center text-xl text-orange font-bold">
              <User className="w-6 h-6 text-orange-deep" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-muted tracking-wider">
                Current Session (सध्याचे सत्र)
              </div>
              <h3 className="font-serif font-bold text-base text-ink">
                {user?.full_name || 'SantraScan User'}
              </h3>
              <p className="text-xs text-muted flex items-center space-x-2">
                <span className="capitalize font-semibold text-leaf-forest">{user?.role || 'Operator'}</span>
                <span>•</span>
                <span>{user?.phone || user?.email || 'Logged In'}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2.5 rounded-xl bg-verdict-reject/10 hover:bg-verdict-reject/20 border border-verdict-reject/30 text-verdict-reject font-bold text-xs flex items-center justify-center space-x-2 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('logout') || 'Log Out (लॉग आउट)'}</span>
          </button>
        </div>
      </div>

      {/* About Team & Problem Statement */}
      <div className="paper-card p-5 sm:p-6 border border-ink/10 shadow-paper space-y-2 text-xs">
        <h3 className="font-serif font-bold text-sm text-ink uppercase tracking-wide">
          Innovation Cohort Attribution
        </h3>
        <p className="text-muted">
          <strong>Problem Statement:</strong> AI-Based Orange Planting Material Quality Assessment
        </p>
        <p className="text-muted">
          <strong>Team:</strong> Build Bridge | <strong>Cohort:</strong> Nagpur RISE Agri Innovation Cohort
        </p>
        <p className="text-muted">
          <strong>Screening Aid Disclaimer:</strong> SantraScan is an advisory screening aid and does not replace statutory certification bodies (ICAR-CCRI / State Directorate of Horticulture).
        </p>
      </div>
    </div>
  );
}
