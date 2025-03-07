import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import React, { useState } from "react";

interface CommandInputProps {
  onSubmit: (command: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CommandInput: React.FC<CommandInputProps> = ({
  onSubmit,
  placeholder = "Type a command...",
  disabled = false,
}) => {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !disabled) {
      onSubmit(command);
      setCommand("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-[95%] mx-auto"
    >
      <div className="relative flex-1">
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full py-3 pl-4 pr-16 text-sm bg-background border rounded-lg resize-none focus:ring-2 focus:ring-yaguaretech-blue focus:border-transparent transition-all-200 outline-none dark:bg-muted dark:border-dark-border dark:text-dark-foreground"
          style={{
            minHeight: "46px",
            maxHeight: "200px",
            paddingTop: "0.875rem", // Ajuste específico para el padding superior
            paddingBottom: "0.875rem", // Ajuste específico para el padding inferior
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <Button
          type="submit"
          disabled={disabled || !command.trim()}
          className="absolute right-2 top-[calc(50%-1px)] h-[42px] w-[42px] min-w-[42px] rounded-full bg-yaguaretech-blue/90 hover:bg-yaguaretech-blue backdrop-blur-lg border-2 border-white/20 shadow-lg hover:shadow-yaguaretech-blue/30 hover:scale-105 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yaguaretech-blue/90 disabled:hover:shadow-lg disabled:hover:scale-100"
          style={{ transform: "translateY(-55%)" }}
          aria-label="Send command"
        >
          <div className="relative">
            <ArrowUp
              size={24}
              className="text-white transition-transform group-hover:-translate-y-0.5"
            />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent]" />
          </div>
        </Button>
      </div>
    </form>
  );
};

export default CommandInput;
