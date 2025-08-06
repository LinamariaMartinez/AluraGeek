// import { actualizarMensaje } from './mensajes.js';

// export const renderizarProductos = (productos, container) => {
//     container.innerHTML = ""; // Limpia el contenedor
//     productos.forEach((producto) => {
//         const productoDiv = document.createElement("div");
//         productoDiv.classList.add("producto");
//         productoDiv.innerHTML = `
//             <img src="${producto.imagen}" alt="${producto.nombre}">
//             <h3>${producto.nombre}</h3>
//             <p>$${producto.precio}</p>
//             <button class="eliminar" data-id="${producto.id}"></button>
//         `;
//         container.appendChild(productoDiv);
//     });

//     actualizarMensaje(container);
// };

import { actualizarMensaje } from './mensajes.js';

export const renderizarProductos = (productos, container) => {
    container.innerHTML = ""; // Limpia el contenedor

    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        // Crear y agregar imagen
        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        productoDiv.appendChild(img);

        // Crear y agregar título
        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;
        productoDiv.appendChild(titulo);

        // Contenedor de precio y botón
        const detalleDiv = document.createElement("div");
        detalleDiv.classList.add("producto-detalle");

        // Crear y agregar precio
        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;
        detalleDiv.appendChild(precio);

        // Crear y agregar botón eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar");
        botonEliminar.dataset.id = producto.id; // Asignar id al botón
        detalleDiv.appendChild(botonEliminar);

        // Agregar detalleDiv al productoDiv
        productoDiv.appendChild(detalleDiv);

        // Agregar productoDiv al contenedor principal
        container.appendChild(productoDiv);
    });

    actualizarMensaje(container);
};
