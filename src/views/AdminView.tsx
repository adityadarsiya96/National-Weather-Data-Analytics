import { useState } from 'react';
import { Shield, Users, Radio, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BATTALION_DEPLOYMENTS } from '../data/mockData';

export default function AdminView() {
  const [defconLevel, setDefconLevel] = useState(3);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedBattalion, setSelectedBattalion] = useState(BATTALION_DEPLOYMENTS[0]);

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#253347] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
              NDRF / SDRF CRISIS DISPATCH & COMMAND DESK
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#ef4444]/15 border border-[#ef4444] text-[#ef4444]">
              DEFCON {defconLevel} ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
            Battalion positioning, tactical asset staging, and pan-India early warning broadcast triggers
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#94a3b8]">SET DEFCON LEVEL:</span>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDefconLevel(lvl)}
              className={`w-7 h-7 font-bold border cursor-pointer ${
                defconLevel === lvl
                  ? 'bg-[#ef4444] text-[#101319] border-[#ef4444]'
                  : 'bg-[#111827] text-[#94a3b8] border-[#253347] hover:border-[#ef4444]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Battalions & Broadcast console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono">
        {/* Left: Battalions Ledger */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#253347]">
          <div className="px-4 py-3 bg-[#1e293b] border-b border-[#253347] flex justify-between items-center text-xs font-bold text-[#f8fafc]">
            <span>STAGED & DEPLOYED NDRF BATTALIONS</span>
            <span className="text-[10px] text-[#06b6d4]">42 Bns Total Pan-India</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#0b0e13] text-[#94a3b8] uppercase text-[10px] border-b border-[#253347]">
              <tr>
                <th className="py-2.5 px-4">BATTALION</th>
                <th className="py-2.5 px-4">ASSIGNED CRISIS ZONE</th>
                <th className="py-2.5 px-4 text-center">STATUS</th>
                <th className="py-2.5 px-4 text-right">STRENGTH</th>
                <th className="py-2.5 px-4 text-right">BOATS</th>
                <th className="py-2.5 px-4">COMMANDER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {BATTALION_DEPLOYMENTS.map((bn) => (
                <tr
                  key={bn.id}
                  onClick={() => setSelectedBattalion(bn)}
                  className={`cursor-pointer transition-colors ${
                    selectedBattalion.id === bn.id ? 'bg-[#162232]' : 'hover:bg-[#192435]'
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-[#f8fafc]">{bn.battalion}</td>
                  <td className="py-3 px-4 text-[#cbd5e1]">{bn.assignedZone}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                      bn.status === 'Deployed'
                        ? 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]'
                        : 'bg-[#06b6d4]/15 text-[#06b6d4] border-[#06b6d4]'
                    }`}>
                      {bn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#f8fafc]">
                    {bn.personnel}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#06b6d4]">
                    {bn.boats} IRBs
                  </td>
                  <td className="py-3 px-4 text-[#94a3b8]">{bn.commander}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Broadcast Alert Terminal */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#253347] p-4 flex flex-col justify-between text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#ef4444] font-bold uppercase text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>COMMON ALERTING PROTOCOL (CAP)</span>
            </div>

            <p className="text-[#94a3b8] text-[11px] leading-relaxed">
              Dispatch cell-broadcast emergency alert notification directly to mobile handsets across impacted postal pin-codes.
            </p>

            <div className="bg-[#0b0e13] border border-[#253347] p-3 space-y-2">
              <span className="text-[10px] text-[#64748b] uppercase block">Target Area</span>
              <div className="font-bold text-[#f8fafc]">Indore Municipal Corp & Vijay Nagar Ring</div>
              <div className="text-[11px] text-[#06b6d4]">Est. Population Reach: 2.1 Million Handsets</div>
            </div>

            <div className="bg-[#0b0e13] border border-[#253347] p-3">
              <span className="text-[10px] text-[#64748b] uppercase block mb-1">Message Preview</span>
              <p className="text-[11px] text-[#ff7a85] font-sans">
                "URGENT FLASH FLOOD ALERT: Severe inundation over Vijay Nagar junction. Sluice discharge underway. Evacuate low ground immediately. NDRF 11 Bn on route."
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#253347]">
            <button
              onClick={handleBroadcast}
              className="w-full py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-[#101319] font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
            >
              {broadcastSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>BROADCAST TRANSMITTED!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT TELECOM CELL BROADCAST</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
