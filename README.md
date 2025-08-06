# AluraGeek

Aplicación web interactiva para gestionar productos geek con operaciones de agregar, mostrar y eliminar. Diseño completamente responsivo con experiencia optimizada para todos los dispositivos.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://alura-geek-beta-wine.vercel.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🚀 [Ver Demo](https://alura-geek-beta-wine.vercel.app)

## ✨ Características

- **Formulario interactivo** con validación en tiempo real
- **Gestión de productos** - agregar, visualizar y eliminar
- **Diseño responsivo** - desktop (3-4 productos por fila) y mobile (2 columnas)
- **API REST** con serverless functions en Vercel
- **Notificaciones elegantes** con animaciones suaves
- **Header fijo** y scroll optimizado por secciones

## 🛠️ Tecnologías

- **HTML5, CSS3, JavaScript ES6+**
- **Fetch API** para comunicación con backend
- **JSON Server** para desarrollo local
- **Vercel** para deployment con serverless functions
- **Responsive Design** con CSS Grid y Flexbox

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/LinamariaMartinez/AluraGeek.git
cd AluraGeek

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Luego abre `index.html` en tu navegador.

## 📁 Estructura

```
AluraGeek/
├── index.html              # Página principal
├── style.css               # Estilos responsivos
├── db.json                 # Base de datos simulada
├── api/                    # Serverless functions
│   ├── productos.js        # GET todos, POST
│   └── productos/[id].js   # GET y DELETE específicos
└── js/
    ├── main.js             # Lógica principal
    ├── api/productosApi.js # Cliente API
    └── utils/              # Utilidades de UI
```

## 🎯 Funcionalidades

### Formulario
- Validación de campos en tiempo real
- Mensajes de error descriptivos
- Limpieza rápida del formulario

### Productos
- Grid responsivo adaptativo
- Eliminación con confirmación
- Notificaciones de estado

### Responsive
- **Desktop**: Layout horizontal con scroll interno
- **Mobile**: Header fijo, productos en 2 columnas
- **Tablet**: Balance intermedio optimizado

## 🔧 Scripts

```bash
npm start    # Iniciar JSON Server (desarrollo)
npm install  # Instalar dependencias
```

## 🚀 Deployment

El proyecto se despliega automáticamente en Vercel con cada push a `main`. La API funciona tanto en desarrollo (JSON Server) como en producción (serverless functions).

## 👩‍💻 Autora

**Linamaría Martínez**

Desarrollado como parte del programa Oracle Next Education (ONE) - Challenge Frontend 2024/2025

---

[![Alura Latam](https://img.shields.io/badge/Alura-Latam-blue?style=flat)](https://www.aluracursos.com/)
[![Oracle](https://img.shields.io/badge/Oracle-Next%20Education-red?style=flat)](https://www.oracle.com/mx/education/oracle-next-education/)
