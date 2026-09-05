export type NavTab = 
  | 'overview' 
  | 'monitor' 
  | 'analytics' 
  | 'reports' 
  | 'ai-verification' 
  | 'data-sources' 
  | 'admin' 
  | 'settings';

export type IncidentSeverity = 'critical' | 'warning' | 'advisory' | 'nominal';

export type WeatherCategory = 
  | 'Flash Flood' 
  | 'Heavy Rain' 
  | 'Thunderstorm' 
  | 'Heatwave' 
  | 'High Wind / Cyclone';

export interface IncidentReport {
  id: string;
  title: string;
  location: string;
  state: string;
  coordinates: [number, number]; // [lat, lon]
  category: WeatherCategory;
  categoryCode: 'FL' | 'HR' | 'TS' | 'HW' | 'CY';
  severity: IncidentSeverity;
  status: 'verified' | 'under_review' | 'flagged';
  confidence: number;
  metric: string;
  metricValue: string;
  source: string;
  tag: string;
  timestamp: string;
  timeAgo: string;
  details?: string;
  reportsCount?: number;
  rainfallMm?: number;
  battalionAssigned?: string;
}

export interface MetricSummary {
  totalReports: number;
  totalChange: string;
  imdReports: number;
  crowdsourcedReports: number;
  
  verifiedReports: number;
  verifiedChange: string;
  verifiedRatio: number;
  machineConfidence: number;
  humanOps: number;

  flaggedAnomalies: number;
  flaggedChange: string;
  rejectionRate: number;
  spamBotCount: number;
  sensorFaultCount: number;

  activeDisasters: number;
  activeDisasterChange: string;
  criticalCount: number;
  ndrfBattalionsStaged: number;
  sdrfAlerted: number;
}

export interface StateIntensity {
  rank: number;
  state: string;
  reports: number;
  isSurge?: boolean;
  color: string;
  percentage: number;
}

export interface CategoryBreakdown {
  category: string;
  percentage: number;
  count: number;
  color: string;
}

export interface HourlyActivity {
  time: string;
  inflow: number;
  verified: number;
}

export interface DataSourceNode {
  id: string;
  name: string;
  type: 'Doppler Radar' | 'Satellite' | 'IoT Weather Station' | 'River Gauge' | 'Air Quality';
  location: string;
  status: 'online' | 'degraded' | 'offline';
  latencyMs: number;
  uptimePct: number;
  lastPacket: string;
  bandwidth: string;
}

export interface BattalionDeployment {
  id: string;
  battalion: string;
  baseLocation: string;
  assignedZone: string;
  status: 'Staged' | 'Deployed' | 'En Route' | 'Standby';
  personnel: number;
  boats: number;
  commander: string;
  specialization: string;
}
