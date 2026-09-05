import { Radio, Wifi, Database, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { DATA_SOURCES } from '../data/mockData';

export default function DataSourcesView() {
  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-y-auto select-none p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#253347] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
              TELEMETRY INGESTION & DATA SOURCES
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#10b981]/15 border border-[#10b981] text-[#10b981]">
              ALL NODES ONLINE
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
            Ground-truth radar network, ISRO satellite transponders, IoT mesh, and hydrological telemetry
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button className="px-3 py-1.5 bg-[#111827] hover:bg-[#1e293b] border border-[#253347] text-[#06b6d4] flex items-center gap-1.5 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>PING HEALTH CHECK</span>
          </button>
        </div>
      </div>

      {/* Network Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#111827] border border-[#253347] p-3.5">
          <span className="text-[10px] text-[#64748b] block uppercase">Network Latency</span>
          <span className="text-2xl font-bold text-[#f8fafc] mt-1 block">42 ms</span>
          <span className="text-[10px] text-[#10b981]">Central Hub Roundtrip</span>
        </div>
        <div className="bg-[#111827] border border-[#253347] p-3.5">
          <span className="text-[10px] text-[#64748b] block uppercase">Packet Ingestion</span>
          <span className="text-2xl font-bold text-[#06b6d4] mt-1 block">24,851 evt/h</span>
          <span className="text-[10px] text-[#94a3b8]">99.98% zero drop</span>
        </div>
        <div className="bg-[#111827] border border-[#253347] p-3.5">
          <span className="text-[10px] text-[#64748b] block uppercase">IoT Mesh Nodes</span>
          <span className="text-2xl font-bold text-[#f8fafc] mt-1 block">14,200</span>
          <span className="text-[10px] text-[#10b981]">14,082 Reporting</span>
        </div>
        <div className="bg-[#111827] border border-[#253347] p-3.5">
          <span className="text-[10px] text-[#64748b] block uppercase">Bandwidth Aggregate</span>
          <span className="text-2xl font-bold text-[#f8fafc] mt-1 block">248 MB/s</span>
          <span className="text-[10px] text-[#94a3b8]">Fiber & VSAT Backup</span>
        </div>
      </div>

      {/* Data Nodes Table */}
      <div className="bg-[#111827] border border-[#253347] overflow-hidden">
        <div className="px-4 py-3 bg-[#1e293b] border-b border-[#253347] font-mono text-xs font-bold text-[#f8fafc]">
          ACTIVE INGESTION FEED TOPOLOGY
        </div>
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead className="bg-[#0b0e13] text-[#94a3b8] uppercase text-[10px] border-b border-[#253347]">
            <tr>
              <th className="py-2.5 px-4">NODE ID & SERVICE</th>
              <th className="py-2.5 px-4">SENSOR CLASSIFICATION</th>
              <th className="py-2.5 px-4">LOCATION</th>
              <th className="py-2.5 px-4 text-center">STATUS</th>
              <th className="py-2.5 px-4 text-right">LATENCY</th>
              <th className="py-2.5 px-4 text-right">UPTIME</th>
              <th className="py-2.5 px-4 text-right">THROUGHPUT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]">
            {DATA_SOURCES.map((node) => (
              <tr key={node.id} className="hover:bg-[#161f2e] transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-[#f8fafc]">{node.name}</div>
                  <div className="text-[10px] text-[#64748b]">ID: {node.id}</div>
                </td>
                <td className="py-3 px-4 text-[#cbd5e1]">
                  <span className="px-2 py-0.5 bg-[#0b0e13] border border-[#253347] text-[10px]">
                    {node.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#94a3b8]">{node.location}</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40">
                    ONLINE
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#06b6d4]">
                  {node.latencyMs} ms
                </td>
                <td className="py-3 px-4 text-right text-[#10b981] font-semibold">
                  {node.uptimePct}%
                </td>
                <td className="py-3 px-4 text-right text-[#cbd5e1]">
                  {node.bandwidth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
