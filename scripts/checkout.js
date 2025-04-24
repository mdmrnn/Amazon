import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/header.js";
import { cart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

loadProductsFetch().then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(cart.cartQuantity);
});

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
