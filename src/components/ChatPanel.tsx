import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { generateCode } from "@/services/deepSeekService";
import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import CommandInput from "./CommandInput";

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
      content: "👋 ¡Bienvenido a YaguareTech! Estoy aquí para ayudarte a construir aplicaciones web hermosas. ¿Qué te gustaría crear hoy?",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (command: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: command,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setLoading(true);
    
    try {
      const response = await generateCode({ prompt: command });
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.explanation,
        sender: "system",
        timestamp: new Date(),
        code: response.code,
        files: response.files
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      
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
    <div className={cn("flex flex-col h-full bg-background border-r border-border dark:bg-dark-background dark:border-dark-border", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[90%] rounded-lg animate-slide-up",
              message.sender === "user"
                ? "ml-auto bg-primary/10 text-foreground p-3 dark:bg-dark-primary/10 dark:text-dark-foreground"
                : "mr-auto bg-card border border-border p-3 dark:bg-dark-card dark:border-dark-border"
            )}
          >
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            
            {message.code && !message.files && (
              <div className="mt-3">
                <CodeBlock code={message.code} language="tsx" />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="mr-auto bg-card border border-border p-3 rounded-lg max-w-[90%] animate-pulse-slow dark:bg-dark-card dark:border-dark-border">
            <div className="text-sm flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow dark:bg-dark-primary"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow delay-100 dark:bg-dark-primary"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow delay-200 dark:bg-dark-primary"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border">
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