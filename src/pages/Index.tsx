
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import ChatPanel from "@/components/ChatPanel";
import PreviewPanel from "@/components/PreviewPanel";
import FileExplorer from "@/components/FileExplorer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Files } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

const Index = () => {
  const isMobile = useIsMobile();
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [generatedFiles, setGeneratedFiles] = useState<FileChange[]>([]);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);

  const handleFilesGenerated = (files: FileChange[]) => {
    setGeneratedFiles(files);
    if (files.length > 0 && !selectedFilePath) {
      setSelectedFilePath(files[0].path);
    }
  };

  const handleFileSelect = (path: string) => {
    setSelectedFilePath(path);
  };

  return (
    <MainLayout>
      <div className="flex h-full overflow-hidden">
        {/* File Explorer */}
        <div
          className={cn(
            "h-full transition-all duration-300 ease-in-out relative",
            showFileExplorer ? "w-64" : "w-0"
          )}
        >
          {showFileExplorer && (
            <FileExplorer 
              generatedFiles={generatedFiles}
              onFileSelect={handleFileSelect}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-[-12px] h-6 w-6 rounded-full bg-white border border-lovable-lightgray/50 z-10 text-lovable-gray hover:text-lovable-black"
            onClick={() => setShowFileExplorer(!showFileExplorer)}
          >
            {showFileExplorer ? (
              <ChevronLeft size={14} />
            ) : (
              <Files size={14} />
            )}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full">
          <ChatPanel 
            className={cn(
              "h-full",
              !showFileExplorer && "col-span-1 md:col-span-1"
            )}
            onFilesGenerated={handleFilesGenerated}
          />
          
          <PreviewPanel 
            className={cn(
              "h-full",
              !isMobile ? "block" : "hidden"
            )}
            files={generatedFiles}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
