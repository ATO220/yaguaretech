
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import ChatPanel from "@/components/ChatPanel";
import PreviewPanel from "@/components/PreviewPanel";
import FileExplorer from "@/components/FileExplorer";
import HistorySidebar from "@/components/HistorySidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Files, MessageSquare, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [currentTab, setCurrentTab] = useState<"chat" | "history">("chat");
  const [currentRightTab, setCurrentRightTab] = useState<"preview" | "code">("preview");

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
        {/* Left Side: Chat/History Section */}
        <div className="flex flex-col w-1/2 h-full border-r border-lovable-lightgray/50">
          {/* Tabs for Chat/History */}
          <div className="flex border-b border-lovable-lightgray/50">
            <Button
              variant="ghost"
              className={cn(
                "flex-1 rounded-none border-b-2",
                currentTab === "chat" 
                  ? "border-lovable-blue text-lovable-blue" 
                  : "border-transparent text-lovable-gray"
              )}
              onClick={() => setCurrentTab("chat")}
            >
              <MessageSquare size={16} className="mr-2" />
              Chat
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "flex-1 rounded-none border-b-2",
                currentTab === "history" 
                  ? "border-lovable-blue text-lovable-blue" 
                  : "border-transparent text-lovable-gray"
              )}
              onClick={() => setCurrentTab("history")}
            >
              <Code size={16} className="mr-2" />
              Historial
            </Button>
          </div>
          
          {/* Content based on selected tab */}
          <div className="flex-1 overflow-hidden">
            {currentTab === "chat" ? (
              <ChatPanel 
                className="h-full"
                onFilesGenerated={handleFilesGenerated}
              />
            ) : (
              <HistorySidebar className="h-full" />
            )}
          </div>
        </div>

        {/* Right Side: File Explorer + Preview/Code */}
        <div className="flex flex-col w-1/2 h-full">
          {/* Tabs for Preview/Code */}
          <div className="flex border-b border-lovable-lightgray/50">
            <Button
              variant="ghost"
              className={cn(
                "flex-1 rounded-none border-b-2",
                currentRightTab === "preview" 
                  ? "border-lovable-blue text-lovable-blue" 
                  : "border-transparent text-lovable-gray"
              )}
              onClick={() => setCurrentRightTab("preview")}
            >
              Preview
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "flex-1 rounded-none border-b-2",
                currentRightTab === "code" 
                  ? "border-lovable-blue text-lovable-blue" 
                  : "border-transparent text-lovable-gray"
              )}
              onClick={() => setCurrentRightTab("code")}
            >
              Code
            </Button>
          </div>
          
          {/* Right content area */}
          <div className="flex flex-1 overflow-hidden">
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

            {/* Preview/Code Panel */}
            <div className="flex-1 overflow-hidden">
              <PreviewPanel 
                className="h-full"
                files={generatedFiles}
                initialView={currentRightTab}
                onViewChange={(view) => setCurrentRightTab(view as "preview" | "code")}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
