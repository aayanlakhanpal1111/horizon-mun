import React from 'react';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';
import HeroGlobe3D from './HeroGlobe3D';
import CountdownClock from './CountdownClock';
import HorizonLogo from './HorizonLogo';
import { useConference } from '../context/ConferenceContext';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const { brandData } = useConference();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-[#08090D]">
      {/* Subtle Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#641E35]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-[#101C35]/50 blur-[150px] pointer-events-none rounded-full" />

      {/* Main Responsive Hero Grid: Zero Overlap Between Text/Buttons & Interactive 3D Globe */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Brand Crest, Heading, Countdown & Actions */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Prominent Brand Logo & Conference Edition Kicker */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#101C35]/90 border border-[#D6B875]/35 mb-6 shadow-xl">
              <HorizonLogo size="md" showText={false} />
              <span className="text-xs font-bold tracking-widest uppercase text-[#F5F1E8]/90">
                {brandData.edition}
              </span>
              <span className="text-xs text-[#D6B875]/60">·</span>
              <span className="text-xs text-[#D6B875] font-semibold">{brandData.dates}</span>
            </div>

            {/* Main Title with Prominent Crest Lockup */}
            <div className="flex flex-col sm:flex-row items-center lg:items-center gap-4 mb-3">
              <HorizonLogo size="xl" showText={false} className="hidden sm:flex" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#F5F1E8] gold-glow leading-none">
                {brandData.name}
              </h1>
            </div>

            {/* Brand Tagline in Champagne Gold */}
            <h2 className="text-sm sm:text-lg md:text-xl font-serif font-bold tracking-[0.2em] uppercase text-[#D6B875] mb-4 max-w-2xl">
              {brandData.tagline}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-[#F5F1E8]/85 max-w-xl font-normal leading-relaxed mb-7 text-balance">
              &ldquo;{brandData.heroSubtitle}&rdquo;
            </p>

            {/* Live Ticking Countdown to 3 Jan 2027 */}
            <div className="mb-8 w-full flex justify-center lg:justify-start">
              <CountdownClock variant="hero" />
            </div>

            {/* Dual Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={brandData.defaultGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all duration-300 shadow-[0_0_35px_rgba(214,184,117,0.4)] hover:shadow-[0_0_45px_rgba(214,184,117,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5F1E8] bg-[#101C35]/90 hover:bg-[#101C35] border border-[#D6B875]/40 hover:border-[#D6B875] rounded-md transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#D6B875]" />
                <span>EXPLORE COMMITTEES</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dedicated Non-Overlapping Interactive 3D Earth Globe */}
          <div className="lg:col-span-6 w-full">
            <HeroGlobe3D />
          </div>
        </div>
      </div>

      {/* Authority KPI Strip below Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-6 rounded-2xl bg-[#101C35]/80 border border-[#D6B875]/25 shadow-2xl">
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
