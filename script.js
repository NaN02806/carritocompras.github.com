let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(p => p.nombre === nombre);
    
    if (productoExistente) {
        const confirmacion = confirm(`El producto "${nombre}" ya está en el carrito. ¿Desea aumentar la cantidad?`);
        if (confirmacion) {
            productoExistente.cantidad++;
        }
    } else {
        const producto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };
        carrito.push(producto);
    }
    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';
    
    if (carrito.length === 0) {
        carritoElemento.innerHTML = '<p>Carrito vacío.</p>';
        return;
    }

    carrito.forEach((producto, index) => {
        const productoElemento = document.createElement('li');
        productoElemento.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} 
            <button onclick="confirmarEliminacion(${index})" class="eliminar-producto">Eliminar</button>`;
        carritoElemento.appendChild(productoElemento);
    });

    calcularTotales();
}

// Función para confirmar la eliminación del producto
function confirmarEliminacion(index) {
    const confirmacion = confirm("¿Está seguro de que desea eliminar este producto?");
    if (confirmacion) {
        eliminarProducto(index);
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    const productoEliminado = carrito[index]; // Guardar el producto a eliminar
    carrito.splice(index, 1); // Eliminar el producto del carrito
    mostrarCarrito(); // Mostrar el carrito actualizado

    // Actualizar totales después de eliminar el producto
    calcularTotales();
}

// Función para eliminar todos los productos del carrito
function eliminarCarrito() {
    const confirmacion = confirm("¿Está seguro de que desea vaciar el carrito?");
    if (confirmacion) {
        carrito = [];
        mostrarCarrito();
    }
}

// Función para calcular los totales
function calcularTotales() {
    let subtotal1 = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    let descuento = subtotal1 > 3000 ? subtotal1 * 0.10 : 0;
    let subtotal2 = subtotal1 - descuento;
    let igv = subtotal2 * 0.18;
    let total = subtotal2 + igv;

    document.getElementById('subtotal1').textContent = `Subtotal 1: $${subtotal1.toFixed(2)}`;
    document.getElementById('descuento').textContent = `Descuento: $${descuento.toFixed(2)}`;
    document.getElementById('subtotal2').textContent = `Subtotal 2: $${subtotal2.toFixed(2)}`;
    document.getElementById('igv').textContent = `IGV (18%): $${igv.toFixed(2)}`;
    document.getElementById('total').textContent = `Total a pagar: $${total.toFixed(2)}`;
}
