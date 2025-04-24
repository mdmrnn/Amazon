import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/header.js";
import { cart } from "../data/cart-class.js";
import { loadCartFetch } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

renderCheckoutPage();
async function renderCheckoutPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch {
    console.log("UnExpected Error has occured. Please try again later");
  }
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(cart.cartQuantity);
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
