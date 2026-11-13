import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { BRAND_DATA } from '../data/conferenceData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(targetIsoString: string): TimeLeft {
  const targetTime = new Date(targetIsoString).getTime();
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

interface CountdownClockProps {
  variant?: 'hero' | 'compact' | 'card';
  className?: string;
}

export default function CountdownClock({
  variant = 'hero',
  className = '',
}: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(BRAND_DATA.countdownTarget)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(BRAND_DATA.countdownTarget));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num: number) => String(num).padStart(2, '0');

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101C35]/90 border border-[#D6B875]/30 text-xs ${className}`}>
        <Clock className="w-3.5 h-3.5 text-[#D6B875]" />
        <span className="text-[#D6B875] font-semibold">Opening in:</span>
        <span className="font-mono tabular-nums text-white font-bold">
          {timeLeft.days}d {format2Digits(timeLeft.hours)}h {format2Digits(timeLeft.minutes)}m {format2Digits(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Header Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#641E35]/40 border border-[#D6B875]/35 text-[11px] font-bold uppercase tracking-widest text-[#D6B875] mb-4 shadow-md backdrop-blur-md">
        <Calendar className="w-3.5 h-3.5 text-[#D6B875]" />
        <span>Gavel Drops: January 3, 2027</span>
      </div>

      {/* Digits Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md">
        {/* Days */}
        <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#101C35]/90 to-[#101C35]/70 border border-[#D6B875]/35 backdrop-blur-md shadow-xl">
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tabular-nums gold-glow">
            {format2Digits(timeLeft.days)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D6B875] mt-1">
            Days
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#101C35]/90 to-[#101C35]/70 border border-[#D6B875]/35 backdrop-blur-md shadow-xl">
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tabular-nums gold-glow">
            {format2Digits(timeLeft.hours)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D6B875] mt-1">
            Hours
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#101C35]/90 to-[#101C35]/70 border border-[#D6B875]/35 backdrop-blur-md shadow-xl">
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#F5F1E8] tabular-nums gold-glow">
            {format2Digits(timeLeft.minutes)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D6B875] mt-1">
            Minutes
          </span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#641E35]/70 to-[#101C35]/90 border border-[#D6B875]/45 backdrop-blur-md shadow-xl">
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#D6B875] tabular-nums gold-glow">
            {format2Digits(timeLeft.seconds)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#F2DEAA] mt-1">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
}
