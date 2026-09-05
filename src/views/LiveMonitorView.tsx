import { useState, useEffect } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Maximize2, 
  Volume2, 
  ShieldAlert,
  Wind,
  CloudRain,
  Eye,
  Sliders,
  Layers,
  Compass
} from 'lucide-react';
import { INCIDENT_REPORTS } from '../data/mockData';

export default function LiveMonitorView() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeStep, setTimeStep] = useState(7); // 0 to 12
  const [elevation, setElevation] = useState('3.2°');
  const [activeScanMode, setActiveScanMode] = useState<'Reflectivity' | 'Velocity' | 'Differential Z'>('Reflectivity');
  const [selectedStation, setSelectedStation] = useState('DWR Bhopal (S-Band)');

  const timeStamps = [
    '13:30 IST', '13:40 IST', '13:50 IST', '14:00 IST', 
    '14:10 IST', '14:20 IST', '14:30 IST', '14:32 IST (LIVE)'
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeStep((prev) => (prev >= timeStamps.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying, timeStamps.length]);

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none">
      {/* Top Monitor Header */}
      <div className="px-5 py-3 border-b border-[#253347] bg-[#101319] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
              DOPPLER GIS & SENSOR MONITOR
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#10b981]/15 border border-[#10b981] text-[#10b981] tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              SWEEP ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
            High-resolution volume scan • Azimuth 0°–360° • Range 450 km • Station: {selectedStation}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-[#111827] border border-[#253347] px-3 py-1 flex items-center gap-2">
            <span className="text-[#64748b]">ELEVATION:</span>
            <select
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              className="bg-transparent text-[#06b6d4] font-bold focus:outline-hidden cursor-pointer"
            >
              <option value="0.5°">0.5° Low Level</option>
              <option value="1.5°">1.5° Base PPI</option>
              <option value="3.2°">3.2° Convective</option>
              <option value="6.0°">6.0° Core Top</option>
            </select>
          </div>

          <div className="bg-[#111827] border border-[#253347] px-3 py-1 flex items-center gap-2">
            <span className="text-[#64748b]">MODE:</span>
            <button
              onClick={() => setActiveScanMode('Reflectivity')}
              className={`px-2 py-0.5 ${activeScanMode === 'Reflectivity' ? 'bg-[#06b6d4] text-[#101319] font-bold' : 'text-[#94a3b8]'}`}
            >
              dBZ
            </button>
            <button
              onClick={() => setActiveScanMode('Velocity')}
              className={`px-2 py-0.5 ${activeScanMode === 'Velocity' ? 'bg-[#06b6d4] text-[#101319] font-bold' : 'text-[#94a3b8]'}`}
            >
              VEL
            </button>
            <button
              onClick={() => setActiveScanMode('Differential Z')}
              className={`px-2 py-0.5 ${activeScanMode === 'Differential Z' ? 'bg-[#06b6d4] text-[#101319] font-bold' : 'text-[#94a3b8]'}`}
            >
              ZDR
            </button>
          </div>
        </div>
      </div>

      {/* Main Radar Screen Viewport */}
      <div className="relative flex-1 min-h-[500px] bg-[#070b10] border-b border-[#253347] overflow-hidden flex items-center justify-center">
        {/* Full Radar Canvas Graphic */}
        <svg className="w-full h-full max-h-[600px]" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="monitorRadarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid Graticules */}
          <g stroke="#162232" strokeWidth="0.8">
            <line x1="0" y1="300" x2="900" y2="300" />
            <line x1="450" y1="0" x2="450" y2="600" />
            <line x1="100" y1="0" x2="100" y2="600" strokeDasharray="2 4" />
            <line x1="800" y1="0" x2="800" y2="600" strokeDasharray="2 4" />
          </g>

          {/* Distance Rings from Station (50km, 100km, 150km, 200km, 250km) */}
          <g stroke="#06b6d4" strokeWidth="1" opacity="0.3" fill="none">
            <circle cx="450" cy="300" r="50" />
            <circle cx="450" cy="300" r="100" />
            <circle cx="450" cy="300" r="150" />
            <circle cx="450" cy="300" r="200" />
            <circle cx="450" cy="300" r="250" />
            <circle cx="450" cy="300" r="280" strokeDasharray="3 3" />
          </g>

          {/* Azimuth Angle Degree Ticks */}
          <g fill="#64748b" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            <text x="450" y="35">000° N</text>
            <text x="715" y="304">090° E</text>
            <text x="450" y="575">180° S</text>
            <text x="185" y="304">270° W</text>
            <text x="635" y="115">045° NE</text>
            <text x="635" y="495">135° SE</text>
            <text x="265" y="495">225° SW</text>
            <text x="265" y="115">315° NW</text>
          </g>

          {/* Simulated Severe Weather Storm Cells */}
          <g>
            {/* Severe Cell 1 (Indore Inundation Zone) */}
            <path
              d="M330,280 Q360,250 400,270 T420,330 T360,350 Z"
              fill="#ef4444"
              opacity="0.8"
            />
            <path
              d="M340,290 Q370,270 390,280 T400,320 T365,335 Z"
              fill="#ffdad6"
              opacity="0.9"
            />

            {/* Hail / Convective Squall Line (Nashik / West Ghats) */}
            <path
              d="M260,380 L310,430 L350,460 L380,480"
              fill="none"
              stroke="#a855f7"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Heavy Rain Belt */}
            <path
              d="M480,240 Q540,210 610,260 T560,340 Z"
              fill="#f97316"
              opacity="0.65"
            />
            <path
              d="M510,255 Q550,235 585,270 T555,310 Z"
              fill="#ef4444"
              opacity="0.75"
            />

            {/* Maritime Cyclone Squalls */}
            <circle cx="730" cy="420" r="45" fill="#38bdf8" opacity="0.4" />
            <circle cx="730" cy="420" r="22" fill="#06b6d4" opacity="0.6" />
          </g>

          {/* Sweeping Radar Line */}
          <g className="animate-radar-sweep origin-[450px_300px]">
            <path
              d="M450,300 L730,200 A280,280 0 0,0 670,100 Z"
              fill="url(#monitorRadarSweep)"
            />
            <line x1="450" y1="300" x2="730" y2="200" stroke="#06b6d4" strokeWidth="2" />
          </g>

          {/* Cell Crosshair Markers with Labels */}
          <g fontFamily="JetBrains Mono" fontSize="10">
            {/* Indore */}
            <circle cx="370" cy="310" r="4" fill="#ef4444" />
            <text x="380" y="305" fill="#f8fafc" fontWeight="bold">INDORE CELL: 62 dBZ [SEVERE]</text>
            <text x="380" y="320" fill="#94a3b8">VIL: 48 kg/m² • Echo Top: 14.8 km</text>

            {/* Jabalpur */}
            <circle cx="550" cy="280" r="4" fill="#f97316" />
            <text x="560" y="275" fill="#f8fafc">JABALPUR CELL: 48 dBZ</text>
            <text x="560" y="290" fill="#94a3b8">VIL: 28 kg/m² • Echo Top: 11.2 km</text>
          </g>
        </svg>

        {/* dBZ Reflectivity Scale Legend (Left Side) */}
        <div className="absolute left-4 top-4 bg-[#111827]/95 border border-[#253347] p-2.5 font-mono text-[10px] space-y-1 z-20">
          <div className="text-[#94a3b8] font-bold text-[9px] uppercase tracking-wider mb-1">
            REFLECTIVITY (dBZ)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-2.5 bg-[#ffdad6]" />
            <span className="text-[#f8fafc] font-bold">&gt; 65 dBZ (Extreme Hail)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-2.5 bg-[#ef4444]" />
            <span className="text-[#cbd5e1]">55 - 65 dBZ (Torrential)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-2.5 bg-[#f97316]" />
            <span className="text-[#cbd5e1]">45 - 55 dBZ (Heavy Rain)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-2.5 bg-[#a855f7]" />
            <span className="text-[#cbd5e1]">35 - 45 dBZ (Moderate)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-2.5 bg-[#06b6d4]" />
            <span className="text-[#cbd5e1]">20 - 35 dBZ (Light)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-2.5 bg-[#1e293b]" />
            <span className="text-[#64748b]">&lt; 20 dBZ (Virga / Clutter)</span>
          </div>
        </div>

        {/* Live Scan Telemetry Box (Right Side) */}
        <div className="absolute right-4 top-4 bg-[#111827]/95 border border-[#253347] p-3 font-mono text-xs z-20 space-y-2 w-64">
          <div className="flex items-center justify-between border-b border-[#253347] pb-1.5">
            <span className="text-[#64748b] text-[10px]">RADAR STATUS</span>
            <span className="text-[#10b981] font-bold">OPERATIONAL</span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#94a3b8]">Transmitter:</span>
              <span className="text-[#f8fafc]">Klystron 750 kW</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94a3b8]">Pulse Rep Freq:</span>
              <span className="text-[#f8fafc]">1200 Hz Dual</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94a3b8]">Beamwidth:</span>
              <span className="text-[#f8fafc]">0.92° Narrow</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94a3b8]">Active Storm Cells:</span>
              <span className="text-[#ff7a85] font-bold">8 Cores</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playback Controls & Time Scrubber */}
      <div className="p-4 bg-[#111827] border-b border-[#253347] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimeStep((s) => Math.max(0, s - 1))}
            className="p-2 bg-[#0b0e13] hover:bg-[#1e293b] border border-[#253347] text-[#cbd5e1] cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-2 bg-[#06b6d4] hover:bg-[#38bdf8] text-[#101319] font-bold flex items-center gap-1.5 cursor-pointer uppercase"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE LOOP' : 'PLAY LOOP'}</span>
          </button>

          <button
            onClick={() => setTimeStep((s) => Math.min(timeStamps.length - 1, s + 1))}
            className="p-2 bg-[#0b0e13] hover:bg-[#1e293b] border border-[#253347] text-[#cbd5e1] cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <div className="ml-3 text-xs text-[#f8fafc] font-bold">
            FRAME: <span className="text-[#06b6d4]">{timeStamps[timeStep]}</span>
          </div>
        </div>

        {/* Scrubber slider */}
        <div className="flex-1 max-w-md mx-4">
          <input
            type="range"
            min={0}
            max={timeStamps.length - 1}
            value={timeStep}
            onChange={(e) => setTimeStep(Number(e.target.value))}
            className="w-full accent-[#06b6d4] h-2 bg-[#1e293b] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#64748b] mt-1">
            <span>-60 MIN</span>
            <span>-30 MIN</span>
            <span className="text-[#06b6d4] font-bold">NOW</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#94a3b8]">STATION SELECT:</span>
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-[#0b0e13] border border-[#253347] text-[#f8fafc] px-3 py-1.5 text-xs font-mono cursor-pointer"
          >
            <option value="DWR Bhopal (S-Band)">DWR Bhopal (S-Band)</option>
            <option value="DWR Mumbai Veravali">DWR Mumbai Veravali</option>
            <option value="DWR Delhi Palam">DWR Delhi Palam</option>
            <option value="DWR Kolkata S-Band">DWR Kolkata S-Band</option>
            <option value="DWR Chennai Port">DWR Chennai Port</option>
          </select>
        </div>
      </div>
    </div>
  );
}
