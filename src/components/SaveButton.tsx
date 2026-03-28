import { Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { downloadBinFile } from '../parsers/binWriter';

export function SaveButton() {
  const { binBuffer, binFileName, changes } = useStore();
  
  const handleSave = () => {
    if (!binBuffer) {
      alert('No BIN file loaded');
      return;
    }
    
    const filename = binFileName 
      ? binFileName.replace(/\.bin$/i, '_modified.bin')
      : 'modified.bin';
    
    downloadBinFile(binBuffer, filename);
  };
  
  if (!binBuffer) {
    return null;
  }
  
  return (
    <button
      onClick={handleSave}
      className="flex items-center gap-1 px-2 py-1 bg-dark-accent hover:bg-dark-accentHover text-white rounded text-xs transition-colors font-medium"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Save BIN</span>
      {changes.length > 0 && (
        <span className="text-xs bg-dark-accent px-1.5 py-0.5 rounded">
          {changes.length}
        </span>
      )}
    </button>
  );
}

