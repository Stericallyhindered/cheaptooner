import { ReactNode, useEffect, useState } from 'react';
import { BookOpen, List, Grid3x3 } from 'lucide-react';
import { FileLoader } from './FileLoader';
import { ParameterTree } from './ParameterTree';
import { SaveButton } from './SaveButton';
import { useStore } from '../store/useStore';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const setAssistantOpen = useStore((s) => s.setAssistantOpen);
  const selectedTableId = useStore((s) => s.selectedTableId);
  const [mobilePanel, setMobilePanel] = useState<'maps' | 'editor'>('maps');

  useEffect(() => {
    if (selectedTableId) {
      setMobilePanel('editor');
    }
  }, [selectedTableId]);

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
              title="MHD guide and MHD-only Q&A"
            >
              <BookOpen className="w-3.5 h-3.5" />
              MHD guide
            </button>
            <SaveButton />
          </div>
        </div>
      </header>
      
      {/* Main Content — stacked on phones; side-by-side from md */}
      <main className="w-full max-w-none px-3 sm:px-4 py-2 min-h-0 flex flex-col h-[calc(100dvh-5.5rem)] sm:h-[calc(100vh-80px)]">
        <FileLoader />

        <div className="flex flex-col flex-1 min-h-0 gap-2 mt-2">
          {/* Mobile: switch full-width between map list and 2D/3D editor */}
          <div className="flex md:hidden gap-1 rounded-lg border border-dark-border bg-dark-surface2 p-1 shrink-0">
            <button
              type="button"
              onClick={() => setMobilePanel('maps')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-2 text-xs font-medium transition-colors ${
                mobilePanel === 'maps'
                  ? 'bg-dark-accent text-white'
                  : 'text-dark-text2 hover:bg-dark-border/60'
              }`}
            >
              <List className="w-3.5 h-3.5 shrink-0" />
              Maps
            </button>
            <button
              type="button"
              onClick={() => setMobilePanel('editor')}
              disabled={!selectedTableId}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-2 text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                mobilePanel === 'editor'
                  ? 'bg-dark-accent text-white'
                  : 'text-dark-text2 hover:bg-dark-border/60'
              }`}
            >
              <Grid3x3 className="w-3.5 h-3.5 shrink-0" />
              Table
            </button>
          </div>

          <div className="flex flex-1 min-h-0 flex-col gap-3 md:flex-row md:gap-3">
            <aside
              className={`min-h-0 flex w-full flex-shrink-0 flex-col md:w-64 md:flex-initial ${
                mobilePanel === 'maps' ? 'flex flex-1' : 'hidden md:flex'
              } max-h-[min(52vh,520px)] overflow-hidden md:max-h-none`}
            >
              <ParameterTree />
            </aside>

            <div
              className={`min-h-0 min-w-0 flex flex-1 flex-col ${
                mobilePanel === 'editor' ? 'flex' : 'hidden md:flex'
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

