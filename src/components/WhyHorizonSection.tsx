import React, { useState } from 'react';
import { Award, TrendingUp, Brain, Globe, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { WHY_HORIZON_PILLARS, FeaturePillar } from '../data/conferenceData';

export default function WhyHorizonSection() {
  const [activePillar, setActivePillar] = useState<string>(WHY_HORIZON_PILLARS[0].id);

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'diplomatic-excellence':
        return <Award className="w-6 h-6 text-[#D6B875]" />;
      case 'leadership-development':
        return <TrendingUp className="w-6 h-6 text-[#D6B875]" />;
      case 'critical-thinking':
        return <Brain className="w-6 h-6 text-[#D6B875]" />;
      case 'global-networking':
        return <Globe className="w-6 h-6 text-[#D6B875]" />;
      default:
        return <Award className="w-6 h-6 text-[#D6B875]" />;
    }
  };

  return (
    <section id="why-horizon" className="relative py-28 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#101C35]/30 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Horizon Distinction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F5F1E8] tracking-tight leading-tight mb-4">
            Why Choose Horizon MUN?
          </h2>

          <p className="text-base text-[#F5F1E8]/75 leading-relaxed font-normal">
            Designed by seasoned collegiate circuit leaders and advised by senior diplomats,
            Horizon MUN elevates parliamentary debate into an authentic masterclass in statecraft,
            strategic consensus, and transformative youth leadership.
          </p>
        </div>

        {/* 4 Animated Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WHY_HORIZON_PILLARS.map((pillar) => {
            const isSelected = activePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`relative p-7 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#101C35] to-[#641E35]/40 border-2 border-[#D6B875] shadow-[0_0_35px_rgba(214,184,117,0.25)] -translate-y-2'
                    : 'bg-[#101C35]/50 hover:bg-[#101C35]/80 border border-[#D6B875]/20 hover:border-[#D6B875]/50 hover:-translate-y-1'
                }`}
              >
                {/* 3D Insignia Emblem Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#641E35]/50 border border-[#D6B875]/40 flex items-center justify-center shadow-inner">
                      {getPillarIcon(pillar.id)}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold text-[#D6B875] tabular-nums">
                        {pillar.metric}
                      </div>
                      <div className="text-[10px] uppercase font-semibold text-[#F5F1E8]/60 tracking-wider">
                        {pillar.metricLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#F5F1E8] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#F5F1E8]/75 leading-relaxed font-normal mb-6">
                    {pillar.shortDesc}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {pillar.bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#F5F1E8]/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B875] mt-0.5 shrink-0" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Active Pillar Deep-Dive Banner */}
        {(() => {
          const currentPillar =
            WHY_HORIZON_PILLARS.find((p) => p.id === activePillar) || WHY_HORIZON_PILLARS[0];

          return (
            <div className="p-8 md:p-10 rounded-2xl bg-[#101C35]/80 border border-[#D6B875]/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6B875] mb-2">
                  <span>Selected Pillar Exploration</span>
                  <span>·</span>
                  <span>{currentPillar.title}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F1E8] mb-3">
                  {currentPillar.fullDesc}
                </h4>
                <div className="flex flex-wrap gap-4 text-xs text-[#F5F1E8]/70">
                  <span>Academic Excellence Vetted by Former UN Rapporteurs</span>
                  <span>·</span>
                  <span>Merit-Driven Evaluation</span>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href="#registration"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-[0_0_20px_rgba(214,184,117,0.3)] cursor-pointer"
                >
                  <span>Experience Horizon MUN</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
