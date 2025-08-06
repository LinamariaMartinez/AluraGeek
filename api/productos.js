// api/productos.js - API principal para GET todos y POST

// Datos iniciales (IMPORTANTE: debe ser el mismo array que en [id].js)
let productos = [
  {
    id: "1",
    nombre: "Flash",
    precio: "50.00",
    imagen: "https://toysmart.co/cdn/shop/products/15266_800x.jpg?v=1632861804",
  },
  {
    id: "2",
    nombre: "Darth Vader",
    precio: "80.00",
    imagen: "https://toysmart.co/cdn/shop/products/09246.jpg?v=1693256332",
  },
];

// Función principal que maneja todas las requests
export default function handler(req, res) {
  // Configurar CORS para permitir requests desde tu frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Manejar preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { method } = req;

  console.log(`${method} request to /api/productos`); // Para debugging

  try {
    switch (method) {
      case "GET":
        handleGet(req, res);
        break;
      case "POST":
        handlePost(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

// GET - Obtener todos los productos
function handleGet(req, res) {
  console.log("GET all products, count:", productos.length);
  res.status(200).json(productos);
}

// POST - Crear nuevo producto
function handlePost(req, res) {
  console.log("POST request, body:", req.body);

  const { nombre, precio, imagen } = req.body;

  // Validaciones
  if (!nombre || !precio || !imagen) {
    return res.status(400).json({
      error: "Datos incompletos",
      message: "nombre, precio e imagen son requeridos",
    });
  }

  if (nombre.trim().length < 2) {
    return res.status(400).json({
      error: "Nombre inválido",
      message: "El nombre debe tener al menos 2 caracteres",
    });
  }

  if (isNaN(precio) || parseFloat(precio) <= 0) {
    return res.status(400).json({
      error: "Precio inválido",
      message: "El precio debe ser un número mayor a 0",
    });
  }

  if (!isValidURL(imagen)) {
    return res.status(400).json({
      error: "URL inválida",
      message: "La imagen debe ser una URL válida",
    });
  }

  // Generar nuevo ID
  const nuevoId =
    productos.length > 0
      ? (Math.max(...productos.map((p) => parseInt(p.id))) + 1).toString()
      : "1";

  // Crear nuevo producto
  const nuevoProducto = {
    id: nuevoId,
    nombre: nombre.trim(),
    precio: parseFloat(precio).toFixed(2),
    imagen: imagen.trim(),
  };

  productos.push(nuevoProducto);
  console.log("Producto agregado:", nuevoProducto);

  res.status(201).json(nuevoProducto);
}

// Utilidad para validar URLs
function isValidURL(string) {
  try {
    new URL(string);
    return string.startsWith("http://") || string.startsWith("https://");
  } catch (_) {
    return false;
  }
}
