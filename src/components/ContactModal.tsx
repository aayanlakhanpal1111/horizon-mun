import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MessageSquare, Instagram, MapPin } from 'lucide-react';
import { BRAND_DATA } from '../data/conferenceData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#101C35] border border-[#D6B875]/40 shadow-2xl p-6 sm:p-8 text-[#F5F1E8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#F5F1E8]/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close contact modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D6B875]/20 border border-[#D6B875] text-[#D6B875] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Dispatch Transmitted Successfully
            </h3>
            <p className="text-sm text-[#F5F1E8]/80 max-w-md mx-auto leading-relaxed">
              Thank you, {formData.fullName}. Your communication has been dispatched to the Horizon MUN Secretariat.
              Our Delegate Affairs team will respond to {formData.email} within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D6B875] mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Secretariat Communications</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Connect With the Organizing Team
            </h3>

            <p className="text-xs sm:text-sm text-[#F5F1E8]/75 leading-relaxed font-normal mb-6">
              Have questions regarding delegation packages, international visas, or committee assignments?
              Complete the dispatch form below or write directly to our desk.
            </p>

            {/* Direct Contact Info Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#08090D]/60 border border-white/10 mb-6 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6B875] shrink-0" />
                <span className="text-[#F5F1E8]/85 font-mono">{BRAND_DATA.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#D6B875] shrink-0" />
                <span className="text-[#F5F1E8]/85">{BRAND_DATA.instagram}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Julian Rostova"
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@school.edu"
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-1.5">
                    Institution / School / University
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Oxford Diplomatic Society"
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Country Allocation Request">Country Allocation Request</option>
                    <option value="Institutional Delegation (4+ Delegates)">Institutional Delegation (4+ Delegates)</option>
                    <option value="Financial Aid / Bursary">Financial Aid / Bursary</option>
                    <option value="Secretariat / EB Application">Secretariat / EB Application</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-1.5">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your question or request in detail..."
                  className="w-full bg-[#08090D] border border-white/20 focus:border-[#D6B875] rounded-lg p-4 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-[#F5F1E8]/70 hover:text-white bg-white/5 hover:bg-white/10 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded transition-all shadow-[0_0_20px_rgba(214,184,117,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Transmit Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
