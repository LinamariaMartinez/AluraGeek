// api/productos/[id].js - API con ruta dinámica para Vercel

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
  const id = query.id; // Vercel automáticamente extrae el [id] de la URL

  console.log(`${method} request, ID: ${id}`); // Para debugging

  try {
    switch (method) {
      case "GET":
        handleGet(req, res, id);
        break;
      case "DELETE":
        handleDelete(req, res, id);
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

// GET - Obtener producto específico
function handleGet(req, res, id) {
  console.log("GET request for ID:", id);

  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(200).json(producto);
}

// DELETE - Eliminar producto
function handleDelete(req, res, id) {
  console.log("DELETE request for ID:", id);

  if (!id) {
    return res.status(400).json({ error: "ID requerido para eliminar" });
  }

  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado", id: id });
  }

  const productoEliminado = productos.splice(index, 1)[0];
  console.log("Producto eliminado:", productoEliminado);

  res.status(200).json({
    message: "Producto eliminado exitosamente",
    producto: productoEliminado,
  });
}
