import { useState } from 'react';
import { Shield, CheckCircle2, AlertTriangle, X, Radio, ArrowRight } from 'lucide-react';
import { IncidentReport } from '../types/weather';

interface DeployModalProps {
  incident: IncidentReport | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (incidentId: string, battalion: string, personnel: number) => void;
}

export default function DeployModal({
  incident,
  isOpen,
  onClose,
  onConfirm
}: DeployModalProps) {
  const [personnel, setPersonnel] = useState(48);
  const [boats, setBoats] = useState(6);
  const [priority, setPriority] = useState<'CRITICAL_IMMEDIATE' | 'HIGH_PRECAUTIONARY'>('CRITICAL_IMMEDIATE');
  const [isDispatched, setIsDispatched] = useState(false);

  if (!isOpen || !incident) return null;

  const handleDispatch = () => {
    setIsDispatched(true);
    setTimeout(() => {
      onConfirm(incident.id, incident.battalionAssigned || 'NDRF 11 Bn Staged (Bhopal)', personnel);
      setIsDispatched(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e13]/85 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#111827] border border-[#ef4444] shadow-[0_0_25px_rgba(239,68,68,0.2)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#101319] border-b border-[#253347]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#ef4444] animate-ping" />
            <span className="font-mono text-xs font-bold text-[#ef4444] uppercase tracking-wider">
              CRISIS MOBILIZATION ORDER • {incident.id}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-[#0b0e13] border border-[#253347] p-3">
            <div className="text-xs font-semibold text-[#f8fafc]">
              {incident.title}
            </div>
            <div className="text-[11px] font-mono text-[#94a3b8] mt-1">
              Sector: {incident.location} • Inundation Metric: <span className="text-[#ef4444] font-bold">{incident.metricValue}</span>
            </div>
            <p className="text-xs text-[#cbd5e1] mt-2 bg-[#111827] p-2 border-l-2 border-[#ef4444]">
              {incident.details}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#101319] border border-[#253347] p-2.5">
              <span className="text-[10px] text-[#64748b] block uppercase">Designated Unit</span>
              <span className="text-[#06b6d4] font-bold mt-1 block">
                {incident.battalionAssigned || 'NDRF 11 Bn (Bhopal)'}
              </span>
            </div>
            <div className="bg-[#101319] border border-[#253347] p-2.5">
              <span className="text-[10px] text-[#64748b] block uppercase">Transit ETA</span>
              <span className="text-[#f8fafc] font-bold mt-1 block">
                22 Minutes (Air / Waterborne)
              </span>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1">
                <span>Deployment Personnel:</span>
                <span className="text-[#06b6d4] font-bold">{personnel} Operators</span>
              </div>
              <input 
                type="range" 
                min={12} 
                max={120} 
                step={6} 
                value={personnel} 
                onChange={(e) => setPersonnel(Number(e.target.value))}
                className="w-full accent-[#06b6d4] bg-[#1e293b] h-1.5 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1">
                <span>Inflatable Rescue Boats (IRBs):</span>
                <span className="text-[#06b6d4] font-bold">{boats} Craft</span>
              </div>
              <input 
                type="range" 
                min={2} 
                max={20} 
                step={2} 
                value={boats} 
                onChange={(e) => setBoats(Number(e.target.value))}
                className="w-full accent-[#06b6d4] bg-[#1e293b] h-1.5 cursor-pointer"
              />
            </div>

            <div className="bg-[#0b0e13] p-2.5 border border-[#253347] text-[11px] flex items-center justify-between">
              <span className="text-[#94a3b8]">Automated SDRF & District Magistrate Telex:</span>
              <span className="text-[#10b981] font-bold">ARMED & READY</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#101319] border-t border-[#253347] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-xs font-mono text-[#cbd5e1] border border-[#253347] cursor-pointer"
          >
            STAND DOWN
          </button>

          <button
            onClick={handleDispatch}
            disabled={isDispatched}
            className="px-4 py-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-[#101319] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {isDispatched ? (
              <>
                <Radio className="w-3.5 h-3.5 animate-spin" />
                <span>DISPATCHING TELEX...</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5" />
                <span>CONFIRM TASK FORCE DISPATCH</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
