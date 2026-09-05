import { useState, useEffect } from 'react';
import { Search, MapPin, AlertCircle, ArrowRight, X, Shield } from 'lucide-react';
import { INCIDENT_REPORTS } from '../data/mockData';
import { NavTab, IncidentReport } from '../types/weather';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIncident: (incident: IncidentReport) => void;
  onSelectTab: (tab: NavTab) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectIncident,
  onSelectTab
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredIncidents = INCIDENT_REPORTS.filter(
    (inc) =>
      inc.title.toLowerCase().includes(query.toLowerCase()) ||
      inc.location.toLowerCase().includes(query.toLowerCase()) ||
      inc.id.toLowerCase().includes(query.toLowerCase()) ||
      inc.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e13]/80 backdrop-blur-xs flex items-start justify-center pt-24 px-4 select-none animate-in fade-in duration-100">
      <div className="w-full max-w-2xl bg-[#111827] border border-[#06b6d4]/60 shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#253347] bg-[#101319]">
          <Search className="w-4 h-4 text-[#06b6d4] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search incident pins, telemetry coordinates, sectors, or type 'monitor'..."
            className="w-full bg-transparent text-sm text-[#f8fafc] placeholder-[#64748b] focus:outline-hidden font-mono"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f8fafc] text-xs font-mono px-2 py-1 bg-[#1e293b] border border-[#253347]"
          >
            ESC
          </button>
        </div>

        {/* Quick Nav Suggestions */}
        <div className="p-3 border-b border-[#253347] bg-[#0e1420] flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-[#64748b]">JUMP:</span>
          <button
            onClick={() => { onSelectTab('overview'); onClose(); }}
            className="px-2 py-0.5 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#101319] text-[#cbd5e1] border border-[#253347]"
          >
            [1] Overview
          </button>
          <button
            onClick={() => { onSelectTab('monitor'); onClose(); }}
            className="px-2 py-0.5 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#101319] text-[#cbd5e1] border border-[#253347]"
          >
            [2] Radar GIS
          </button>
          <button
            onClick={() => { onSelectTab('reports'); onClose(); }}
            className="px-2 py-0.5 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#101319] text-[#cbd5e1] border border-[#253347]"
          >
            [3] Reports Grid
          </button>
          <button
            onClick={() => { onSelectTab('admin'); onClose(); }}
            className="px-2 py-0.5 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#101319] text-[#cbd5e1] border border-[#253347]"
          >
            [4] Task Force
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#1e293b]">
          {filteredIncidents.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#64748b]">
              No active meteorological pins matching "{query}"
            </div>
          ) : (
            filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                onClick={() => {
                  onSelectIncident(incident);
                  onSelectTab('overview');
                  onClose();
                }}
                className="p-2.5 hover:bg-[#1e293b] cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-1.5 py-0.5 text-[10px] font-mono font-bold border ${
                    incident.severity === 'critical'
                      ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]'
                      : 'bg-[#f97316]/20 text-[#f97316] border-[#f97316]'
                  }`}>
                    {incident.categoryCode}
                  </span>
                  <div>
                    <div className="text-xs font-medium text-[#f8fafc] group-hover:text-[#06b6d4] flex items-center gap-2">
                      <span>{incident.title}</span>
                      <span className="text-[10px] font-mono text-[#64748b]">({incident.id})</span>
                    </div>
                    <div className="text-[11px] text-[#94a3b8] flex items-center gap-2 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#64748b]" />
                      <span>{incident.location}</span>
                      <span>•</span>
                      <span className="font-mono text-[#06b6d4]">{incident.metricValue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-[#0b0e13] px-2 py-0.5 text-[#64748b]">
                    {incident.confidence}% CONF
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#06b6d4] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#0b0e13] border-t border-[#253347] flex items-center justify-between text-[10px] font-mono text-[#64748b]">
          <span>NWIP NATIONAL COMMAND PROTOCOL v4.2</span>
          <span>ENTER TO SELECT • ESC TO DISMISS</span>
        </div>
      </div>
    </div>
  );
}
