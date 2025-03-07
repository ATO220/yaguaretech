
import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import ChatPanel from "@/components/ChatPanel";
import PreviewPanel from "@/components/PreviewPanel";
import HistorySidebar, { HistoryItem } from "@/components/HistorySidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MessageSquare, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle 
} from "@/components/ui/resizable";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

const Index = () => {
  const isMobile = useIsMobile();
  const [generatedFiles, setGeneratedFiles] = useState<FileChange[]>([]);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<"chat" | "history">("chat");
  const [currentRightTab, setCurrentRightTab] = useState<"preview" | "code">("preview");
  
  // History state management
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: "1",
      title: "Listado de alumnos",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isActive: true,
      files: []
    },
    {
      id: "2",
      title: "Login para aplicación",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      files: []
    },
    {
      id: "3",
      title: "Dashboard administrativo",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      files: []
    },
  ]);
  
  // Context tracking for iterative development
  const [developmentContext, setDevelopmentContext] = useState<{
    currentProject: string | null;
    iterations: FileChange[][];
  }>({
    currentProject: null,
    iterations: []
  });

  const handleFilesGenerated = (files: FileChange[]) => {
    // Update the files display
    setGeneratedFiles(files);
    
    // Store this iteration in our development context
    setDevelopmentContext(prev => {
      const newIterations = [...prev.iterations, files];
      return {
        ...prev,
        iterations: newIterations
      };
    });
    
    // Create a new history item for this generation
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      title: getProjectTitle(files),
      timestamp: new Date(),
      files: files,
      isActive: true
    };
    
    // Update history items, mark the new one as active
    setHistoryItems(prev => {
      const updatedItems = prev.map(item => ({
        ...item,
        isActive: false
      }));
      
      return [newHistoryItem, ...updatedItems];
    });
    
    // Select first file if needed
    if (files.length > 0 && !selectedFilePath) {
      setSelectedFilePath(files[0].path);
    }
  };

  // Helper to generate a title from files
  const getProjectTitle = (files: FileChange[]): string => {
    // Try to extract a meaningful name from component files
    const componentFiles = files.filter(f => 
      f.path.includes('components') && f.path.endsWith('.tsx')
    );
    
    if (componentFiles.length > 0) {
      // Extract component name from path
      const componentName = componentFiles[0].path.split('/').pop()?.replace('.tsx', '');
      return componentName ? `${componentName} component` : 'Nuevo componente';
    }
    
    // If no component files, use the first file
    if (files.length > 0) {
      const fileName = files[0].path.split('/').pop();
      return fileName ? `Proyecto ${fileName}` : 'Nuevo proyecto';
    }
    
    return 'Nuevo proyecto';
  };

  const handleFileSelect = (path: string) => {
    setSelectedFilePath(path);
  };
  
  const handleHistoryItemClick = (item: HistoryItem) => {
    // Set the clicked item as active
    setHistoryItems(prev => 
      prev.map(historyItem => ({
        ...historyItem,
        isActive: historyItem.id === item.id
      }))
    );
    
    // Load the files associated with this history item
    if (item.files && item.files.length > 0) {
      setGeneratedFiles(item.files);
      setSelectedFilePath(item.files[0].path);
    }
  };

  return (
    <MainLayout>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Side: Chat/History Section */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="h-full">
          <div className="flex flex-col h-full border-r border-yaguaretech-lightgray/50">
            {/* Tabs for Chat/History */}
            <div className="flex border-b border-yaguaretech-lightgray/50">
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2",
                  currentTab === "chat" 
                    ? "border-yaguaretech-blue text-yaguaretech-blue" 
                    : "border-transparent text-yaguaretech-gray"
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
                    ? "border-yaguaretech-blue text-yaguaretech-blue" 
                    : "border-transparent text-yaguaretech-gray"
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
                <HistorySidebar 
                  className="h-full" 
                  historyItems={historyItems}
                  onHistoryItemClick={handleHistoryItemClick}
                />
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-yaguaretech-lightgray/30" />

        {/* Right Side: Preview/Code */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="h-full">
          <div className="flex flex-col h-full">
            {/* Right content area - full width now */}
            <div className="flex-1 overflow-hidden">
              <PreviewPanel 
                className="h-full"
                files={generatedFiles}
                initialView={currentRightTab}
                onViewChange={(view) => setCurrentRightTab(view as "preview" | "code")}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </MainLayout>
  );
};

export default Index;
