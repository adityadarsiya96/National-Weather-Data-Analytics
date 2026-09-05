import { AlertTriangle, MapPin, X, ArrowRight, Shield } from 'lucide-react';
import { INCIDENT_REPORTS } from '../data/mockData';
import { IncidentReport } from '../types/weather';

interface ActiveIncidentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIncident: (incident: IncidentReport) => void;
  onDeploy: (incident: IncidentReport) => void;
}

export default function ActiveIncidentsModal({
  isOpen,
  onClose,
  onSelectIncident,
  onDeploy
}: ActiveIncidentsModalProps) {
  if (!isOpen) return null;

  const criticalIncidents = INCIDENT_REPORTS.filter((inc) => inc.severity === 'critical' || inc.status === 'under_review');

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e13]/85 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-[#111827] border border-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.25)] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#101319] border-b border-[#253347]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#ef4444] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#ef4444] uppercase tracking-wider">
              PRIORITY CRISIS QUEUE • 326 ACTIVE INCIDENTS (42 CRITICAL TIER-1)
            </span>
          </div>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of critical alerts */}
        <div className="p-4 overflow-y-auto divide-y divide-[#1e293b] space-y-3">
          {criticalIncidents.map((inc) => (
            <div 
              key={inc.id}
              className="pt-3 first:pt-0 bg-[#0b0e13] border border-[#253347] p-3.5 hover:border-[#06b6d4]/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]">
                      {inc.categoryCode}
                    </span>
                    <span className="text-xs font-bold text-[#f8fafc]">{inc.title}</span>
                    <span className="text-[10px] font-mono text-[#64748b]">[{inc.id}]</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#94a3b8] mt-1.5 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#64748b]" />
                      {inc.location}
                    </span>
                    <span>•</span>
                    <span className="text-[#06b6d4] font-semibold">{inc.metric}: {inc.metricValue}</span>
                    <span>•</span>
                    <span className="text-[#10b981]">{inc.confidence}% Confirmed</span>
                  </div>

                  <p className="text-xs text-[#cbd5e1] mt-2 bg-[#111827] p-2 border-l border-[#ef4444]">
                    {inc.details}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                  <span className="text-[10px] font-mono text-[#ef4444] font-semibold bg-[#ef4444]/10 px-2 py-0.5 border border-[#ef4444]/30">
                    {inc.tag}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        onSelectIncident(inc);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-[#1e293b] hover:bg-[#334155] text-xs font-mono text-[#cbd5e1] border border-[#253347] cursor-pointer flex items-center gap-1"
                    >
                      <span>MAP PIN</span>
                      <ArrowRight className="w-3 h-3 text-[#06b6d4]" />
                    </button>

                    <button
                      onClick={() => {
                        onDeploy(inc);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-[#ef4444] hover:bg-[#dc2626] text-[#101319] text-xs font-mono font-bold uppercase cursor-pointer flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" />
                      <span>MOBILIZE</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#101319] border-t border-[#253347] flex items-center justify-between text-xs font-mono text-[#64748b]">
          <span>NDRF CRISIS DISPATCH INTEGRATION</span>
          <span>IMMEDIATE SITUATION ESCALATION DESK</span>
        </div>
      </div>
    </div>
  );
}
