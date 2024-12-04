const products = [
    { id: 1, name: 'Celsius', img: './Images/Celsius.png', price: 20.00 },
    { id: 2, name: 'Arboga 10.2 % Vol', img: './Images/Arboga.png', price: 2.99 },
    { id: 3, name: 'Coca Cola', img: './Images/CocaCola.png', price: 10.00 },
    { id: 4, name: 'Coca Cola Zero', img: './Images/ColaZero.png', price: 10.00 },
    { id: 5, name: 'Dr Pepper', img: './Images/DrPepper.png', price: 10.00 },
    { id: 6, name: 'Fanta', img: './Images/Fanta.png', price: 10.00 },
    { id: 7, name: "Jack Daniel's Coca Cola", img: './Images/Jack.png', price: 75.00 },
    { id: 8, name: 'Red Bull', img: './Images/RedBull.png', price: 25.00 },
    { id: 9, name: 'Zeunerts Julmust', img: './Images/ZeunertsJulmust.png', price: 30.00 },
    { id: 10, name: 'Zeunerts Julmust Sockerfri', img: './Images/ZeunertsZero.png', price: 30.00 },
    { id: 11, name: 'Cheetos Cheddar Jalapeño', img: './Images/Cheetos.png', price: 40.00 },
    { id: 12, name: 'Dumle Snacks Mint', img: './Images/Dumle.png', price: 35.00 },
    { id: 13, name: 'Kina Salty Snacks', img: './Images/Kina2.png', price: 39.00 },
    { id: 14, name: 'Kina Snacks', img: './Images/Kina.png', price: 39.00 },
    { id: 15, name: 'Ahlgrens Bilar', img: './Images/Ahlgrens.png', price: 21.90 },
    { id: 16, name: 'Sweet Chilimayo Chips', img: './Images/Olw.png', price: 40.00 },
    { id: 17, name: 'gooh! Köttbullar', img: './Images/Köttbullar.png', price: 55.90 },
    { id: 18, name: 'gooh! Lasagnette', img: './Images/Lasagnette.png', price: 55.90 },
    { id: 19, name: 'Wasa French Herbs', img: './Images/WasaFrenchHerbs.png', price: 15.00 },
    { id: 20, name: 'Wasa Sourcream & Onion', img: './Images/WasaSourCream.png', price: 15.00 },
    { id: 21, name: 'Wasa Tomato Basil', img: './Images/WasaTomatoBasil.png', price: 15.00 },
    { id: 22, name: 'Åsna', img: './Images/Donkey.png', price: 8599.00 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productID) {
    const product = products.find(p => p.id === productID);
    if (!product) return;


    const cartItem = cart.find(item => item.id === productID);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to the cart!`);
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

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    alert('Cart is now empty');
    updateTotalItems();
    updateTotalValue();

    //Rensar i localstorage att remove knappen ska vara synlig
    document.querySelectorAll(".remove").forEach((removeBtn, index) => {
        removeBtn.style.visibility = "hidden";
        localStorage.removeItem(`removeBtnVisible${index}`);
    });
}


document.querySelectorAll(".remove").forEach((removeBtn, index) => {
    const isVisible = localStorage.getItem(`removeBtnVisible${index}`) === "true";
    removeBtn.style.visibility = isVisible ? "visible" : "hidden";
});


document.querySelectorAll(".add").forEach((button, index) => {
    button.addEventListener('click', () => {
        const removeBtn = document.querySelectorAll(".remove")[index];
        if (removeBtn) {
            removeBtn.style.visibility = "visible";
            localStorage.setItem(`removeBtnVisible${index}`, "true");
        }
    })
})



/* DRINK / SNACKS */

function showDrinks() {
    const drinks = document.getElementById("drinks-section");
    const snacks = document.getElementById("snacks-section");

    drinks.style.display = "flex";
    snacks.style.display = "none";

    document.getElementById("drinks").classList.add("active-button");
    document.getElementById("snacks").classList.remove("active-button");
}

function showSnacks() {
    const drinks = document.getElementById("drinks-section");
    const snacks = document.getElementById("snacks-section");

    drinks.style.display = "none";
    snacks.style.display = "flex";

    document.getElementById("snacks").classList.add("active-button");
    document.getElementById("drinks").classList.remove("active-button");
}