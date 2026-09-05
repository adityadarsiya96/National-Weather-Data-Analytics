import { useState } from 'react';
import { Download, Printer, Copy, Check, FileText, X, ShieldAlert } from 'lucide-react';
import { METRIC_SUMMARY, INCIDENT_REPORTS } from '../data/mockData';

interface ExportBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportBriefModal({ isOpen, onClose }: ExportBriefModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const briefText = `========================================================================
GOVERNMENT OF INDIA • MINISTRY OF HOME AFFAIRS / NDMA
NATIONAL CRISIS MANAGEMENT CELL • DISASTER TELEMETRY DIVISION
NATIONAL WEATHER INTELLIGENCE REPORT [NWIP V4.2]
CLASSIFICATION: RESTRICTED / OPERATIONAL DISPATCH
DATETIME: 05 SEP 2026 14:32 IST | DEFCON 3 (MONSOON SURGE WATCH)
========================================================================

1. EXECUTIVE TELEMETRY SUMMARY:
   • Total Ingested Reports (24h): ${METRIC_SUMMARY.totalReports.toLocaleString()} (+12.4% Vol)
   • Verified Active Incidents: ${METRIC_SUMMARY.verifiedReports.toLocaleString()} (74.1% Validation Ratio)
   • Flagged Sensor/Spam Anomalies: ${METRIC_SUMMARY.flaggedAnomalies.toLocaleString()} (5.02% Rejection)
   • Active Crisis Hotspots: ${METRIC_SUMMARY.activeDisasters} Events (${METRIC_SUMMARY.criticalCount} Critical Priority)
   • NDRF Battalions Staged / Mobilized: ${METRIC_SUMMARY.ndrfBattalionsStaged} Bns

2. HIGH-PRIORITY SECTOR READOUTS:
   [CRITICAL] Indore, Madhya Pradesh (WR-92831):
   - Inundation 3.8ft near Vijay Nagar junction.
   - Narmada sluice gates opened. 112 mm/hr localized rainfall.
   - Action: NDRF 11 Bn Staged (Bhopal).

   [HIGH] Guwahati, Assam (WR-92828):
   - Bharalu river overflow +0.65m above danger level.
   - Action: Brahmaputra Basin SDRF deployed.

   [ADVISORY] Nagpur, Maharashtra (WR-92821):
   - Extreme heatwave 46.2°C dry gust threshold exceedance.
   - Action: Anomaly cross-verification active.

3. STATE SURGE RADIALS:
   - Maharashtra: 4,821 reports (Squall line + Western Ghats)
   - Madhya Pradesh: 3,921 reports (Active Monsoon Surge)
   - Rajasthan: 3,102 reports
   - Gujarat: 2,817 reports
   - Assam: 2,421 reports (Brahmaputra basin overflow)
   - Odisha: 1,940 reports (Paradip maritime fog)

COMMANDANT IN CHARGE: Col. R. Sharma (NDRF Command • Admin)
TELEMETRY ENGINE: IMD S-Band Doppler Radar Composite + INSAT-3DR`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NWIP_INTELLIGENCE_BRIEF_05SEP2026_1432IST.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e13]/85 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#111827] border border-[#06b6d4] shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#101319] border-b border-[#253347]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#06b6d4]" />
            <span className="font-mono text-xs font-bold text-[#06b6d4] tracking-wider uppercase">
              OPERATIONAL SITUATION BRIEF • EXPORT DISPATCH
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-4 overflow-y-auto font-mono text-xs text-[#cbd5e1] space-y-3 bg-[#0b0e13] m-4 border border-[#253347]">
          <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-[#94a3b8] selection:bg-[#06b6d4] selection:text-[#101319]">
            {briefText}
          </pre>
        </div>

        {/* Action Controls */}
        <div className="px-4 py-3 bg-[#101319] border-t border-[#253347] flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-xs font-mono text-[#cbd5e1] border border-[#253347] flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY TELEX'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-xs font-mono text-[#cbd5e1] border border-[#253347] flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-[#06b6d4] hover:bg-[#38bdf8] text-[#101319] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD DISPATCH (.TXT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
