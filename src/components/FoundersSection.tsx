import React from 'react';
import { Quote, Award, Sparkles, Compass, Shield, User, Camera } from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import HorizonLogo from './HorizonLogo';

export default function FoundersSection() {
  const { founders, brandData } = useConference();
  const founder = founders.find((f) => f.id === 'founder') || founders[0];
  const coFounder = founders.find((f) => f.id === 'co-founder') || founders[1] || founders[0];

  return (
    <section id="founders" className="relative py-28 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Architectural Ambience */}
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[#641E35]/25 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-[600px] h-[600px] bg-[#101C35]/60 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Visionaries Behind Horizon MUN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#F5F1E8] tracking-tight leading-tight mb-4 gold-glow">
            Leadership, Diplomacy & Purpose
          </h2>

          <p className="text-base sm:text-lg text-[#F5F1E8]/80 leading-relaxed font-normal">
            Rooted in extensive national and international circuit experience, our leadership
            is dedicated to building an intellectual summit where diplomacy fosters mutual understanding
            and kindness prevails alongside conviction.
          </p>
        </div>

        {/* Dual Founder & Co-Founder Showcase with Dedicated Photo Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: The Founder */}
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#101C35]/95 via-[#101C35]/85 to-[#641E35]/40 border-2 border-[#D6B875]/40 shadow-2xl backdrop-blur-xl flex flex-col justify-between group hover:border-[#D6B875] transition-all duration-300">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#641E35]/60 border border-[#D6B875]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <HorizonLogo size="sm" showText={false} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B875] block">
                      Executive Leadership
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#F5F1E8]">
                      {founder.quoteTitle}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#D6B875]/20 text-[#D6B875] border border-[#D6B875]/30 text-xs font-bold uppercase tracking-wider">
                  {founder.role}
                </span>
              </div>

              {/* Photo Column & Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start mb-6">
                {/* Photo Column */}
                <div className="sm:col-span-5">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#08090D] border-2 border-[#D6B875]/40 shadow-xl group/photo">
                    {founder.photo ? (
                      <img
                        src={founder.photo}
                        alt="Founder of Horizon MUN"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#101C35] to-[#641E35]/50">
                        <div className="w-16 h-16 rounded-full bg-[#D6B875]/20 border border-[#D6B875]/50 flex items-center justify-center text-[#D6B875] mb-2 shadow-inner">
                          <User className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-serif font-bold text-white block">
                          Founder Portrait
                        </span>
                        <span className="text-[10px] text-[#D6B875]/80 mt-1">
                          Horizon MUN Leadership
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-50 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-[#08090D]/80 backdrop-blur-md border border-white/10 text-[10px] text-[#D6B875] font-semibold text-center">
                      Founder
                    </div>
                  </div>
                </div>

                {/* Info & Statement Column */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#08090D]/70 border border-[#D6B875]/30 text-[11px] font-semibold text-[#D6B875]">
                    <Award className="w-3.5 h-3.5 text-[#D6B875] shrink-0" />
                    <span className="leading-tight">{founder.experienceBadge}</span>
                  </div>

                  {/* Statement Quote */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#08090D]/80 border-l-3 border-[#D6B875] relative">
                    <Quote className="w-6 h-6 text-[#D6B875]/25 absolute top-3 right-3 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-[#F5F1E8]/90 font-serif leading-relaxed italic relative z-10">
                      &ldquo;{founder.statement}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="pt-5 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
                Core Diplomatic Ethos:
              </span>
              {founder.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#F5F1E8]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] mt-1.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: The Co-Founder */}
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#101C35]/95 via-[#101C35]/85 to-[#101C35]/65 border-2 border-[#D6B875]/40 shadow-2xl backdrop-blur-xl flex flex-col justify-between group hover:border-[#D6B875] transition-all duration-300">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#101C35] border border-[#D6B875]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Compass className="w-6 h-6 text-[#D6B875]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B875] block">
                      Strategic Directorate
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#F5F1E8]">
                      {coFounder.quoteTitle}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#641E35]/40 text-[#F5F1E8] border border-[#D6B875]/30 text-xs font-bold uppercase tracking-wider">
                  {coFounder.role}
                </span>
              </div>

              {/* Photo Column & Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start mb-6">
                {/* Photo Column */}
                <div className="sm:col-span-5">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#08090D] border-2 border-[#D6B875]/40 shadow-xl group/photo">
                    {coFounder.photo ? (
                      <img
                        src={coFounder.photo}
                        alt="Co-Founder of Horizon MUN"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#101C35] to-[#101C35]">
                        <div className="w-16 h-16 rounded-full bg-[#D6B875]/20 border border-[#D6B875]/50 flex items-center justify-center text-[#D6B875] mb-2 shadow-inner">
                          <User className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-serif font-bold text-white block">
                          Co-Founder Portrait
                        </span>
                        <span className="text-[10px] text-[#D6B875]/80 mt-1">
                          Strategic Leadership
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-50 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-[#08090D]/80 backdrop-blur-md border border-white/10 text-[10px] text-[#D6B875] font-semibold text-center">
                      Co-Founder
                    </div>
                  </div>
                </div>

                {/* Info & Statement Column */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#08090D]/70 border border-[#D6B875]/30 text-[11px] font-semibold text-[#D6B875]">
                    <Shield className="w-3.5 h-3.5 text-[#D6B875] shrink-0" />
                    <span className="leading-tight">{coFounder.experienceBadge}</span>
                  </div>

                  {/* Statement Quote */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#08090D]/80 border-l-3 border-[#D6B875] relative">
                    <Quote className="w-6 h-6 text-[#D6B875]/25 absolute top-3 right-3 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-[#F5F1E8]/90 font-serif leading-relaxed italic relative z-10">
                      &ldquo;{coFounder.statement}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="pt-5 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
                Strategic Directives:
              </span>
              {coFounder.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#F5F1E8]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] mt-1.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Joint Leadership Manifesto Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#101C35]/70 border border-[#D6B875]/30 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
              Founders Commitment
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Empowering 650+ Delegates Across 4 Premier Committees
            </h4>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/80 leading-relaxed font-normal">
              Whether you step into the high-stakes Marvel Crisis room (MCUCC), deliberate constitutional policy in Lok Sabha,
              tackle autonomous warfare in UNSC, or lead a franchise war room in the IPL Auction, our team ensures
              a transformative conference experience.
            </p>
          </div>

          <a
            href={brandData.defaultGoogleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-[0_0_25px_rgba(214,184,117,0.35)] whitespace-nowrap cursor-pointer shrink-0"
          >
            Apply for Delegation
          </a>
        </div>
      </div>
    </section>
  );
}
