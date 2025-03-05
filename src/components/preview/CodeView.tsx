
import React from "react";
import CodeBlock from "../CodeBlock";
import FilesList from "./FilesList";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface CodeViewProps {
  files: FileChange[];
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
}

const CodeView: React.FC<CodeViewProps> = ({
  files,
  selectedFile,
  onFileSelect
}) => {
  return (
    <div className="h-full flex">
      {files.length > 0 && (
        <FilesList 
          files={files} 
          selectedFile={selectedFile} 
          onFileSelect={onFileSelect} 
        />
      )}
      
      {/* Panel de código */}
      <div className="flex-1 overflow-auto p-4">
        {selectedFile ? (
          <>
            <div className="text-xs font-medium text-lovable-gray mb-2">{selectedFile}</div>
            <CodeBlock
              code={files.find(f => f.path === selectedFile)?.content || '// Archivo no encontrado'}
              language={selectedFile.endsWith('.tsx') || selectedFile.endsWith('.ts') ? 'tsx' : 'jsx'}
            />
          </>
        ) : (
          <div className="text-center text-lovable-gray py-8">
            No hay archivos para mostrar
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeView;
