
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
  // Component is no longer used in the UI
  return null;
};

export default FileExplorer;
