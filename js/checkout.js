function renderCart() {
    const isMobileView = window.innerWidth <= 768;
    const cartTableBody = document.querySelector('#cartTable tbody');
    const cartItemsMobile = document.querySelector('.cart-items-mobile');

    cartTableBody.innerHTML = '';
    cartItemsMobile.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        if (isMobileView) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}" />
                <div class="item-details">
                    <p>${item.name}</p>
                    <p>${item.price.toFixed(2)} Kr</p>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" />
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsMobile.appendChild(itemDiv);
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.img}" alt="${item.name}" /></td>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} Kr</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>${(item.price * item.quantity).toFixed(2)} Kr</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        }
    });

    document.getElementById('cartTotal').textContent = `Total: ${total.toFixed(2)} Kr`;
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
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();
});
