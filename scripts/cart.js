export const cart = JSON.parse(localStorage.getItem("cart")) || [];
let showAddedTimeoutId = 0;
let previousBtnId = "";
updateCartQuantity();

export function addToCart(productName, productId) {
  const cartProduct = findCartProduct(productId);
  const quantitySelector = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  if (!cartProduct) {
    cart.push({
      productId,
      productName,
      quantity: quantitySelector,
    });
  } else {
    cartProduct.quantity += quantitySelector;
  }

  showAddedToCart(productId);
  updateCartQuantity();
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function findCartProduct(productId) {
  let cartProduct = "";
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) cartProduct = cartItem;
  });
  return cartProduct;
}

function showAddedToCart(productId) {
  const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
  addedToCart.classList.add("js-show-added");
  if (previousBtnId === productId) {
    clearTimeout(showAddedTimeoutId);
  }
  previousBtnId = productId;
  showAddedTimeoutId = setTimeout(() => {
    addedToCart.classList.remove("js-show-added");
  }, 1000);
}

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
}
