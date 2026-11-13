import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';
import { useConference } from '../context/ConferenceContext';
import HorizonLogo from './HorizonLogo';

interface NavbarProps {
  onRegisterClick: () => void;
  onAdminClick: () => void;
}

export default function Navbar({ onRegisterClick, onAdminClick }: NavbarProps) {
  const { brandData } = useConference();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Founders', href: '#founders' },
    { label: 'Committees', href: '#committees' },
    { label: 'Why Horizon', href: '#why-horizon' },
    { label: 'Experience', href: '#experience' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090D]/95 backdrop-blur-md border-b border-[#D6B875]/25 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#08090D]/95 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single brand wordmark with diplomatic crest emblem */}
        <a href="#" className="whitespace-nowrap shrink-0 block">
          <HorizonLogo size="md" />
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#F5F1E8]/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#D6B875] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D6B875]/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + Admin Portal button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onAdminClick}
            className="p-2 text-[#D6B875]/70 hover:text-[#D6B875] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            title="Admin Dashboard (Secured)"
            aria-label="Admin Portal"
          >
            <Lock className="w-4 h-4" />
          </button>

          <a
            href={brandData.defaultGoogleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all duration-200 shadow-[0_0_20px_rgba(214,184,117,0.35)] hover:shadow-[0_0_30px_rgba(214,184,117,0.55)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#F5F1E8] hover:text-[#D6B875] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#D6B875]/20 bg-[#08090D]/95 backdrop-blur-xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F5F1E8]/90 hover:text-[#D6B875] py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={brandData.defaultGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#08090D] bg-[#D6B875] hover:bg-[#F2DEAA] rounded-md transition-all shadow-lg cursor-pointer"
              >
                <span>Register on Google Forms</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#D6B875] hover:text-white bg-[#101C35] border border-[#D6B875]/30 rounded-md transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
