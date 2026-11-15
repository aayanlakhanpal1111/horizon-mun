import React, { useState } from 'react';
import { Camera, Quote, Sparkles, X, ChevronRight, Eye } from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import { DEFAULT_EXPERIENCE_IMAGE, ExperienceItem } from '../data/conferenceData';

export default function ConferenceExperienceSection() {
  const { experienceItems, brandData } = useConference();
  const [activeItem, setActiveItem] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="relative py-28 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#101C35]/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>The Summit In Action</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tracking-tight leading-tight mb-4 gold-glow">
            The Horizon MUN Experience
          </h2>

          <p className="text-base text-[#F5F1E8]/75 leading-relaxed font-normal">
            Immerse yourself in a full day of intense oratory, high-stakes caucus coalitions,
            executive gala celebrations, and lifelong diplomatic friendships.
          </p>
        </div>

        {/* 3 Large Showcase Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {experienceItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-[#101C35]/60 border border-[#D6B875]/25 hover:border-[#D6B875]/60 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,28,53,0.9)] cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Measured Scrim */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#08090D]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = DEFAULT_EXPERIENCE_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101C35] via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#08090D]/80 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#D6B875] border border-[#D6B875]/30">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-[#D6B875] text-[#08090D] flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text & Content Container */}
              <div className="p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#F5F1E8] mb-3 group-hover:text-[#D6B875] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#F5F1E8]/75 leading-relaxed font-normal mb-6">
                    {item.caption}
                  </p>
                </div>

                {/* Delegate Quote */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2 text-xs text-[#F5F1E8]/90 italic font-serif mb-2">
                    <Quote className="w-3.5 h-3.5 text-[#D6B875] shrink-0 mt-0.5" />
                    <span>&ldquo;{item.quote}&rdquo;</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#D6B875] block text-right">
                    — {item.speaker}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Networking & Fellowship Strip */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#101C35]/90 via-[#101C35]/60 to-[#641E35]/40 border border-[#D6B875]/25 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
              Beyond the Dais
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F1E8] mb-2">
              Diplomatic Foyer Receptions & Delegate Gala
            </h4>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/80 leading-relaxed font-normal">
              The conference day concludes with a formal evening social gathering designed to cement bonds
              with international peers, debate unmoderated strategies, and celebrate youth solidarity.
            </p>
          </div>

          <a
            href={brandData.defaultGoogleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-md whitespace-nowrap cursor-pointer shrink-0"
          >
            Register for Horizon
          </a>
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-4xl rounded-2xl bg-[#101C35] border border-[#D6B875]/40 overflow-hidden shadow-2xl text-[#F5F1E8]">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] w-full bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="text-xs font-bold uppercase tracking-widest text-[#D6B875] mb-2">
                  {activeItem.tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-[#F5F1E8]/85 leading-relaxed font-normal mb-6">
                  {activeItem.caption}
                </p>

                <div className="p-4 rounded-xl bg-[#08090D]/70 border-l-2 border-[#D6B875] italic text-xs font-serif text-[#F5F1E8]/90">
                  &ldquo;{activeItem.quote}&rdquo; — {activeItem.speaker}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
