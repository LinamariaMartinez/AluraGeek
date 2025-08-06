import {
  obtenerProductos,
  agregarProducto,
  eliminarProducto,
} from "./api/productosApi.js";
import { renderizarProductos } from "./utils/renderizar.js";
import { actualizarMensaje, inicializarMensaje } from "./utils/mensajes.js";

// Estado de la aplicación
const estado = {
  productos: [],
  cargando: false,
};

// Referencias a elementos DOM
let elementos = {};

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  inicializarElementos();
  configurarEventListeners();
  await cargarProductosIniciales();
});

// Obtener referencias a elementos DOM
const inicializarElementos = () => {
  elementos = {
    form: document.getElementById("agregarProductoForm"),
    productosContainer: document.getElementById("productosContainer"),
    nombre: document.getElementById("nombre"),
    precio: document.getElementById("precio"),
    imagen: document.getElementById("imagen"),
    btnEnviar: document.getElementById("btn-enviar"),
    btnLimpiar: document.getElementById("btn-limpiar"),
  };

  // Verificar que todos los elementos existen
  const elementosFaltantes = Object.entries(elementos)
    .filter(([key, element]) => !element)
    .map(([key]) => key);

  if (elementosFaltantes.length > 0) {
    console.error("Elementos DOM faltantes:", elementosFaltantes);
  }

  // Inicializar mensaje dinámico
  inicializarMensaje(elementos.productosContainer);
};

// Configurar todos los event listeners
const configurarEventListeners = () => {
  // Formulario para agregar productos
  elementos.form.addEventListener("submit", manejarEnvioFormulario);

  // Botón limpiar (redundante con type="reset", pero por compatibilidad)
  elementos.btnLimpiar.addEventListener("click", limpiarFormulario);

  // Event delegation para eliminar productos
  elementos.productosContainer.addEventListener("click", manejarClickContainer);

  // Validación en tiempo real
  elementos.nombre.addEventListener("input", validarCampoNombre);
  elementos.precio.addEventListener("input", validarCampoPrecio);
  elementos.imagen.addEventListener("input", validarCampoImagen);

  // Prevenir envío si hay errores
  elementos.form.addEventListener("submit", (e) => {
    if (!validarFormularioCompleto()) {
      e.preventDefault();
    }
  });
};

// Cargar productos al inicializar
const cargarProductosIniciales = async () => {
  await cargarYRenderizarProductos();
};

// Manejar envío del formulario
const manejarEnvioFormulario = async (e) => {
  e.preventDefault();

  if (estado.cargando) {
    return; // Prevenir envíos múltiples
  }

  const datosFormulario = obtenerDatosFormulario();

  if (!validarDatos(datosFormulario)) {
    return;
  }

  await agregarNuevoProducto(datosFormulario);
};

// Obtener datos del formulario
const obtenerDatosFormulario = () => {
  return {
    nombre: elementos.nombre.value.trim(),
    precio: elementos.precio.value.trim(),
    imagen: elementos.imagen.value.trim(),
  };
};

