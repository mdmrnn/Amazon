import { cart } from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { findDelivaryOption } from "../../data/delivaryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  const itemsCents = calcItemsCost();
  const shippingCents = calcShippingCost();
  const beforeTaxCents = calcItemsCost() + calcShippingCost();
  const taxCents = beforeTaxCents * 0.1;
  const orderCents = beforeTaxCents + taxCents;
  let paymentSummaryHtml = `
  <div class="payment-summary-row">
    <div>Items (${cart.cartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrency(itemsCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-shipping-cost">$${formatCurrency(
      shippingCents
    )}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(beforeTaxCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-order-cost">$${formatCurrency(
      orderCents
    )}</div>
  </div>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;

  function calcItemsCost() {
    let itemsCostCents = 0;
    cart.cartItem.forEach((cartItem) => {
      const cartProduct = findProduct(cartItem.productId);
      itemsCostCents += cartProduct.priceCents * cartItem.quantity;
    });
    return itemsCostCents;
  }

  function calcShippingCost() {
    let shippingCostCents = 0;
    cart.cartItem.forEach((cartItem) => {
      const cartDelivaryOption = findDelivaryOption(cartItem.delivaryOptionId);
      shippingCostCents += cartDelivaryOption.priceCents;
    });
    return shippingCostCents;
  }

  function findProduct(productId) {
    let matchingItem = "";
    products.forEach((product) => {
      if (product.id === productId) matchingItem = product;
    });
    return matchingItem;
  }

  document
    .querySelector(".js-place-order-btn")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart.cartItem,
          }),
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("UnExpected Error has occured. Please try again later");
      }

      window.location.href = "orders.html";
    });
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
