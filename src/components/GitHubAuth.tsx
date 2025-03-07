
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Github, User } from "lucide-react";
import React, { useEffect, useState } from "react";

interface GitHubAuthProps {
  onAuthSuccess?: (userData: GitHubUser) => void;
}

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
}

const GitHubAuth: React.FC<GitHubAuthProps> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const { toast } = useToast();

  // Verificar si ya hay un token almacenado
  useEffect(() => {
    const githubToken = localStorage.getItem("github_token");
    const githubUser = localStorage.getItem("github_user");
    
    if (githubToken && githubUser) {
      try {
        const userData = JSON.parse(githubUser);
        setUser(userData);
        onAuthSuccess?.(userData);
      } catch (error) {
        console.error("Error parsing GitHub user data:", error);
      }
    }
  }, [onAuthSuccess]);

  const handleGitHubAuth = () => {
    setIsLoading(true);
    
    // Generar un estado aleatorio para prevenir CSRF
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("github_oauth_state", state);
    
    // Configurar parámetros OAuth
    const clientId = "YOUR_GITHUB_CLIENT_ID"; // En producción, esto vendría de una variable de entorno
    const redirectUri = `${window.location.origin}/api/github/callback`;
    const scope = "repo workflow read:user";
    
    // Construir la URL de autorización
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
    
    // Redirigir al usuario a GitHub para autenticación
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("github_token");
    localStorage.removeItem("github_user");
    setUser(null);
    toast({
      title: "Desconectado",
      description: "Tu cuenta de GitHub ha sido desconectada correctamente.",
    });
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-yaguaretech-gray text-sm">
          <span className="hidden md:inline">Conectado como </span>
          <span className="font-medium">@{user.login}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-yaguaretech-gray hover:text-yaguaretech-black hover:bg-yaguaretech-lightgray/50 rounded-full transition-all-200"
          onClick={handleLogout}
        >
          {user.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <User size={16} />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="text-yaguaretech-gray hover:text-yaguaretech-black hover:bg-yaguaretech-lightgray/50 transition-all-200"
      onClick={handleGitHubAuth}
      disabled={isLoading}
    >
      <Github size={16} className="mr-2" />
      {isLoading ? "Conectando..." : "Connect GitHub"}
    </Button>
  );
};

export default GitHubAuth;
