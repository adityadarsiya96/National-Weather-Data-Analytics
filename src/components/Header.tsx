import { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  AlertTriangle, 
  User, 
  Shield, 
  Activity,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenAlertsModal: () => void;
  onOpenProfileMenu?: () => void;
}

export default function Header({ 
  onOpenCommandPalette, 
  onOpenAlertsModal 
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('05 SEP 2026 | 14:32:18 IST');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Keep year fixed to 2026 for simulated crisis scenario while seconds tick
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`05 SEP 2026 | ${hours}:${minutes}:${seconds} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="nwip-command-header" className="h-14 bg-[#101319] border-b border-[#253347] px-4 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left Logo / Entity info */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 rounded-full border border-[#06b6d4]/60 bg-[#0b0e13] flex items-center justify-center text-[#06b6d4]">
          <Radio className="w-4 h-4 text-[#06b6d4] animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-[#06b6d4]/20 animate-ping" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-[#f8fafc] tracking-wider">
              NWIP INTELLIGENCE
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#94a3b8] tracking-widest uppercase">
            GOVT. OF INDIA • NATIONAL CRISIS GRID
          </span>
        </div>
      </div>

      {/* Grid Sub-Status & Live Pulse */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#94a3b8]">
          <span className="text-[#64748b]">/</span>
          <span className="tracking-wider text-[#cbd5e1]">NATIONAL GRID</span>
          <span className="text-[#64748b]">/</span>
          <span className="text-[#06b6d4] font-semibold">COMMAND TELEMETRY</span>
        </div>

        <div className="flex items-center gap-2 bg-[#111827] border border-[#253347] px-2.5 py-1 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[#e2e8f0] font-medium tracking-wide">
            LIVE FEED <span className="text-[#94a3b8]">(UTC+05:30 IST)</span>
          </span>
        </div>
      </div>

      {/* Center Search / Cmd+K */}
      <div className="flex-1 max-w-xs mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full h-8 bg-[#111827] hover:bg-[#1e293b] border border-[#253347] hover:border-[#06b6d4]/50 px-3 flex items-center justify-between text-xs text-[#94a3b8] transition-colors group cursor-pointer"
          title="Search telemetry, pin coordinates or jump to sectors (Cmd+K)"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#06b6d4]" />
            <span className="font-mono text-[11px] text-[#64748b]">Search telemetry or pins...</span>
          </div>
          <kbd className="bg-[#1e293b] border border-[#334155] px-1.5 py-0.5 text-[10px] font-mono text-[#cbd5e1]">
            Cmd+K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Real-time IST Timestamp */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#cbd5e1] bg-[#0b0e13] px-3 py-1.5 border border-[#253347]">
          <Activity className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span className="tabular-nums tracking-wide font-medium">{currentTime}</span>
        </div>

        {/* Active Alerts Badge */}
        <button
          onClick={onOpenAlertsModal}
          className="h-8 bg-[#ef4444]/15 hover:bg-[#ef4444]/25 border border-[#ef4444] px-2.5 flex items-center gap-2 text-xs font-mono text-[#ef4444] transition-colors cursor-pointer group"
          title="View active red incidents"
        >
          <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
          <span className="font-bold tracking-wider text-[11px] hidden md:inline">
            326 ACTIVE INCIDENTS
          </span>
          <span className="w-4 h-4 bg-[#ef4444] text-[#101319] text-[10px] font-black flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Identity Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#253347]">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-[#f8fafc] leading-tight flex items-center gap-1 justify-end">
              <span>Col. R. Sharma</span>
            </div>
            <div className="text-[10px] font-mono text-[#06b6d4] tracking-wider leading-none">
              NDRF COMMAND • ADMIN
            </div>
          </div>
          
          <div className="w-8 h-8 bg-[#111827] border border-[#253347] flex items-center justify-center text-[#06b6d4] relative">
            <User className="w-4 h-4" />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#10b981] border border-[#101319]" />
          </div>
        </div>
      </div>
    </header>
  );
}
