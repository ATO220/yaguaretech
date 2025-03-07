
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import React from "react";
import GitHubAuth, { GitHubUser } from "./GitHubAuth";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [githubUser, setGithubUser] = React.useState<GitHubUser | null>(null);

  const handleAuthSuccess = (user: GitHubUser) => {
    setGithubUser(user);
  };

  return (
    <header className="border-b border-yaguaretech-lightgray/50 h-14 px-4 flex items-center justify-between bg-background z-10">
      <div className="flex items-center space-x-4">
        <div className="font-semibold text-foreground">YaguareTech</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <GitHubAuth onAuthSuccess={handleAuthSuccess} />
        
        <ThemeToggle />
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-yaguaretech-gray hover:text-foreground hover:bg-yaguaretech-lightgray/50 transition-all-200"
        >
          <Settings size={16} />
        </Button>
        
        {!githubUser && (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-yaguaretech-gray hover:text-foreground hover:bg-yaguaretech-lightgray/50 rounded-full transition-all-200"
          >
            <User size={16} />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
