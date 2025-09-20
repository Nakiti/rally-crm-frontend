import React from 'react';

interface EditorPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function EditorPanel({ title, children, className = '' }: EditorPanelProps) {
  return (
    <div className={`xl:w-1/3 ${className}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 px-2 py-2 h-full overflow-y-auto editor-scrollbar">
        <div className="top-0 bg-white/95 backdrop-blur-sm -m-6 mb-4 p-2 pt-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 px-6">{title}</h2>
          </div>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
