import { obtenerProductos, agregarProducto, eliminarProducto } from './api/productosApi.js';
import { renderizarProductos } from './utils/renderizar.js';
import { actualizarMensaje, inicializarMensaje } from './utils/mensajes.js';

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("agregarProductoForm");
    const productosContainer = document.getElementById("productosContainer");

    // Inicializa mensaje dinámico
    inicializarMensaje(productosContainer);

    // Cargar y renderizar productos al iniciar
    renderizarProductos(await obtenerProductos(), productosContainer);

    // Manejo del formulario para agregar productos
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const precio = document.getElementById("precio").value;
        const imagen = document.getElementById("imagen").value;

        if (nombre && precio && imagen) {
            const nuevoProducto = { nombre, precio, imagen };
            const productoAgregado = await agregarProducto(nuevoProducto);

            if (productoAgregado) {
                renderizarProductos(await obtenerProductos(), productosContainer);
                form.reset();
            }
        } else {
            alert("Por favor completa todos los campos.");
        }
    });

    // Manejo del evento para eliminar productos
    productosContainer.addEventListener("click", async (e) => {
        if (e.target.classList.contains("eliminar")) {
            const id = e.target.dataset.id;
            await eliminarProducto(id);
            renderizarProductos(await obtenerProductos(), productosContainer);
        }
    });
});
