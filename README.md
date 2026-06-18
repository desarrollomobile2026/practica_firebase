# Proyecto Base: Catalogo Mobile-First con Firebase

Este repositorio funciona como modelo de referencia para clases y trabajos practicos.
El objetivo es que puedan tomar una base tecnica ya funcional y adaptarla a la identidad visual y funcional de su propio proyecto.

La aplicacion implementa un catalogo dinamico conectado a Firebase Firestore, con una experiencia centrada en dispositivos moviles.

## Objetivo pedagogico

Este proyecto permite practicar, en un caso real y simple, los siguientes contenidos:

- Estructura de interfaz en HTML y CSS con enfoque mobile-first.
- Logica de interaccion en JavaScript vanilla.
- Integracion con base de datos NoSQL en tiempo real (Firestore).
- Persistencia local de estado de compra con LocalStorage.
- Adaptacion de una base tecnica a un diseno de producto definido en Figma.

## Funcionalidades implementadas

- Visualizacion de productos por categorias.
- Busqueda por nombre en tiempo real.
- Sistema de likes para destacar contenido.
- Seccion de destacados ordenada por interaccion.
- Carrito con almacenamiento local.
- Alta y baja de elementos en Firestore.

## Stack tecnologico

- HTML5
- CSS3
- JavaScript vanilla
- Firebase Firestore (SDK compat)

## Requisitos

- Navegador moderno (Chrome, Edge o Firefox).
- Proyecto de Firebase creado.
- Firestore Database habilitado.

## Configuracion inicial

1. Crear o usar un proyecto en Firebase.
2. Habilitar Firestore Database.
3. Completar los datos de configuracion en config.js con el objeto firebaseConfig.
4. Verificar que index.html cargue los scripts de Firebase compat:
  - https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js
  - https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js

## Estructura del proyecto

```text
.
|- index.html   # Vistas, navegacion y modales
|- style.css    # Estilos de interfaz mobile-first
|- app.js       # Logica de UI, carrito y operaciones Firestore
|- config.js    # Configuracion local de Firebase
|- README.md
```

## Modelo de datos sugerido

Coleccion principal: productos

Ejemplo de documento:

```js
{
  nombre: string,
  precio: number,
  categoria: string,
  foto_url: string,
  descripcion: string,
  likes: number
}
```

## Consigna de adaptacion (Figma + implementacion)

Usen este repositorio como plantilla tecnica para su proyecto final.

Cada equipo debe:

1. Mantener la logica base de carga de datos, interaccion y persistencia.
2. Adaptar la interfaz (estructura, colores, tipografia, componentes y navegacion) al diseno ya aprobado en Figma.
3. Ajustar textos, etiquetas y categorias segun su caso de uso.
4. Definir si su proyecto representa productos o servicios:
  - Si es de productos, conservar el flujo de catalogo y carrito.
  - Si es de servicios, adaptar el carrito a reserva, solicitud o contratacion.
5. Presentar coherencia entre:
  - Prototipo en Figma.
  - Implementacion visual en codigo.
  - Modelo de datos en Firestore.

## Uso rapido

1. Abrir index.html en el navegador.
2. Navegar por inicio, productos, favoritos y carrito.
3. Crear, visualizar y eliminar items para validar el flujo completo.
4. Verificar que los cambios de Firestore se reflejen en tiempo real.

## Criterios recomendados de evaluacion

- Coherencia entre diseno (Figma) y desarrollo.
- Correcta integracion con Firebase.
- Calidad de experiencia de usuario en mobile.
- Claridad de estructura y mantenibilidad del codigo.
- Adaptacion correcta al dominio elegido (productos o servicios).

## Mejoras sugeridas

- Agregar autenticacion para restringir operaciones administrativas.
- Implementar validaciones de formularios mas completas.
- Configurar reglas de seguridad de Firestore por roles.
- Publicar el proyecto en Firebase Hosting.
