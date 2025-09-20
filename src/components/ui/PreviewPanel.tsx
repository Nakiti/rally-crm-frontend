import React from 'react';

interface PreviewPanelProps {
  children: React.ReactNode;
  className?: string;
  showTitle?: boolean;
  title?: string;
}

export function PreviewPanel({ 
  children, 
  className = '', 
  showTitle = false, 
  title = 'Live Preview' 
}: PreviewPanelProps) {
  return (
    <div className={`xl:w-3/4 lg:w-2/3 ${className}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 h-full overflow-hidden">
        <div className="h-full overflow-y-auto editor-scrollbar">
          <div className="p-0">
            {showTitle && (
              <div className="flex items-center gap-3 mb-2 px-2 pt-2">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            )}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
