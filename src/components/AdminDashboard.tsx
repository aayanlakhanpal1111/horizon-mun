import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Calendar,
  Layers,
  Users,
  Settings,
  HelpCircle,
  ArrowLeft,
  Share2,
  Sparkles,
  Link,
  UserCheck,
  Globe
} from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import HorizonLogo from './HorizonLogo';
import { Committee, DEFAULT_EXPERIENCE_IMAGE, DEFAULT_GLOBE_SETTINGS, FaqItem } from '../data/conferenceData';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export default function AdminDashboard({ onBackToSite }: AdminDashboardProps) {
  const {
    brandData,
    founders,
    committees,
    experienceItems,
    faqs,
    importantDates,
    globeSettings,
    updateBrandData,
    updateFounder,
    updateCommittee,
    addCommittee,
    deleteCommittee,
    updateExperienceItem,
    updateFaq,
    addFaq,
    deleteFaq,
    updateImportantDate,
    updateGlobeSettings,
    resetToDefaults,
  } = useConference();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('HORIZON_ADMIN_AUTH') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'founders' | 'globe' | 'committees' | 'photos' | 'timeline' | 'faqs'>('general');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Form states for general & links
  const [localBrand, setLocalBrand] = useState(brandData);

  useEffect(() => {
    setLocalBrand(brandData);
  }, [brandData]);

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'HORIZON1114') {
      setIsAuthenticated(true);
      sessionStorage.setItem('HORIZON_ADMIN_AUTH', 'true');
      setAuthError('');
      showNotification('Welcome back, Horizon MUN Administrator');
    } else {
      setAuthError('Invalid administrator passphrase. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('HORIZON_ADMIN_AUTH');
    setPasswordInput('');
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandData(localBrand);
    showNotification('Conference links and settings updated successfully!');
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090D] flex flex-col items-center justify-center p-6 text-[#F5F1E8]">
        {/* Ambient Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#641E35]/25 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] bg-[#101C35]/50 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#101C35]/90 border-2 border-[#D6B875]/40 shadow-2xl backdrop-blur-xl text-center">
          <div className="flex justify-center mb-4">
            <HorizonLogo size="lg" showText={false} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B875] block mb-1">
            Official Secretariat Access
          </span>

          <h2 className="text-2xl font-serif font-black text-white mb-2">
            Horizon Master Admin Portal
          </h2>

          <p className="text-xs text-[#F5F1E8]/75 mb-8 leading-relaxed font-normal">
            Enter the authorized administrative passphrase to manage conference links, committee agendas, photos, and leadership statements.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                Administrator Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter passphrase..."
                  className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3.5 pr-11 text-xs text-white focus:outline-none transition-colors"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F5F1E8]/50 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-xl transition-all shadow-[0_0_25px_rgba(214,184,117,0.35)] flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Controls</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5F1E8]/70 hover:text-[#D6B875] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F1E8] font-sans">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D6B875] text-[#08090D] font-bold text-xs shadow-2xl animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-[#101C35]/95 border-b border-[#D6B875]/30 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HorizonLogo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg text-white">
                  Horizon MUN Control Center
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#D6B875]/20 text-[#D6B875] border border-[#D6B875]/30">
                  Live Master Mode
                </span>
              </div>
              <p className="text-[11px] text-[#F5F1E8]/60">
                All changes save instantly to browser & sync across the entire website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 text-xs font-semibold text-[#F5F1E8]/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#101C35]/80 border border-[#D6B875]/25 backdrop-blur-md mb-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>General & Links</span>
          </button>

          <button
            onClick={() => setActiveTab('founders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'founders'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Founders Names &amp; Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('globe')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'globe'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Globe Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('committees')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'committees'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Committees (4 Agendas)</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Experience Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Timeline (Dates)</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-[#D6B875] text-[#08090D] shadow-md'
                : 'text-[#F5F1E8]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs Manager</span>
          </button>
        </div>

        {/* TAB 1: GENERAL & REGISTRATION / SECRETARIAT / RAPPORTEUR LINKS */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveBrand} className="space-y-8 animate-fadeIn">
            {/* Dedicated Link Spaces for Secretariat Members & Rapporteurs */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#101C35] to-[#641E35]/40 border-2 border-[#D6B875] backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#D6B875] mb-2">
                <Link className="w-4 h-4" />
                <span>Specialized Recruitment Links</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                Secretariat Members & Rapporteurs Link Space
              </h3>
              <p className="text-xs text-[#F5F1E8]/80 mb-6 font-normal">
                Dedicated application and registration URLs for Secretariat Members, Rapporteurs, and Dais staff.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Link Space 1: Secretariat Members Link */}
                <div className="p-5 rounded-2xl bg-[#08090D]/80 border border-[#D6B875]/35">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                      Secretariat Members Application Link *
                    </label>
                    <a
                      href={localBrand.secretariatFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#D6B875] hover:text-white flex items-center gap-1"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={localBrand.secretariatFormUrl}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, secretariatFormUrl: e.target.value })
                    }
                    placeholder="https://forms.gle/..."
                    className="w-full bg-[#101C35] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                  <span className="text-[11px] text-[#F5F1E8]/60 mt-1.5 block">
                    URL used for Secretariat member onboarding, department heads, and logistics coordinators.
                  </span>
                </div>

                {/* Link Space 2: Rapporteurs Link */}
                <div className="p-5 rounded-2xl bg-[#08090D]/80 border border-[#D6B875]/35">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                      Rapporteurs & Dais Staff Application Link *
                    </label>
                    <a
                      href={localBrand.rapporteurFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#D6B875] hover:text-white flex items-center gap-1"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={localBrand.rapporteurFormUrl}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, rapporteurFormUrl: e.target.value })
                    }
                    placeholder="https://forms.gle/..."
                    className="w-full bg-[#101C35] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                  <span className="text-[11px] text-[#F5F1E8]/60 mt-1.5 block">
                    URL used for Committee Rapporteurs, Assistant Directors, and procedural recorders.
                  </span>
                </div>
              </div>
            </div>

            {/* General Conference Links & Dates */}
            <div className="p-8 rounded-3xl bg-[#101C35]/70 border border-[#D6B875]/30 backdrop-blur-md">
              <h3 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#D6B875]" />
                <span>General Conference Settings & Delegate Link</span>
              </h3>
              <p className="text-xs text-[#F5F1E8]/70 mb-6 font-normal">
                Control the brand name, taglines, delegate registration link, and summit dates.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Official Delegate Google Forms Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={localBrand.defaultGoogleFormUrl}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, defaultGoogleFormUrl: e.target.value })
                    }
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                  <span className="text-[11px] text-[#F5F1E8]/60 mt-1 block">
                    Main delegate registration link for MCUCC, Lok Sabha, UNSC, and IPL.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Conference Dates Display *
                  </label>
                  <input
                    type="text"
                    required
                    value={localBrand.dates}
                    onChange={(e) => setLocalBrand({ ...localBrand, dates: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Live Countdown Target Date (ISO format) *
                  </label>
                  <input
                    type="text"
                    required
                    value={localBrand.countdownTarget}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, countdownTarget: e.target.value })
                    }
                    placeholder="YYYY-MM-DDTHH:MM:SS (e.g. 2027-01-03T09:00:00)"
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                  <span className="text-[11px] text-[#F5F1E8]/60 mt-1 block">
                    Determines the live countdown clock in the Hero & Registration sections.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Conference Edition
                  </label>
                  <input
                    type="text"
                    value={localBrand.edition}
                    onChange={(e) => setLocalBrand({ ...localBrand, edition: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={localBrand.name}
                    onChange={(e) => setLocalBrand({ ...localBrand, name: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Official Tagline
                  </label>
                  <input
                    type="text"
                    value={localBrand.tagline}
                    onChange={(e) => setLocalBrand({ ...localBrand, tagline: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Hero Subtitle Quote
                  </label>
                  <input
                    type="text"
                    value={localBrand.heroSubtitle}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, heroSubtitle: e.target.value })
                    }
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Secretariat Email
                  </label>
                  <input
                    type="email"
                    value={localBrand.email}
                    onChange={(e) => setLocalBrand({ ...localBrand, email: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={localBrand.instagram}
                    onChange={(e) => setLocalBrand({ ...localBrand, instagram: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    About Horizon MUN Text
                  </label>
                  <textarea
                    rows={4}
                    value={localBrand.aboutText || ''}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, aboutText: e.target.value })
                    }
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2">
                    Official Logo Image URL
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-[#08090D] border border-[#D6B875]/35 shrink-0">
                      <HorizonLogo size="sm" showText={false} />
                    </div>
                    <input
                      type="text"
                      value={localBrand.logoUrl || ''}
                      onChange={(e) => setLocalBrand({ ...localBrand, logoUrl: e.target.value })}
                      placeholder="./assets/aistudio/..."
                      className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-xl transition-all shadow-[0_0_20px_rgba(214,184,117,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings & Links</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: FOUNDERS TEXT & PHOTO COLUMN MANAGER */}
        {activeTab === 'founders' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                Founders Text & Photo Column Manager
              </h3>
              <p className="text-xs text-[#F5F1E8]/70">
                Update the official founder vision statements, titles, and photo URLs for the dedicated leadership showcase.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {founders.map((f) => (
                <div
                  key={f.id}
                  className="p-8 rounded-3xl bg-[#101C35]/70 border border-[#D6B875]/30 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                        {f.role}
                      </span>
                      <span className="text-xs text-white/60">{f.title}</span>
                    </div>

                    {/* Photo Column Section */}
                    <div className="p-4 rounded-2xl bg-[#08090D]/80 border border-white/10 mb-5">
                      <label className="block text-[11px] font-bold text-[#D6B875] uppercase mb-2">
                        {f.role} Portrait Photo URL
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#101C35] border border-[#D6B875]/40 shrink-0 flex items-center justify-center">
                          {f.photo ? (
                            <img
                              src={f.photo}
                              alt={f.role}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-[#D6B875]/60" />
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={f.photo || ''}
                            onChange={(e) =>
                              updateFounder(f.id, { photo: e.target.value })
                            }
                            placeholder="Paste image URL (e.g. https://...)"
                            className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875] font-mono text-[11px]"
                          />
                          <span className="text-[10px] text-[#F5F1E8]/50 mt-1 block">
                            Live preview renders immediately on public card.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={f.name || ''}
                          onChange={(e) =>
                            updateFounder(f.id, { name: e.target.value })
                          }
                          placeholder={`Enter ${f.role} name`}
                          className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white font-semibold focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                          Designation
                        </label>
                        <input
                          type="text"
                          value={f.role}
                          onChange={(e) =>
                            updateFounder(f.id, { role: e.target.value, title: e.target.value })
                          }
                          className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Biography / Statement (Optional)
                      </label>
                      <textarea
                        rows={6}
                        value={f.statement}
                        onChange={(e) => updateFounder(f.id, { statement: e.target.value })}
                        placeholder="Optional biography or statement..."
                        className="w-full bg-[#08090D] border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#D6B875] leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => showNotification(`Updated details & photo for ${f.name || f.role}`)}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all cursor-pointer"
                    >
                      Save {f.role}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2B: 3D EARTH GLOBE SETTINGS */}
        {activeTab === 'globe' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#D6B875]" />
                  <span>Interactive 3D Earth Globe Settings</span>
                </h3>
                <p className="text-xs text-[#F5F1E8]/70">
                  Customize rotation, country borders, national flags, atmosphere, stars, and camera zoom behavior live.
                </p>
              </div>
              <button
                onClick={() => {
                  updateGlobeSettings(DEFAULT_GLOBE_SETTINGS);
                  showNotification('3D Globe settings restored to defaults');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#D6B875] bg-[#101C35] hover:bg-[#641E35]/50 border border-[#D6B875]/35 rounded-lg transition-colors cursor-pointer self-start"
              >
                Reset Globe Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visual Layer Toggles */}
              <div className="p-8 rounded-3xl bg-[#101C35]/70 border border-[#D6B875]/30 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] mb-3">
                  Globe Layers &amp; Interactions
                </h4>

                {(
                  [
                    { key: 'autoRotate', label: 'Continuous Auto-Rotation', desc: 'Smoothly spin the Earth when idle' },
                    { key: 'showCountryBorders', label: 'Visible Country Borders', desc: 'Render crisp vector borders over continents' },
                    { key: 'showFlags', label: 'National Flags on Globe', desc: 'Display geographically positioned nation flags' },
                    { key: 'showAtmosphere', label: 'Atmospheric Rim Glow', desc: 'Luminous Fresnel atmospheric scattering halo' },
                    { key: 'showStars', label: 'Celestial Starfield', desc: 'Subtle background starfield around Earth' },
                    { key: 'enableZoom', label: 'Zoom In / Zoom Out Controls', desc: 'Allow mouse wheel, pinch, and +/- zoom controls' },
                  ] as const
                ).map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#08090D]/75 border border-white/10 cursor-pointer hover:border-[#D6B875]/40 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">{item.label}</span>
                      <span className="text-[11px] text-[#F5F1E8]/60">{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={Boolean(globeSettings[item.key])}
                      onChange={(e) => updateGlobeSettings({ [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-[#D6B875] cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              {/* Numeric Sliders & Colors */}
              <div className="p-8 rounded-3xl bg-[#101C35]/70 border border-[#D6B875]/30 space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] mb-3">
                  Camera &amp; Motion Tuning
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-white">Rotation Speed</span>
                    <span className="font-mono text-[#D6B875]">{globeSettings.rotationSpeed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.5"
                    step="0.05"
                    value={globeSettings.rotationSpeed}
                    onChange={(e) => updateGlobeSettings({ rotationSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-[#D6B875] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-white">Full Globe Camera Distance</span>
                    <span className="font-mono text-[#D6B875]">{globeSettings.initialZoom.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="4.2"
                    max="8.0"
                    step="0.1"
                    value={globeSettings.initialZoom}
                    onChange={(e) => updateGlobeSettings({ initialZoom: parseFloat(e.target.value) })}
                    className="w-full accent-[#D6B875] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-white">Country Focus Zoom Distance</span>
                    <span className="font-mono text-[#D6B875]">{globeSettings.focusZoom.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="5.2"
                    step="0.1"
                    value={globeSettings.focusZoom}
                    onChange={(e) => updateGlobeSettings({ focusZoom: parseFloat(e.target.value) })}
                    className="w-full accent-[#D6B875] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Border &amp; Country Highlight Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={globeSettings.highlightColor}
                      onChange={(e) => updateGlobeSettings({ highlightColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={globeSettings.highlightColor}
                      onChange={(e) => updateGlobeSettings({ highlightColor: e.target.value })}
                      className="flex-1 bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => showNotification('3D Globe settings saved and applied live')}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Globe Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMITTEES MANAGER */}
        {activeTab === 'committees' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-1">
                  Committees & Agendas Editor
                </h3>
                <p className="text-xs text-[#F5F1E8]/70">
                  Edit names, mandates, study guide summaries, and topics for MCUCC, Lok Sabha, UNSC, and IPL.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {committees.map((comm) => (
                <div
                  key={comm.id}
                  className="p-6 sm:p-8 rounded-3xl bg-[#101C35]/70 border border-[#D6B875]/30 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                      {comm.acronym} · {comm.category}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-white/10 text-white">
                      Level: {comm.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Committee Full Name
                      </label>
                      <input
                        type="text"
                        value={comm.name}
                        onChange={(e) => updateCommittee(comm.id, { name: e.target.value })}
                        className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Acronym / Tag
                      </label>
                      <input
                        type="text"
                        value={comm.acronym}
                        onChange={(e) => updateCommittee(comm.id, { acronym: e.target.value })}
                        className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                      Primary Committee Agenda / Topic *
                    </label>
                    <textarea
                      rows={2}
                      value={comm.topic}
                      onChange={(e) => updateCommittee(comm.id, { topic: e.target.value })}
                      className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                      Committee Mandate & Description
                    </label>
                    <textarea
                      rows={3}
                      value={comm.description}
                      onChange={(e) => updateCommittee(comm.id, { description: e.target.value })}
                      className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => showNotification(`Saved changes for ${comm.name}`)}
                      className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all cursor-pointer"
                    >
                      Save Committee
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PHOTOS & MEDIA MANAGER */}
        {activeTab === 'photos' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                Conference Photography & Media Manager
              </h3>
              <p className="text-xs text-[#F5F1E8]/70">
                Manage image paths, links, captions, and quotes for the Conference Experience section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experienceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-[#101C35]/70 border border-[#D6B875]/30 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    {/* Image Preview */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.onerror = null;
                          img.src = DEFAULT_EXPERIENCE_IMAGE;
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-[#D6B875] font-bold">
                        {item.tag}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Image URL / File Path *
                      </label>
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) =>
                          updateExperienceItem(item.id, { image: e.target.value })
                        }
                        placeholder="Paste image URL or asset path..."
                        className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#D6B875] font-mono text-[11px]"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateExperienceItem(item.id, { title: e.target.value })
                        }
                        className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Caption
                      </label>
                      <textarea
                        rows={2}
                        value={item.caption}
                        onChange={(e) =>
                          updateExperienceItem(item.id, { caption: e.target.value })
                        }
                        className="w-full bg-[#08090D] border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => showNotification(`Photo updated for ${item.title}`)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all cursor-pointer"
                    >
                      Update Photo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TIMELINE / IMPORTANT DATES */}
        {activeTab === 'timeline' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                Summit Calendar & Timeline Editor
              </h3>
              <p className="text-xs text-[#F5F1E8]/70">
                Update the official milestone dates leading up to January 3, 2027.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {importantDates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#101C35]/70 border border-[#D6B875]/25"
                >
                  <div className="mb-3">
                    <label className="block text-[10px] font-bold text-[#D6B875] uppercase mb-1">
                      Date String
                    </label>
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) =>
                        updateImportantDate(idx, { ...item, date: e.target.value })
                      }
                      className="w-full bg-[#08090D] border border-white/20 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-[10px] font-bold text-[#D6B875] uppercase mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={item.event}
                      onChange={(e) =>
                        updateImportantDate(idx, { ...item, event: e.target.value })
                      }
                      className="w-full bg-[#08090D] border border-white/20 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#D6B875] uppercase mb-1">
                      Status Tag
                    </label>
                    <input
                      type="text"
                      value={item.status}
                      onChange={(e) =>
                        updateImportantDate(idx, { ...item, status: e.target.value })
                      }
                      className="w-full bg-[#08090D] border border-white/20 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => showNotification('Summit dates updated successfully')}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-xl cursor-pointer"
              >
                Save All Dates
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS MANAGER */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-1">
                  FAQ Manager
                </h3>
                <p className="text-xs text-[#F5F1E8]/70">
                  Add, edit, or customize answers to questions asked by prospective delegates.
                </p>
              </div>

              <button
                onClick={() => {
                  const newFaq: FaqItem = {
                    id: `faq-${Date.now()}`,
                    category: 'General',
                    question: 'New Diplomatic Question',
                    answer: 'Write the official answer here...',
                  };
                  addFaq(newFaq);
                  showNotification('New FAQ entry added');
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#D6B875] text-[#08090D] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New FAQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-6 rounded-2xl bg-[#101C35]/70 border border-[#D6B875]/25 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                      className="w-full bg-[#08090D] border border-white/20 rounded p-2.5 text-xs text-white font-semibold focus:outline-none focus:border-[#D6B875]"
                    />
                    <button
                      onClick={() => {
                        deleteFaq(faq.id);
                        showNotification('FAQ item deleted');
                      }}
                      className="p-2 text-rose-400 hover:text-rose-300 hover:bg-white/5 rounded cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#D6B875] leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Reset Controls */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E8]/60">
          <div>
            Need to revert everything back to initial summit configuration?
          </div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to reset all customized text, photos, and links back to conference defaults?'
                )
              ) {
                resetToDefaults();
                showNotification('Configuration reset to original summit defaults');
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>
        </div>
      </main>
    </div>
  );
}
