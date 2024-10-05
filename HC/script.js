// Function to add an item to the cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Function to display the cart on the cart page
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <h4>${item.name} (x${item.quantity})</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// Event listener for adding items to the cart on the shop page
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.parentElement;
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        addToCart(productName, productPrice);
    });
});

// Display the cart items if on the cart page
if (document.getElementById('cart-items')) {
    displayCart();
}

// Event listener for clearing the cart
if (document.getElementById('clear-cart')) {
    document.getElementById('clear-cart').addEventListener('click', clearCart);
}
