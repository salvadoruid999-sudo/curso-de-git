
// 1. Arreglo principal
let cart = [];

// 2. Capturar elementos del DOM
const form = document.getElementById('productForm');
const prodNameInput = document.getElementById('prodName');
const prodPriceInput = document.getElementById('prodPrice');
const nameError = document.getElementById('nameError');
const priceError = document.getElementById('priceError');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const cartTitle = document.getElementById('cartTitle');

// 3. Recuperar productos guardados
const savedCart = localStorage.getItem('cart');

if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
}

// 4. Guardar productos en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 5. Manejar el formulario
form.addEventListener('submit', function(event) {

    event.preventDefault();

    nameError.textContent = '';
    priceError.textContent = '';

    let isValid = true;

    const name = prodNameInput.value.trim();
    const price = parseFloat(prodPriceInput.value);

    // Validar nombre
    if (name === '') {
        nameError.textContent = 'El nombre es obligatorio.';
        isValid = false;
    } else if (name.length < 3) {
        nameError.textContent = 'Debe tener al menos 3 caracteres.';
        isValid = false;
    }

    // Validar precio
    if (isNaN(price)) {
        priceError.textContent = 'Ingrese un número válido.';
        isValid = false;
    } else if (price <= 0) {
        priceError.textContent = 'El precio debe ser mayor a 0.';
        isValid = false;
    }

    // Agregar producto
    if (isValid) {

        const product = {
            id: Date.now(),
            name: name,
            price: price
        };

        cart.push(product);

        saveCart();
        updateCartUI();

        form.reset();
        prodNameInput.focus();
    }
});

// 6. Actualizar carrito
function updateCartUI() {
    cartList.innerHTML = '';

    // Esto actualizará el texto dinámicamente (ej. "Carrito (3)")
    cartTitle.textContent = `Carrito (${cart.length})`;

    if (cart.length === 0) {
        cartList.innerHTML = '<li>El carrito está vacío</li>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {

        const li = document.createElement('li');

        li.textContent = `${item.name} — $${item.price.toFixed(2)} `;

        // Crear botón eliminar
        const deleteButton = document.createElement('button');

        deleteButton.textContent = 'Eliminar';

        deleteButton.addEventListener('click', function() {

            cart = cart.filter(product => product.id !== item.id);

            saveCart();
            updateCartUI();

        });

        li.appendChild(deleteButton);

        cartList.appendChild(li);

        total += item.price;
    });

    // Actualizar total
    cartTotal.textContent = total.toFixed(2);
}
