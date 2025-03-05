// Este archivo simula la interacción con la API de DeepSeek

interface DeepSeekResponse {
  code: string;
  explanation: string;
  followUpQuestions?: string[];
  generationId: string;
  files?: FileChange[];  // Nuevo: array de cambios en archivos
}

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
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

// Genera un código "falso" basado en el prompt con iteración de archivos
function generateMockCode(prompt: string): DeepSeekResponse {
  const technologies = ["React", "Node.js", "MongoDB", "Express"];
  const tech = technologies[Math.floor(Math.random() * technologies.length)];
  
  // Detectamos si el prompt es para un listado de alumnos
  if (prompt.toLowerCase().includes("alumno") || prompt.toLowerCase().includes("estudiante")) {
    return {
      code: `// Este código será reemplazado por los archivos individuales`,
      explanation: "He analizado tu solicitud de crear una aplicación de listado de alumnos. A continuación, te muestro los archivos que he creado/modificado para implementar esta funcionalidad:",
      generationId: `gen_${Math.random().toString(36).substring(2, 10)}`,
      files: [
        {
          path: "src/components/StudentList.tsx",
          action: "create",
          content: `import React, { useState, useEffect } from 'react';
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  enrollmentDate: Date;
}

// Datos de ejemplo
const initialStudents: Student[] = [
  { 
    id: "1", 
    name: "Ana García", 
    email: "ana.garcia@escuela.edu", 
    grade: "A", 
    enrollmentDate: new Date('2023-09-01') 
  },
  { 
    id: "2", 
    name: "Carlos López", 
    email: "carlos.lopez@escuela.edu", 
    grade: "B+", 
    enrollmentDate: new Date('2023-09-03') 
  },
  { 
    id: "3", 
    name: "María Rodríguez", 
    email: "maria.rodriguez@escuela.edu", 
    grade: "A-", 
    enrollmentDate: new Date('2023-08-28') 
  },
];

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Listado de Alumnos</h1>
        <Button className="bg-lovable-blue hover:bg-lovable-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Alumno
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Buscar alumno..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <thead className="bg-lovable-lightgray/30">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Calificación</th>
              <th className="px-4 py-3 text-left">Fecha de Inscripción</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-t border-lovable-lightgray/50">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.grade}</td>
                <td className="px-4 py-3">{student.enrollmentDate.toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StudentList;`
        },
        {
          path: "src/pages/Students.tsx",
          action: "create",
          content: `import React from "react";
import MainLayout from "@/layouts/MainLayout";
import StudentList from "@/components/StudentList";

const Students = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <StudentList />
      </div>
    </MainLayout>
  );
};

export default Students;`
        },
        {
          path: "src/App.tsx",
          action: "update",
          content: `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import GitHubCallback from '@/components/GitHubCallback';
import Students from '@/pages/Students';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/students" element={<Students />} />
        <Route path="/api/github/callback" element={<GitHubCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}`
        }
      ]
    };
  } else if (prompt.toLowerCase().includes("login")) {
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
    return {
      code: `// Código genérico generado`,
      explanation: `He generado una estructura básica para tu solicitud: "${prompt}". Puedes ver los archivos generados en la pestaña de código.`,
      generationId: `gen_${Math.random().toString(36).substring(2, 10)}`,
      files: [
        {
          path: `src/components/Generated${tech.replace('.', '')}Component.tsx`,
          action: "create",
          content: `
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

export default GeneratedComponent;`
        }
      ]
    };
  }
}

export async function generateCode(options: GenerationOptions): Promise<DeepSeekResponse> {
  const fullOptions = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    console.log("Generando código con opciones:", fullOptions);
    
    // Simulamos el tiempo de respuesta de la API
    await delay(3000);
    
    // Generamos un código "falso" basado en el prompt con iteración de archivos
    const response = generateMockCode(options.prompt);
    
    return response;
  } catch (error) {
    console.error("Error generando código:", error);
    throw error;
  }
}
