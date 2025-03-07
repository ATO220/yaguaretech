
import { exchangeCodeForToken } from "@/api/github";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GitHubCallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Obtener los parámetros de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      
      if (!code || !state) {
        setError("Parámetros de autenticación faltantes");
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: "No se pudieron obtener los parámetros necesarios para la autenticación",
        });
        return;
      }
      
      try {
        // Intercambiar el código por un token de acceso
        const authData = await exchangeCodeForToken(code, state);
        
        // Mostrar notificación de éxito
        toast({
          title: "¡Conexión exitosa!",
          description: `Conectado como @${authData.user.login}`,
        });
        
        // Redirigir al usuario de vuelta a la página principal
        navigate("/");
      } catch (error) {
        console.error("Error en el callback de GitHub:", error);
        setError("Error al procesar la autenticación de GitHub");
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: error instanceof Error ? error.message : "Error desconocido",
        });
      }
    };
    
    handleCallback();
  }, [toast, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {error ? (
        <div className="text-red-500">
          <h1 className="text-xl font-bold">Error de autenticación</h1>
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-yaguaretech-blue text-white rounded"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-yaguaretech-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <h1 className="text-xl font-bold">Autenticando con GitHub...</h1>
          <p className="text-yaguaretech-gray">Estamos procesando tu autenticación, espera un momento...</p>
        </div>
      )}
    </div>
  );
};

export default GitHubCallback;
