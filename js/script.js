//Script for adding & removing items (Need fixing when other parts are done)

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productID) {
    const product = products.find(p => p.id === productID);
    cart.unshift(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to the cart!`)
}

function removeFromCart(productID) {
    const productIndex = cart.findIndex(p => p.id === productID);
    if (productIndex !== -1) {
        const removedProduct = cart.splice(productIndex, 1)[0];
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${removedProduct.name} removed from the cart!`)
    }
}