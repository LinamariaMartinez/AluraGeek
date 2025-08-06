const mensajeVacio = document.createElement("p");
mensajeVacio.id = "mensajeVacio";
mensajeVacio.textContent = "No se han agregado productos.";

export const inicializarMensaje = (container) => {
    if (!container.contains(mensajeVacio)) {
        container.appendChild(mensajeVacio);
    }
};

export const actualizarMensaje = (container) => {
    if (container.children.length === 0) {
        if (!container.contains(mensajeVacio)) {
            container.appendChild(mensajeVacio);
        }
    } else if (container.contains(mensajeVacio)) {
        container.removeChild(mensajeVacio);
    }
};
