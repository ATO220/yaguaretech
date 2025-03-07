
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ViewToggle from "./preview/ViewToggle";
import RefreshButton from "./preview/RefreshButton";
import CodeView from "./preview/CodeView";
import PreviewView from "./preview/PreviewView";
import { generateIframeContent } from "./preview/IframeContentGenerator";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface PreviewPanelProps {
  className?: string;
  files?: FileChange[];
  initialView?: "preview" | "code";
  onViewChange?: (view: "preview" | "code") => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ 
  className, 
  files = [], 
  initialView = "preview",
  onViewChange
}) => {
  const [view, setView] = useState<"preview" | "code">(initialView);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [iframeContent, setIframeContent] = useState<string>("");

  // Sync with external view state if provided
  useEffect(() => {
    if (initialView && initialView !== view) {
      setView(initialView);
    }
  }, [initialView]);

  // Select first file when files change
  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0].path);
    }
  }, [files, selectedFile]);

  // Generate iframe content based on files
  useEffect(() => {
    if (files.length > 0) {
      const content = generateIframeContent(files);
      setIframeContent(content);
    }
  }, [files]);

  const handleViewChange = (newView: "preview" | "code") => {
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  const refreshPreview = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      <div className="flex items-center justify-between p-2 border-b border-border bg-background">
        <RefreshButton loading={loading} onRefresh={refreshPreview} />
        <ViewToggle view={view} onViewChange={handleViewChange} />
      </div>
      
      <div className="flex-1 overflow-hidden">
        {view === "preview" ? (
          <PreviewView iframeContent={iframeContent} />
        ) : (
          <CodeView 
            files={files}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
