
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, Code, RefreshCw } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface PreviewPanelProps {
  className?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ className }) => {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [loading, setLoading] = useState(false);

  const refreshPreview = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className={cn("flex flex-col h-full bg-lovable-lightgray/30", className)}>
      <div className="flex items-center justify-between p-2 border-b border-lovable-lightgray/50 bg-white">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs",
              view === "preview" && "bg-lovable-lightgray/50"
            )}
            onClick={() => setView("preview")}
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
            onClick={() => setView("code")}
          >
            <Code size={14} className="mr-1" />
            Code
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={refreshPreview}
          disabled={loading}
        >
          <RefreshCw
            size={14}
            className={cn("mr-1", loading && "animate-spin")}
          />
          Refresh
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {view === "preview" ? (
          <div className="h-full w-full bg-white">
            <iframe
              title="Preview"
              className="w-full h-full border-none"
              src="/about:blank"
            />
          </div>
        ) : (
          <div className="h-full overflow-auto p-4">
            <CodeBlock
              code={`import React from "react";
import { Button } from "./Button";

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
