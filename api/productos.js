// API Serverless para Vercel

// Datos iniciales (en producción real usarías una base de datos)
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

  const { method, query } = req;
  const id = query.id;

  try {
    switch (method) {
      case "GET":
        handleGet(req, res, id);
        break;
      case "POST":
        handlePost(req, res);
        break;
      case "PUT":
        handlePut(req, res, id);
        break;
      case "DELETE":
        handleDelete(req, res, id);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

// GET - Obtener todos los productos o uno específico
function handleGet(req, res, id) {
  if (id) {
    // Obtener producto específico
    const producto = productos.find((p) => p.id === id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json(producto);
  }

  // Obtener todos los productos
  res.status(200).json(productos);
}

// POST - Crear nuevo producto
function handlePost(req, res) {
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

  res.status(201).json(nuevoProducto);
}

// PUT - Actualizar producto existente
function handlePut(req, res, id) {
  if (!id) {
    return res.status(400).json({ error: "ID requerido para actualizar" });
  }

  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { nombre, precio, imagen } = req.body;

  // Validaciones (similares al POST)
  if (nombre && nombre.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "El nombre debe tener al menos 2 caracteres" });
  }

  if (precio && (isNaN(precio) || parseFloat(precio) <= 0)) {
    return res
      .status(400)
      .json({ error: "El precio debe ser un número mayor a 0" });
  }

  if (imagen && !isValidURL(imagen)) {
    return res.status(400).json({ error: "La imagen debe ser una URL válida" });
  }

  // Actualizar producto
  const productoActualizado = {
    ...productos[index],
    ...(nombre && { nombre: nombre.trim() }),
    ...(precio && { precio: parseFloat(precio).toFixed(2) }),
    ...(imagen && { imagen: imagen.trim() }),
  };

  productos[index] = productoActualizado;

  res.status(200).json(productoActualizado);
}

// DELETE - Eliminar producto
function handleDelete(req, res, id) {
  if (!id) {
    return res.status(400).json({ error: "ID requerido para eliminar" });
  }

  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const productoEliminado = productos.splice(index, 1)[0];

  res.status(200).json({
    message: "Producto eliminado exitosamente",
    producto: productoEliminado,
  });
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
