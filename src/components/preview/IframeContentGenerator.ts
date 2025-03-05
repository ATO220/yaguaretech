
interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

export const generateIframeContent = (files: FileChange[]): string => {
  if (files.length === 0) return '';
  
  // Buscar archivo principal (App o index) o usar el primero como fallback
  const mainFile = files.find(f => f.path.includes('App.tsx') || f.path.includes('index.tsx')) || files[0];
  
  // Ejemplo simplificado: en un sistema real, compilaríamos los archivos correctamente
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Vista Previa</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding: 1rem; 
        }
      </style>
    </head>
    <body>
      <div id="app">
        <!-- Aquí se renderizaría la aplicación real -->
        <div class="p-4">
          <h1 class="text-2xl font-bold mb-4">Vista Previa</h1>
          <p class="mb-4">Esta es una simulación de la aplicación generada.</p>
          
          ${mainFile.path.includes('StudentList') || files.some(f => f.path.includes('StudentList')) ? `
            <div class="border rounded shadow-sm">
              <div class="flex justify-between items-center p-4 border-b">
                <h2 class="font-semibold">Listado de Alumnos</h2>
                <button class="bg-indigo-600 text-white px-3 py-1 rounded text-sm">Nuevo Alumno</button>
              </div>
              <div class="p-4">
                <input type="text" placeholder="Buscar alumno..." class="w-full border rounded p-2 mb-4"/>
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="text-left p-2">Nombre</th>
                      <th class="text-left p-2">Email</th>
                      <th class="text-left p-2">Calificación</th>
                      <th class="text-center p-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t">
                      <td class="p-2">Ana García</td>
                      <td class="p-2">ana.garcia@escuela.edu</td>
                      <td class="p-2">A</td>
                      <td class="p-2 text-center">
                        <button class="text-blue-500 mr-2">✏️</button>
                        <button class="text-red-500">🗑️</button>
                      </td>
                    </tr>
                    <tr class="border-t">
                      <td class="p-2">Carlos López</td>
                      <td class="p-2">carlos.lopez@escuela.edu</td>
                      <td class="p-2">B+</td>
                      <td class="p-2 text-center">
                        <button class="text-blue-500 mr-2">✏️</button>
                        <button class="text-red-500">🗑️</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ` : `
            <div class="border p-4 rounded bg-gray-50">
              <p>Vista previa generada para: ${mainFile.path}</p>
            </div>
          `}
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlTemplate;
};
