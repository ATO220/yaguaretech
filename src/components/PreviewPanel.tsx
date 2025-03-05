
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, Code, RefreshCw, FileText } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface PreviewPanelProps {
  className?: string;
  files?: FileChange[];
  initialView?: "preview" | "code";
  onViewChange?: (view: "preview" | "code") => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ 
  className, 
  files = [], 
  initialView = "preview",
  onViewChange
}) => {
  const [view, setView] = useState<"preview" | "code">(initialView);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [iframeContent, setIframeContent] = useState<string>("");

  // Sync with external view state if provided
  useEffect(() => {
    if (initialView && initialView !== view) {
      setView(initialView);
    }
  }, [initialView]);

  // Seleccionar el primer archivo cuando los archivos cambian
  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0].path);
    }
  }, [files, selectedFile]);

  // Generar contenido para el iframe basado en los archivos
  useEffect(() => {
    if (files.length > 0) {
      // Buscar archivo principal (App o index) o usar el primero como fallback
      const mainFile = files.find(f => f.path.includes('App.tsx') || f.path.includes('index.tsx')) || files[0];
      
      // Ejemplo simplificado: en un sistema real, compilaríamos los archivos correctamente
      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Vista Previa</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              padding: 1rem; 
            }
          </style>
        </head>
        <body>
          <div id="app">
            <!-- Aquí se renderizaría la aplicación real -->
            <div class="p-4">
              <h1 class="text-2xl font-bold mb-4">Vista Previa</h1>
              <p class="mb-4">Esta es una simulación de la aplicación generada.</p>
              
              ${mainFile.path.includes('StudentList') || files.some(f => f.path.includes('StudentList')) ? `
                <div class="border rounded shadow-sm">
                  <div class="flex justify-between items-center p-4 border-b">
                    <h2 class="font-semibold">Listado de Alumnos</h2>
                    <button class="bg-indigo-600 text-white px-3 py-1 rounded text-sm">Nuevo Alumno</button>
                  </div>
                  <div class="p-4">
                    <input type="text" placeholder="Buscar alumno..." class="w-full border rounded p-2 mb-4"/>
                    <table class="w-full">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="text-left p-2">Nombre</th>
                          <th class="text-left p-2">Email</th>
                          <th class="text-left p-2">Calificación</th>
                          <th class="text-center p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-t">
                          <td class="p-2">Ana García</td>
                          <td class="p-2">ana.garcia@escuela.edu</td>
                          <td class="p-2">A</td>
                          <td class="p-2 text-center">
                            <button class="text-blue-500 mr-2">✏️</button>
                            <button class="text-red-500">🗑️</button>
                          </td>
                        </tr>
                        <tr class="border-t">
                          <td class="p-2">Carlos López</td>
                          <td class="p-2">carlos.lopez@escuela.edu</td>
                          <td class="p-2">B+</td>
                          <td class="p-2 text-center">
                            <button class="text-blue-500 mr-2">✏️</button>
                            <button class="text-red-500">🗑️</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : `
                <div class="border p-4 rounded bg-gray-50">
                  <p>Vista previa generada para: ${mainFile.path}</p>
                </div>
              `}
            </div>
          </div>
        </body>
        </html>
      `;
      
      setIframeContent(htmlTemplate);
    }
  }, [files]);

  const handleViewChange = (newView: "preview" | "code") => {
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };

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
            onClick={() => handleViewChange("preview")}
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
            onClick={() => handleViewChange("code")}
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
              srcDoc={iframeContent}
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <div className="h-full flex">
            {/* Sidebar con lista de archivos */}
            {files.length > 0 && (
              <div className="w-64 border-r border-lovable-lightgray/50 bg-white overflow-y-auto">
                <div className="p-2 text-xs font-medium text-lovable-gray">ARCHIVOS</div>
                <div className="space-y-1 p-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center px-2 py-1.5 text-sm rounded cursor-pointer",
                        selectedFile === file.path
                          ? "bg-lovable-lightgray/50"
                          : "hover:bg-lovable-lightgray/30"
                      )}
                      onClick={() => setSelectedFile(file.path)}
                    >
                      <FileText size={14} className="mr-2 text-lovable-gray" />
                      <span className="text-xs truncate">{file.path.split('/').pop()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Panel de código */}
            <div className="flex-1 overflow-auto p-4">
              {selectedFile ? (
                <>
                  <div className="text-xs font-medium text-lovable-gray mb-2">{selectedFile}</div>
                  <CodeBlock
                    code={files.find(f => f.path === selectedFile)?.content || '// Archivo no encontrado'}
                    language={selectedFile.endsWith('.tsx') || selectedFile.endsWith('.ts') ? 'tsx' : 'jsx'}
                  />
                </>
              ) : (
                <div className="text-center text-lovable-gray py-8">
                  No hay archivos para mostrar
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
