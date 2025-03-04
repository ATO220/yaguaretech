
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
}

interface FileExplorerProps {
  className?: string;
  onFileSelect?: (path: string) => void;
}

const mockFiles: FileNode[] = [
  {
    name: "src",
    type: "folder",
    path: "src",
    children: [
      {
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          { name: "Button.tsx", type: "file", path: "src/components/Button.tsx" },
          { name: "Card.tsx", type: "file", path: "src/components/Card.tsx" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        path: "src/pages",
        children: [
          { name: "Index.tsx", type: "file", path: "src/pages/Index.tsx" },
          { name: "About.tsx", type: "file", path: "src/pages/About.tsx" },
        ],
      },
      { name: "App.tsx", type: "file", path: "src/App.tsx" },
      { name: "main.tsx", type: "file", path: "src/main.tsx" },
    ],
  },
  {
    name: "public",
    type: "folder",
    path: "public",
    children: [
      { name: "favicon.ico", type: "file", path: "public/favicon.ico" },
      { name: "robots.txt", type: "file", path: "public/robots.txt" },
    ],
  },
  { name: "package.json", type: "file", path: "package.json" },
  { name: "README.md", type: "file", path: "README.md" },
];

const FileExplorer: React.FC<FileExplorerProps> = ({
  className,
  onFileSelect = () => {},
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src"]));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleFileClick = (path: string) => {
    setSelectedFile(path);
    onFileSelect(path);
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path} style={{ marginLeft: `${level * 12}px` }}>
        {node.type === "folder" ? (
          <>
            <div
              className="flex items-center py-1.5 px-2 text-sm hover:bg-lovable-lightgray/50 rounded cursor-pointer transition-all-200"
              onClick={() => toggleFolder(node.path)}
            >
              {expandedFolders.has(node.path) ? (
                <ChevronDown size={14} className="mr-1 text-lovable-gray" />
              ) : (
                <ChevronRight size={14} className="mr-1 text-lovable-gray" />
              )}
              <Folder size={14} className="mr-2 text-lovable-blue" />
              <span>{node.name}</span>
            </div>
            {expandedFolders.has(node.path) && node.children && (
              <div>{renderFileTree(node.children, level + 1)}</div>
            )}
          </>
        ) : (
          <div
            className={cn(
              "flex items-center py-1.5 px-2 text-sm hover:bg-lovable-lightgray/50 rounded cursor-pointer transition-all-200",
              selectedFile === node.path && "bg-lovable-lightgray/70"
            )}
            onClick={() => handleFileClick(node.path)}
          >
            <File size={14} className="mr-2 ml-3 text-lovable-gray" />
            <span>{node.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={cn("h-full overflow-y-auto bg-white p-2", className)}>
      <div className="text-xs font-medium mb-2 text-lovable-gray px-2">
        FILES
      </div>
      {renderFileTree(mockFiles)}
    </div>
  );
};

export default FileExplorer;
