
interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

export const generateIframeContent = (files: FileChange[]): string => {
  if (files.length === 0) return '';
  
  // Buscar componentes React para mostrar
  const reactComponents = files.filter(f => 
    f.path.includes('.tsx') && 
    !f.path.includes('index.tsx') && 
    f.content.includes('export default')
  );
  
  // Buscar archivo principal o usar el primero como fallback
  const mainFile = reactComponents.length > 0 ? reactComponents[0] : (files.find(f => f.path.includes('.tsx')) || files[0]);
  
  // Extraer el nombre del componente del archivo principal
  const componentName = mainFile.path.split('/').pop()?.replace('.tsx', '') || 'Component';
  
  // Convertir el contenido a una representación HTML
  let previewContent = '';
  
  // Si es un componente de estudiantes/alumnos, mostrar una tabla
  if (
    mainFile.path.toLowerCase().includes('student') || 
    mainFile.path.toLowerCase().includes('alumno') ||
    mainFile.content.toLowerCase().includes('student') ||
    mainFile.content.toLowerCase().includes('alumno')
  ) {
    previewContent = `
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
    `;
  } 
  // Si es un formulario de login
  else if (
    mainFile.path.toLowerCase().includes('login') ||
    mainFile.content.toLowerCase().includes('login') ||
    mainFile.content.toLowerCase().includes('password')
  ) {
    previewContent = `
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form class="space-y-4">
          <div class="space-y-2">
            <label class="block text-gray-700">Email</label>
            <input type="email" placeholder="tu@email.com" class="w-full p-2 border rounded" />
          </div>
          <div class="space-y-2">
            <label class="block text-gray-700">Contraseña</label>
            <input type="password" class="w-full p-2 border rounded" />
          </div>
          <button class="w-full bg-indigo-600 text-white p-2 rounded">Iniciar Sesión</button>
        </form>
      </div>
    `;
  }
  // Si es un componente de productos o catálogo
  else if (
    mainFile.path.toLowerCase().includes('product') ||
    mainFile.path.toLowerCase().includes('catalog') ||
    mainFile.path.toLowerCase().includes('producto') ||
    mainFile.path.toLowerCase().includes('catalogo') ||
    mainFile.content.toLowerCase().includes('product') ||
    mainFile.content.toLowerCase().includes('catalog')
  ) {
    previewContent = `
      <div>
        <h2 class="text-2xl font-bold mb-6">Catálogo de Productos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="border rounded-lg overflow-hidden shadow-sm">
            <img src="https://placehold.co/300x200" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-lg">Producto 1</h3>
              <p class="text-gray-600 mb-2">$99.99</p>
              <p class="text-sm text-gray-500 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button class="bg-indigo-600 text-white px-4 py-2 rounded w-full">Añadir al carrito</button>
            </div>
          </div>
          <div class="border rounded-lg overflow-hidden shadow-sm">
            <img src="https://placehold.co/300x200" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-lg">Producto 2</h3>
              <p class="text-gray-600 mb-2">$149.99</p>
              <p class="text-sm text-gray-500 mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button class="bg-indigo-600 text-white px-4 py-2 rounded w-full">Añadir al carrito</button>
            </div>
          </div>
          <div class="border rounded-lg overflow-hidden shadow-sm">
            <img src="https://placehold.co/300x200" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-lg">Producto 3</h3>
              <p class="text-gray-600 mb-2">$79.99</p>
              <p class="text-sm text-gray-500 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              <button class="bg-indigo-600 text-white px-4 py-2 rounded w-full">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  // Si es un componente de autos o vehículos
  else if (
    mainFile.path.toLowerCase().includes('car') ||
    mainFile.path.toLowerCase().includes('auto') ||
    mainFile.path.toLowerCase().includes('vehicle') ||
    mainFile.path.toLowerCase().includes('vehiculo') ||
    mainFile.content.toLowerCase().includes('car') ||
    mainFile.content.toLowerCase().includes('auto') ||
    mainFile.content.toLowerCase().includes('vehicle')
  ) {
    previewContent = `
      <div>
        <h2 class="text-2xl font-bold mb-6">Catálogo de Vehículos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="border rounded-lg overflow-hidden shadow-sm">
            <img src="https://placehold.co/400x300" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-lg">Toyota Corolla 2023</h3>
              <p class="text-gray-600 mb-2">$24,999</p>
              <div class="flex justify-between text-sm text-gray-500 mb-4">
                <span>Automático</span>
                <span>1.8L</span>
                <span>42 MPG</span>
              </div>
              <button class="bg-indigo-600 text-white px-4 py-2 rounded w-full">Ver detalles</button>
            </div>
          </div>
          <div class="border rounded-lg overflow-hidden shadow-sm">
            <img src="https://placehold.co/400x300" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-lg">Honda Civic 2023</h3>
              <p class="text-gray-600 mb-2">$26,999</p>
              <div class="flex justify-between text-sm text-gray-500 mb-4">
                <span>Automático</span>
                <span>2.0L</span>
                <span>38 MPG</span>
              </div>
              <button class="bg-indigo-600 text-white px-4 py-2 rounded w-full">Ver detalles</button>
            </div>
          </div>
          <div class="border rounded-lg overflow-hidden shadow-sm">
            <img src="https://placehold.co/400x300" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-lg">Ford Mustang 2023</h3>
              <p class="text-gray-600 mb-2">$35,999</p>
              <div class="flex justify-between text-sm text-gray-500 mb-4">
                <span>Manual</span>
                <span>5.0L</span>
                <span>25 MPG</span>
              </div>
              <button class="bg-indigo-600 text-white px-4 py-2 rounded w-full">Ver detalles</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  // Si es un dashboard
  else if (
    mainFile.path.toLowerCase().includes('dashboard') ||
    mainFile.content.toLowerCase().includes('dashboard')
  ) {
    previewContent = `
      <div>
        <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg text-gray-500">Usuarios</h3>
            <p class="text-3xl font-bold">1,234</p>
            <p class="text-sm text-green-500">+12% este mes</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg text-gray-500">Ingresos</h3>
            <p class="text-3xl font-bold">$34,567</p>
            <p class="text-sm text-green-500">+8% este mes</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg text-gray-500">Conversión</h3>
            <p class="text-3xl font-bold">5.67%</p>
            <p class="text-sm text-red-500">-2% este mes</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h3 class="text-lg font-semibold mb-4">Actividad Reciente</h3>
          <div class="space-y-4">
            <div class="flex items-center pb-4 border-b">
              <div class="bg-blue-100 p-2 rounded-full mr-3">👤</div>
              <div>
                <p class="font-medium">Nuevo usuario registrado</p>
                <p class="text-sm text-gray-500">Hace 5 minutos</p>
              </div>
            </div>
            <div class="flex items-center pb-4 border-b">
              <div class="bg-green-100 p-2 rounded-full mr-3">💰</div>
              <div>
                <p class="font-medium">Nueva venta completada</p>
                <p class="text-sm text-gray-500">Hace 12 minutos</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="bg-yellow-100 p-2 rounded-full mr-3">📊</div>
              <div>
                <p class="font-medium">Reporte mensual disponible</p>
                <p class="text-sm text-gray-500">Hace 1 hora</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  // Si es cualquier otro tipo de componente
  else {
    // Crear una representación genérica basada en el nombre del componente
    previewContent = `
      <div class="p-6 border rounded-lg shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">${componentName}</h2>
          <div class="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Componente
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-600">Componente generado para: ${mainFile.path}</p>
        </div>
        <div class="p-4 bg-gray-50 rounded border mb-4">
          <pre class="text-xs overflow-x-auto">${mainFile.path}</pre>
        </div>
        <div class="text-sm text-gray-500">
          <p>Este componente fue generado basado en el código creado.</p>
          <p class="mt-2">Para ver la implementación detallada, revisa la pestaña "Code".</p>
        </div>
      </div>
    `;
  }

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
        ${previewContent}
      </div>
    </body>
    </html>
  `;
  
  return htmlTemplate;
};
