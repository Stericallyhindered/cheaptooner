import { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import { FileLoader } from './FileLoader';
import { ParameterTree } from './ParameterTree';
import { SaveButton } from './SaveButton';
import { useStore } from '../store/useStore';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const setAssistantOpen = useStore((s) => s.setAssistantOpen);
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border">
        <div className="w-full max-w-none px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold">CHEAPTOONER</h1>
            <p className="text-xs text-dark-text2">ECU Calibration Editor</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-dark-surface2 border border-dark-border rounded hover:bg-dark-border transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat
            </button>
            <SaveButton />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="w-full max-w-none px-3 sm:px-4 py-2 h-[calc(100vh-80px)] flex flex-col">
        <FileLoader />
        
        <div className="flex gap-3 flex-1 min-h-0">
          {/* Left Sidebar - Parameter Tree */}
          <aside className="w-64 flex-shrink-0">
            <ParameterTree />
          </aside>
          
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 min-h-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

