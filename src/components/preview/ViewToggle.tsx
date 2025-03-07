
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, Code } from "lucide-react";

interface ViewToggleProps {
  view: "preview" | "code";
  onViewChange: (view: "preview" | "code") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-yaguaretech-lightgray/40 p-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-7 rounded-md px-3 text-xs font-medium",
          view === "preview" 
            ? "bg-white text-yaguaretech-black shadow-sm"
            : "text-yaguaretech-gray hover:bg-white/40 hover:text-yaguaretech-black"
        )}
        onClick={() => onViewChange("preview")}
      >
        <Eye size={14} className="mr-1" />
        Preview
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-7 rounded-md px-3 text-xs font-medium",
          view === "code" 
            ? "bg-white text-yaguaretech-black shadow-sm"
            : "text-yaguaretech-gray hover:bg-white/40 hover:text-yaguaretech-black"
        )}
        onClick={() => onViewChange("code")}
      >
        <Code size={14} className="mr-1" />
        Code
      </Button>
    </div>
  );
};

export default ViewToggle;
