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
  const [mobilePanel, setMobilePanel] = useState<'maps' | 'editor'>(() =>
    useStore.getState().selectedTableId ? 'editor' : 'maps'
  );

  useEffect(() => {
    if (selectedTableId) {
      setMobilePanel('editor');
    } else {
      setMobilePanel('maps');
    }
  }, [selectedTableId]);

  return (
    <div className="flex min-h-[100dvh] min-h-[100svh] flex-1 flex-col bg-dark-bg text-dark-text">
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
      <main className="flex w-full max-w-none flex-1 flex-col min-h-0 overflow-hidden px-3 sm:px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
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

          <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row md:gap-3">
            {/* Mobile: show one panel. Desktop (md+): always show both — md:* overrides hidden */}
            <aside
              className={`min-h-0 flex w-full shrink-0 flex-col overflow-hidden md:w-64 md:max-h-none ${
                mobilePanel === 'maps'
                  ? 'max-h-[min(50dvh,520px)] min-h-0 flex-1'
                  : 'hidden'
              } md:flex md:flex-none`}
            >
              <ParameterTree />
            </aside>

            <div
              className={`min-h-0 min-w-0 flex flex-1 flex-col ${
                mobilePanel === 'editor' ? '' : 'hidden'
              } md:flex md:min-h-0 md:flex-1`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

