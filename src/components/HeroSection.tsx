import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, Globe2, Sparkles } from 'lucide-react';
import HeroGlobe3D from './HeroGlobe3D';
import CountdownClock from './CountdownClock';
import HorizonLogo from './HorizonLogo';
import { useConference } from '../context/ConferenceContext';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export default function HeroSection({ onRegisterClick, onExploreClick }: HeroSectionProps) {
  const { brandData } = useConference();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-10 overflow-hidden bg-[#08090D]">
      {/* 3D Immersive Rotating Interactive Globe Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <HeroGlobe3D />
      </div>

      {/* Subtle Golden Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#641E35]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-[#101C35]/50 blur-[150px] pointer-events-none rounded-full" />

      {/* Main Hero Content (Cinematic Overlay) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center my-auto flex flex-col items-center pointer-events-none">
        {/* Emblem Crest & Conference Edition Kicker */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101C35]/85 border border-[#D6B875]/35 backdrop-blur-md mb-6 pointer-events-auto shadow-xl">
          <HorizonLogo size="sm" showText={false} />
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5F1E8]/90">
            {brandData.edition}
          </span>
          <span className="text-xs text-[#D6B875]/60">·</span>
          <span className="text-xs text-[#D6B875] font-semibold">{brandData.dates}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight text-[#F5F1E8] mb-3 gold-glow">
          {brandData.name}
        </h1>

        {/* Brand Tagline in Champagne Gold */}
        <h2 className="text-base sm:text-xl md:text-2xl font-serif font-bold tracking-[0.22em] uppercase text-[#D6B875] mb-4 max-w-3xl">
          {brandData.tagline}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#F5F1E8]/85 max-w-2xl font-normal leading-relaxed mb-8 text-balance">
          &ldquo;{brandData.heroSubtitle}&rdquo;
        </p>

        {/* Live Ticking Countdown to 3 Jan 2027 */}
        <div className="mb-10 pointer-events-auto w-full">
          <CountdownClock variant="hero" />
        </div>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pointer-events-auto w-full sm:w-auto">
          <a
            href={brandData.defaultGoogleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all duration-300 shadow-[0_0_35px_rgba(214,184,117,0.4)] hover:shadow-[0_0_45px_rgba(214,184,117,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5F1E8] bg-[#101C35]/85 hover:bg-[#101C35] border border-[#D6B875]/40 hover:border-[#D6B875] rounded-md transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D6B875]" />
            <span>EXPLORE COMMITTEES</span>
          </button>
        </div>
      </div>

      {/* Authority KPI Strip below Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-8 pointer-events-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-6 rounded-2xl bg-[#101C35]/75 border border-[#D6B875]/25 backdrop-blur-md shadow-2xl">
          <div className="text-center md:text-left md:border-r border-white/10 pr-4">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D6B875] tabular-nums">
              25+
            </div>
            <div className="text-[11px] text-[#F5F1E8]/70 font-semibold uppercase tracking-wider mt-0.5">
              Founders MUN Circuit
            </div>
          </div>
          <div className="text-center md:text-left md:border-r border-white/10 pr-4">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D6B875] tabular-nums">
              4
            </div>
            <div className="text-[11px] text-[#F5F1E8]/70 font-semibold uppercase tracking-wider mt-0.5">
              Flagship Committees
            </div>
          </div>
          <div className="text-center md:text-left md:border-r border-white/10 pr-4">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D6B875] tabular-nums">
              MCUCC & Lok Sabha
            </div>
            <div className="text-[11px] text-[#F5F1E8]/70 font-semibold uppercase tracking-wider mt-0.5">
              Crisis & Parliament
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D6B875] tabular-nums">
              Jan 3, 2027
            </div>
            <div className="text-[11px] text-[#F5F1E8]/70 font-semibold uppercase tracking-wider mt-0.5">
              Opening Plenary
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-5">
          <a
            href="#founders"
            className="flex items-center gap-1.5 text-xs text-[#D6B875]/75 hover:text-[#D6B875] transition-colors uppercase tracking-widest font-semibold"
          >
            <span>Meet The Leadership</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
