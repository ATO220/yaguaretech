
import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface PreviewViewProps {
  iframeContent: string;
}

const PreviewView: React.FC<PreviewViewProps> = ({ iframeContent }) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Reset loading state when content changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [iframeContent]);

  return (
    <div className="h-full w-full bg-background relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yaguaretech-blue rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-yaguaretech-blue rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-yaguaretech-blue rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}
      <iframe
        title="Preview"
        className="w-full h-full border-none"
        srcDoc={iframeContent}
        sandbox="allow-scripts"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default PreviewView;
