import React, { useState } from 'react';
import { FolderDown, FolderCheck, Download, Check, AlertCircle, Copy, Laptop, FolderOpen } from 'lucide-react';

interface ExportFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportFolderModal: React.FC<ExportFolderModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const supportsDirectoryPicker = 'showDirectoryPicker' in window;

  const handleSaveDirectlyToFolder = async () => {
    try {
      setStatus('saving');
      setProgress('Requesting folder permission...');

      // @ts-ignore
      const rootHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
        id: 'fashion-app-folder',
        startIn: 'documents'
      });

      setProgress('Fetching project files manifest...');
      const response = await fetch('/project-manifest.json');
      if (!response.ok) throw new Error('Could not load project manifest');
      const files: Array<{ path: string; type: 'text' | 'binary'; content: string }> = await response.json();

      let writtenCount = 0;
      for (const item of files) {
        setProgress(`Saving ${item.path} (${writtenCount + 1}/${files.length})...`);
        const parts = item.path.split('/');
        const fileName = parts.pop()!;

        // Navigate / create subdirectories
        let currentDirHandle = rootHandle;
        for (const dirName of parts) {
          if (!dirName || dirName === '.') continue;
          currentDirHandle = await currentDirHandle.getDirectoryHandle(dirName, { create: true });
        }

        // Create file handle
        const fileHandle = await currentDirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();

        if (item.type === 'text') {
          await writable.write(item.content);
        } else {
          // Convert base64 to Uint8Array
          const binaryString = atob(item.content);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          await writable.write(bytes);
        }

        await writable.close();
        writtenCount++;
      }

      setStatus('success');
      setProgress(`All ${writtenCount} files written directly into your local folder!`);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setStatus('idle');
        setProgress('');
      } else {
        console.error('Directory export error:', err);
        setStatus('error');
        setProgress(err.message || 'Error writing to local folder');
      }
    }
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-white/20 rounded max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-xs space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">
              <FolderDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl text-white font-medium">
                Download Workspace as a Folder
              </h3>
              <p className="text-[11px] text-neutral-400">
                Save all 28 source code, image, and configuration files directly to your machine
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-neutral-400 hover:text-white text-sm">
            ✕
          </button>
        </div>

        {/* Method 1: Save Directly to a Folder (Chrome, Edge, Opera) */}
        <div className="p-5 rounded bg-white/[0.03] border border-white/10 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] font-medium block">
                Method 1 · Native Browser Folder Saver
              </span>
              <h4 className="text-sm font-semibold text-white mt-0.5">
                Save Directly into a Local Directory
              </h4>
              <p className="text-[11px] text-neutral-400 font-light mt-1 leading-relaxed">
                Choose any folder on your computer. The browser will create the subdirectories and write all files directly into that folder. No archive or zip extraction needed.
              </p>
            </div>
          </div>

          {supportsDirectoryPicker ? (
            <div className="space-y-3">
              <button
                onClick={handleSaveDirectlyToFolder}
                disabled={status === 'saving'}
                className="w-full py-3 px-4 bg-[#c5a059] hover:bg-[#d4b069] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <FolderOpen className="w-4 h-4" />
                <span>
                  {status === 'saving' ? 'Writing Files to Folder...' : 'Choose Folder & Save All Files'}
                </span>
              </button>

              {progress && (
                <div className={`p-3 rounded text-xs flex items-center gap-2 font-mono ${
                  status === 'success'
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                    : status === 'error'
                    ? 'bg-red-950/40 text-red-300 border border-red-500/30'
                    : 'bg-white/5 text-neutral-300 border border-white/10'
                }`}>
                  {status === 'success' && <FolderCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {status === 'saving' && <div className="w-3 h-3 rounded-full border-2 border-[#c5a059] border-t-transparent animate-spin shrink-0" />}
                  {status === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                  <span className="truncate">{progress}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-white/5 border border-white/10 rounded text-neutral-400 text-[11px]">
              Direct folder writing requires Chrome, Edge, or Brave. Please use Method 2 below for other browsers.
            </div>
          )}
        </div>

        {/* Method 2: 1-Click Instant Folder Extraction */}
        <div className="p-5 rounded bg-white/[0.03] border border-white/10 space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium block">
              Method 2 · Standard Universal Download
            </span>
            <h4 className="text-sm font-semibold text-white mt-0.5">
              Download Package & Open as Folder
            </h4>
            <p className="text-[11px] text-neutral-400 font-light mt-1 leading-relaxed">
              Downloads the complete package. Turning it into a regular folder takes 1 click:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
              <strong className="text-white block font-sans">On Windows:</strong>
              <p className="text-neutral-400 font-light">
                Right-click the downloaded file and select <strong className="text-white">"Extract All..."</strong> → it instantly becomes a regular folder.
              </p>
            </div>
            <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
              <strong className="text-white block font-sans">On Mac:</strong>
              <p className="text-neutral-400 font-light">
                Simply <strong className="text-white">double-click</strong> the file. macOS automatically unpacks it as a regular folder on your desktop.
              </p>
            </div>
          </div>

          <a
            href="/atelier-collective.zip"
            download="atelier-collective.zip"
            className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#c5a059]" />
            <span>Download Package (.zip · 4.2 MB)</span>
          </a>

          {/* Terminal Command */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-neutral-500 font-mono">Or in Terminal:</span>
            <div className="p-2.5 bg-black/60 border border-white/10 rounded flex items-center justify-between gap-2 font-mono text-[11px] text-neutral-300">
              <code>unzip atelier-collective.zip -d fashion-workspace</code>
              <button
                onClick={() => copyCommand('unzip atelier-collective.zip -d fashion-workspace')}
                className="text-neutral-400 hover:text-white p-1"
                title="Copy command"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
