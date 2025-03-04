
import React, { useState } from "react";
import CommandInput from "./CommandInput";
import { cn } from "@/lib/utils";
import CodeBlock from "./CodeBlock";

interface Message {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
}

interface ChatPanelProps {
  className?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Welcome to Lovable Clone! I'm here to help you build beautiful web applications. What would you like to create today?",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (command: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: command,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll help you build that! Let me generate some code for you.",
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
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
          placeholder="Tell me what you want to build..."
          disabled={loading} 
        />
      </div>
    </div>
  );
};

export default ChatPanel;
