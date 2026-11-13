import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FoundersSection from './components/FoundersSection';
import CommitteesSection from './components/CommitteesSection';
import WhyHorizonSection from './components/WhyHorizonSection';
import RegistrationSection from './components/RegistrationSection';
import ConferenceExperienceSection from './components/ConferenceExperienceSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import RegistrationModal from './components/RegistrationModal';
import AdminDashboard from './components/AdminDashboard';
import { ConferenceProvider, useConference } from './context/ConferenceContext';
import { RegistrationTier } from './data/conferenceData';

function MainSiteContent({ onAdminClick }: { onAdminClick: () => void }) {
  const { brandData } = useConference();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<RegistrationTier | null>(null);
  const [selectedCommitteeName, setSelectedCommitteeName] = useState<string | null>(null);

  const handleRegisterClick = (tier?: RegistrationTier) => {
    window.open(brandData.defaultGoogleFormUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCommitteeSelect = (committeeName: string) => {
    setSelectedCommitteeName(committeeName);
    window.open(brandData.defaultGoogleFormUrl, '_blank', 'noopener,noreferrer');
  };

  const handleExploreClick = () => {
    const commElem = document.getElementById('committees');
    if (commElem) {
      commElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F1E8] font-sans antialiased overflow-x-hidden selection:bg-[#D6B875]/30 selection:text-[#F5F1E8]">
      {/* Top Navigation Bar with Logo and Admin Portal button */}
      <Navbar
        onRegisterClick={() => handleRegisterClick()}
        onAdminClick={onAdminClick}
      />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero 3D Globe Experience with Live Countdown to 3 Jan 2027 */}
        <HeroSection
          onRegisterClick={() => handleRegisterClick()}
          onExploreClick={handleExploreClick}
        />

        {/* 2. About Horizon MUN */}
        <AboutSection />

        {/* 3. Dedicated About the Founder & About the Co-Founder Section with Photo Column */}
        <FoundersSection />

        {/* 4. Flagship Committees: MCUCC, Lok Sabha, UNSC, IPL Mega-Auction */}
        <CommitteesSection onRegisterCommittee={handleCommitteeSelect} />

        {/* 5. The Horizon Distinction */}
        <WhyHorizonSection />

        {/* 6. Registration Section with Google Forms, Secretariat & Rapporteurs Link Spaces */}
        <RegistrationSection onOpenDirectRegister={handleRegisterClick} />

        {/* 7. Conference Experience & Photography */}
        <ConferenceExperienceSection />

        {/* 8. Interactive FAQ Accordion */}
        <FaqSection onContactClick={() => setIsContactOpen(true)} />
      </main>

      {/* 9. Diplomatic Footer with Emblem Logo */}
      <Footer
        onContactClick={() => setIsContactOpen(true)}
        onRegisterClick={() => handleRegisterClick()}
        onAdminClick={onAdminClick}
      />

      {/* Global Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setSelectedTier(null);
          setSelectedCommitteeName(null);
        }}
        selectedTier={selectedTier}
        preferredCommittee={selectedCommitteeName}
      />
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  return (
    <ConferenceProvider>
      {currentView === 'admin' ? (
        <AdminDashboard onBackToSite={() => setCurrentView('public')} />
      ) : (
        <MainSiteContent onAdminClick={() => setCurrentView('admin')} />
      )}
    </ConferenceProvider>
  );
}
