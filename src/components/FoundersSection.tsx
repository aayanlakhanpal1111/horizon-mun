import React from 'react';
import { Quote, Compass, User } from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import HorizonLogo from './HorizonLogo';

export default function FoundersSection() {
  const { founders } = useConference();
  const founder = founders.find((f) => f.id === 'founder') || founders[0];
  const coFounder = founders.find((f) => f.id === 'co-founder') || founders[1];

  const profiles = [founder, coFounder].filter(Boolean);

  return (
    <section id="founders" className="relative py-24 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Architectural Ambience */}
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[#641E35]/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-[600px] h-[600px] bg-[#101C35]/55 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <span>Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tracking-tight leading-tight mb-4 gold-glow">
            Founder &amp; Co-Founder
          </h2>
        </div>

        {/* Two Separate Profile Areas: ONLY Founder & Co-Founder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {profiles.map((profile, idx) => {
            const isFounder = profile.id === 'founder' || idx === 0;
            return (
              <article
                key={profile.id}
                className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#101C35]/95 via-[#101C35]/85 to-[#641E35]/35 border-2 border-[#D6B875]/40 shadow-2xl flex flex-col justify-start group hover:border-[#D6B875] transition-all duration-300"
              >
                {/* Header: Designation & Name */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#08090D]/80 border border-[#D6B875]/45 flex items-center justify-center shadow-lg shrink-0">
                      {isFounder ? (
                        <HorizonLogo size="sm" showText={false} />
                      ) : (
                        <Compass className="w-6 h-6 text-[#D6B875]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#D6B875] block mb-0.5">
                        {profile.role}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F1E8] tracking-tight break-words">
                        {profile.name}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-[#D6B875]/15 text-[#D6B875] border border-[#D6B875]/35 text-xs font-bold uppercase tracking-wider shrink-0">
                    {profile.role}
                  </span>
                </div>

                {/* Non-Overlapping Photo & Biography Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  {/* Photo Column */}
                  <div className="sm:col-span-5">
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#08090D] border-2 border-[#D6B875]/40 shadow-xl">
                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt={`${profile.name} — ${profile.role}`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#101C35] to-[#641E35]/40">
                          <div className="w-16 h-16 rounded-full bg-[#D6B875]/20 border border-[#D6B875]/50 flex items-center justify-center text-[#D6B875] mb-2">
                            <User className="w-8 h-8" />
                          </div>
                          <span className="text-xs font-serif font-bold text-[#F5F1E8]">
                            {profile.name}
                          </span>
                          <span className="text-[10px] text-[#D6B875]/80 mt-1 uppercase tracking-wider">
                            {profile.role}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Statement / Biography Column */}
                  <div className="sm:col-span-7 flex flex-col gap-3">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#D6B875]">
                      {profile.quoteTitle || `About the ${profile.role}`}
                    </div>

                    {profile.statement && profile.statement.trim() ? (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#08090D]/80 border-l-3 border-[#D6B875] relative">
                        <Quote className="w-5 h-5 text-[#D6B875]/25 absolute top-3 right-3 pointer-events-none" />
                        <p className="text-xs sm:text-sm text-[#F5F1E8]/90 font-serif leading-relaxed italic relative z-10">
                          &ldquo;{profile.statement}&rdquo;
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-[#08090D]/50 border border-white/10 text-xs text-[#F5F1E8]/55">
                        Editable via the Admin Portal.
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
