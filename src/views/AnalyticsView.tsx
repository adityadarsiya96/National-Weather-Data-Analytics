import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Calendar, 
  PieChart, 
  Filter, 
  Download 
} from 'lucide-react';
import { METRIC_SUMMARY, STATE_INTENSITIES, CATEGORIES_BREAKDOWN } from '../data/mockData';

export default function AnalyticsView() {
  const [selectedRange, setSelectedRange] = useState('24H');

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#253347] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
              METEOROLOGICAL ANALYTICS & ANOMALY INTELLIGENCE
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#06b6d4]/15 border border-[#06b6d4] text-[#06b6d4]">
              PAN-INDIA COMPOSITE
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
            Statistical regression, false-positive anomaly matrices, and machine verification ratios
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {['6H', '12H', '24H', '7D', '30D'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                selectedRange === range
                  ? 'bg-[#06b6d4] text-[#101319] font-bold'
                  : 'bg-[#111827] text-[#94a3b8] hover:text-[#f8fafc] border border-[#253347]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Analytical KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="bg-[#111827] border border-[#253347] p-4">
          <div className="text-[11px] text-[#64748b] uppercase tracking-wider">
            Machine Learning Ingestion Rate
          </div>
          <div className="text-3xl font-bold text-[#f8fafc] mt-1">94.8%</div>
          <div className="text-xs text-[#10b981] mt-1">
            +3.4% precision lift vs manual human review
          </div>
        </div>

        <div className="bg-[#111827] border border-[#253347] p-4">
          <div className="text-[11px] text-[#64748b] uppercase tracking-wider">
            Average Anomaly Resolution Time
          </div>
          <div className="text-3xl font-bold text-[#06b6d4] mt-1">1.8 Min</div>
          <div className="text-xs text-[#94a3b8] mt-1">
            Down from 8.5m in v3.8 deployment
          </div>
        </div>

        <div className="bg-[#111827] border border-[#253347] p-4">
          <div className="text-[11px] text-[#64748b] uppercase tracking-wider">
            Total Telemetry Events Logged
          </div>
          <div className="text-3xl font-bold text-[#ff7a85] mt-1">482,910</div>
          <div className="text-xs text-[#cbd5e1] mt-1">
            Across 14,200 Agri-IoT nodes & 28 DWR radars
          </div>
        </div>
      </div>

      {/* Main Charts Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rainfall & Volume Curve */}
        <div className="bg-[#111827] border border-[#253347] p-4 flex flex-col justify-between font-mono">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#f8fafc] uppercase tracking-wider">
              PRECIPITATION & INFLOW PEAKS (PAST 24H)
            </span>
            <span className="text-[10px] text-[#06b6d4]">METRIC: MM/HR ACCUMULATION</span>
          </div>

          <div className="h-48 w-full">
            <svg viewBox="0 0 500 160" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="500" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="3 3" />

              <path
                d="M0,130 Q80,140 140,110 T260,70 T350,20 T420,60 T500,100 L500,160 L0,160 Z"
                fill="url(#rainGrad)"
              />
              <path
                d="M0,130 Q80,140 140,110 T260,70 T350,20 T420,60 T500,100"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] text-[#64748b] pt-2 border-t border-[#1e293b]">
            <span>00:00 (18 mm/h)</span>
            <span>06:00 (32 mm/h)</span>
            <span>12:00 (78 mm/h)</span>
            <span className="text-[#06b6d4] font-bold">14:00 (112 mm/h INDORE)</span>
            <span>18:00 (ESTIMATED)</span>
          </div>
        </div>

        {/* Anomaly Rejection Classification */}
        <div className="bg-[#111827] border border-[#253347] p-4 flex flex-col justify-between font-mono">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#f8fafc] uppercase tracking-wider">
              ANOMALY REJECTION CLASSIFICATION
            </span>
            <span className="text-[10px] text-[#ef4444]">1,247 REJECTED (5.02%)</span>
          </div>

          <div className="space-y-3 my-2 text-xs">
            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1 text-[11px]">
                <span>Spam & Bot Geo-Spoofing:</span>
                <span className="text-[#ef4444] font-bold">812 events (65.1%)</span>
              </div>
              <div className="w-full bg-[#1e293b] h-2">
                <div className="bg-[#ef4444] h-full" style={{ width: '65.1%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1 text-[11px]">
                <span>Sensor Drift / Calibration Fault:</span>
                <span className="text-[#f97316] font-bold">435 events (34.9%)</span>
              </div>
              <div className="w-full bg-[#1e293b] h-2">
                <div className="bg-[#f97316] h-full" style={{ width: '34.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94a3b8] mb-1 text-[11px]">
                <span>Duplicate Incident Clustered Merges:</span>
                <span className="text-[#06b6d4] font-bold">3,812 merged</span>
              </div>
              <div className="w-full bg-[#1e293b] h-2">
                <div className="bg-[#06b6d4] h-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[#0b0e13] border border-[#253347] text-[10px] text-[#94a3b8]">
            AI Guardrail: Telemetry exceeding 3.5σ statistical deviation from neighboring radar bins is flagged for human corroboration within 120 seconds.
          </div>
        </div>
      </div>
    </div>
  );
}
