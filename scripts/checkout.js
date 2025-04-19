import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/header.js";
import { cartQuantity } from "../data/cart.js";
import "../data/cart-oop.js";
renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader(cartQuantity);
