
import React, { useState } from "react";
import CommandInput from "./CommandInput";
import { cn } from "@/lib/utils";
import CodeBlock from "./CodeBlock";
import { generateCode } from "@/services/deepSeekService";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
  code?: string;
  files?: FileChange[];
}

interface ChatPanelProps {
  className?: string;
  onFilesGenerated?: (files: FileChange[]) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ className, onFilesGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 ¡Bienvenido a Lovable Clone! Estoy aquí para ayudarte a construir aplicaciones web hermosas. ¿Qué te gustaría crear hoy?",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (command: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: command,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setLoading(true);
    
    try {
      // Enviar prompt a DeepSeek
      const response = await generateCode({ prompt: command });
      
      // Agregar respuesta del sistema
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.explanation,
        sender: "system",
        timestamp: new Date(),
        code: response.code,
        files: response.files
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      
      // Notificar a los componentes padres sobre los archivos generados
      if (response.files && onFilesGenerated) {
        onFilesGenerated(response.files);
      }
    } catch (error) {
      console.error("Error al generar código:", error);
      
      toast({
        variant: "destructive",
        title: "Error de generación",
        description: "No se pudo generar el código. Por favor, intenta de nuevo.",
      });
      
      // Agregar mensaje de error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, hubo un error al generar el código. Por favor, intenta con un prompt diferente o revisa tu conexión a internet.",
        sender: "system",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-white border-r border-lovable-lightgray/50", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[90%] rounded-lg animate-slide-up",
              message.sender === "user"
                ? "ml-auto bg-lovable-blue/10 text-lovable-black p-3"
                : "mr-auto bg-white border border-lovable-lightgray/50 p-3"
            )}
          >
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            
            {message.code && !message.files && (
              <div className="mt-3">
                <CodeBlock code={message.code} language="tsx" />
              </div>
            )}
            
            {message.files && message.files.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="text-xs font-medium text-lovable-gray">Archivos modificados:</div>
                {message.files.map((file, index) => (
                  <div key={index} className="border border-lovable-lightgray/50 rounded-md overflow-hidden">
                    <div className="bg-lovable-lightgray/30 px-3 py-2 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText size={14} className="text-lovable-gray" />
                        <span className="text-xs font-medium">{file.path}</span>
                      </div>
                      <Badge className={cn(
                        "text-xs",
                        file.action === 'create' ? 'bg-green-100 text-green-800' :
                        file.action === 'update' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      )}>
                        {file.action === 'create' ? 'Creado' : 
                         file.action === 'update' ? 'Actualizado' : 'Eliminado'}
                      </Badge>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <CodeBlock code={file.content} language={file.path.endsWith('.tsx') || file.path.endsWith('.ts') ? 'tsx' : 'jsx'} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="mr-auto bg-white border border-lovable-lightgray/50 p-3 rounded-lg max-w-[90%] animate-pulse-slow">
            <div className="text-sm flex items-center space-x-1">
              <div className="w-2 h-2 bg-lovable-blue rounded-full animate-pulse-slow"></div>
              <div className="w-2 h-2 bg-lovable-blue rounded-full animate-pulse-slow delay-100"></div>
              <div className="w-2 h-2 bg-lovable-blue rounded-full animate-pulse-slow delay-200"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-lovable-lightgray/50">
        <CommandInput 
          onSubmit={handleSubmit} 
          placeholder="Dime qué quieres construir..."
          disabled={loading} 
        />
      </div>
    </div>
  );
};

export default ChatPanel;
