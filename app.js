// 1. CONFIGURACIÓN
const firebaseConfig = {
    apiKey: "AIzaSyBR469f8QnBVG9p6TXVvNMYjfxk2SxPlm4",
    authDomain: "app-clase-sebastian.firebaseapp.com",
    projectId: "app-clase-sebastian",
    storageBucket: "app-clase-sebastian.firebasestorage.app",
    messagingSenderId: "495895860460",
    appId: "1:495895860460:web:712a30fa4ab544aa2841c9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. REFERENCIAS Y VARIABLES
const modal = document.getElementById("modal-detalle");
const btnClose = document.querySelector(".close-button");
const contenedor = document.getElementById('contenedor-productos');
const tituloApp = document.getElementById('titulo-app');
const btnLike = document.getElementById("btn-like");
const buscador = document.getElementById('input-buscador');

// Referencia al contenedor de los destacados en el Inicio
const contenedorDestacados = document.getElementById('contenedor-destacados');

// Referencia específica al botón del MODAL para que no se mezcle con el de Finalizar
const btnAnadirCarrito = document.querySelector("#modal-detalle .btn-comprar");

// Variables de estado
let productoActualId = null;
let todosLosProductos = []; 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let firebaseListener = null; // Variable para controlar Firebase y que no se superpongan datos

// 3. LÓGICA DEL MODAL
function verDetalle(id, nombre, precio, foto, descripcion, likes) {
    productoActualId = id;
    document.getElementById("modal-titulo").innerText = nombre;
    document.getElementById("modal-precio").innerText = "$" + precio;
    document.getElementById("modal-img").src = foto;
    
    const descElement = document.querySelector(".descripcion");
    if (descElement) descElement.innerText = descripcion || "Sin descripción disponible.";

    if (btnLike) btnLike.innerText = (likes > 0) ? "❤️ " + likes : "🤍";
    modal.style.display = "flex";
}

// AÑADIR AL CARRITO
function agregarAlCarrito() {
    const producto = todosLosProductos.find(p => p.id === productoActualId);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito(); 
        alert(`¡${producto.nombre} agregado al carrito! 🛒`);
        modal.style.display = "none";
    }
}

// LIKES
if (btnLike) {
    btnLike.onclick = () => {
        if (productoActualId) {
            db.collection("productos").doc(productoActualId).update({
                likes: firebase.firestore.FieldValue.increment(1)
            });
            btnLike.innerText = "❤️";
        }
    };
}

if (btnClose) btnClose.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// 4. NAVEGACIÓN Y FILTROS
function cambiarPantalla(pantalla) {
    document.getElementById('view-inicio').style.display = 'none';
    document.getElementById('view-productos').style.display = 'none';
    document.getElementById('view-carrito').style.display = 'none';
    
    // Por defecto, SIEMPRE ocultamos el botón flotante al navegar
    const btnAgregar = document.getElementById('btn-agregar-flotante');
    if (btnAgregar) btnAgregar.style.display = 'none';
    
    const vistaActiva = document.getElementById(`view-${pantalla}`);
    if (vistaActiva) vistaActiva.style.display = 'block';

    if (pantalla === 'inicio') {
        tituloApp.innerText = "Mi Tienda";
        if (buscador) buscador.value = "";
    } else if (pantalla === 'productos') {
        tituloApp.innerText = "Todos los productos";
        cargarProductos(); 
    } else if (pantalla === 'favoritos') {
        document.getElementById('view-productos').style.display = 'block';
        tituloApp.innerText = "Mis Favoritos ❤️";
        cargarProductos("favoritos");
    } else if (pantalla === 'carrito') {
        tituloApp.innerText = "Mi Carrito";
        actualizarVistaCarrito();
    }
}