// Validar datos del formulario
const validarDatos = ({ nombre, precio, imagen }) => {
  if (!nombre || !precio || !imagen) {
    mostrarError("Por favor completa todos los campos.");
    return false;
  }

  if (nombre.length < 2) {
    mostrarError("El nombre debe tener al menos 2 caracteres.");
    elementos.nombre.focus();
    return false;
  }

  if (isNaN(precio) || parseFloat(precio) <= 0) {
    mostrarError("El precio debe ser un número mayor a 0.");
    elementos.precio.focus();
    return false;
  }

  if (!isValidURL(imagen)) {
    mostrarError("La URL de la imagen no es válida.");
    elementos.imagen.focus();
    return false;
  }

  return true;
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

// Agregar nuevo producto
const agregarNuevoProducto = async (datosProducto) => {
  try {
    establecerEstadoCarga(true);

    const productoAgregado = await agregarProducto(datosProducto);

    if (productoAgregado) {
      await cargarYRenderizarProductos();
      limpiarFormulario();
    }
  } catch (error) {
    console.error("Error al agregar producto:", error);
    mostrarError("Error inesperado al agregar el producto.");
  } finally {
    establecerEstadoCarga(false);
  }
};

// Manejar clicks en el container de productos
const manejarClickContainer = async (e) => {
  if (e.target.classList.contains("eliminar")) {
    e.preventDefault();
    await eliminarProductoSeleccionado(e.target.dataset.id);
  }
};

// Eliminar producto seleccionado
const eliminarProductoSeleccionado = async (id) => {
  if (!id || estado.cargando) {
    return;
  }

  try {
    establecerEstadoCarga(true);

    const eliminado = await eliminarProducto(id);

    if (eliminado) {
      await cargarYRenderizarProductos();
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    mostrarError("Error inesperado al eliminar el producto.");
  } finally {
    establecerEstadoCarga(false);
  }
};

// Cargar y renderizar productos
const cargarYRenderizarProductos = async () => {
  try {
    const productos = await obtenerProductos();
    estado.productos = productos;
    renderizarProductos(productos, elementos.productosContainer);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    mostrarError("Error al cargar los productos.");
  }
};

// Limpiar formulario
const limpiarFormulario = () => {
  elementos.form.reset();
  limpiarErrores();
};

// Establecer estado de carga
const establecerEstadoCarga = (cargando) => {
  estado.cargando = cargando;
  elementos.btnEnviar.disabled = cargando;
  elementos.btnEnviar.textContent = cargando ? "Enviando..." : "Enviar";
};

// Validaciones en tiempo real
const validarCampoNombre = (e) => {
  const valor = e.target.value.trim();
  const campo = e.target;

  if (valor.length > 0 && valor.length < 2) {
    mostrarErrorCampo(campo, "Mínimo 2 caracteres");
  } else {
    limpiarErrorCampo(campo);
  }
};

const validarCampoPrecio = (e) => {
  const valor = e.target.value.trim();
  const campo = e.target;

  if (valor && (isNaN(valor) || parseFloat(valor) <= 0)) {
    mostrarErrorCampo(campo, "Debe ser un número mayor a 0");
  } else {
    limpiarErrorCampo(campo);
  }
};

const validarCampoImagen = (e) => {
  const valor = e.target.value.trim();
  const campo = e.target;

  if (valor && !isValidURL(valor)) {
    mostrarErrorCampo(
      campo,
      "URL no válida (debe comenzar con http:// o https://)",
    );
  } else {
    limpiarErrorCampo(campo);
  }
};

// Validar formulario completo
const validarFormularioCompleto = () => {
  const errores = document.querySelectorAll(".error-campo");
  return errores.length === 0;
};

// Utilidades para mostrar errores
const mostrarError = (mensaje) => {
  alert(mensaje); // Podrías reemplazar esto con una notificación más elegante
};

const mostrarErrorCampo = (campo, mensaje) => {
  limpiarErrorCampo(campo);

  const errorElement = document.createElement("div");
  errorElement.className = "error-campo";
  errorElement.textContent = mensaje;
  errorElement.style.color = "#dc3545";
  errorElement.style.fontSize = "12px";
  errorElement.style.marginTop = "4px";
  errorElement.style.fontFamily = "IBM Plex Mono";

  campo.parentNode.insertBefore(errorElement, campo.nextSibling);
  campo.style.borderColor = "#dc3545";
};

const limpiarErrorCampo = (campo) => {
  const errorElement = campo.parentNode.querySelector(".error-campo");
  if (errorElement) {
    errorElement.remove();
  }
  campo.style.borderColor = "#03318C";
};

const limpiarErrores = () => {
  const errores = document.querySelectorAll(".error-campo");
  errores.forEach((error) => error.remove());

  // Restaurar colores de borde
  [elementos.nombre, elementos.precio, elementos.imagen].forEach((campo) => {
    if (campo) campo.style.borderColor = "#03318C";
  });
};
