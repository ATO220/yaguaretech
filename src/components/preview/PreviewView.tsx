
import React from "react";

interface PreviewViewProps {
  iframeContent: string;
}

const PreviewView: React.FC<PreviewViewProps> = ({ iframeContent }) => {
  return (
    <div className="h-full w-full bg-white">
      <iframe
        title="Preview"
        className="w-full h-full border-none"
        srcDoc={iframeContent}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default PreviewView;
