
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, File, Folder, FileText } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
}

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface FileExplorerProps {
  className?: string;
  onFileSelect?: (path: string) => void;
  generatedFiles?: FileChange[];
}

// Función para convertir archivos planos a estructura de árbol
const buildFileTree = (files: FileChange[]): FileNode[] => {
  const root: { [key: string]: FileNode } = {};
  
  // Primero creamos todas las carpetas necesarias
  files.forEach(file => {
    const pathParts = file.path.split('/');
    let currentLevel = root;
    let currentPath = "";
    
    // Crear la estructura de carpetas
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      
      if (!currentLevel[currentPath]) {
        currentLevel[currentPath] = {
          name: part,
          type: "folder",
          path: currentPath,
          children: []
        };
      }
    }
  });
  
  // Después agregamos los archivos a sus carpetas correspondientes
  files.forEach(file => {
    const pathParts = file.path.split('/');
    const fileName = pathParts.pop() || "";
    const parentPath = pathParts.join('/');
    
    const fileNode: FileNode = {
      name: fileName,
      type: "file",
      path: file.path
    };
    
    if (parentPath === "") {
      // Archivos en la raíz
      if (!root[file.path]) {
        root[file.path] = fileNode;
      }
    } else {
      // Archivos en carpetas
      if (root[parentPath] && root[parentPath].children) {
        const existingFile = root[parentPath].children?.find(child => child.path === file.path);
        if (!existingFile) {
          root[parentPath].children?.push(fileNode);
        }
      }
    }
  });
  
  // Organizamos el árbol para que las carpetas contengan sus hijos correctamente
  Object.keys(root).forEach(path => {
    const node = root[path];
    if (node.type === "folder") {
      const parentPath = path.split('/').slice(0, -1).join('/');
      if (parentPath && root[parentPath]) {
        const parent = root[parentPath];
        if (parent.children) {
          // Evitar duplicados
          const exists = parent.children.some(child => child.path === node.path);
          if (!exists) {
            parent.children.push(node);
          }
        }
      }
    }
  });
  
  // Obtenemos solo los nodos de nivel raíz
  return Object.values(root).filter(node => {
    const pathParts = node.path.split('/');
    return pathParts.length === 1;
  });
};

const FileExplorer: React.FC<FileExplorerProps> = ({
  className,
  onFileSelect = () => {},
  generatedFiles = []
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src"]));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  
  // Inicialización con archivos de ejemplo más los generados
  useEffect(() => {
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
    
    // Si hay archivos generados, los integramos al árbol
    if (generatedFiles.length > 0) {
      const generatedTree = buildFileTree(generatedFiles);
      
      // Combina los archivos generados con los mock para la visualización
      const combinedTree = [...mockFiles];
      
      // Expandir automáticamente las carpetas con archivos generados
      const newExpandedFolders = new Set(expandedFolders);
      
      generatedFiles.forEach(file => {
        const pathParts = file.path.split('/');
        let currentPath = "";
        
        // Expandir todas las carpetas padre
        for (let i = 0; i < pathParts.length - 1; i++) {
          currentPath = currentPath ? `${currentPath}/${pathParts[i]}` : pathParts[i];
          newExpandedFolders.add(currentPath);
        }
        
        // Si es un archivo nuevo, lo destacamos seleccionándolo
        if (file.action === 'create' && !selectedFile) {
          setSelectedFile(file.path);
          onFileSelect(file.path);
        }
      });
      
      setExpandedFolders(newExpandedFolders);
      setFileTree(combinedTree);
    } else {
      setFileTree(mockFiles);
    }
  }, [generatedFiles, expandedFolders, onFileSelect, selectedFile]);

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

  // Verificar si un archivo está en los generados y su acción
  const getFileAction = (path: string): 'create' | 'update' | 'delete' | null => {
    const file = generatedFiles.find(f => f.path === path);
    return file ? file.action : null;
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
            <FileText size={14} className="mr-2 ml-3 text-lovable-gray" />
            <span className="flex-1">{node.name}</span>
            
            {/* Indicador de archivo generado */}
            {getFileAction(node.path) && (
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                getFileAction(node.path) === 'create' ? 'bg-green-100 text-green-800' :
                getFileAction(node.path) === 'update' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              )}>
                {getFileAction(node.path) === 'create' ? '+' : 
                 getFileAction(node.path) === 'update' ? '~' : '-'}
              </span>
            )}
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
      {renderFileTree(fileTree)}
    </div>
  );
};

export default FileExplorer;
