import { useState, useEffect } from 'react';
import { 
  Radio, 
  RotateCw, 
  Download, 
  Layers, 
  ChevronDown, 
  Plus, 
  Minus, 
  Crosshair, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  MapPin, 
  X, 
  Shield, 
  AlertTriangle,
  Wind,
  CloudRain,
  Flame,
  Zap,
  Eye
} from 'lucide-react';
import { 
  METRIC_SUMMARY, 
  INCIDENT_REPORTS, 
  CATEGORIES_BREAKDOWN, 
  STATE_INTENSITIES, 
  HOURLY_ACTIVITY_DATA 
} from '../data/mockData';
import { IncidentReport, WeatherCategory } from '../types/weather';

interface OverviewViewProps {
  onOpenExportModal: () => void;
  onOpenDeployModal: (incident: IncidentReport) => void;
  onNavigateToReports: () => void;
  selectedIncident: IncidentReport | null;
  onSelectIncident: (incident: IncidentReport | null) => void;
}

export default function OverviewView({
  onOpenExportModal,
  onOpenDeployModal,
  onNavigateToReports,
  selectedIncident,
  onSelectIncident
}: OverviewViewProps) {
  // Map Layer State
  const [activeLayer, setActiveLayer] = useState<'DOPPLER' | 'HEATMAP' | 'SATELLITE' | 'WIND' | 'RAINFALL'>('DOPPLER');
  const [selectedRegion, setSelectedRegion] = useState<string>('MADHYA PRADESH (ACTIVE SURGE)');
  const [clustersEnabled, setClustersEnabled] = useState<boolean>(true);
  const [streamFilter, setStreamFilter] = useState<'ALL' | 'CRITICAL' | 'VERIFIED'>('ALL');
  const [audioAlerts, setAudioAlerts] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [syncSeconds, setSyncSeconds] = useState<number>(3);
  const [cursorCoords, setCursorCoords] = useState<string>('LAT: 22°58\'14"N | LON: 78°57\'45"E [WGS84]');

  // Auto-sync ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncSeconds((prev) => (prev >= 15 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set initial selected pin to WR-92831 Indore as shown in screenshot
  useEffect(() => {
    if (!selectedIncident) {
      const defaultPin = INCIDENT_REPORTS.find((inc) => inc.id === 'WR-92831');
      if (defaultPin) onSelectIncident(defaultPin);
    }
  }, [selectedIncident, onSelectIncident]);

  // Stream incidents based on filter
  const filteredStream = INCIDENT_REPORTS.filter((inc) => {
    if (streamFilter === 'CRITICAL') return inc.severity === 'critical';
    if (streamFilter === 'VERIFIED') return inc.status === 'verified';
    return true;
  });

  // Map pins coordinates relative to SVG canvas
  const mapPins = [
    { id: 'WR-92831', label: 'INDORE', sub: '112MM/H [CRITICAL]', x: 380, y: 340, code: 'FL', color: '#ff7a85', isCritical: true, report: INCIDENT_REPORTS[0] },
    { id: 'WR-92782', label: 'BHOPAL', sub: '58 dBZ TS', x: 440, y: 310, code: 'TS', color: '#a855f7', report: INCIDENT_REPORTS[6] },
    { id: 'WR-92770', label: 'JABALPUR', sub: '96 mm HR', x: 530, y: 330, code: 'FL', color: '#ff7a85', report: INCIDENT_REPORTS[7] },
    { id: 'WR-92761', label: 'GWALIOR', sub: '45.8°C HW', x: 420, y: 220, code: 'HW', color: '#eab308', report: INCIDENT_REPORTS[8] },
    { id: 'WR-92821', label: 'NAGPUR', sub: '46.2°C HW', x: 430, y: 410, code: 'HR', color: '#f97316', report: INCIDENT_REPORTS[2] },
    { id: 'WR-92809', label: 'COASTAL', sub: 'PARADIP CY', x: 650, y: 390, code: 'CY', color: '#38bdf8', report: INCIDENT_REPORTS[4] },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none">
      {/* Top Banner / Title & Tactical Controls */}
      <div className="px-5 py-3 border-b border-[#253347] flex flex-wrap items-center justify-between gap-3 bg-[#101319] shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
              NATIONAL WEATHER INTELLIGENCE
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#06b6d4]/15 border border-[#06b6d4] text-[#06b6d4] tracking-wider">
              LIVE V4.2
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Real-time monitoring and AI-synthesized meteorological telemetry across India
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* DEFCON Status Pill */}
          <div className="flex items-center gap-2 bg-[#111827] border border-[#253347] px-3 py-1 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse" />
            <span className="text-[#f8fafc] font-bold tracking-wider text-[11px]">
              DEFCON 3 <span className="text-[#64748b]">•</span> MONSOON SURGE WATCH
            </span>
          </div>

          {/* Sync status */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#94a3b8]">
            <RotateCw className="w-3.5 h-3.5 text-[#06b6d4] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Last synced <span className="text-[#cbd5e1] font-semibold">{syncSeconds}s ago</span></span>
          </div>

          {/* Export Brief Button */}
          <button
            onClick={onOpenExportModal}
            className="h-8 bg-[#06b6d4] hover:bg-[#38bdf8] text-[#101319] px-3 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>EXPORT BRIEF</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Tiles Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 border-b border-[#253347] bg-[#0b0e13]">
        {/* Tile 1: TOTAL REPORTS */}
        <div className="bg-[#111827] border border-[#253347] p-3 flex flex-col justify-between hover:border-[#06b6d4]/50 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#94a3b8] tracking-wider uppercase font-semibold">
                TOTAL REPORTS
              </span>
              <span className="text-[11px] font-mono text-[#06b6d4] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                +12.4%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl lg:text-3xl font-mono font-bold text-[#f8fafc] tracking-tight">
                24,851
              </span>
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">
                VOL / 24H
              </span>
            </div>
          </div>

          {/* Sparkline Wave (Cyan) */}
          <div className="my-2 h-7 w-full overflow-hidden">
            <svg viewBox="0 0 200 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cyanSpark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,25 Q30,12 60,22 T120,15 T160,28 T200,8 L200,40 L0,40 Z"
                fill="url(#cyanSpark)"
              />
              <path
                d="M0,25 Q30,12 60,22 T120,15 T160,28 T200,8"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] pt-1 border-t border-[#1e293b]">
            <span>IMD: <strong className="text-[#cbd5e1]">8,420</strong></span>
            <span>Crowdsourced: <strong className="text-[#cbd5e1]">16,431</strong></span>
          </div>
        </div>

        {/* Tile 2: VERIFIED REPORTS */}
        <div className="bg-[#111827] border border-[#253347] p-3 flex flex-col justify-between hover:border-[#06b6d4]/50 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#94a3b8] tracking-wider uppercase font-semibold">
                VERIFIED REPORTS
              </span>
              <span className="text-[11px] font-mono text-[#06b6d4] font-bold">
                +5.2% ACC
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl lg:text-3xl font-mono font-bold text-[#f8fafc] tracking-tight">
                18,420
              </span>
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">
                74.1% RATIO
              </span>
            </div>
          </div>

          {/* Segmented / Solid Progress Bar */}
          <div className="my-3">
            <div className="w-full bg-[#1e293b] h-2 flex overflow-hidden">
              <div className="bg-[#06b6d4] h-full" style={{ width: '74.1%' }} />
              <div className="bg-[#1e293b] h-full" style={{ width: '25.9%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] pt-1 border-t border-[#1e293b]">
            <span>Machine Conf: <strong className="text-[#cbd5e1]">94.8%</strong></span>
            <span>Human Ops: <strong className="text-[#cbd5e1]">3,124</strong></span>
          </div>
        </div>

        {/* Tile 3: FLAGGED / ANOMALY */}
        <div className="bg-[#111827] border border-[#253347] p-3 flex flex-col justify-between hover:border-[#ef4444]/50 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#94a3b8] tracking-wider uppercase font-semibold">
                FLAGGED / ANOMALY
              </span>
              <span className="text-[11px] font-mono text-[#ff7a85] font-bold">
                -1.8% RES TIME
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl lg:text-3xl font-mono font-bold text-[#f8fafc] tracking-tight">
                1,247
              </span>
              <span className="text-[10px] font-mono text-[#ff7a85] uppercase tracking-wider">
                5.02% REJECTED
              </span>
            </div>
          </div>

          {/* Sparkline Wave (Coral/Red) */}
          <div className="my-2 h-7 w-full overflow-hidden">
            <svg viewBox="0 0 200 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="redSpark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff7a85" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff7a85" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,18 Q30,26 60,14 T120,24 T160,12 T200,28 L200,40 L0,40 Z"
                fill="url(#redSpark)"
              />
              <path
                d="M0,18 Q30,26 60,14 T120,24 T160,12 T200,28"
                fill="none"
                stroke="#ff7a85"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] pt-1 border-t border-[#1e293b]">
            <span>Spam/Bot: <strong className="text-[#cbd5e1]">812</strong></span>
            <span>Sensor Fault: <strong className="text-[#cbd5e1]">435</strong></span>
          </div>
        </div>

        {/* Tile 4: ACTIVE DISASTER EVENTS */}
        <div className="bg-[#111827] border border-[#253347] p-3 flex flex-col justify-between hover:border-[#ef4444]/50 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#94a3b8] tracking-wider uppercase font-semibold">
                ACTIVE DISASTER EVENTS
              </span>
              <span className="text-[11px] font-mono text-[#ff7a85] font-bold">
                +8.2% SURGE
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl lg:text-3xl font-mono font-bold text-[#f8fafc] tracking-tight">
                326
              </span>
              <span className="text-[10px] font-mono text-[#ff7a85] font-bold uppercase tracking-wider">
                42 CRITICAL
              </span>
            </div>
          </div>

          {/* Segmented Color Blocks */}
          <div className="my-3 flex items-center gap-1">
            <div className="flex-1 bg-[#1e293b] h-3" />
            <div className="flex-1 bg-[#253347] h-3" />
            <div className="flex-1 bg-[#334155] h-3" />
            <div className="flex-1 bg-[#38bdf8] h-3" />
            <div className="flex-1 bg-[#ff7a85] h-3" />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] pt-1 border-t border-[#1e293b]">
            <span>NDRF Staged: <strong className="text-[#cbd5e1]">42 Bns</strong></span>
            <span>SDRF Alerted: <strong className="text-[#cbd5e1]">118</strong></span>
          </div>
        </div>
      </div>

      {/* Main Center Section: Center GIS Map + Right Live Stream */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#253347]">
        {/* Left/Center Column (8 cols): Interactive Doppler GIS Canvas */}
        <div className="lg:col-span-8 flex flex-col border-r border-[#253347] bg-[#0b0e13]">
          {/* Map Toolbar */}
          <div className="px-4 py-2 border-b border-[#253347] bg-[#111827] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#64748b] uppercase text-[11px] font-semibold">LAYERS:</span>
              <button
                onClick={() => setActiveLayer('DOPPLER')}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                  activeLayer === 'DOPPLER'
                    ? 'bg-[#06b6d4] text-[#101319]'
                    : 'bg-[#101319] text-[#94a3b8] hover:text-[#f8fafc] border border-[#253347]'
                }`}
              >
                <Radio className="w-3 h-3" />
                <span>DOPPLER RADAR</span>
              </button>

              <button
                onClick={() => setActiveLayer('HEATMAP')}
                className={`px-2.5 py-1 text-[11px] font-mono cursor-pointer transition-colors ${
                  activeLayer === 'HEATMAP'
                    ? 'bg-[#06b6d4] text-[#101319] font-bold'
                    : 'bg-[#101319] text-[#94a3b8] hover:text-[#f8fafc] border border-[#253347]'
                }`}
              >
                HEATMAP
              </button>

              <button
                onClick={() => setActiveLayer('SATELLITE')}
                className={`px-2.5 py-1 text-[11px] font-mono cursor-pointer transition-colors ${
                  activeLayer === 'SATELLITE'
                    ? 'bg-[#06b6d4] text-[#101319] font-bold'
                    : 'bg-[#101319] text-[#94a3b8] hover:text-[#f8fafc] border border-[#253347]'
                }`}
              >
                SATELLITE IR
              </button>

              <button
                onClick={() => setActiveLayer('WIND')}
                className={`px-2.5 py-1 text-[11px] font-mono cursor-pointer transition-colors ${
                  activeLayer === 'WIND'
                    ? 'bg-[#06b6d4] text-[#101319] font-bold'
                    : 'bg-[#101319] text-[#94a3b8] hover:text-[#f8fafc] border border-[#253347]'
                }`}
              >
                WIND VECTORS
              </button>

              <button
                onClick={() => setActiveLayer('RAINFALL')}
                className={`px-2.5 py-1 text-[11px] font-mono cursor-pointer transition-colors ${
                  activeLayer === 'RAINFALL'
                    ? 'bg-[#06b6d4] text-[#101319] font-bold'
                    : 'bg-[#101319] text-[#94a3b8] hover:text-[#f8fafc] border border-[#253347]'
                }`}
              >
                RAINFALL ACC.
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Region Selector */}
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-[#101319] border border-[#253347] text-[#cbd5e1] text-[11px] font-mono px-2 py-1 pr-6 cursor-pointer focus:outline-hidden appearance-none"
                >
                  <option value="MADHYA PRADESH (ACTIVE SURGE)">MADHYA PRADESH (ACTIVE SURGE)</option>
                  <option value="MAHARASHTRA COASTAL">MAHARASHTRA COASTAL</option>
                  <option value="ASSAM BRAHMAPUTRA">ASSAM BRAHMAPUTRA</option>
                  <option value="ODISHA CYCLONE TRACK">ODISHA CYCLONE TRACK</option>
                  <option value="ALL INDIA CRISIS GRID">ALL INDIA CRISIS GRID</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#64748b] absolute right-1.5 top-2 pointer-events-none" />
              </div>

              {/* Clusters Toggle */}
              <button
                onClick={() => setClustersEnabled(!clustersEnabled)}
                className={`px-2 py-1 text-[11px] font-mono border border-[#253347] cursor-pointer transition-colors ${
                  clustersEnabled ? 'bg-[#1e293b] text-[#06b6d4]' : 'bg-[#101319] text-[#64748b]'
                }`}
              >
                ⁘ CLUSTERS: {clustersEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Sub-bar: Coordinates & Composite scan elevation */}
          <div className="px-4 py-1.5 bg-[#0b0e13] border-b border-[#253347] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
            <span className="text-[#94a3b8]">{cursorCoords}</span>
            <span className="text-[#06b6d4]">DOPPLER COMPOSITE • SCAN: 3.2° ELEV</span>
          </div>

          {/* GIS Map Viewport Container */}
          <div 
            className="relative flex-1 min-h-[460px] bg-[#0c1017] overflow-hidden cursor-crosshair"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const xNorm = (e.clientX - rect.left) / rect.width;
              const yNorm = (e.clientY - rect.top) / rect.height;
              const lat = (25.5 - yNorm * 6.5).toFixed(4);
              const lon = (74.0 + xNorm * 8.5).toFixed(4);
              setCursorCoords(`LAT: ${lat}°N | LON: ${lon}°E [WGS84]`);
            }}
          >
            {/* SVG Background: Graticule Grid, Radar Sweeps, Isobars & Doppler Reflectivity Polygons */}
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Doppler Radar Sweep Gradient */}
                <radialGradient id="radarScanCone" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>

                {/* Storm Reflectivity Gradients */}
                <radialGradient id="indoreCell" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
                  <stop offset="35%" stopColor="#f97316" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="bhopalCell" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                  <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="eastFront" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Lines (Graticules) */}
              <g stroke="#1a2434" strokeWidth="0.8">
                <line x1="100" y1="0" x2="100" y2="500" />
                <line x1="250" y1="0" x2="250" y2="500" />
                <line x1="400" y1="0" x2="400" y2="500" />
                <line x1="550" y1="0" x2="550" y2="500" />
                <line x1="700" y1="0" x2="700" y2="500" />

                <line x1="0" y1="100" x2="800" y2="100" />
                <line x1="0" y1="220" x2="800" y2="220" />
                <line x1="0" y1="340" x2="800" y2="340" />
                <line x1="0" y1="440" x2="800" y2="440" />
              </g>

              {/* State/Terrain Outline Polygons (Central India / MP Boundary stylization) */}
              <path
                d="M180,180 L280,140 L380,150 L480,110 L580,140 L660,200 L720,290 L680,380 L590,440 L450,470 L340,450 L260,390 L210,320 Z"
                fill="#111722"
                stroke="#253347"
                strokeWidth="1.5"
                opacity="0.85"
              />

              <path
                d="M310,230 L390,210 L480,240 L530,290 L500,380 L420,410 L350,380 L310,300 Z"
                fill="#141d2d"
                stroke="#06b6d4"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.7"
              />

              {/* Isobar Atmospheric Pressure Curves */}
              <g fill="none" stroke="#253a52" strokeWidth="1" strokeDasharray="4 4" opacity="0.6">
                <path d="M120,380 Q320,320 540,360 T760,260" />
                <path d="M140,340 Q350,280 560,320 T780,220" />
                <path d="M180,300 Q390,240 600,280 T800,180" />
              </g>

              {/* Doppler Radar Range Concentric Rings (Centered at Radar S-Band station Bhopal: 440, 310) */}
              <g stroke="#06b6d4" strokeWidth="0.8" opacity="0.25" fill="none">
                <circle cx="440" cy="310" r="70" />
                <circle cx="440" cy="310" r="140" />
                <circle cx="440" cy="310" r="210" />
                <circle cx="440" cy="310" r="280" />
                {/* Radial cross axes */}
                <line x1="440" y1="30" x2="440" y2="490" strokeDasharray="2 4" />
                <line x1="160" y1="310" x2="720" y2="310" strokeDasharray="2 4" />
              </g>

              {/* Rotating Doppler Radar Sweep Beam */}
              <g className="animate-radar-sweep origin-[440px_310px]">
                <path
                  d="M440,310 L680,220 A280,280 0 0,0 620,120 Z"
                  fill="url(#radarScanCone)"
                />
                <line x1="440" y1="310" x2="680" y2="220" stroke="#06b6d4" strokeWidth="1.5" opacity="0.8" />
              </g>

              {/* Doppler Reflectivity Cloud Polygons (Precipitation Clustered Areas) */}
              <g>
                {/* Eastern Convergence Zone */}
                <polygon
                  points="510,240 620,200 660,280 580,310 520,280"
                  fill="url(#eastFront)"
                />
                <polygon
                  points="540,250 610,220 630,270 560,290"
                  fill="#06b6d4"
                  opacity="0.35"
                />

                {/* Bhopal Convective Core */}
                <circle cx="440" cy="310" r="45" fill="url(#bhopalCell)" />
                <circle cx="440" cy="310" r="22" fill="#a855f7" opacity="0.6" />

                {/* Indore High Inundation Flash Flood Core */}
                <polygon
                  points="340,310 400,290 420,360 370,390 330,350"
                  fill="url(#indoreCell)"
                />
                <circle cx="380" cy="340" r="32" fill="#ef4444" opacity="0.5" />
                <circle cx="380" cy="340" r="16" fill="#f97316" opacity="0.7" />
              </g>

              {/* Wind Vector Arrows (Animated drifts) */}
              <g stroke="#38bdf8" strokeWidth="1.2" opacity="0.5" fill="none">
                <path d="M260,370 L290,360 M286,355 L290,360 L284,364" />
                <path d="M310,400 L340,390 M336,385 L340,390 L334,394" />
                <path d="M410,440 L440,430 M436,425 L440,430 L434,434" />
                <path d="M470,390 L500,370 M496,365 L500,370 L494,374" />
                <path d="M530,340 L560,320 M556,315 L560,320 L554,324" />
              </g>

              {/* Cluster Connection Hull Lines */}
              {clustersEnabled && (
                <path
                  d="M380,340 L440,310 L530,330 L430,410 Z"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.4"
                />
              )}
            </svg>

            {/* Interactive Pins on Map */}
            {mapPins.map((pin) => {
              const isSelected = selectedIncident?.id === pin.id;

              return (
                <div
                  key={pin.id}
                  onClick={() => onSelectIncident(pin.report)}
                  style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                >
                  {/* Outer Pulsing Glow */}
                  {pin.isCritical && (
                    <div className="absolute -inset-2 rounded-full border border-[#ef4444] animate-ping opacity-60 pointer-events-none" />
                  )}

                  {/* Marker Circle */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center font-mono text-[10px] font-bold border transition-all ${
                      isSelected
                        ? 'scale-115 shadow-[0_0_12px_#06b6d4] ring-2 ring-[#06b6d4]'
                        : 'hover:scale-110'
                    }`}
                    style={{
                      backgroundColor: `${pin.color}25`,
                      borderColor: pin.color,
                      color: pin.color
                    }}
                  >
                    {pin.code}
                  </div>

                  {/* Pulsing Tag for Indore Critical (Matches Screenshot exactly!) */}
                  {pin.id === 'WR-92831' && (
                    <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#111827]/95 border border-[#ef4444] px-2 py-0.5 flex items-center gap-1.5 shadow-[0_0_10px_rgba(239,68,68,0.35)]">
                      <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-[#ef4444] uppercase tracking-wider">
                        INDORE: 112MM/H [CRITICAL]
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Selected Pin Popup Dialog (INDORE FLASH FLOOD WR-92831) - Matches Screenshot Exactly! */}
            {selectedIncident && selectedIncident.id === 'WR-92831' && (
              <div 
                style={{ left: '220px', top: '140px' }}
                className="absolute z-30 w-80 sm:w-96 bg-[#111827]/95 border border-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.3)] select-none backdrop-blur-xs"
              >
                {/* Popup Header */}
                <div className="px-3 py-2 bg-[#101319] border-b border-[#253347] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-[#ef4444] text-[#101319] px-1.5 py-0.2 tracking-wider">
                      CRITICAL PIN
                    </span>
                    <span className="text-[10px] font-mono text-[#cbd5e1] font-bold">
                      {selectedIncident.id}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectIncident(null)}
                    className="text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Popup Content */}
                <div className="p-3 space-y-2.5 font-mono">
                  <div>
                    <h3 className="text-xs font-bold text-[#f8fafc]">
                      {selectedIncident.title}
                    </h3>
                    <p className="text-[11px] text-[#94a3b8] font-sans leading-snug mt-1">
                      {selectedIncident.details}
                    </p>
                  </div>

                  {/* 3 Metric Boxes */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#0b0e13] border border-[#253347] p-2 text-center">
                      <span className="text-[9px] text-[#64748b] uppercase block">CONFIDENCE</span>
                      <span className="text-sm font-bold text-[#06b6d4]">
                        {selectedIncident.confidence}%
                      </span>
                    </div>

                    <div className="bg-[#0b0e13] border border-[#253347] p-2 text-center">
                      <span className="text-[9px] text-[#64748b] uppercase block">REPORTS</span>
                      <span className="text-sm font-bold text-[#f8fafc]">
                        {selectedIncident.reportsCount}
                      </span>
                    </div>

                    <div className="bg-[#0b0e13] border border-[#253347] p-2 text-center">
                      <span className="text-[9px] text-[#64748b] uppercase block">RAINFALL</span>
                      <span className="text-sm font-bold text-[#ff7a85]">
                        {selectedIncident.rainfallMm}
                        <span className="text-[9px] text-[#94a3b8] ml-0.5">mm</span>
                      </span>
                    </div>
                  </div>

                  {/* Battalion Staged & Deploy Button */}
                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between">
                    <span className="text-[10px] text-[#94a3b8]">
                      {selectedIncident.battalionAssigned}
                    </span>
                    <button
                      onClick={() => onOpenDeployModal(selectedIncident)}
                      className="px-3 py-1 bg-[#06b6d4] hover:bg-[#38bdf8] text-[#101319] text-[10px] font-mono font-bold tracking-wider uppercase cursor-pointer"
                    >
                      DEPLOY TASK FORCE
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Right Map Zoom & Reset Controls */}
            <div className="absolute right-4 bottom-4 flex flex-col gap-1 z-20 font-mono">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.5))}
                className="w-7 h-7 bg-[#111827] hover:bg-[#1e293b] border border-[#253347] text-[#cbd5e1] flex items-center justify-center cursor-pointer"
                title="Zoom in"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="w-7 h-7 bg-[#111827] hover:bg-[#1e293b] border border-[#253347] text-[#cbd5e1] flex items-center justify-center cursor-pointer"
                title="Zoom out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="w-7 h-7 bg-[#111827] hover:bg-[#1e293b] border border-[#253347] text-[#06b6d4] flex items-center justify-center cursor-pointer"
                title="Recenter radar"
              >
                <Crosshair className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Map Legend Bar */}
          <div className="px-4 py-2 bg-[#111827] border-t border-[#253347] flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#ff7a85]" />
              <span className="text-[#cbd5e1]">Flood <strong className="text-[#f8fafc]">(42)</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#f97316]" />
              <span className="text-[#cbd5e1]">Heavy Rain <strong className="text-[#f8fafc]">(118)</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#a855f7]" />
              <span className="text-[#cbd5e1]">Thunderstorm <strong className="text-[#f8fafc]">(74)</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#eab308]" />
              <span className="text-[#cbd5e1]">Heatwave <strong className="text-[#f8fafc]">(38)</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#38bdf8]" />
              <span className="text-[#cbd5e1]">High Wind / Cyclone <strong className="text-[#f8fafc]">(54)</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): LIVE INCIDENT STREAM */}
        <div className="lg:col-span-4 flex flex-col bg-[#111827]">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-[#253347] bg-[#111827] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#06b6d4] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#f8fafc] tracking-wider uppercase">
                LIVE INCIDENT STREAM
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
              <button
                onClick={() => setAudioAlerts(!audioAlerts)}
                className="text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
                title={audioAlerts ? 'Mute alert chime' : 'Enable alert chime'}
              >
                {audioAlerts ? <Volume2 className="w-3.5 h-3.5 text-[#06b6d4]" /> : <VolumeX className="w-3.5 h-3.5 text-[#64748b]" />}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="px-3 py-1.5 border-b border-[#253347] bg-[#0b0e13] flex items-center gap-2 text-[10px] font-mono">
            <button
              onClick={() => setStreamFilter('ALL')}
              className={`px-2.5 py-0.5 uppercase cursor-pointer ${
                streamFilter === 'ALL'
                  ? 'bg-[#1e293b] text-[#06b6d4] font-bold border border-[#06b6d4]/40'
                  : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              ALL (24.8K)
            </button>

            <button
              onClick={() => setStreamFilter('CRITICAL')}
              className={`px-2.5 py-0.5 uppercase cursor-pointer ${
                streamFilter === 'CRITICAL'
                  ? 'bg-[#ef4444]/20 text-[#ef4444] font-bold border border-[#ef4444]'
                  : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              CRITICAL (42)
            </button>

            <button
              onClick={() => setStreamFilter('VERIFIED')}
              className={`px-2.5 py-0.5 uppercase cursor-pointer ${
                streamFilter === 'VERIFIED'
                  ? 'bg-[#10b981]/20 text-[#10b981] font-bold border border-[#10b981]'
                  : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              VERIFIED (18K)
            </button>
          </div>

          {/* Stream Cards List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1e293b] p-2 space-y-1.5 max-h-[480px]">
            {filteredStream.map((report) => (
              <div
                key={report.id}
                onClick={() => onSelectIncident(report)}
                className={`p-2.5 bg-[#0b0e13] hover:bg-[#161f2e] border cursor-pointer transition-all ${
                  selectedIncident?.id === report.id
                    ? 'border-[#06b6d4] bg-[#161f2e]'
                    : 'border-[#253347]'
                }`}
              >
                {/* Card Top: Verification Badge + Timestamp */}
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={`px-1.5 py-0.2 font-semibold ${
                    report.status === 'verified'
                      ? 'text-[#10b981] bg-[#10b981]/10'
                      : report.status === 'under_review'
                      ? 'text-[#eab308] bg-[#eab308]/10'
                      : 'text-[#ef4444] bg-[#ef4444]/10'
                  }`}>
                    {report.status === 'verified' ? `VERIFIED (${report.confidence}% CONF)` :
                     report.status === 'under_review' ? `UNDER REVIEW (${report.confidence}%)` :
                     `FLAGGED (${report.confidence}% CONF)`}
                  </span>
                  <span className="text-[#64748b]">{report.timeAgo}</span>
                </div>

                {/* Card Title */}
                <h4 className="text-xs font-semibold text-[#f8fafc] leading-tight hover:text-[#06b6d4]">
                  {report.title}
                </h4>

                {/* Location & Metric */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] mt-1.5">
                  <span className="flex items-center gap-1 text-[#cbd5e1]">
                    <MapPin className="w-3 h-3 text-[#64748b]" />
                    {report.location}
                  </span>
                  <span className={`font-bold ${
                    report.severity === 'critical' ? 'text-[#ff7a85]' :
                    report.category === 'Thunderstorm' ? 'text-[#38bdf8]' : 'text-[#eab308]'
                  }`}>
                    {report.metricValue}
                  </span>
                </div>

                {/* Source & Department Tag */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b] mt-1.5 pt-1 border-t border-[#1e293b]">
                  <span className="truncate max-w-[180px]">{report.source}</span>
                  <span className="px-1.5 py-0.2 bg-[#1e293b] text-[#cbd5e1] font-semibold">
                    {report.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action: VIEW ALL IN GRID */}
          <div className="p-2.5 bg-[#101319] border-t border-[#253347]">
            <button
              onClick={onNavigateToReports}
              className="w-full py-2 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#101319] text-[#06b6d4] text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors border border-[#253347]"
            >
              <span>VIEW ALL 24,851 REPORTS IN GRID</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Analytical Deck (3 Cards across) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-4 bg-[#0b0e13]">
        {/* Card 1: EVENTS BY CATEGORY */}
        <div className="bg-[#111827] border border-[#253347] p-3.5">
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span className="font-bold text-[#f8fafc] uppercase tracking-wider">
              EVENTS BY CATEGORY
            </span>
            <span className="text-[#94a3b8] font-bold">326 TOTAL</span>
          </div>

          {/* Horizontal multi-color segmented progress bar */}
          <div className="w-full h-3 flex overflow-hidden mb-3">
            {CATEGORIES_BREAKDOWN.map((cat, idx) => (
              <div
                key={idx}
                style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                className="h-full"
                title={`${cat.category}: ${cat.percentage}% (${cat.count} events)`}
              />
            ))}
          </div>

          {/* Category breakdown table / list */}
          <div className="space-y-1.5 font-mono text-[11px]">
            {CATEGORIES_BREAKDOWN.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5" style={{ backgroundColor: cat.color }} />
                  <span>{cat.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#f8fafc] mr-2">{cat.percentage}%</span>
                  <span className="text-[#64748b]">({cat.count} events)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: REPORT ACTIVITY (24H WAVE) */}
        <div className="bg-[#111827] border border-[#253347] p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="font-bold text-[#f8fafc] uppercase tracking-wider">
              REPORT ACTIVITY (24H WAVE)
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-[#06b6d4]">
                <span className="w-2 h-0.5 bg-[#06b6d4]" /> Inflow
              </span>
              <span className="flex items-center gap-1 text-[#38bdf8]">
                <span className="w-2 h-0.5 bg-[#38bdf8]" /> Verified
              </span>
            </div>
          </div>

          {/* SVG Wave Chart with Peak Tag */}
          <div className="relative my-2 h-24 w-full">
            {/* Peak label tag */}
            <div className="absolute right-14 top-0 bg-[#0b0e13] border border-[#06b6d4] px-1.5 py-0.5 text-[9px] font-mono text-[#06b6d4] font-bold">
              14:00 PEAK (1.9k/h)
            </div>

            <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveFillInflow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#1e293b" strokeDasharray="2 4" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#1e293b" strokeDasharray="2 4" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="#1e293b" />

              {/* Inflow Wave (Cyan) */}
              <path
                d="M0,75 Q60,78 120,65 T240,40 T300,12 T340,35 T400,60 L400,90 L0,90 Z"
                fill="url(#waveFillInflow)"
              />
              <path
                d="M0,75 Q60,78 120,65 T240,40 T300,12 T340,35 T400,60"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
              />

              {/* Verified Wave (Light Sky Blue) */}
              <path
                d="M0,82 Q60,84 120,72 T240,50 T300,24 T340,46 T400,68"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Peak Marker Dot */}
              <circle cx="300" cy="12" r="3" fill="#06b6d4" stroke="#f8fafc" strokeWidth="1" />
            </svg>
          </div>

          {/* Time markers on X-Axis */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b] pt-1 border-t border-[#1e293b]">
            <span>00:00<br/><span className="text-[8px]">IST</span></span>
            <span>06:00<br/><span className="text-[8px]">IST</span></span>
            <span>12:00<br/><span className="text-[8px]">IST</span></span>
            <span className="text-[#06b6d4] font-bold">14:00<br/><span className="text-[8px]">(NOW)</span></span>
            <span>18:00<br/><span className="text-[8px]">EST</span></span>
            <span>23:59<br/><span className="text-[8px]">IST</span></span>
          </div>
        </div>

        {/* Card 3: STATE-WISE INTENSITY */}
        <div className="bg-[#111827] border border-[#253347] p-3.5">
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span className="font-bold text-[#f8fafc] uppercase tracking-wider">
              STATE-WISE INTENSITY
            </span>
            <span className="text-[#94a3b8] font-bold">TOP 6 RADIALS</span>
          </div>

          {/* Ranked Bars */}
          <div className="space-y-2 font-mono text-[11px]">
            {STATE_INTENSITIES.map((st) => (
              <div key={st.rank} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#cbd5e1]">
                    {st.rank}. {st.state}
                  </span>
                  <span className="font-bold text-[#f8fafc]">
                    {st.reports.toLocaleString()} rpts {st.isSurge && <span className="text-[#ff7a85] text-[10px] font-bold">(Surge)</span>}
                  </span>
                </div>

                <div className="w-full bg-[#1e293b] h-1.5 overflow-hidden">
                  <div
                    style={{ width: `${st.percentage}%`, backgroundColor: st.color }}
                    className="h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
