# Desafío: AluraGeek

Este proyecto, **AluraGeek**, es una aplicación que permite agregar, mostrar y eliminar productos Geek mediante un formulario interactivo. Además, está diseñada para ser completamente responsiva y brindar una experiencia de usuario optimizada en cualquier dispositivo.

## Características

### 1. Formulario de Entrada
- **Inputs**:
  - Nombre del producto Geek.
  - Precio del producto.
  - URL de la imagen del producto.
- **Botones**:
  - Botón para enviar el formulario y agregar el producto a la lista.
  - Botón para limpiar los campos del formulario.
- **Validación**:
  - Asegura que los campos no estén vacíos.
  - Verifica que el precio sea un número válido.
  - Comprueba que la URL sea una dirección válida para la imagen.

### 2. Renderización de Productos
- Una sección dedicada a mostrar todos los productos ingresados.
- Cada producto se representa en una **tarjeta** que incluye:
  - Nombre.
  - Precio.
  - Imagen.
- Funcionalidad para eliminar productos individualmente mediante un botón en cada tarjeta.

### 3. Eventos
- Uso de `addEventListener` para manejar:
  - El botón de enviar, validando los datos y agregando productos.
  - El botón de limpiar, vaciando los campos del formulario.
  - La eliminación dinámica de productos desde la lista.

### 4. Responsividad
- Diseño responsivo que asegura:
  - En dispositivos grandes: El formulario y la lista de productos aparecen lado a lado.
  - En dispositivos móviles: El formulario aparece encima de la lista de productos, eliminando la necesidad de scroll horizontal.
  - Los productos se muestran en **dos columnas** para maximizar el uso del espacio visual.

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica del proyecto.
- **CSS3**: Estilización y diseño responsivo.
- **JavaScript**: Lógica del formulario, manejo de eventos y renderización dinámica de productos.
- **Fetch API**: Construcción de solicitudes GET, POST y DELETE para interactuar con datos externos.
- **Validación Personalizada**: Aplicación de atributos de validación en formularios y personalización de mensajes de error.

## Instalación y Uso
1. Clona este repositorio:
   ```bash
   git clone https://github.com/LinamariaMartinez/AluraGeek.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd AluraGeek
   ```
3. Abre el archivo `index.html` en tu navegador para ver la aplicación.

## Funcionalidades Adicionales
- **Eliminación Dinámica**: Cada tarjeta tiene un botón para eliminarla directamente.
- **Mensajes de Error**: Si los datos ingresados son incorrectos, se muestran mensajes descriptivos para corregirlos.
- **Limpieza Rápida**: El botón de limpiar asegura que el formulario quede listo para un nuevo ingreso de datos.
- **Uso de APIs Externas**: Se utilizaron requisiciones HTML hacia APIs externas para manejar datos de productos.

## Vista del Proyecto

### Diseño en Escritorio
- El formulario y los productos se organizan en una disposición horizontal.
- Las tarjetas de producto están distribuidas en filas.

### Diseño en Dispositivos Móviles
- El formulario aparece en la parte superior de la pantalla.
- Los productos se muestran en dos columnas para aprovechar el espacio disponible.

## Contribución
Las contribuciones son bienvenidas. Si encuentras algún problema o deseas proponer mejoras, abre un issue o envía un pull request.

## Autor
Creado por Linamaría Martínez.

