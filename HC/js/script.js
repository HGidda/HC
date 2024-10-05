// Function to add item to the cart in localStorage
function addToCart(name, price) {
    // Retrieve the cart from localStorage, or create an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex >= 0) {
        // If the item exists, increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Otherwise, add a new item to the cart
        cart.push({ name, price, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Notify the user that the product has been added
    alert('Product added to cart!');
}

// Function to display the cart items on the cart page
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    
    // Retrieve the cart from localStorage, or create an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if cartItemsContainer exists (to avoid errors if this script runs on non-cart pages)
    if (cartItemsContainer) {
        // Clear the cart items display
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        // Loop through the cart and display each item
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            // Set the HTML content for each cart item
            cartItem.innerHTML = `
                <h4>${item.name} (x${item.quantity})</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            `;

            // Append the item to the cart items container
            cartItemsContainer.appendChild(cartItem);

            // Calculate the total price
            totalPrice += item.price * item.quantity;
        });

        // Display the total price
        totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
}

// Function to clear the cart
function clearCart() {
    // Remove the cart from localStorage
    localStorage.removeItem('cart');
    
    // Re-display the cart to show it's empty
    displayCart();
}

// Add event listener for the Clear Cart button (only if it exists on the page)
if (document.getElementById('clear-cart')) {
    document.getElementById('clear-cart').addEventListener('click', clearCart);
}

// Add event listeners for the Add to Cart buttons (only if on a page with products)
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.parentElement;
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        // Call addToCart when a button is clicked
        addToCart(productName, productPrice);
    });
});

// Check if on the Cart page and initialize the display
if (document.getElementById('cart-items')) {
    displayCart();
}
// Optional: Event listener for checkout button
if (document.getElementById('checkout')) {
    document.getElementById('checkout').addEventListener('click', () => {
        alert('Proceeding to checkout!');
    });
}
