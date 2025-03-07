
import React from "react";
import CodeBlock from "../CodeBlock";
import FilesList from "./FilesList";
import { getFileIconClass } from "@/utils/languageUtils";
import { FileText } from "lucide-react";

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
  const selectedFileContent = selectedFile 
    ? files.find(f => f.path === selectedFile)?.content || '// Archivo no encontrado'
    : '';
    
  return (
    <div className="h-full flex">
      {files.length > 0 && (
        <div className="w-64 border-r border-lovable-lightgray/50 bg-white overflow-y-auto">
          <div className="p-2 text-xs font-medium text-lovable-gray">ARCHIVOS</div>
          <div className="space-y-1 p-2">
            {files.map((file, index) => {
              const fileName = file.path.split('/').pop() || '';
              const iconClass = getFileIconClass(fileName);
              
              return (
                <div
                  key={index}
                  className={`flex items-center px-2 py-1.5 text-sm rounded cursor-pointer ${
                    selectedFile === file.path
                      ? "bg-lovable-lightgray/50"
                      : "hover:bg-lovable-lightgray/30"
                  }`}
                  onClick={() => onFileSelect(file.path)}
                >
                  <FileText size={14} className={`mr-2 ${iconClass}`} />
                  <span className="text-xs truncate">{fileName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Panel de código */}
      <div className="flex-1 overflow-auto p-4">
        {selectedFile ? (
          <>
            <div className="text-xs font-medium text-lovable-gray mb-2">{selectedFile}</div>
            <CodeBlock
              code={selectedFileContent}
              filename={selectedFile}
              height="calc(100vh - 190px)"
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
