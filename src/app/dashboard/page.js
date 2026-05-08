'use client';
import { useState } from 'react';
import SidebarHeader from '@/components/sidebar-header';

function OverviewPage() {
  return <div className="p-6"><h2 className="text-xl font-bold">Overview</h2><p>SEO performance at a glance.</p></div>;
}
function AnalyticsPage() {
  return <div className="p-6"><h2 className="text-xl font-bold">Analytics</h2><p>Detailed insights.</p></div>;
}
function KeywordResearchPage() {
  return <div className="p-6"><h2 className="text-xl font-bold">Keyword Research</h2><p>Keyword research tool.</p></div>;
}

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const renderPage = () => {
    switch (currentView) {
      case 'overview': return <OverviewPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'keywords': return <KeywordResearchPage />;
      default: return <OverviewPage />;
    }
  };
  return (
    <SidebarHeader currentView={currentView} onViewChange={setCurrentView}>
      {renderPage()}
    </SidebarHeader>
  );
}