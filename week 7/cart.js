export let cart = [];


export function addToCart(book) {
    cart.push(book);
}


export function removeFromCart(index) {
    cart.splice(index, 1);
}

export function calculateTotal() {
    return cart.reduce((sum, book) => sum + book.price, 0);
}
