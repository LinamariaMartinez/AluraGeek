const API_URL = "http://localhost:3000/productos";

// Función auxiliar para mostrar notificaciones
const mostrarNotificacion = (mensaje, tipo = "info") => {
  // Verificar si ya existe una notificación y removerla
  const notificacionExistente = document.querySelector(".notificacion");
  if (notificacionExistente) {
    notificacionExistente.remove();
  }

  const notificacion = document.createElement("div");
  notificacion.className = `notificacion notificacion-${tipo}`;

  // Crear el contenido con icono
  const iconos = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  notificacion.innerHTML = `
        <span class="notificacion-icono">${iconos[tipo] || iconos.info}</span>
        <span class="notificacion-mensaje">${mensaje}</span>
        <button class="notificacion-cerrar">×</button>
    `;

  // Estilos
  Object.assign(notificacion.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "20px 25px",
    borderRadius: "10px",
    color: "white",
    fontFamily: "IBM Plex Mono, monospace",
    fontSize: "16px",
    fontWeight: "bold",
    zIndex: "10000",
    backgroundColor:
      tipo === "error" ? "#dc3545" : tipo === "success" ? "#28a745" : "#007bff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    border: `3px solid ${tipo === "error" ? "#b02a37" : tipo === "success" ? "#1e7e34" : "#0056b3"}`,
    display: "flex",
    alignItems: "center",
    gap: "15px",
    minWidth: "400px",
    maxWidth: "500px",
    opacity: "0",
    transform: "translateX(100%)",
    transition: "all 0.4s ease-out",
  });

  // Estilos para el botón de cerrar
  const btnCerrar = notificacion.querySelector(".notificacion-cerrar");
  Object.assign(btnCerrar.style, {
    background: "rgba(255,255,255,0.3)",
    border: "2px solid white",
    borderRadius: "50%",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "4px 7px",
    marginLeft: "auto",
    minWidth: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  });

  // Event listener para cerrar manualmente
  btnCerrar.addEventListener("click", () => {
    cerrarNotificacion();
  });

  // Hover effects
  btnCerrar.addEventListener("mouseenter", () => {
    btnCerrar.style.background = "rgba(255,255,255,0.6)";
    btnCerrar.style.transform = "scale(1.1)";
  });

  btnCerrar.addEventListener("mouseleave", () => {
    btnCerrar.style.background = "rgba(255,255,255,0.3)";
    btnCerrar.style.transform = "scale(1)";
  });

  document.body.appendChild(notificacion);

  // Función para cerrar con animación suave
  const cerrarNotificacion = () => {
    notificacion.style.opacity = "0";
    notificacion.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        notificacion.remove();
      }
    }, 400);
  };

  // Animación de entrada
  setTimeout(() => {
    notificacion.style.opacity = "1";
    notificacion.style.transform = "translateX(0)";
  }, 50);

  // Auto-cerrar después de 6 segundos (tiempo perfecto)
  setTimeout(() => {
    if (document.body.contains(notificacion)) {
      cerrarNotificacion();
    }
  }, 6000);
};

// Obtener productos desde la API
export const obtenerProductos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`,
      );
    }
    const productos = await response.json();

    // Validar que sea un array
    if (!Array.isArray(productos)) {
      throw new Error("La respuesta de la API no es un array válido");
    }

    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    mostrarNotificacion(
      "Error al cargar los productos. ¿Está corriendo JSON Server?",
      "error",
    );
    return [];
  }
};

// Validar datos del producto
const validarProducto = (producto) => {
  const errores = [];

  if (!producto.nombre || producto.nombre.trim().length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres");
  }

  if (
    !producto.precio ||
    isNaN(producto.precio) ||
    parseFloat(producto.precio) <= 0
  ) {
    errores.push("El precio debe ser un número mayor a 0");
  }

  if (!producto.imagen || !isValidURL(producto.imagen)) {
    errores.push("La URL de la imagen no es válida");
  }

  return errores;
};

// Validar URL
const isValidURL = (string) => {
  try {
    new URL(string);
    return string.startsWith("http://") || string.startsWith("https://");
  } catch (_) {
    return false;
  }
};

// Agregar un producto a la API
export const agregarProducto = async (producto) => {
  try {
    // Validar datos antes de enviar
    const errores = validarProducto(producto);
    if (errores.length > 0) {
      mostrarNotificacion(`Errores: ${errores.join(", ")}`, "error");
      return null;
    }

    // Limpiar datos
    const productoLimpio = {
      nombre: producto.nombre.trim(),
      precio: parseFloat(producto.precio).toFixed(2),
      imagen: producto.imagen.trim(),
    };

    // Obtener productos actuales para calcular ID
    const productos = await obtenerProductos();

    // Calcular nuevo ID
    const nuevoId =
      productos.length > 0
        ? (
            Math.max(...productos.map((prod) => parseInt(prod.id) || 0)) + 1
          ).toString()
        : "1";

    const productoConId = { id: nuevoId, ...productoLimpio };

    // Enviar producto a la API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(productoConId),
    });

    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`,
      );
    }

    const productoAgregado = await response.json();
    mostrarNotificacion("¡Producto agregado exitosamente! 🎉", "success");
    return productoAgregado;
  } catch (error) {
    console.error("Error al agregar producto:", error);
    mostrarNotificacion(
      "Error al agregar el producto. Intenta de nuevo.",
      "error",
    );
    return null;
  }
};

// Eliminar un producto de la API
export const eliminarProducto = async (id) => {
  try {
    if (!id) {
      throw new Error("ID de producto no válido");
    }

    // Confirmar eliminación
    const confirmar = confirm(
      "¿Estás seguro de que deseas eliminar este producto?",
    );
    if (!confirmar) {
      return false;
    }

    // Eliminar producto
    const deleteResponse = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!deleteResponse.ok) {
      throw new Error(
        `Error HTTP: ${deleteResponse.status} - ${deleteResponse.statusText}`,
      );
    }

    mostrarNotificacion("🗑️ Producto eliminado correctamente", "success");
    return true;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    mostrarNotificacion(
      "Error al eliminar el producto. Intenta de nuevo.",
      "error",
    );
    return false;
  }
};
