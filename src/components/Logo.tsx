import React from 'react';
import { Play } from 'lucide-react';

interface LogoProps {
  isDark?: boolean;
}

export function Logo({ isDark = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2 group select-none">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-accent blur-md opacity-20 group-hover:opacity-40 transition-smooth"></div>
        <div className="bg-brand-accent p-1.5 rounded-lg shadow-lg shadow-blue-500/20 relative">
          <Play size={20} fill="white" className="text-white ml-0.5" />
        </div>
      </div>
      <div className={`flex flex-col leading-none ${isDark ? 'text-white' : 'text-brand-primary'}`}>
        <span className="text-xl font-black tracking-tighter uppercase">
          MEGA<span className="text-brand-accent italic">FILMES</span>
        </span>
        <span className={`text-[8px] font-bold tracking-[0.2em] uppercase opacity-50 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Portal Premium
        </span>
      </div>
    </div>
  );
}
