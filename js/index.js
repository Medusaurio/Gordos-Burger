// ================== CARRITO ==================
let carrito = [];


const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}

const cartCount = document.getElementById("cart-count");
const carritoModal = document.getElementById("carrito-modal");
const carritoItems = document.getElementById("carrito-items");
const carritoTotal = document.getElementById("carrito-total");


function actualizarCartCount() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = totalItems;
}


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCartCount();
}

// Renderiza los items dentro del modal
function renderCarrito() {
    carritoItems.innerHTML = "";

    if (carrito.length === 0) {
    carritoItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    carritoTotal.textContent = "0";
        return;
}

    let total = 0;

    carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carrito-item");
    itemDiv.innerHTML = `
      <p>${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}</p>
    <button data-index="${index}" class="btn-eliminar-item">Eliminar</button>
    `;
    carritoItems.appendChild(itemDiv);

    total += item.precio * item.cantidad;
});

    carritoTotal.textContent = total;
}

// Agregar al carrito
const botonesAgregar = document.querySelectorAll(".btn-agregar");

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
    const id = boton.dataset.id;
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio);

    const existente = carrito.find(item => item.id === id);

    if (existente) {
    existente.cantidad++;
    } else {
    carrito.push({
        id,
        nombre,
        precio,
        cantidad: 1
});
    }

    guardarCarrito();
    });
});

// Abrir/cerrar modal
document.getElementById("btn-carrito").addEventListener("click", () => {
    renderCarrito();
    carritoModal.classList.remove("oculto");
});

document.getElementById("cerrar-carrito").addEventListener("click", () => {
    carritoModal.classList.add("oculto");
});

// Vaciar carrito
document.getElementById("carrito-vaciar").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
});

// Eliminar item individual (delegación de eventos)
carritoItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar-item")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    guardarCarrito();
    renderCarrito();
}
});

// Confirmar pedido (por ahora solo un alert)
document.getElementById("carrito-confirmar").addEventListener("click", () => {
    alert("Gracias por tu pedido!");
});

// Actualizar numerito al cargar
actualizarCartCount();
