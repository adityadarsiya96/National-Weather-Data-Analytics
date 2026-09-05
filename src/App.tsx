import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CommandPalette from './components/CommandPalette';
import DeployModal from './components/DeployModal';
import ExportBriefModal from './components/ExportBriefModal';
import ActiveIncidentsModal from './components/ActiveIncidentsModal';

import OverviewView from './views/OverviewView';
import LiveMonitorView from './views/LiveMonitorView';
import AnalyticsView from './views/AnalyticsView';
import ReportsView from './views/ReportsView';
import AIVerificationView from './views/AIVerificationView';
import DataSourcesView from './views/DataSourcesView';
import AdminView from './views/AdminView';
import SettingsView from './views/SettingsView';

import { NavTab, IncidentReport } from './types/weather';
import { INCIDENT_REPORTS } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(INCIDENT_REPORTS[0]);
  
  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isActiveAlertsModalOpen, setIsActiveAlertsModalOpen] = useState(false);
  const [incidentToDeploy, setIncidentToDeploy] = useState<IncidentReport | null>(INCIDENT_REPORTS[0]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenDeploy = (incident: IncidentReport) => {
    setIncidentToDeploy(incident);
    setIsDeployModalOpen(true);
  };

  const handleConfirmDeploy = (incidentId: string, battalion: string, personnel: number) => {
    // Mobilization dispatched confirmation
  };

  return (
    <div className="h-screen w-screen bg-[#101319] text-[#e1e2e9] flex flex-col overflow-hidden font-sans select-none">
      {/* Top Header Bar */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAlertsModal={() => setIsActiveAlertsModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tactical Navigation Dock */}
        <Sidebar 
          currentTab={currentTab} 
          onSelectTab={setCurrentTab} 
        />

        {/* Primary Screen View Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {currentTab === 'overview' && (
            <OverviewView
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onOpenDeployModal={handleOpenDeploy}
              onNavigateToReports={() => setCurrentTab('reports')}
              selectedIncident={selectedIncident}
              onSelectIncident={setSelectedIncident}
            />
          )}

          {currentTab === 'monitor' && <LiveMonitorView />}

          {currentTab === 'analytics' && <AnalyticsView />}

          {currentTab === 'reports' && (
            <ReportsView
              onSelectIncident={(inc) => {
                setSelectedIncident(inc);
                setCurrentTab('overview');
              }}
              onDeploy={handleOpenDeploy}
            />
          )}

          {currentTab === 'ai-verification' && <AIVerificationView />}

          {currentTab === 'data-sources' && <DataSourcesView />}

          {currentTab === 'admin' && <AdminView />}

          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectIncident={(inc) => {
          setSelectedIncident(inc);
          setCurrentTab('overview');
        }}
        onSelectTab={setCurrentTab}
      />

      <DeployModal
        incident={incidentToDeploy}
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onConfirm={handleConfirmDeploy}
      />

      <ExportBriefModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <ActiveIncidentsModal
        isOpen={isActiveAlertsModalOpen}
        onClose={() => setIsActiveAlertsModalOpen(false)}
        onSelectIncident={(inc) => {
          setSelectedIncident(inc);
          setCurrentTab('overview');
        }}
        onDeploy={handleOpenDeploy}
      />
    </div>
  );
}
