import React, { useState } from 'react';
import { Mail, Instagram, Linkedin, Globe, ArrowUp, Send, CheckCircle2, Lock } from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import HorizonLogo from './HorizonLogo';

interface FooterProps {
  onContactClick: () => void;
  onRegisterClick: () => void;
  onAdminClick: () => void;
}

export default function Footer({ onContactClick, onRegisterClick, onAdminClick }: FooterProps) {
  const { brandData } = useConference();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08090D] border-t border-[#D6B875]/25 pt-20 pb-12 px-6 text-[#F5F1E8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-5 space-y-4">
            <HorizonLogo size="lg" />

            <p className="text-sm font-serif italic text-[#D6B875] pt-1">
              &ldquo;{brandData.tagline}&rdquo;
            </p>

            <p className="text-xs text-[#F5F1E8]/75 leading-relaxed font-normal max-w-sm">
              An independent, youth-led Model United Nations summit fostering
              international diplomacy, constitutional debate, and principled leadership across
              MCUCC, Lok Sabha, UNSC, and IPL Auction committees.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={`mailto:${brandData.email}`}
                className="w-10 h-10 rounded-xl bg-[#101C35] hover:bg-[#641E35] border border-[#D6B875]/35 flex items-center justify-center text-[#D6B875] hover:text-[#F5F1E8] transition-colors shadow-md"
                aria-label="Email Secretariat"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#101C35] hover:bg-[#641E35] border border-[#D6B875]/35 flex items-center justify-center text-[#D6B875] hover:text-[#F5F1E8] transition-colors shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <button
                onClick={onContactClick}
                className="h-10 px-4 rounded-xl bg-[#101C35] hover:bg-[#D6B875] border border-[#D6B875]/35 text-xs font-bold uppercase tracking-wider text-[#D6B875] hover:text-[#08090D] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6B875]">
              Summit Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F1E8]/75">
              <li>
                <a href="#about" className="hover:text-[#D6B875] transition-colors">
                  About Horizon MUN
                </a>
              </li>
              <li>
                <a href="#founders" className="hover:text-[#D6B875] transition-colors">
                  About the Founders
                </a>
              </li>
              <li>
                <a href="#committees" className="hover:text-[#D6B875] transition-colors">
                  MCUCC, Lok Sabha, UNSC & IPL
                </a>
              </li>
              <li>
                <a href="#why-horizon" className="hover:text-[#D6B875] transition-colors">
                  The Horizon Distinction
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-[#D6B875] transition-colors">
                  Google Forms Registration Portal
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D6B875] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Registration Direct Link Box */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6B875]">
              Delegate Admissions
            </h4>
            <p className="text-xs text-[#F5F1E8]/75 leading-relaxed">
              Official registration form for MCUCC, Lok Sabha, UNSC, and IPL Auction.
            </p>

            <a
              href={brandData.defaultGoogleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-lg transition-all shadow-[0_0_20px_rgba(214,184,117,0.3)] cursor-pointer"
            >
              <span>Open Google Form</span>
            </a>

            <div className="text-[11px] text-[#F5F1E8]/50 pt-2 font-mono">
              Opening Plenary: {brandData.dates}
            </div>
          </div>
        </div>

        {/* Bottom Legal, Admin Gate & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E8]/50">
          <div>
            &copy; {new Date().getFullYear()} HORIZON MUN. All Rights Reserved. &ldquo;{brandData.tagline}&rdquo;
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onAdminClick}
              className="hover:text-[#D6B875] transition-colors flex items-center gap-1 cursor-pointer text-[#D6B875]/80"
              title="Admin Control Center (Secured with HORIZON1114)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onContactClick}
              className="hover:text-[#D6B875] transition-colors cursor-pointer"
            >
              Contact Organizing Team
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#D6B875] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
