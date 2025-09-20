import React from 'react';

interface TwoPanelLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
  panelHeight?: string;
}

export function TwoPanelLayout({ 
  leftPanel, 
  rightPanel, 
  className = '',
  panelHeight = 'h-[calc(100vh-140px)]'
}: TwoPanelLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="py-4 px-2 space-y-6">
        <div className={`flex flex-col xl:flex-row gap-2 ${panelHeight} ${className}`}>
          {leftPanel}
          {rightPanel}
        </div>
      </div>
    </div>
  );
}
