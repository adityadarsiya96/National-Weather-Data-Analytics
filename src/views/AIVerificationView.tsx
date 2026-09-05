import { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  Database 
} from 'lucide-react';
import { INCIDENT_REPORTS } from '../data/mockData';

export default function AIVerificationView() {
  const [selectedIncident, setSelectedIncident] = useState(INCIDENT_REPORTS[2]); // Nagpur 46.2°C flagged
  const [isVerifying, setIsVerifying] = useState(false);
  const [resolutionStatus, setResolutionStatus] = useState<string | null>(null);
  const [aiSynthesizing, setAiSynthesizing] = useState(false);
  const [synthesizedReport, setSynthesizedReport] = useState<string | null>(null);

  const handleResolve = (action: 'VERIFY' | 'REJECT') => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResolutionStatus(action === 'VERIFY' ? 'CONFIRMED_VERIFIED' : 'REJECTED_SENSOR_FAULT');
    }, 800);
  };

  const handleGenerateAiBrief = () => {
    setAiSynthesizing(true);
    setTimeout(() => {
      setAiSynthesizing(false);
      setSynthesizedReport(
        `AI METEOROLOGICAL SYNTHESIS (MODEL: NWIP-MET-v4.2-NEURAL):\n` +
        `• Convective Monsoon Surge over Central MP showing 112 mm/h peak cells in Indore. Sluice gate breach risk 94%.\n` +
        `• Squall line along Western Ghats propagating east-southeast at 42 km/h; hail damage to Nashik vineyard belts confirmed by Agri-IoT.\n` +
        `• Anomaly Resolution: Nagpur temperature report confirmed at 44.8°C ground level; 46.2°C sensor micro-heat-island bias corrected to within ±0.6°C tolerance.`
      );
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#253347] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
              AI VERIFICATION & ANOMALY RESOLUTION
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#06b6d4]/15 border border-[#06b6d4] text-[#06b6d4]">
              NEURAL INGESTION v4.2
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
            Multi-modal sensor cross-corroboration: Doppler radar dBZ + Satellite IR + Citizen Geo-Hashing
          </p>
        </div>

        <button
          onClick={handleGenerateAiBrief}
          disabled={aiSynthesizing}
          className="px-3 py-1.5 bg-[#06b6d4] hover:bg-[#38bdf8] text-[#101319] text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{aiSynthesizing ? 'SYNTHESIZING TELEMETRY...' : 'RUN AI SYNTHESIS'}</span>
        </button>
      </div>

      {/* Synthesized Brief Banner if generated */}
      {synthesizedReport && (
        <div className="bg-[#111827] border border-[#06b6d4] p-4 font-mono text-xs text-[#cbd5e1] space-y-2">
          <div className="flex items-center gap-2 text-[#06b6d4] font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>AI SYNTHESIZED METEOROLOGICAL INTELLIGENCE</span>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-[#f8fafc] bg-[#0b0e13] p-3 border border-[#253347]">
            {synthesizedReport}
          </pre>
        </div>
      )}

      {/* Main Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono">
        {/* Left: Suspect Queue */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#253347] p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs mb-3">
              <span className="font-bold text-[#f8fafc] uppercase">FLAGGED ANOMALIES QUEUE</span>
              <span className="text-[10px] text-[#ef4444] font-bold">1,247 PENDING</span>
            </div>

            <div className="space-y-2">
              {INCIDENT_REPORTS.filter((i) => i.status === 'flagged' || i.status === 'under_review').map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => {
                    setSelectedIncident(inc);
                    setResolutionStatus(null);
                  }}
                  className={`p-3 border cursor-pointer transition-colors ${
                    selectedIncident.id === inc.id
                      ? 'border-[#06b6d4] bg-[#162232]'
                      : 'border-[#253347] bg-[#0b0e13] hover:bg-[#161f2e]'
                  }`}
                >
                  <div className="flex justify-between text-[10px] text-[#64748b]">
                    <span>{inc.id}</span>
                    <span className="text-[#ef4444] font-bold">{inc.confidence}% CONF</span>
                  </div>
                  <div className="text-xs font-semibold text-[#f8fafc] mt-1">{inc.title}</div>
                  <div className="text-[11px] text-[#06b6d4] mt-1">{inc.location} • {inc.metricValue}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#253347] text-[10px] text-[#64748b]">
            Sensor calibration watchdog runs continuous Kalman-filter outlier rejection at 10 Hz.
          </div>
        </div>

        {/* Right: Detailed Machine Cross-Check Inspection */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#253347] p-5 space-y-4">
          <div className="flex justify-between items-start border-b border-[#253347] pb-3">
            <div>
              <div className="text-[10px] text-[#64748b] uppercase">TARGET INCIDENT TELEMETRY</div>
              <h2 className="text-base font-bold text-[#f8fafc] mt-0.5">{selectedIncident.title}</h2>
              <div className="text-xs text-[#94a3b8] mt-1">
                Coordinates: {selectedIncident.coordinates[0]}°N, {selectedIncident.coordinates[1]}°E • Sector: {selectedIncident.location}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#64748b] block">MEASURED VALUE</span>
              <span className="text-lg font-bold text-[#ff7a85]">{selectedIncident.metricValue}</span>
            </div>
          </div>

          {/* Cross-Corroboration Matrix */}
          <div className="space-y-3 text-xs">
            <span className="text-[10px] text-[#64748b] uppercase tracking-wider block">
              MULTI-SENSOR CROSS-CORROBORATION
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#0b0e13] border border-[#253347] p-3 space-y-1">
                <span className="text-[10px] text-[#64748b] block uppercase">INSAT-3DR Thermal IR</span>
                <span className="text-sm font-bold text-[#f8fafc]">44.8°C Surface</span>
                <span className="text-[10px] text-[#eab308] block">Deviation: +1.4°C</span>
              </div>

              <div className="bg-[#0b0e13] border border-[#253347] p-3 space-y-1">
                <span className="text-[10px] text-[#64748b] block uppercase">CPCB Ambient Station</span>
                <span className="text-sm font-bold text-[#f8fafc]">45.1°C Baseline</span>
                <span className="text-[10px] text-[#10b981] block">Confidence: 91% Match</span>
              </div>

              <div className="bg-[#0b0e13] border border-[#253347] p-3 space-y-1">
                <span className="text-[10px] text-[#64748b] block uppercase">Citizen Crowd Cluster</span>
                <span className="text-sm font-bold text-[#f8fafc]">14 Corroborations</span>
                <span className="text-[10px] text-[#06b6d4] block">Geo-Entropy: 0.12 (High)</span>
              </div>
            </div>

            {/* Neural Feature Weights */}
            <div className="bg-[#0b0e13] border border-[#253347] p-3 space-y-2">
              <span className="text-[10px] text-[#64748b] block uppercase">NEURAL MODEL FEATURE ATTRIBUTION</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between text-[#94a3b8]">
                  <span>Surface Micro-Climate Bias:</span>
                  <span className="text-[#f8fafc] font-bold">62% weight</span>
                </div>
                <div className="w-full bg-[#1e293b] h-1.5">
                  <div className="bg-[#06b6d4] h-full" style={{ width: '62%' }} />
                </div>

                <div className="flex justify-between text-[#94a3b8]">
                  <span>Regional Atmospheric Pressure Drift:</span>
                  <span className="text-[#f8fafc] font-bold">24% weight</span>
                </div>
                <div className="w-full bg-[#1e293b] h-1.5">
                  <div className="bg-[#38bdf8] h-full" style={{ width: '24%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Operator Action */}
          <div className="pt-3 border-t border-[#253347] flex items-center justify-between">
            {resolutionStatus ? (
              <div className="text-xs font-bold text-[#10b981] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>STATUS LOGGED: {resolutionStatus}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleResolve('VERIFY')}
                  disabled={isVerifying}
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-[#101319] text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ACCEPT & VERIFY INCIDENT</span>
                </button>

                <button
                  onClick={() => handleResolve('REJECT')}
                  disabled={isVerifying}
                  className="px-4 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-[#101319] text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>FLAG SENSOR ANOMALY / SPAM</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
