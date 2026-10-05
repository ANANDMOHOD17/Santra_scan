import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  Wifi, 
  WifiOff, 
  UserCheck, 
  Settings, 
  ChevronDown,
  Activity,
  Sparkles,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, quickSwitchRole, demoMode, toggleDemoMode, isOnline, logout } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { role: 'operator', name: 'Nursery Operator (काटोल)', desc: 'Scan & Grade Saplings' },
    { role: 'reviewer', name: 'Citrus Expert (ICAR-CCRI)', desc: 'Review Questionable Cases' },
    { role: 'officer', name: 'Horticulture Officer', desc: 'Batch Analytics & Audits' },
    { role: 'admin', name: 'System Administrator', desc: 'System Health & Nurseries' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-md border-b border-ink/10 transition-all">
      {/* Demo Mode Banner (PRD FR23: Always visible when APP_MODE=demo) */}
      {demoMode && (
        <div className="bg-[#FFF1D6] border-b border-[#A86A00]/20 px-3 py-1 text-center text-xs font-semibold text-[#A86A00] flex items-center justify-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t('demo_badge')}</span>
          <button 
            onClick={toggleDemoMode}
            className="underline ml-2 hover:text-ink text-[11px]"
          >
            Toggle Mode
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-orange/20 border border-orange/40 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
            🍊
          </div>
          <div>
            <div className="font-serif font-black text-xl leading-none text-ink flex items-center space-x-1.5">
              <span>SantraScan</span>
              <span className="text-[10px] uppercase font-sans font-bold px-1.5 py-0.5 rounded bg-leaf/10 text-leaf border border-leaf/20">
                Nagpur
              </span>
            </div>
            <p className="text-[11px] text-muted font-medium tracking-tight truncate max-w-[170px] sm:max-w-xs">
              {t('app_tagline')}
            </p>
          </div>
        </Link>

        {/* Right Action Icons & Switches */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Online/Offline Badge */}
          <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-ink/10 bg-chalk/60">
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-leaf animate-pulse"></span>
                <span className="text-leaf-forest font-semibold">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-verdict-reject" />
                <span className="text-verdict-reject font-semibold">Offline</span>
              </>
            )}
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher compact={true} />

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-1.5 bg-chalk hover:bg-chalk/80 border border-ink/10 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-ink active:scale-95 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-leaf" />
              <span className="hidden md:inline capitalize">{user?.role || 'Role'}</span>
              <ChevronDown className="w-3 h-3 text-muted" />
            </button>

            {showRoleMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setShowRoleMenu(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-paper-lg border border-ink/10 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-ink/10 text-xs">
                    <div className="text-muted font-medium">Logged in as:</div>
                    <div className="font-bold text-ink truncate">{user?.full_name}</div>
                    <div className="text-[11px] text-muted truncate">{user?.phone || user?.email}</div>
                  </div>
                  <div className="py-1">
                    <div className="px-3 py-1 text-[11px] font-bold text-muted uppercase">Switch Demo Role</div>
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          quickSwitchRole(r.role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col transition-all ${
                          user?.role === r.role ? 'bg-orange/15 text-orange-deep font-bold' : 'hover:bg-chalk text-ink'
                        }`}
                      >
                        <span>{r.name}</span>
                        <span className="text-[10px] text-muted font-normal">{r.desc}</span>
                      </button>
                    ))}
                    <div className="border-t border-ink/10 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowRoleMenu(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-verdict-reject hover:bg-verdict-reject/10 transition-all flex items-center space-x-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('logout') || 'Log Out (लॉग आउट)'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* System Status Link */}
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-xl text-muted hover:text-ink hover:bg-chalk border border-transparent hover:border-ink/10 transition-all"
            title="System Status & Health Diagnostics"
          >
            <Activity className="w-4 h-4 text-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
