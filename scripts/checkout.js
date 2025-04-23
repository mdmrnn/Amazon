import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/header.js";
import { cart } from "../data/cart-class.js";
// import "../data/cart-class.js";
renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader(cart.cartQuantity);
