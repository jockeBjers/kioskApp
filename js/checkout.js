function renderCart() {
    const isMobileView = window.innerWidth <= 768; // Kontrollera om det är mobilvy
    const cartTableBody = document.querySelector('#cartTable tbody');
    const mobileCartContainer = document.querySelector('.mobile-cart-container');

    // Rensa innehållet i båda layouterna
    cartTableBody.innerHTML = '';
    mobileCartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        if (isMobileView) {
            // Rendera mobil layout
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item-mobile');
            itemDiv.innerHTML = `
                <div class="mobile-item-header">
                    <img src="${item.img}" alt="${item.name}" class="mobile-item-img">
                    <p>${item.name}</p>
                </div>
                <div class="mobile-item-body">
                    <p>Price: ${item.price.toFixed(2)} Kr</p>
                    <p>Quantity: 
                        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
                    </p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)} Kr</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            mobileCartContainer.appendChild(itemDiv);
        } else {
            // Rendera desktop layout
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.img}" alt="${item.name}" style="width: 50px; height: auto;"> ${item.name}</td>
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

    // Uppdatera totalbelopp
    document.getElementById('cartTotal').textContent = `Total: ${total.toFixed(2)} Kr`;

    // Visa meddelande om kundvagnen är tom
    if (cart.length === 0) {
        if (isMobileView) {
            mobileCartContainer.innerHTML = `<p>Your cart is empty.</p>`;
        } else {
            cartTableBody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
        }
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
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();
});

function adjustCartLayout() {
    const isMobileView = window.innerWidth <= 768;
    document.querySelector('.desktop-cart-container').style.display = isMobileView ? 'none' : 'block';
    document.querySelector('.mobile-cart-container').style.display = isMobileView ? 'block' : 'none';
}

window.addEventListener('DOMContentLoaded', () => {
    adjustCartLayout();
    renderCart();
});

window.addEventListener('resize', () => {
    adjustCartLayout();
    renderCart();
});
