import React, { useState, useEffect } from 'react';
import { useConference } from '../context/ConferenceContext';
import { OFFICIAL_LOGO_URL } from '../data/conferenceData';

interface HorizonLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function HorizonLogo({
  className = '',
  showText = true,
  size = 'md',
}: HorizonLogoProps) {
  const { brandData } = useConference();
  const customLogo = brandData.logoUrl?.trim();
  const primaryLogo = customLogo || OFFICIAL_LOGO_URL;
  const [imgSrc, setImgSrc] = useState(primaryLogo);

  useEffect(() => {
    setImgSrc(primaryLogo);
  }, [primaryLogo]);

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Horizon MUN Circular Medallion Logo */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-full overflow-hidden border border-[#D6B875]/45 bg-[#08090D] shadow-[0_0_16px_rgba(214,184,117,0.35)] flex items-center justify-center`}
      >
        <img
          src={imgSrc}
          alt="HORIZON MUN Official Logo"
          className="w-full h-full object-cover scale-[1.05]"
          onError={() => {
            if (imgSrc !== OFFICIAL_LOGO_URL) {
              setImgSrc(OFFICIAL_LOGO_URL);
            }
          }}
        />
      </div>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-black tracking-[0.14em] text-[#F5F1E8] ${textSizes[size]} leading-none`}>
            HORIZON <span className="text-[#D6B875]">MUN</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#D6B875]/80 font-medium mt-1">
            Where Diplomacy Meets Possibility
          </span>
        </div>
      )}
    </div>
  );
}
