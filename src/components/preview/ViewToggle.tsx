
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
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "text-xs",
          view === "preview" && "bg-lovable-lightgray/50"
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
          "text-xs",
          view === "code" && "bg-lovable-lightgray/50"
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
