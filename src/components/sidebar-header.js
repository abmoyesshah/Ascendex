'use client';
import { useState } from 'react';
import { Search, BarChart3, Users, Settings, Bell, TrendingUp, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const ACCENT = ['#1447E6', '#4772FF', '#8CA8FF', '#C7D4FF', '#EEF3FF'];

export default function SidebarHeader({ currentView, onViewChange, children, user = { name: 'John Doe' } }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigation = [
    { id: 'overview', name: 'Overview', icon: BarChart3, path: '/overview' },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp, path: '/analytics' },
    { id: 'keywords', name: 'Keyword Research', icon: Search, path: '/keywords' },
    { id: 'reports', name: 'Reports', icon: Download, path: '/reports' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const sidebarWidth = isSidebarCollapsed ? 'w-20' : 'w-64';
  const contentMargin = isSidebarCollapsed ? 'ml-20' : 'ml-64';

  const getCurrentPageName = () => {
    const currentNav = navigation.find((item) => item.id === currentView);
    return currentNav ? currentNav.name : 'Overview';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-inter text-slate-700">
      <header className="fixed top-0 rounded-2xl left-0 right-0 h-16 bg-white/80 border-b border-slate-200 backdrop-blur-sm shadow-sm flex items-center z-50 px-6 justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" style={{ color: ACCENT[0] }} />
          <span className="font-semibold text-slate-800 text-lg">SEO Dashboard</span>
        </div>
        <div>
          <h1 className="text-slate-800 text-base font-semibold">
            Dashboard <span className="text-slate-400 text-sm">/ {getCurrentPageName()}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition" aria-label="Notifications">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition cursor-pointer">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT[0]}, ${ACCENT[1]})` }}
            >
              <Users className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <div className={`flex flex-1 mt-16 transition-all duration-300 ${contentMargin}`}>
        <aside className={`fixed left-0 top-3 bg-white border-r border-slate-200 shadow-md min-h-screen transition-all duration-300 ${sidebarWidth} pt-20 z-40`}>
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center w-full gap-3 text-left rounded-xl transition-all duration-200 ${
                    isSidebarCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-2.5'
                  } ${active ? 'bg-blue-50 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
                  style={{
                    color: active ? ACCENT[0] : undefined,
                    backgroundColor: active ? `${ACCENT[4]}80` : undefined,
                  }}
                  title={isSidebarCollapsed ? item.name : ''}
                >
                  <Icon className="w-5 h-5" style={{ color: active ? ACCENT[0] : '#94a3b8' }} />
                  {!isSidebarCollapsed && <span className="text-sm">{item.name}</span>}
                </button>
              );
            })}
          </nav>
          <div className="absolute bottom-6 w-full flex justify-center">
            <button
              onClick={toggleSidebar}
              className="h-9 w-9 bg-slate-100 hover:bg-slate-200 rounded-lg shadow-sm flex items-center justify-center transition-all duration-200"
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRight className="h-4 w-4 text-slate-500" /> : <ChevronLeft className="h-4 w-4 text-slate-500" />}
            </button>
          </div>
        </aside>
        <main className="flex-1 bg-white/80 min-h-screen rounded-xl overflow-y-auto p-3 shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}