import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  ExternalLink,
  Clock,
  Sparkles,
  HelpCircle,
  Users,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Info,
  Copy,
  Check,
  FileSpreadsheet,
  Award
} from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import { REGISTRATION_TIERS, RegistrationTier } from '../data/conferenceData';
import CountdownClock from './CountdownClock';

interface RegistrationSectionProps {
  onOpenDirectRegister: (tier?: RegistrationTier) => void;
}

export default function RegistrationSection({ onOpenDirectRegister }: RegistrationSectionProps) {
  const { brandData, importantDates } = useConference();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(brandData.defaultGoogleFormUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="registration" className="relative py-28 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/4 -right-48 w-[650px] h-[650px] bg-[#D6B875]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[650px] h-[650px] bg-[#641E35]/25 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Admissions Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#F5F1E8] tracking-tight leading-tight mb-4 gold-glow">
            Your Diplomatic Journey Begins Here.
          </h2>

          <p className="text-base sm:text-lg text-[#F5F1E8]/80 leading-relaxed font-normal mb-8">
            Delegate registrations for <strong>{brandData.name}</strong> are officially live via our Google Forms portal.
            Submit your committee preferences for MCUCC, Lok Sabha, UNSC, or IPL Auction.
          </p>

          {/* Countdown Clock to Jan 3 */}
          <div className="my-8">
            <CountdownClock variant="hero" />
          </div>
        </div>

        {/* Featured Big Google Form Launch Card */}
        <div className="max-w-4xl mx-auto mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#101C35] via-[#101C35]/90 to-[#641E35]/50 border-2 border-[#D6B875] shadow-[0_0_50px_rgba(214,184,117,0.3)] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="px-3.5 py-1 rounded-full bg-[#D6B875] text-[#08090D] text-xs font-bold uppercase tracking-wider inline-block">
                Verified Registration Portal
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Official Delegate Registration Form
              </h3>

              <p className="text-xs sm:text-sm text-[#F5F1E8]/85 leading-relaxed font-normal">
                Directly access the official Horizon MUN admissions document.
                Enter your delegate details, choose your top 3 committee preferences
                (MCUCC, Lok Sabha, UNSC, IPL Auction), and secure your place.
              </p>

              {/* Direct Link Tag with Copy Button */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-[#D6B875] bg-[#08090D]/80 px-3 py-1.5 rounded-lg border border-[#D6B875]/30 truncate max-w-xs">
                  {brandData.defaultGoogleFormUrl}
                </span>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Launch Form Button */}
            <div className="shrink-0 flex flex-col items-center gap-3 w-full sm:w-auto">
              <a
                href={brandData.defaultGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 text-sm font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(214,184,117,0.5)] hover:shadow-[0_0_50px_rgba(214,184,117,0.7)] hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>OPEN REGISTRATION FORM</span>
                <ExternalLink className="w-5 h-5" />
              </a>

              <span className="text-[11px] text-[#F5F1E8]/60 text-center">
                Opens in Google Forms securely
              </span>
            </div>
          </div>
        </div>

        {/* Delegate & Delegation Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {REGISTRATION_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-8 rounded-3xl bg-[#101C35]/70 border-2 border-[#D6B875]/30 hover:border-[#D6B875] backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                    {tier.period}
                  </span>
                  {tier.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#D6B875]/20 text-[#D6B875] border border-[#D6B875]/30 text-[11px] font-semibold">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F1E8]/75 leading-relaxed font-normal mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#F5F1E8]/85">
                      <CheckCircle className="w-4 h-4 text-[#D6B875] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={brandData.defaultGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Register via Google Forms</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Dedicated Secretariat Members & Rapporteurs Application Showcase */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#101C35] via-[#101C35]/90 to-[#641E35]/40 border-2 border-[#D6B875]/40 shadow-2xl backdrop-blur-xl">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D6B875] mb-2">
              <UserCheck className="w-4 h-4" />
              <span>Dais & Secretariat Admissions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Apply for Secretariat & Rapporteur Roles
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/80 leading-relaxed font-normal">
              Passionate about debate moderation, crisis architecture, and conference administration?
              Join the team powering Horizon MUN 2027. Dedicated application links are active below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Secretariat Application */}
            <div className="p-6 rounded-2xl bg-[#08090D]/80 border border-[#D6B875]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-[#D6B875]">
                    Secretariat Application
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#D6B875]/20 text-[#D6B875]">
                    Open Now
                  </span>
                </div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">
                  Secretariat Department Members
                </h4>
                <p className="text-xs text-[#F5F1E8]/75 mb-6 leading-relaxed">
                  Join logistics, delegate affairs, public relations, technical operations, and crisis backroom coordination teams.
                </p>
              </div>

              <a
                href={brandData.secretariatFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Apply as Secretariat Member</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Rapporteur & Dais Staff Application */}
            <div className="p-6 rounded-2xl bg-[#08090D]/80 border border-[#D6B875]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-[#D6B875]">
                    Rapporteurs Application
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#D6B875]/20 text-[#D6B875]">
                    Open Now
                  </span>
                </div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">
                  Committee Rapporteurs & Dais Staff
                </h4>
                <p className="text-xs text-[#F5F1E8]/75 mb-6 leading-relaxed">
                  Support Committee Directors across MCUCC, Lok Sabha, UNSC, and IPL in tracking speakers lists, voting records, and directives.
                </p>
              </div>

              <a
                href={brandData.rapporteurFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#F5F1E8] bg-[#641E35] hover:bg-[#802542] border border-[#D6B875]/40 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Apply as Rapporteur / Dais</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* IMPORTANT DATES TIMELINE */}
        <div className="pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6B875] block mb-2">
              Summit Calendar
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F1E8]">
              Key Milestones Leading to January 3
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {importantDates.map((item, idx) => {
              const isMilestone = item.status === 'Milestone';

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all ${
                    isMilestone
                      ? 'bg-gradient-to-r from-[#101C35] to-[#641E35]/40 border-[#D6B875]/40 shadow-lg'
                      : 'bg-[#101C35]/50 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#D6B875] uppercase tracking-wider">
                      {item.date}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isMilestone
                          ? 'bg-[#D6B875]/20 text-[#D6B875]'
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-[#F5F1E8]">
                    {item.event}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
