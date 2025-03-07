
import React from "react";
import { cn } from "@/lib/utils";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface FileExplorerProps {
  className?: string;
  onFileSelect?: (path: string) => void;
  generatedFiles?: FileChange[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  className,
  onFileSelect = () => {},
  generatedFiles = []
}) => {
  return (
    <div className={cn("h-full overflow-y-auto bg-white p-2", className)}>
      <div className="text-center py-8 text-lovable-gray">
        Para ver los archivos generados, use la vista "Code"
      </div>
    </div>
  );
};

export default FileExplorer;
