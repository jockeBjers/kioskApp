const products = [
    { id: 1, name: 'Celsius', price: 20.00 },
    { id: 2, name: 'Arboga 10.2 % Vol', price: 2.99 },
    { id: 3, name: 'Coca Cola', price: 10.00 },
    { id: 4, name: 'Coca Cola Zero', price: 10.00 },
    { id: 5, name: 'Dr Pepper', price: 10.00 },
    { id: 6, name: 'Fanta', price: 10.00 },
    { id: 7, name: "Jack Daniel's Coca Cola", price: 75.00 },
    { id: 8, name: 'Red Bull', price: 25.00 },
    { id: 9, name: 'Zeunerts Julmust', price: 30.00 },
    { id: 10, name: 'Zeunerts Julmust Sockerfri', price: 30.00 },
    { id: 11, name: 'Cheetos Cheddar Jalapeño', price: 40.00 },
    { id: 12, name: 'Dumle Snacks Mint', price: 35.00 },
    { id: 13, name: 'Kina Salty Snacks', price: 39.00 },
    { id: 14, name: 'Kina Snacks', price: 39.00 },
    { id: 15, name: 'Ahlgrens Bilar', price: 21.90 },
    { id: 16, name: 'Sweet Chilimayo Chips', price: 40.00 },
    { id: 17, name: 'gooh! Köttbullar', price: 55.90 },
    { id: 18, name: 'gooh! Lasagnette', price: 55.90 },
    { id: 19, name: 'Wasa French Herbs', price: 15.00 },
    { id: 20, name: 'Wasa Sourcream & Onion', price: 15.00 },
    { id: 21, name: 'Wasa Tomato Basil', price: 15.00 },
    { id: 22, name: 'Åsna', price: 8599.00 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productID) {
    const product = products.find(p => p.id === productID);
    cart.unshift(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to the cart!`)
    updateTotalValue();
    updateTotalItems();
}

function removeFromCart(productID) {
    const productIndex = cart.findIndex(p => p.id === productID);
    if (productIndex === -1) {
        const product = products.find(p => p.id === productID);
        const productName = product ? product.name : 'This product';
        alert(`${productName} is not in the cart!`);
        return;
    }
        const removedProduct = cart.splice(productIndex, 1)[0];
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${removedProduct.name} removed from the cart!`)
        updateTotalValue();
        updateTotalItems();
    }

}


function helpPopUp() {
    document.getElementById("popup").style.display = "flex";
}
function closePopUp() {
    document.getElementById("popup").style.display = "none";
}

    function updateTotalValue() {
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        document.getElementById('totalValue').textContent = `Total: ${total.toFixed(2)} Kr`;
    }
    function updateTotalItems() {
        const totalItems = cart.length;
        document.getElementById('totalItems').textContent = `Antal: ${totalItems} st`;
    }
    document.addEventListener('DOMContentLoaded', () => {
        updateTotalValue();
        updateTotalItems();
    });

