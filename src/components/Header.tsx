
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Settings, User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b border-lovable-lightgray/50 h-14 px-4 flex items-center justify-between bg-white z-10">
      <div className="flex items-center space-x-4">
        <div className="font-semibold text-lovable-black">LovableClone</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          className="text-lovable-gray hover:text-lovable-black hover:bg-lovable-lightgray/50 transition-all-200"
        >
          <Github size={16} className="mr-2" />
          Connect GitHub
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-lovable-gray hover:text-lovable-black hover:bg-lovable-lightgray/50 transition-all-200"
        >
          <Settings size={16} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-lovable-gray hover:text-lovable-black hover:bg-lovable-lightgray/50 rounded-full transition-all-200"
        >
          <User size={16} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
