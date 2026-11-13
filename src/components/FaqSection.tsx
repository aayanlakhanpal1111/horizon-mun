import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Search } from 'lucide-react';
import { useConference } from '../context/ConferenceContext';

interface FaqSectionProps {
  onContactClick: () => void;
}

export default function FaqSection({ onContactClick }: FaqSectionProps) {
  const { faqs } = useConference();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <section id="faq" className="relative py-28 px-6 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#641E35]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B875] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Delegation Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tracking-tight leading-tight mb-4 gold-glow">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-[#F5F1E8]/75 leading-relaxed font-normal mb-8">
            Essential information regarding committee allocations, conference rules,
            eligibility, and registration deadlines.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6B875]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diplomatic inquiries..."
              className="w-full pl-11 pr-4 py-3 bg-[#101C35]/80 border border-[#D6B875]/30 focus:border-[#D6B875] rounded-xl text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none backdrop-blur-md shadow-lg"
            />
          </div>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#101C35]/60 hover:bg-[#101C35]/80 border border-[#D6B875]/20 hover:border-[#D6B875]/40 transition-colors backdrop-blur-md overflow-hidden shadow-md"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] shrink-0" />
                    <span className="text-base sm:text-lg font-serif font-bold text-[#F5F1E8]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D6B875] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#F5F1E8]/80 leading-relaxed font-normal border-t border-white/5 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="p-8 rounded-2xl bg-[#101C35]/80 border border-[#D6B875]/25 backdrop-blur-md text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-serif font-bold text-[#F5F1E8] mb-1">
              Have specific country allocation or delegation inquiries?
            </h4>
            <p className="text-xs text-[#F5F1E8]/70">
              Our Secretariat and Delegate Affairs officers respond within 24 hours.
            </p>
          </div>

          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact The Secretariat</span>
          </button>
        </div>
      </div>
    </section>
  );
}
