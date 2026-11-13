import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Compass,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Globe,
  Zap,
  Landmark,
  Shield,
  Trophy
} from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import { Committee } from '../data/conferenceData';

interface CommitteesSectionProps {
  onRegisterCommittee: (committeeName: string) => void;
}

export default function CommitteesSection({ onRegisterCommittee }: CommitteesSectionProps) {
  const { committees, brandData } = useConference();
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Crisis Simulation',
    'Parliamentary / Lok Sabha',
    'Specialized Agency',
    'Specialized Sports Committee',
  ];

  const filteredCommittees =
    activeFilter === 'All'
      ? committees
      : committees.filter((c) => c.category === activeFilter);

  const getCommitteeIcon = (iconType: Committee['iconType']) => {
    switch (iconType) {
      case 'marvel':
        return <Zap className="w-6 h-6 text-[#E23636]" />;
      case 'parliament':
        return <Landmark className="w-6 h-6 text-[#FF9933]" />;
      case 'unsc':
        return <Shield className="w-6 h-6 text-[#D6B875]" />;
      case 'ipl':
        return <Trophy className="w-6 h-6 text-[#1E88E5]" />;
      default:
        return <Globe className="w-6 h-6 text-[#D6B875]" />;
    }
  };

  const getCommitteeBadgeStyle = (iconType: Committee['iconType']) => {
    switch (iconType) {
      case 'marvel':
        return 'border-[#E23636]/50 bg-[#E23636]/20 text-[#FF8A80]';
      case 'parliament':
        return 'border-[#FF9933]/50 bg-[#FF9933]/20 text-[#FFCC80]';
      case 'unsc':
        return 'border-[#D6B875]/50 bg-[#D6B875]/20 text-[#F2DEAA]';
      case 'ipl':
        return 'border-[#1E88E5]/50 bg-[#1E88E5]/20 text-[#90CAF9]';
      default:
        return 'border-white/20 bg-white/10 text-white';
    }
  };

  return (
    <section id="committees" className="relative py-28 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#641E35]/25 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-[#101C35]/60 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
              <Globe className="w-4 h-4" />
              <span>Chambers of Debate & Strategy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tracking-tight leading-tight gold-glow">
              Four Powerhouse Committees.
            </h2>
            <p className="text-sm sm:text-base text-[#F5F1E8]/75 font-normal mt-2">
              MCUCC (Marvel Crisis) · Lok Sabha · UNSC · IPL Mega-Auction
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#101C35]/80 border border-[#D6B875]/25 rounded-xl backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#D6B875] text-[#08090D] font-bold shadow-md'
                    : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Interactive 3D Committee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredCommittees.map((committee) => (
            <div
              key={committee.id}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#101C35]/70 hover:bg-[#101C35]/95 border-2 border-[#D6B875]/25 hover:border-[#D6B875] backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(16,28,53,0.9)] overflow-hidden"
            >
              {/* Corner Glow Accent */}
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: committee.accentColor }}
              />

              <div>
                {/* Header with Icon, Category & Difficulty */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(8, 9, 13, 0.7)',
                        borderColor: committee.accentColor,
                      }}
                    >
                      {getCommitteeIcon(committee.iconType)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875] block">
                        {committee.acronym}
                      </span>
                      <span className="text-[11px] text-[#F5F1E8]/60">
                        {committee.size}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${getCommitteeBadgeStyle(
                      committee.iconType
                    )}`}
                  >
                    {committee.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F1E8] mb-3 group-hover:text-[#D6B875] transition-colors leading-snug">
                  {committee.name}
                </h3>

                {/* Agenda Banner Box */}
                <div className="mb-4 p-4 rounded-xl bg-[#08090D]/70 border border-white/10 group-hover:border-[#D6B875]/40 transition-colors">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6B875] block mb-1">
                    Official Agenda / Mandate:
                  </span>
                  <p className="text-xs sm:text-sm text-[#F5F1E8]/90 font-medium leading-relaxed">
                    {committee.topic}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#F5F1E8]/75 leading-relaxed font-normal mb-6">
                  {committee.description}
                </p>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs text-[#F5F1E8]/50">
                  {committee.category}
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCommittee(committee)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#D6B875] hover:text-[#08090D] bg-transparent hover:bg-[#D6B875] border border-[#D6B875]/40 rounded-lg transition-all cursor-pointer"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={brandData.defaultGoogleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Committee Dossier Modal */}
        {selectedCommittee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#101C35] border-2 border-[#D6B875]/50 shadow-2xl p-6 sm:p-8 text-[#F5F1E8]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedCommittee(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D6B875]">
                  {selectedCommittee.category}
                </span>
                <span className="text-xs text-white/40">·</span>
                <span className="text-xs text-white/70">
                  Level: {selectedCommittee.difficulty}
                </span>
                <span className="text-xs text-white/40">·</span>
                <span className="text-xs text-white/70">
                  {selectedCommittee.size}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {selectedCommittee.name}
              </h3>
              <div className="text-xs font-semibold text-[#D6B875] mb-6">
                Chamber Tag: {selectedCommittee.acronym}
              </div>

              {/* Agenda Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#641E35]/40 to-[#08090D]/80 border border-[#D6B875]/40 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
                  Primary Committee Agenda:
                </span>
                <p className="text-base sm:text-lg font-serif font-bold text-white mb-2">
                  {selectedCommittee.topic}
                </p>
                {selectedCommittee.secondaryTopic && (
                  <p className="text-xs text-[#F5F1E8]/75">
                    <span className="text-[#D6B875] font-semibold">Secondary Track:</span>{' '}
                    {selectedCommittee.secondaryTopic}
                  </p>
                )}
              </div>

              {/* Mandate Description */}
              <div className="space-y-4 mb-6 text-xs sm:text-sm text-[#F5F1E8]/85 font-normal leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6B875] mb-1.5">
                    Executive Mandate
                  </h4>
                  <p>{selectedCommittee.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6B875] mb-1.5">
                    Simulation Mechanics & Directives
                  </h4>
                  <p>{selectedCommittee.agendaSummary}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6B875] mb-2">
                    Key Deliberation Touchpoints:
                  </h4>
                  <ul className="space-y-2">
                    {selectedCommittee.keyIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F5F1E8]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] mt-1.5 shrink-0" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rules & Dais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#08090D]/60 border border-white/10 mb-8 text-xs">
                <div>
                  <span className="font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
                    Rules of Procedure
                  </span>
                  <span className="text-[#F5F1E8]/90 font-medium">
                    {selectedCommittee.rulesOfProcedure}
                  </span>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-[#D6B875] block mb-1">
                    Study Guide Availability
                  </span>
                  <span className="text-[#F5F1E8]/90 font-medium">
                    {selectedCommittee.studyGuideSummary}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <span className="text-xs text-[#D6B875]/80">
                  Allocations confirmed on rolling basis via Google Forms.
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCommittee(null)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 rounded cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href={brandData.defaultGoogleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded transition-all shadow-[0_0_20px_rgba(214,184,117,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Register for {selectedCommittee.acronym}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
