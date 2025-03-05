
import React from "react";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface FilesListProps {
  files: FileChange[];
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({ 
  files, 
  selectedFile, 
  onFileSelect 
}) => {
  return (
    <div className="w-64 border-r border-lovable-lightgray/50 bg-white overflow-y-auto">
      <div className="p-2 text-xs font-medium text-lovable-gray">ARCHIVOS</div>
      <div className="space-y-1 p-2">
        {files.map((file, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center px-2 py-1.5 text-sm rounded cursor-pointer",
              selectedFile === file.path
                ? "bg-lovable-lightgray/50"
                : "hover:bg-lovable-lightgray/30"
            )}
            onClick={() => onFileSelect(file.path)}
          >
            <FileText size={14} className="mr-2 text-lovable-gray" />
            <span className="text-xs truncate">{file.path.split('/').pop()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;
