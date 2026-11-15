import React, { useState } from 'react';
import { Shield, Target, Landmark, Sparkles, BookOpen, Scale, ArrowRight } from 'lucide-react';
import { BRAND_DATA } from '../data/conferenceData';
import { useConference } from '../context/ConferenceContext';

interface InteractiveCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  highlights: string[];
}

function PerspectiveCard({ icon, title, category, description, highlights }: InteractiveCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="relative p-7 rounded-2xl bg-[#101C35]/60 hover:bg-[#101C35]/85 border border-[#D6B875]/20 hover:border-[#D6B875]/50 backdrop-blur-md transition-colors duration-300 shadow-xl group overflow-hidden"
    >
      {/* Subtle Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D6B875]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#641E35]/25 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-[#641E35]/40 border border-[#D6B875]/30 flex items-center justify-center text-[#D6B875] group-hover:scale-105 group-hover:border-[#D6B875] transition-all duration-300">
          {icon}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D6B875]">
          {category}
        </span>
      </div>

      <h3 className="text-xl font-serif font-bold text-[#F5F1E8] mb-3 group-hover:text-[#D6B875] transition-colors">
        {title}
      </h3>

      <p className="text-sm text-[#F5F1E8]/75 leading-relaxed mb-6 font-normal">
        {description}
      </p>

      {/* Highlights list */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-[#F5F1E8]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875]" />
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { brandData } = useConference();
  return (
    <section id="about" className="relative py-28 px-6 bg-[#08090D] overflow-hidden">
      {/* Background Architectural Ambient Shapes */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#101C35]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#641E35]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <Landmark className="w-4 h-4" />
            <span>About Horizon MUN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Beyond Borders. Beyond Perspectives.
          </h2>

          <p className="text-base sm:text-lg text-[#F5F1E8]/85 leading-relaxed font-normal">
            {brandData.aboutText || BRAND_DATA.aboutText}
          </p>
        </div>

        {/* 3 Interactive 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PerspectiveCard
            icon={<Scale className="w-6 h-6" />}
            category="Multilateral Dialogue"
            title="Sovereign Negotiations"
            description="Experience authentic committee friction where national priorities collide with global collective imperatives. Hone the art of parliamentary compromise and consensus."
            highlights={[
              'Strict adherence to real UN procedural decorum',
              'Substantive draft resolution sponsorship',
              'Bilateral back-channel negotiations',
            ]}
          />

          <PerspectiveCard
            icon={<Target className="w-6 h-6" />}
            category="Strategic Acumen"
            title="Crisis Governance"
            description="Respond to volatile midnight intelligence leaks, economic sanctions, and sudden escalations. Test your tactical clarity under relentless pressure."
            highlights={[
              'Dynamic crisis updates by specialized backrooms',
              'Direct portfolio directive deployment',
              'Real-time press communiqués & statecraft',
            ]}
          />

          <PerspectiveCard
            icon={<BookOpen className="w-6 h-6" />}
            category="Intellectual Rigor"
            title="Scholarly Research"
            description="Every committee agenda is anchored in peer-reviewed jurisprudence, treaties, and real foreign ministry cables crafted by our Academic Secretariat."
            highlights={[
              '40+ page background dossiers with treaty archives',
              'Chair evaluation rubrics based on diplomatic merit',
              'Actionable post-conference delegate assessments',
            ]}
          />
        </div>

        {/* Featured Diplomatic Ethos Banner */}
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#101C35]/90 via-[#101C35]/70 to-[#641E35]/40 border border-[#D6B875]/25 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#D6B875] mb-2 block">
                The Horizon Secretariat Charter
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F1E8] mb-4">
                &ldquo;Where Diplomacy Meets Possibility.&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-[#F5F1E8]/80 leading-relaxed font-normal mb-6">
                In an era fractured by unilateralism, Horizon MUN reaffirms that genuine dialogue is the
                ultimate instrument of peace. We invite high school and collegiate delegates to step onto
                our world stage, confront the existential challenges of our generation, and draft resolutions
                worthy of the United Nations.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs text-[#F5F1E8]/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D6B875]" />
                  <span>Youth-Led & Independent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D6B875]" />
                  <span>Global Hybrid Delegate Inclusivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D6B875]" />
                  <span>Merit-Based Awards & Bursaries</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#founders"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F5F1E8] bg-[#101C35] hover:bg-[#641E35] border border-[#D6B875]/40 rounded-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Meet The Founders</span>
                </a>
                <a
                  href="#committees"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-[0_0_20px_rgba(214,184,117,0.3)] hover:shadow-[0_0_30px_rgba(214,184,117,0.5)] cursor-pointer whitespace-nowrap"
                >
                  <span>View 4 Committees</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
