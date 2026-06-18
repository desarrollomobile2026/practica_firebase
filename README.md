# Tienda Mobile-First con Firebase

Aplicacion web de ejemplo orientada a mobile-first para gestionar un catalogo de productos con Firebase Firestore en tiempo real.

Permite:
- Ver productos por categoria.
- Buscar productos por nombre.
- Dar likes a productos.
- Ver destacados segun likes.
- Agregar y eliminar productos del carrito (persistido en LocalStorage).
- Crear y eliminar productos en Firestore.

## Stack

- HTML5
- CSS3
- JavaScript vanilla
- Firebase Firestore (SDK compat)

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox).
- Proyecto creado en Firebase.
- Firestore habilitado.

## Configuracion

1. Crear/usar un proyecto en Firebase.
2. Habilitar Firestore Database.
3. Completar los datos de configuracion en `config.js` con tu objeto `firebaseConfig`.
4. Verificar que `index.html` cargue estos scripts:
	- `https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js`
	- `https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js`

## Estructura

```text
.
|- index.html   # Estructura de vistas, modales y navegacion
|- style.css    # Estilos mobile-first
|- app.js       # Logica de UI, carrito y operaciones con Firestore
|- config.js    # Configuracion Firebase local
|- README.md
```

## Modelo de datos (coleccion `productos`)

Cada documento de Firestore usa esta forma:

```js
{
  nombre: string,
  precio: number,
  categoria: string,      // ej: "calzado", "ropa", "gorras"
  foto_url: string,
  descripcion: string,
  likes: number
}
```

## Como usar

1. Abrir `index.html` en el navegador.
2. Navegar por Inicio, Productos, Favoritos y Carrito.
3. En Productos:
	- Tocar una card para abrir detalle.
	- Dar like desde el modal.
	- Agregar al carrito.
4. Usar el boton `+` para crear un producto nuevo en Firestore.
5. Usar el icono de papelera en una card para eliminar un producto en Firestore.
6. Finalizar compra desde el carrito (limpia el carrito local).

## Notas

- El carrito se guarda en LocalStorage con la clave `carrito`.
- Los listados de productos y destacados se actualizan en tiempo real con listeners `onSnapshot`.
- Si no hay productos en una seccion, se muestra un mensaje de estado vacio.

## Mejoras sugeridas

- Agregar autenticacion para restringir altas/bajas de productos.
- Implementar validaciones de formulario mas robustas.
- Configurar reglas de seguridad de Firestore segun roles.
- Publicar en Firebase Hosting.
