function renderCart() {
    const cartTableBody = document.querySelector('#cartTable tbody');
    const cartTotalElement = document.getElementById('cartTotal');

    // Hämta kundvagnen från Local Storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = storedCart;

    // Töm tabellen
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"> ${item.name}</td>
            <td>${item.price.toFixed(2)} Kr</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>${itemTotal.toFixed(2)} Kr</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
        total += itemTotal;
    });

    cartTotalElement.textContent = `Total: ${total.toFixed(2)} Kr`;

    // Visa ett meddelande om kundvagnen är tom
    if (cart.length === 0) {
        cartTableBody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    }
}




function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        alert('Quantity cannot be less than 1.');
        return;
    }
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function checkoutCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    clearCart();
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
