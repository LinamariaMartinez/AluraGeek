const API_URL = "http://localhost:3000/productos";

// Obtener productos desde la API
export const obtenerProductos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los productos");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

// Agregar un producto a la API
export const agregarProducto = async (producto) => {
    try {
        // Obtener los productos actuales
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los productos");
        const productos = await response.json();

        // Calcular el nuevo ID
        const nuevoId = productos.length > 0
            /* ? Math.max(...productos.map(prod => prod.id)) + 1
            : 1; */
            /* ? productos[productos.length - 1].id + 1 // Toma el ID del último producto
            : 1; */
            ? (Math.max(...productos.map(prod => parseInt(prod.id))) + 1).toString()
            : "1";

        // Añadir el ID al producto
        const productoConId = { id: nuevoId, ...producto };

        // Enviar el producto con el nuevo ID a la API
        const agregarResponse = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoConId),
        });
        if (!agregarResponse.ok) throw new Error("Error al agregar el producto");

        return await agregarResponse.json(); // Devuelve el producto agregado
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Eliminar un producto de la API
export const eliminarProducto = async (id) => {
    try {
        // Eliminar el producto
        const deleteResponse = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!deleteResponse.ok) throw new Error("Error al eliminar el producto");

        // Obtener los productos restantes
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los productos");
        const productos = await response.json();

        // Reorganizar los IDs desde 1
        const productosActualizados = productos.map((producto, index) => ({
            ...producto,
            id: (index + 1).toString(), // Convertimos el nuevo ID a string
        }));

        // Actualizar cada producto en la API con su nuevo ID
        for (const producto of productosActualizados) {
            const putResponse = await fetch(`${API_URL}/${producto.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });
        }

        console.log(`Producto con ID ${id} eliminado y los IDs reorganizados.`);
    } catch (error) {
        console.error("Error:", error);
    }
};
