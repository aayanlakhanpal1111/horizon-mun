import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import { BRAND_DATA, RegistrationTier, REGISTRATION_TIERS } from '../data/conferenceData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: RegistrationTier | null;
  preferredCommittee?: string | null;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  selectedTier,
  preferredCommittee,
}: RegistrationModalProps) {
  const [copied, setCopied] = useState(false);
  const tier = selectedTier || REGISTRATION_TIERS[0];
  const formUrl = BRAND_DATA.defaultGoogleFormUrl;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenForm = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#101C35] border border-[#D6B875]/40 shadow-2xl p-6 sm:p-8 text-[#F5F1E8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D6B875] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Delegate Admissions Portal</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {tier.name}
        </h3>

        <p className="text-xs sm:text-sm text-[#F5F1E8]/80 leading-relaxed font-normal mb-6">
          {tier.description}
        </p>

        {preferredCommittee && (
          <div className="p-3.5 rounded-xl bg-[#641E35]/40 border border-[#D6B875]/30 mb-6 flex items-center justify-between text-xs">
            <span className="text-[#D6B875] font-semibold">
              Selected Committee Preference:
            </span>
            <span className="text-white font-serif font-bold">
              {preferredCommittee}
            </span>
          </div>
        )}

        {/* Pricing & Benefit Overview */}
        <div className="p-5 rounded-2xl bg-[#08090D]/70 border border-white/10 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-3xl font-serif font-black text-[#D6B875] tabular-nums">
                {tier.price}
              </span>
              <span className="text-xs text-[#F5F1E8]/60 ml-2 uppercase">
                USD / Delegate Fee
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#D6B875]/20 text-[#D6B875] border border-[#D6B875]/30">
              {tier.period}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6B875] block">
              Tier Inclusions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tier.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#F5F1E8]/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B875] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Step Protocol */}
        <div className="space-y-3 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
            Application Protocol:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[#D6B875] font-bold block mb-1">01. Open Form</span>
              <span className="text-[#F5F1E8]/70">Access our secure Google Forms admissions portal.</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[#D6B875] font-bold block mb-1">02. List Priorities</span>
              <span className="text-[#F5F1E8]/70">Specify top 3 country & committee choices.</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[#D6B875] font-bold block mb-1">03. Allocation</span>
              <span className="text-[#F5F1E8]/70">Receive official credentials within 48 hours.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-[#F5F1E8]/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Form URL'}</span>
          </button>

          <button
            onClick={handleOpenForm}
            className="flex-1 w-full sm:w-auto py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-[0_0_25px_rgba(214,184,117,0.35)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Google Forms Application</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
