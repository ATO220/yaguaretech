
import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  className,
}) => {
  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <div className="flex items-center justify-between bg-lovable-darkgray px-4 py-2 text-xs text-white">
        <span>{language}</span>
      </div>
      <pre className="bg-[#1E1E1E] text-white p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
