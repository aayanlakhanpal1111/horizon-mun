import React from 'react';

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
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exquisite Diplomatic Crest SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(214,184,117,0.5)]"
        >
          {/* Subtle Outer Glowing Ring */}
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          {/* Inner Shield / Hexagonal Laurel Disc */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="url(#navyGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />

          {/* Diplomatic Globe Graticules */}
          <ellipse
            cx="60"
            cy="60"
            rx="40"
            ry="20"
            stroke="#D6B875"
            strokeWidth="1"
            opacity="0.4"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="20"
            ry="40"
            stroke="#D6B875"
            strokeWidth="1"
            opacity="0.4"
          />
          <line
            x1="20"
            y1="60"
            x2="100"
            y2="60"
            stroke="#D6B875"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <line
            x1="60"
            y1="20"
            x2="60"
            y2="100"
            stroke="#D6B875"
            strokeWidth="1.2"
            opacity="0.6"
          />

          {/* Radiant Rising Horizon Sun */}
          <path
            d="M 38 60 A 22 22 0 0 1 82 60 Z"
            fill="url(#sunGrad)"
            stroke="#D6B875"
            strokeWidth="1.5"
          />

          {/* Sun Rays */}
          <line x1="60" y1="32" x2="60" y2="24" stroke="#F2DEAA" strokeWidth="2" strokeLinecap="round" />
          <line x1="44" y1="38" x2="38" y2="32" stroke="#F2DEAA" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="76" y1="38" x2="82" y2="32" stroke="#F2DEAA" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="32" y1="52" x2="24" y2="50" stroke="#F2DEAA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="88" y1="52" x2="96" y2="50" stroke="#F2DEAA" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left Laurel Wreath Branch */}
          <path
            d="M 28 75 C 24 64 26 50 32 40"
            stroke="#D6B875"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <ellipse cx="26" cy="62" rx="4" ry="2" transform="rotate(-35 26 62)" fill="#D6B875" />
          <ellipse cx="29" cy="51" rx="4" ry="2" transform="rotate(-25 29 51)" fill="#D6B875" />
          <ellipse cx="34" cy="42" rx="3.5" ry="1.8" transform="rotate(-15 34 42)" fill="#D6B875" />

          {/* Right Laurel Wreath Branch */}
          <path
            d="M 92 75 C 96 64 94 50 88 40"
            stroke="#D6B875"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <ellipse cx="94" cy="62" rx="4" ry="2" transform="rotate(35 94 62)" fill="#D6B875" />
          <ellipse cx="91" cy="51" rx="4" ry="2" transform="rotate(25 91 51)" fill="#D6B875" />
          <ellipse cx="86" cy="42" rx="3.5" ry="1.8" transform="rotate(15 86 42)" fill="#D6B875" />

          {/* Base Ribbon Banner Accent */}
          <path
            d="M 40 82 Q 60 76 80 82 Q 60 88 40 82 Z"
            fill="#641E35"
            stroke="#D6B875"
            strokeWidth="1.2"
          />
          <circle cx="60" cy="82" r="2.5" fill="#F2DEAA" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2DEAA" />
              <stop offset="50%" stopColor="#D6B875" />
              <stop offset="100%" stopColor="#9D7B38" />
            </linearGradient>

            <linearGradient id="navyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#182A4D" />
              <stop offset="60%" stopColor="#101C35" />
              <stop offset="100%" stopColor="#08090D" />
            </linearGradient>

            <linearGradient id="sunGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#641E35" />
              <stop offset="50%" stopColor="#D6B875" />
              <stop offset="100%" stopColor="#FFF2D6" />
            </linearGradient>
          </defs>
        </svg>
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
