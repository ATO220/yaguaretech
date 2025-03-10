
import React from "react";
import { cn } from "@/lib/utils";
import { Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  isActive?: boolean;
  files?: FileChange[];
  iframeContent?: string;
  explanation?: string;
}

interface HistorySidebarProps {
  className?: string;
  historyItems: HistoryItem[];
  onHistoryItemClick: (item: HistoryItem) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  className, 
  historyItems, 
  onHistoryItemClick 
}) => {
  return (
    <div className={cn("h-full flex flex-col bg-background", className)}>
      <div className="border-b border-border p-4">
        <h2 className="text-sm font-medium text-foreground">Historial</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {historyItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-xs py-2 h-auto",
              item.isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onHistoryItemClick(item)}
          >
            <div className="flex items-start w-full">
              <div className="mr-2 mt-0.5">
                <MessageSquare size={12} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium truncate">{item.title}</div>
                <div className="flex items-center text-[10px] mt-1 text-muted-foreground">
                  <Clock size={10} className="mr-1" />
                  {formatDate(item.timestamp)}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

// Helper function to format dates
const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 60) {
    return `Hace ${diffMins} minutos`;
  } else if (diffMins < 24 * 60) {
    const diffHours = Math.floor(diffMins / 60);
    return `Hace ${diffHours} horas`;
  } else {
    const diffDays = Math.floor(diffMins / (60 * 24));
    return `Hace ${diffDays} días`;
  }
};

export default HistorySidebar;
