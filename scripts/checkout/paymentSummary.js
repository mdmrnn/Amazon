import { cart, cartQuantity } from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { findDelivaryOption } from "../../data/delivaryOptions.js";

export function renderPaymentSummary() {
  const cartItems = calcItemsCost();
  const shipping = calcShippingCost();
  const beforeTax = calcItemsCost() + calcShippingCost();
  const Tax = (beforeTax / 10).toFixed(2);
  const Order = (Number(beforeTax) + Number(Tax)).toFixed(2);
  let paymentSummaryHtml = `
  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${cartItems}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${shipping}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${beforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${Tax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${Order}</div>
  </div>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;
}

function calcItemsCost() {
  let cartItemsCost = 0;
  cart.forEach((cartItem) => {
    const cartProduct = findProduct(cartItem.id);
    cartItemsCost += Number(
      formatCurrency(cartProduct.priceCents * cartItem.quantity)
    );
  });
  return cartItemsCost;
}

function calcShippingCost() {
  let cartShippingCost = 0;
  cart.forEach((cartItem) => {
    const cartDelivaryOption = findDelivaryOption(cartItem.delivaryOptionId);
    cartShippingCost += Number(formatCurrency(cartDelivaryOption.priceCents));
  });
  return cartShippingCost;
}
/*
const cartItemsCost = Number(calcCartItemsCost());
const shippingCost = Number(4.99);
const totalBeforeTax = cartItemsCost + shippingCost;
const estimatedTax = (totalBeforeTax / 10).toFixed(2);
const orderTotal = totalBeforeTax + estimatedTax;

document.querySelector(".js-payment-summary").innerHTML = `
  <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${cartItemsCost}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$4.99</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${totalBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${estimatedTax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${orderTotal}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
`;
*/
