import { useState } from 'react';
import { Settings, Sliders, Bell, Globe, Shield, Save, Check } from 'lucide-react';

export default function SettingsView() {
  const [refreshRate, setRefreshRate] = useState('2.5s');
  const [coordsFormat, setCoordsFormat] = useState('WGS84');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [radarPalette, setRadarPalette] = useState('IMD_OFFICIAL');
  const [autoCluster, setAutoCluster] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none p-5 space-y-5 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#253347] pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-[#f8fafc]">
            TACTICAL WORKSTATION CONFIGURATION
          </h1>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Geospatial datum, radar telemetry polling frequencies, audio alerts, and display parameters
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 bg-[#06b6d4] hover:bg-[#38bdf8] text-[#101319] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'SETTINGS COMMITTED' : 'SAVE PREFERENCES'}</span>
        </button>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Telemetry Polling Frequency */}
        <div className="bg-[#111827] border border-[#253347] p-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-[#f8fafc]">Telemetry Polling Cycle</span>
            <span className="text-[#06b6d4]">{refreshRate}</span>
          </div>
          <p className="text-[#94a3b8] text-[11px]">
            Controls websocket stream interval between IMD radar raw packets and the local workstation cache.
          </p>
          <div className="flex gap-2 pt-1">
            {['1.0s (Live)', '2.5s (Nominal)', '5.0s (Eco)', '15.0s (Low Bandwidth)'].map((rate) => (
              <button
                key={rate}
                onClick={() => setRefreshRate(rate)}
                className={`px-3 py-1 border cursor-pointer ${
                  refreshRate === rate
                    ? 'bg-[#06b6d4] text-[#101319] font-bold border-[#06b6d4]'
                    : 'bg-[#0b0e13] text-[#cbd5e1] border-[#253347]'
                }`}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Coordinate Standard */}
        <div className="bg-[#111827] border border-[#253347] p-4 space-y-2">
          <span className="font-bold text-[#f8fafc] block">Geodetic Datum & Coordinate Format</span>
          <p className="text-[#94a3b8] text-[11px]">
            Format rendered in status sub-bar and disaster dispatch orders.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { id: 'WGS84', label: 'WGS84 Degrees/Min/Sec' },
              { id: 'DECIMAL', label: 'Decimal Degrees' },
              { id: 'MGRS', label: 'Military Grid (MGRS)' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCoordsFormat(opt.id)}
                className={`p-2 border text-left cursor-pointer ${
                  coordsFormat === opt.id
                    ? 'bg-[#1e293b] border-[#06b6d4] text-[#06b6d4] font-bold'
                    : 'bg-[#0b0e13] border-[#253347] text-[#cbd5e1]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Radar Color Palette */}
        <div className="bg-[#111827] border border-[#253347] p-4 space-y-2">
          <span className="font-bold text-[#f8fafc] block">Doppler Reflectivity Palette</span>
          <p className="text-[#94a3b8] text-[11px]">
            Select standardized color scheme for dBZ volume scans.
          </p>
          <div className="flex gap-2 pt-1">
            {[
              { id: 'IMD_OFFICIAL', label: 'IMD Standard (16 Colors)' },
              { id: 'NWS_NEXRAD', label: 'NEXRAD High Contrast' },
              { id: 'INFRARED_MONO', label: 'Night Optics Monochrome' },
            ].map((pal) => (
              <button
                key={pal.id}
                onClick={() => setRadarPalette(pal.id)}
                className={`px-3 py-1.5 border cursor-pointer ${
                  radarPalette === pal.id
                    ? 'bg-[#06b6d4] text-[#101319] font-bold border-[#06b6d4]'
                    : 'bg-[#0b0e13] text-[#cbd5e1] border-[#253347]'
                }`}
              >
                {pal.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Alerts */}
        <div className="bg-[#111827] border border-[#253347] p-4 flex items-center justify-between">
          <div>
            <span className="font-bold text-[#f8fafc] block">Critical Threat Audio Klaxon</span>
            <p className="text-[#94a3b8] text-[11px] mt-0.5">
              Emit tone when an event surges to DEFCON Tier-1 or flash flood warning triggers.
            </p>
          </div>
          <button
            onClick={() => setSoundAlerts(!soundAlerts)}
            className={`px-3 py-1 font-bold border cursor-pointer ${
              soundAlerts ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]' : 'bg-[#1e293b] text-[#64748b] border-[#253347]'
            }`}
          >
            {soundAlerts ? 'ENABLED' : 'MUTED'}
          </button>
        </div>
      </div>
    </div>
  );
}
