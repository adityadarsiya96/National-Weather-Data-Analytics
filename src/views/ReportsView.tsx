import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MapPin, 
  ShieldAlert, 
  ArrowUpDown, 
  ChevronRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { INCIDENT_REPORTS } from '../data/mockData';
import { IncidentReport } from '../types/weather';

interface ReportsViewProps {
  onSelectIncident: (inc: IncidentReport) => void;
  onDeploy: (inc: IncidentReport) => void;
}

export default function ReportsView({ onSelectIncident, onDeploy }: ReportsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeReport, setActiveReport] = useState<IncidentReport | null>(INCIDENT_REPORTS[0]);

  const filtered = INCIDENT_REPORTS.filter((inc) => {
    if (selectedState !== 'ALL' && inc.state !== selectedState) return false;
    if (selectedCategory !== 'ALL' && inc.category !== selectedCategory) return false;
    if (selectedStatus !== 'ALL' && inc.status !== selectedStatus) return false;
    if (
      search &&
      !inc.title.toLowerCase().includes(search.toLowerCase()) &&
      !inc.location.toLowerCase().includes(search.toLowerCase()) &&
      !inc.id.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Title,Location,State,Category,Confidence,Metric,Value,Status,Timestamp\n';
    const rows = filtered
      .map(
        (r) =>
          `"${r.id}","${r.title}","${r.location}","${r.state}","${r.category}",${r.confidence},"${r.metric}","${r.metricValue}","${r.status}","${r.timestamp}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NWIP_INCIDENT_REPORTS_EXPORT.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#101319] overflow-hidden select-none">
      {/* Header & Controls */}
      <div className="p-4 border-b border-[#253347] bg-[#101319] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-wide text-[#f8fafc]">
            INCIDENT TELEMETRY GRID & REPORTS LEDGER
          </h1>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
            Full ledger of {INCIDENT_REPORTS.length} indexed critical pins across 24,851 multi-sensor streams
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-[#111827] hover:bg-[#1e293b] border border-[#253347] text-xs font-mono text-[#06b6d4] flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-4 py-2.5 bg-[#0b0e13] border-b border-[#253347] flex flex-wrap items-center gap-3 font-mono text-xs">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#111827] border border-[#253347] px-3 py-1.5 w-64">
          <Search className="w-3.5 h-3.5 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search report ID, sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-[#f8fafc] placeholder-[#64748b] focus:outline-hidden w-full font-mono"
          />
        </div>

        {/* State Filter */}
        <div className="flex items-center gap-1.5 text-[#94a3b8]">
          <span>STATE:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-[#111827] border border-[#253347] text-[#cbd5e1] px-2 py-1 focus:outline-hidden"
          >
            <option value="ALL">ALL STATES</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Assam">Assam</option>
            <option value="Odisha">Odisha</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 text-[#94a3b8]">
          <span>TYPE:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#111827] border border-[#253347] text-[#cbd5e1] px-2 py-1 focus:outline-hidden"
          >
            <option value="ALL">ALL HAZARDS</option>
            <option value="Flash Flood">Flash Flood</option>
            <option value="Heavy Rain">Heavy Rain</option>
            <option value="Thunderstorm">Thunderstorm</option>
            <option value="Heatwave">Heatwave</option>
            <option value="High Wind / Cyclone">High Wind / Cyclone</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 text-[#94a3b8]">
          <span>STATUS:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#111827] border border-[#253347] text-[#cbd5e1] px-2 py-1 focus:outline-hidden"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="verified">Verified</option>
            <option value="under_review">Under Review</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Grid Table & Inspector */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Table List (8 cols) */}
        <div className="lg:col-span-8 overflow-y-auto border-r border-[#253347]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead className="bg-[#1e293b] sticky top-0 text-[#94a3b8] uppercase text-[10px] border-b border-[#253347] z-10">
              <tr>
                <th className="py-2.5 px-3">PIN / ID</th>
                <th className="py-2.5 px-3">HAZARD</th>
                <th className="py-2.5 px-3">LOCATION</th>
                <th className="py-2.5 px-3 text-right">TELEMETRY</th>
                <th className="py-2.5 px-3 text-center">CONFIDENCE</th>
                <th className="py-2.5 px-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filtered.map((r) => {
                const isSelected = activeReport?.id === r.id;
                return (
                  <tr
                    key={r.id}
                    onClick={() => setActiveReport(r)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#162232] border-l-2 border-[#06b6d4]'
                        : 'bg-[#111827] hover:bg-[#192435]'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-[#f8fafc] whitespace-nowrap">
                      {r.id}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 text-[10px] font-bold border ${
                        r.severity === 'critical'
                          ? 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]'
                          : 'bg-[#f97316]/15 text-[#f97316] border-[#f97316]'
                      }`}>
                        {r.categoryCode} • {r.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#cbd5e1]">
                      {r.location}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-[#06b6d4]">
                      {r.metricValue}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[#10b981] font-semibold">{r.confidence}%</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 text-[9px] uppercase font-bold ${
                        r.status === 'verified'
                          ? 'bg-[#10b981]/15 text-[#10b981]'
                          : r.status === 'under_review'
                          ? 'bg-[#eab308]/15 text-[#eab308]'
                          : 'bg-[#ef4444]/15 text-[#ef4444]'
                      }`}>
                        {r.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Report Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-[#0b0e13] p-4 flex flex-col justify-between overflow-y-auto font-mono text-xs">
          {activeReport ? (
            <div className="space-y-4">
              <div className="border-b border-[#253347] pb-3">
                <div className="flex justify-between items-center text-[10px] text-[#64748b]">
                  <span>INCIDENT DOSSIER</span>
                  <span>{activeReport.timestamp}</span>
                </div>
                <h3 className="text-base font-bold text-[#f8fafc] mt-1">
                  {activeReport.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#06b6d4] mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeReport.location}</span>
                </div>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#111827] border border-[#253347] p-2.5">
                  <span className="text-[10px] text-[#64748b] block">MEASURED VALUE</span>
                  <span className="text-sm font-bold text-[#f8fafc] mt-0.5 block">
                    {activeReport.metricValue}
                  </span>
                </div>
                <div className="bg-[#111827] border border-[#253347] p-2.5">
                  <span className="text-[10px] text-[#64748b] block">CORROBORATION</span>
                  <span className="text-sm font-bold text-[#10b981] mt-0.5 block">
                    {activeReport.confidence}% Machine
                  </span>
                </div>
              </div>

              {/* Narrative Details */}
              <div className="bg-[#111827] border border-[#253347] p-3 text-xs leading-relaxed text-[#cbd5e1]">
                <span className="text-[10px] text-[#64748b] block uppercase mb-1">Incident Dispatch Summary</span>
                {activeReport.details}
              </div>

              {/* Source & Assigned Battalion */}
              <div className="space-y-1.5 text-[11px] text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Source Feed:</span>
                  <span className="text-[#cbd5e1] font-semibold">{activeReport.source}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Unit:</span>
                  <span className="text-[#06b6d4] font-semibold">{activeReport.battalionAssigned}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operational Tag:</span>
                  <span className="text-[#ef4444] font-semibold">{activeReport.tag}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#253347] flex flex-col gap-2">
                <button
                  onClick={() => onDeploy(activeReport)}
                  className="w-full py-2 bg-[#ef4444] hover:bg-[#dc2626] text-[#101319] font-bold tracking-wider uppercase cursor-pointer"
                >
                  DEPLOY TASK FORCE
                </button>
                <button
                  onClick={() => onSelectIncident(activeReport)}
                  className="w-full py-2 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#101319] text-[#cbd5e1] border border-[#253347] font-bold tracking-wider uppercase cursor-pointer"
                >
                  SHOW ON RADAR MAP
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-[#64748b]">Select a report to view dossier</div>
          )}
        </div>
      </div>
    </div>
  );
}
