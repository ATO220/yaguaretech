
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
          className="w-full py-3 pl-4 pr-12 text-sm bg-white border rounded-lg resize-none focus:ring-2 focus:ring-lovable-blue focus:border-transparent transition-all-200 outline-none"
          style={{ minHeight: "46px", maxHeight: "200px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={disabled || !command.trim()}
        className="absolute right-1 h-[38px] w-[38px] min-w-[38px] rounded-md bg-lovable-blue text-white hover:bg-lovable-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all-200"
        aria-label="Send command"
      >
        <ArrowRight size={16} />
      </Button>
    </form>
  );
};

export default CommandInput;
