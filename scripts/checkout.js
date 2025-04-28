import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cartClass } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

renderCheckoutPage();
async function renderCheckoutPage() {
  try {
    await loadProductsFetch();
  } catch {
    console.log("UnExpected Error has occured. Please try again later");
  }
  renderOrderSummary();
  renderPaymentSummary();
  document.querySelector(
    ".js-return-to-home-quantity"
  ).innerHTML = `${cartClass.cartQuantity} items`;
}

/*
Promise.all([loadProductsFetch(), loadCartFetch()]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(cart.cartQuantity);
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(cart.cartQuantity);
});
*/

/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(cart.cartQuantity);
});
*/
