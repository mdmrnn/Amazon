export const cart = [];

export function findCartProduct(productId) {
  let cartProduct = "";
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) cartProduct = cartItem;
  });
  return cartProduct;
}

export function countCartProduct() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}
