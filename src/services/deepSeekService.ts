
// Este archivo simula la interacción con la API de DeepSeek

import { toast } from "@/hooks/use-toast";

interface DeepSeekResponse {
  code: string;
  explanation: string;
  followUpQuestions?: string[];
  generationId: string;
}

interface GenerationOptions {
  prompt: string;
  context?: string;
  max_iterations?: number;
  temperature?: number;
}

const DEFAULT_OPTIONS = {
  context: "Genera código full-stack (React + Node.js). Prioriza uso de MongoDB. Si hay ambigüedades, pregunta al usuario.",
  max_iterations: 3,
  temperature: 0.2
};

// Simulamos un retraso para imitar la latencia de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Genera un código "falso" basado en el prompt
function generateMockCode(prompt: string): string {
  const technologies = ["React", "Node.js", "MongoDB", "Express"];
  const tech = technologies[Math.floor(Math.random() * technologies.length)];
  
  if (prompt.toLowerCase().includes("login")) {
    return `
// Login Component
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
`;
  } else if (prompt.toLowerCase().includes("dashboard")) {
    return `
// Dashboard Component
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener los proyectos
    fetchProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const fetchProjects = async () => {
    // Simulamos datos de proyectos
    await delay(1000);
    return [
      { id: 1, name: 'Proyecto A', status: 'active' },
      { id: 2, name: 'Proyecto B', status: 'completed' },
      { id: 3, name: 'Proyecto C', status: 'pending' }
    ];
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <span className={\`status \${project.status}\`}>{project.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
`;
  } else {
    return `
// ${tech} Component generado por DeepSeek
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="generated-component">
      <h2>Componente generado basado en: "${prompt}"</h2>
      <p>Este es un ejemplo de código generado por DeepSeek-V3</p>
      <div className="tech-stack">
        <span>Tecnología utilizada: ${tech}</span>
      </div>
    </div>
  );
};

export default GeneratedComponent;
`;
  }
}

export async function generateCode(options: GenerationOptions): Promise<DeepSeekResponse> {
  const fullOptions = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    console.log("Generando código con opciones:", fullOptions);
    
    // Simulamos el tiempo de respuesta de la API
    await delay(3000);
    
    // Generamos un código "falso" basado en el prompt
    const generatedCode = generateMockCode(options.prompt);
    
    return {
      code: generatedCode,
      explanation: `He generado este código basado en tu prompt: "${options.prompt}". 
Está escrito siguiendo las mejores prácticas de React y Node.js.`,
      followUpQuestions: [
        "¿Quieres añadir alguna funcionalidad adicional?",
        "¿Necesitas modificar alguna parte del código?",
        "¿Quieres que explique alguna parte específica del código?"
      ],
      generationId: `gen_${Math.random().toString(36).substring(2, 10)}`
    };
  } catch (error) {
    console.error("Error generando código:", error);
    throw error;
  }
}