// FILTRAR CATEGORÍA
function filtrarCategoria(cat) {
    document.getElementById('view-inicio').style.display = 'none';
    document.getElementById('view-carrito').style.display = 'none';
    document.getElementById('view-productos').style.display = 'block';
    
    // Como entramos a una categoría, ¡PRENDEMOS EL BOTÓN!
    const btnAgregar = document.getElementById('btn-agregar-flotante');
    if (btnAgregar) btnAgregar.style.display = 'flex';
    
    cargarProductos(cat); 
}

// 5. BUSCADOR
if (buscador) {
    buscador.oninput = (e) => {
        const texto = e.target.value.toLowerCase();
        if (texto.length > 0) {
            document.getElementById('view-inicio').style.display = 'none';
            document.getElementById('view-productos').style.display = 'block';
        }
        const filtrados = todosLosProductos.filter(p => p.nombre.toLowerCase().includes(texto));
        contenedor.innerHTML = '';
        filtrados.forEach(p => renderizarCard(p.id, p));
    };
}

// 6. LÓGICA DEL CARRITO
function actualizarVistaCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('precio-total');
    if (!lista || !totalElemento) return;

    lista.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px;">Tu carrito está vacío 🛒</p>';
        totalElemento.innerText = '$0';
        return;
    }

    carrito.forEach((prod, index) => {
        total += Number(prod.precio);
        const item = document.createElement('div');
        item.className = 'item-carrito';
        item.innerHTML = `
            <img src="${prod.foto_url}" style="width:50px; height:50px; border-radius:5px; object-fit:cover;">
            <div style="flex-grow:1; margin-left:10px;">
                <h4 style="margin:0; font-size: 0.9rem;">${prod.nombre}</h4>
                <p style="margin:0; font-size: 0.8rem;">$${prod.precio}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; cursor:pointer;">🗑️</button>
        `;
        lista.appendChild(item);
    });
    totalElemento.innerText = `$${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("✅ ¡Compra finalizada con éxito!");
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarVistaCarrito();
    cambiarPantalla('inicio');
}

// 7. CARGAR DESTACADOS (TOP 5 LIKES)
function cargarDestacados() {
    if (!contenedorDestacados) return;

    db.collection("productos")
        .where("likes", ">", 0)
        .orderBy("likes", "desc")
        .limit(5) // Mostramos solo el top 5 para no saturar el inicio
        .onSnapshot((snapshot) => {
            contenedorDestacados.innerHTML = '';

            if (snapshot.empty) {
                contenedorDestacados.innerHTML = '<p style="padding: 15px; color: #888; font-size: 0.9rem;">Dale "Me gusta" a los productos para verlos aquí.</p>';
                return;
            }

            snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;

                const card = document.createElement('div');
                card.className = 'card';
                // Usamos la misma función para que abra el modal
                card.onclick = () => verDetalle(id, data.nombre, data.precio, data.foto_url, data.descripcion, data.likes);

                // Dibujamos la tarjeta (adaptada al scroll horizontal)
                card.innerHTML = `
                    <img src="${data.foto_url || 'https://via.placeholder.com/200'}" alt="${data.nombre}">
                    <div class="card-info">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <h3 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width: 70%;">${data.nombre}</h3>
                            <span style="font-size:0.8rem; font-weight:bold; color: #e91e63;">❤️ ${data.likes}</span>
                        </div>
                        <p>$${data.precio}</p>
                    </div>
                `;
                contenedorDestacados.appendChild(card);
            });
        });
}

// 8. CARGA DE DATOS (CON CONTROL DE EVENTOS)
function cargarProductos(tipo = null) {
    if (firebaseListener) {
        firebaseListener(); 
    }

    let consulta = db.collection("productos");
    
    if (tipo === "favoritos") {
        consulta = consulta.where("likes", ">", 0).orderBy("likes", "desc");
    } else if (tipo) {
        consulta = consulta.where("categoria", "==", tipo);
        tituloApp.innerText = "Categoría: " + tipo;
    }

    firebaseListener = consulta.onSnapshot((snapshot) => {
        contenedor.innerHTML = '';
        
        if (snapshot.empty) {
            contenedor.innerHTML = '<p style="grid-column: span 2; text-align:center;">No hay productos.</p>';
            return;
        }

        snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            
            if (!todosLosProductos.find(p => p.id === id)) {
                todosLosProductos.push({ id, ...data });
            }
            renderizarCard(id, data);
        });
    });
}


function renderizarCard(id, data) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => verDetalle(id, data.nombre, data.precio, data.foto_url, data.descripcion, data.likes);
    
    card.innerHTML = `
        <div class="card-img-container">
            <img src="${data.foto_url || 'https://via.placeholder.com/200'}" alt="${data.nombre}">
            <button class="btn-borrar-db" onclick="eliminarProducto('${id}', event)">🗑️</button>
        </div>
        <div class="card-info">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width: 70%;">${data.nombre}</h3>
                <span style="font-size:0.8rem;">${data.likes > 0 ? '❤️ ' + data.likes : ''}</span>
            </div>
            <p>$${data.precio}</p>
        </div>
    `;
    contenedor.appendChild(card);
}

// 9. INICIALIZACIÓN
cargarProductos();
cargarDestacados();
// --- 10. AGREGAR PRODUCTOS DESDE LA APP ---

const modalAgregar = document.getElementById('modal-agregar');

function abrirModalAgregar() {
    modalAgregar.style.display = 'flex';
    // Si el usuario está viendo una categoría específica, se la preseleccionamos
    if (categoriaActual) {
        document.getElementById('add-categoria').value = categoriaActual;
    }
}

function cerrarModalAgregar() {
    modalAgregar.style.display = 'none';
    // Limpiamos los campos para la próxima vez
    document.getElementById('add-nombre').value = '';
    document.getElementById('add-precio').value = '';
    document.getElementById('add-foto').value = '';
    document.getElementById('add-desc').value = '';
}

function guardarNuevoProducto() {
    // 1. Leemos lo que el usuario escribió
    const nombre = document.getElementById('add-nombre').value;
    const precio = document.getElementById('add-precio').value;
    const categoria = document.getElementById('add-categoria').value;
    const foto = document.getElementById('add-foto').value;
    const desc = document.getElementById('add-desc').value;

    // 2. Validamos que no envíe un producto vacío
    if (!nombre || !precio) {
        alert("por lo menos ponele un nombre y un precio.");
        return;
    }

    // 3. Lo mandamos a Firebase con la función .add()
    db.collection("productos").add({
        nombre: nombre,
        precio: Number(precio), // Nos aseguramos de que sea un número para las sumas del carrito
        categoria: categoria,
        foto_url: foto || 'https://via.placeholder.com/200', // Si no pone foto, le damos una por defecto
        descripcion: desc,
        likes: 0 // Arranca con cero likes
    })
    .then(() => {
        alert("✅ ¡Producto subido con éxito!");
        cerrarModalAgregar();
    })
    .catch((error) => {
        console.error("Error al subir el producto:", error);
        alert("Hubo un error. Revisá la consola.");
    });
}
// --- 11. ELIMINAR PRODUCTO DE FIREBASE ---
function eliminarProducto(id, event) {
    // ESTO ES CLAVE: Evita que el clic en el tacho también dispare el clic de la tarjeta (abrir modal)
    event.stopPropagation();

    // Le pedimos confirmación al usuario para no borrar por error
    const confirmacion = confirm("¿Estás seguro de que querés borrar este producto definitivamente?");
    
    if (confirmacion) {
        db.collection("productos").doc(id).delete()
        .then(() => {
            alert("🗑️ Producto eliminado de la base de datos.");
            // No hace falta hacer nada más visualmente, porque Firebase detecta
            // el borrado al instante y nuestro .onSnapshot redibuja la lista solo.
        })
        .catch((error) => {
            console.error("Error al eliminar:", error);
            alert("Hubo un error al intentar borrar el producto.");
        });
    }
}