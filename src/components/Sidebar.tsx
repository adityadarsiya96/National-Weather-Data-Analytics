import { ElementType } from 'react';
import { 
  LayoutGrid, 
  Activity, 
  BarChart3, 
  FileText, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Settings,
  CircleDot
} from 'lucide-react';
import { NavTab } from '../types/weather';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'OVERVIEW', icon: LayoutGrid },
  { id: 'monitor', label: 'LIVE MONITOR', icon: Activity },
  { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  { id: 'reports', label: 'REPORTS', icon: FileText },
  { id: 'ai-verification', label: 'AI VERIFICATION', icon: Cpu },
  { id: 'data-sources', label: 'DATA SOURCES', icon: Radio },
  { id: 'admin', label: 'ADMIN', icon: ShieldCheck },
  { id: 'settings', label: 'SETTINGS', icon: Settings },
];

export default function Sidebar({ currentTab, onSelectTab }: SidebarProps) {
  return (
    <aside 
      id="nwip-command-sidebar" 
      className="w-56 bg-[#101319] border-r border-[#253347] flex flex-col justify-between select-none z-20 shrink-0"
    >
      {/* Top Navigation Links */}
      <div className="py-2 flex flex-col">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono tracking-wider font-semibold transition-all duration-100 cursor-pointer text-left ${
                isActive
                  ? 'bg-[#06b6d4] text-[#101319] font-bold shadow-sm'
                  : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#101319]' : 'text-[#64748b]'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom System Status Box (Matches Screenshot) */}
      <div className="p-3">
        <div className="bg-[#111827] border border-[#253347] p-3 text-[11px] font-mono">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            <span className="text-[#06b6d4] font-bold tracking-wider uppercase text-[10px]">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>

          <div className="flex justify-between items-center text-[#94a3b8] py-1 border-t border-[#1e293b]">
            <span className="text-[#64748b]">IMD Radar Feed</span>
            <span className="text-[#cbd5e1] font-semibold tabular-nums">2.4s ago</span>
          </div>

          <div className="flex justify-between items-center text-[#94a3b8] pt-1">
            <span className="text-[#64748b]">Active Stream</span>
            <span className="text-[#cbd5e1] font-semibold tabular-nums">24,851 evt/h</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
