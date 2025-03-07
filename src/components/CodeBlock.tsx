
import React from "react";
import { cn } from "@/lib/utils";
import Editor from "@monaco-editor/react";
import { getLanguageFromFilename } from "@/utils/languageUtils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  readOnly?: boolean;
  height?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  className,
  readOnly = true,
  height = "300px"
}) => {
  // If filename is provided, auto-detect language
  const detectedLanguage = filename ? getLanguageFromFilename(filename) : (language || "typescript");
  
  return (
    <div className={cn("relative rounded-lg overflow-hidden border border-border", className)}>
      <div className="flex items-center justify-between bg-muted px-4 py-2 text-xs text-muted-foreground">
        <span>{filename || detectedLanguage}</span>
      </div>
      <Editor
        height={height}
        language={detectedLanguage}
        value={code}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontSize: 14,
          lineNumbers: "on",
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
          fontFamily: "'Fira Code', monospace",
          fontLigatures: true,
        }}
      />
    </div>
  );
};

export default CodeBlock;
