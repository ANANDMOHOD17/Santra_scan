import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { 
  Mail, 
  Phone, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Briefcase
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const { t, lang } = useLanguage();
  const { login, register, quickSwitchRole } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // Login states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register states
  const [regFullName, setRegFullName] = useState('');
  const [regContactType, setRegContactType] = useState('phone'); // 'phone' or 'email'
  const [regContact, setRegContact] = useState('');
  const [regRole, setRegRole] = useState('operator');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Loading & error
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMessage(
        lang === 'mr'
          ? "कृपया ईमेल किंवा मोबाईल नंबर आणि पासवर्ड प्रविष्ट करा."
          : lang === 'hi'
          ? "कृपया ईमेल या मोबाइल नंबर और पासवर्ड दर्ज करें।"
          : "Please enter your email or phone number, and password."
      );
      return;
    }

    setSubmitting(true);
    const res = await login(loginIdentifier.trim(), loginPassword);
    setSubmitting(false);

    if (res.success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setErrorMessage(res.error || "Login failed. Please verify your credentials.");
    }
  };

  // Handle Registration submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!regFullName.trim() || !regContact.trim() || !regPassword) {
      setErrorMessage(
        lang === 'mr'
          ? "कृपया सर्व आवश्यक माहिती भरा."
          : lang === 'hi'
          ? "कृपया सभी आवश्यक फ़ील्ड भरें।"
          : "Please fill out all required fields."
      );
      return;
    }

    if (regContactType === 'phone') {
      const cleanPhone = regContact.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        setErrorMessage(
          lang === 'mr'
            ? "कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा."
            : lang === 'hi'
            ? "कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।"
            : "Please enter a valid 10-digit mobile number."
        );
        return;
      }
    } else {
      if (!regContact.includes('@') || !regContact.includes('.')) {
        setErrorMessage(
          lang === 'mr'
            ? "कृपया वैध ईमेल पत्ता प्रविष्ट करा."
            : lang === 'hi'
            ? "कृपया मान्य ईमेल पता दर्ज करें।"
            : "Please enter a valid email address."
        );
        return;
      }
    }

    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setSubmitting(true);
    const isPhone = regContactType === 'phone';
    const res = await register({
      full_name: regFullName.trim(),
      email: isPhone ? null : regContact.trim(),
      phone: isPhone ? regContact.trim() : null,
      password: regPassword,
      role: regRole,
      preferred_language: lang
    });
    setSubmitting(false);

    if (res.success) {
      setSuccessMessage("Account created successfully!");
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
      }, 500);
    } else {
      setErrorMessage(res.error || (lang === 'mr' ? "नोंदणी अयशस्वी झाली. ईमेल किंवा मोबाईल आधीच नोंदणीकृत असू शकतो." : "Registration failed. Email or phone may already exist."));
    }
  };

  // Quick 1-tap demo logins for presentation
  const handleQuickDemo = (role) => {
    quickSwitchRole(role);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-center items-center px-4 py-8 relative selection:bg-orange/20 selection:text-ink">
      
      {/* Top Floating Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher compact={false} />
      </div>

      <div className="max-w-md w-full paper-card p-6 sm:p-8 border-2 border-ink/10 shadow-paper-lg bg-white relative animate-in fade-in zoom-in-95">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-16 h-16 rounded-3xl bg-orange/20 border border-orange/40 items-center justify-center text-4xl mb-3 shadow-inner">
            🍊
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-ink tracking-tight">
            SantraScan
          </h1>
          <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
            {lang === 'mr' 
              ? 'प्रत्येक कलमाची अचूक तपासणी, प्रत्येक बागेची शाश्वती.' 
              : lang === 'hi' 
              ? 'हर पौधे की जांच, हर संतरे के बगीचे का विश्वास।' 
              : 'Scan every sapling, certify every orchard.'}
          </p>
        </div>

        {/* Tab Switcher (Login vs Create Account) */}
        <div className="grid grid-cols-2 p-1 bg-chalk rounded-2xl border border-ink/10 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
            className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-ink text-white shadow-sm'
                : 'text-ink/70 hover:text-ink'
            }`}
          >
            {lang === 'mr' ? 'लॉग इन (Log In)' : lang === 'hi' ? 'लॉग इन (Log In)' : 'Log In'}
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
            className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'register'
                ? 'bg-ink text-white shadow-sm'
                : 'text-ink/70 hover:text-ink'
            }`}
          >
            {lang === 'mr' ? 'नवीन खाते (Register)' : lang === 'hi' ? 'नया खाता (Register)' : 'New Account'}
          </button>
        </div>

        {/* Error / Success Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-verdict-reject/10 border border-verdict-reject/30 rounded-2xl text-verdict-reject text-xs font-semibold flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-leaf/15 border border-leaf/30 rounded-2xl text-leaf-forest text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* --- TAB 1: LOGIN FORM --- */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1.5">
                {lang === 'mr' ? 'ईमेल किंवा मोबाईल नंबर' : lang === 'hi' ? 'ईमेल या मोबाइल नंबर' : 'Email or Phone Number'}
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. 9823012345 or operator@santrascan.agri"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1.5">
                {lang === 'mr' ? 'पासवर्ड (Password)' : lang === 'hi' ? 'पासवर्ड (Password)' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-chalk/60 border border-ink/15 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-3 text-muted hover:text-ink"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-leaf hover:bg-leaf-forest text-white font-serif font-bold text-base rounded-2xl shadow-paper active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              <span>{submitting ? 'Logging in...' : lang === 'mr' ? 'लॉग इन करा' : lang === 'hi' ? 'लॉग इन करें' : 'Log In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* --- TAB 2: REGISTER / CREATE ACCOUNT FORM --- */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-1">
                {lang === 'mr' ? 'पूर्ण नाव (Full Name)' : lang === 'hi' ? 'पूरा नाम (Full Name)' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="उदा. रमेश पाटील (Ramesh Patil)"
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                  required
                />
              </div>
            </div>

            {/* Single Contact Field: Only Email OR Phone Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase text-muted">
                  {regContactType === 'phone'
                    ? (lang === 'mr' ? 'मोबाईल नंबर' : lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number')
                    : (lang === 'mr' ? 'ईमेल पत्ता' : lang === 'hi' ? 'ईमेल पता' : 'Email Address')}
                </label>
                
                {/* Switcher: Phone OR Email */}
                <div className="inline-flex rounded-lg bg-chalk p-0.5 border border-ink/10 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setRegContactType('phone');
                      setErrorMessage(null);
                    }}
                    className={`px-2.5 py-0.5 rounded-md transition-all flex items-center space-x-1 ${
                      regContactType === 'phone'
                        ? 'bg-ink text-white shadow-xs'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Phone className="w-3 h-3" />
                    <span>{lang === 'mr' ? 'मोबाईल' : lang === 'hi' ? 'मोबाइल' : 'Phone'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegContactType('email');
                      setErrorMessage(null);
                    }}
                    className={`px-2.5 py-0.5 rounded-md transition-all flex items-center space-x-1 ${
                      regContactType === 'email'
                        ? 'bg-ink text-white shadow-xs'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Mail className="w-3 h-3" />
                    <span>{lang === 'mr' ? 'ईमेल' : lang === 'hi' ? 'ईमेल' : 'Email'}</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                {regContactType === 'phone' ? (
                  <>
                    <Phone className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={regContact}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRegContact(val);
                        if (val.includes('@')) {
                          setRegContactType('email');
                        }
                      }}
                      placeholder="उदा. 9822012345"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                      required
                    />
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                    <input
                      type="email"
                      value={regContact}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRegContact(val);
                        if (/^\d{6,}$/.test(val.trim())) {
                          setRegContactType('phone');
                        }
                      }}
                      placeholder="name@email.com"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                      required
                    />
                  </>
                )}
              </div>
              <p className="text-[10px] text-muted mt-1">
                {regContactType === 'phone'
                  ? (lang === 'mr' ? 'फक्त मोबाईल नंबर आवश्यक (ईमेलची आवश्यकता नाही).' : lang === 'hi' ? 'केवल मोबाइल नंबर आवश्यक (ईमेल की आवश्यकता नहीं)।' : 'Only phone number needed (no email required).')
                  : (lang === 'mr' ? 'फक्त ईमेल आवश्यक (मोबाईल नंबरची आवश्यकता नाही).' : lang === 'hi' ? 'केवल ईमेल आवश्यक (मोबाइल नंबर की आवश्यकता नहीं)।' : 'Only email needed (no phone number required).')}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-muted mb-1">
                {lang === 'mr' ? 'तुमची भूमिका (Role)' : lang === 'hi' ? 'आपकी भूमिका (Role)' : 'Select Your Role'}
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-orange"
                >
                  <option value="operator">Nursery Operator (रोपवाटिका ऑपरेटर)</option>
                  <option value="farmer">Citrus Farmer / Buyer (संत्रा उत्पादक शेतकरी)</option>
                  <option value="reviewer">Citrus Expert Reviewer (फलोत्पादन तज्ज्ञ)</option>
                  <option value="officer">Horticulture Officer (कृषी अधिकारी)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold uppercase text-muted mb-1">
                  {lang === 'mr' ? 'पासवर्ड' : lang === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-8 pr-8 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-2.5 top-2.5 text-muted"
                  >
                    {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-muted mb-1">
                  {lang === 'mr' ? 'पुष्टी करा' : lang === 'hi' ? 'पुष्टि करें' : 'Confirm'}
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-chalk/60 border border-ink/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-orange hover:bg-orange-deep text-white font-serif font-bold text-sm rounded-xl shadow-paper active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              <span>{submitting ? 'Creating account...' : lang === 'mr' ? 'खाते तयार करा आणि सुरू करा' : lang === 'hi' ? 'खाता बनाएं और शुरू करें' : 'Create Account & Start'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 1-Tap Quick Demo Logins for Hackathon / Testing */}
        <div className="mt-6 pt-5 border-t border-ink/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-orange-deep" />
              <span>Or 1-Tap Quick Demo Login</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('operator')}
              className="p-2.5 rounded-xl bg-chalk/70 hover:bg-chalk border border-ink/10 text-left transition-all active:scale-95 flex flex-col"
            >
              <span className="font-bold text-xs text-ink">Ramesh Patil</span>
              <span className="text-[10px] text-muted">Nursery Operator (काटोल)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('reviewer')}
              className="p-2.5 rounded-xl bg-chalk/70 hover:bg-chalk border border-ink/10 text-left transition-all active:scale-95 flex flex-col"
            >
              <span className="font-bold text-xs text-ink">Dr. S. Deshmukh</span>
              <span className="text-[10px] text-muted">ICAR-CCRI Reviewer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('officer')}
              className="p-2.5 rounded-xl bg-chalk/70 hover:bg-chalk border border-ink/10 text-left transition-all active:scale-95 flex flex-col"
            >
              <span className="font-bold text-xs text-ink">V. K. Shinde</span>
              <span className="text-[10px] text-muted">Dist. Horticulture Officer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-chalk/70 hover:bg-chalk border border-ink/10 text-left transition-all active:scale-95 flex flex-col"
            >
              <span className="font-bold text-xs text-ink">System Admin</span>
              <span className="text-[10px] text-muted">Super Administrator</span>
            </button>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-[10px] text-muted text-center mt-5 italic">
          SantraScan Citrus Screening Aid • Team Build Bridge • Nagpur RISE Cohort
        </p>
      </div>
    </div>
  );
}
