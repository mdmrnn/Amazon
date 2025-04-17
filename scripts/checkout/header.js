export default function renderCheckoutHeader(cartQuantity) {
  document.querySelector(
    ".js-return-to-home-quantity"
  ).innerHTML = `${cartQuantity} items`;
}
