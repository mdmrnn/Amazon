import { cartClass } from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { findDelivaryOption } from "../../data/delivaryOptions.js";
import { orders } from "../orders/ordersSummary.js";

export function renderPaymentSummary() {
  const itemsCents = calcItemsCost();
  const shippingCents = calcShippingCost();
  const beforeTaxCents = calcItemsCost() + calcShippingCost();
  const taxCents = beforeTaxCents * 0.1;
  const orderCents = beforeTaxCents + taxCents;
  let paymentSummaryHtml = `
  <div class="payment-summary-row">
    <div>Items (${cartClass.cartQuantity}):</div>
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
    cartClass.cartItem.forEach((cartItem) => {
      const cartProduct = findProduct(cartItem.productId);
      itemsCostCents += cartProduct.priceCents * cartItem.quantity;
    });
    return itemsCostCents;
  }

  function calcShippingCost() {
    let shippingCostCents = 0;
    cartClass.cartItem.forEach((cartItem) => {
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

  console.log(cartClass);
}

document
  .querySelector(".js-place-order-btn")
  .addEventListener("click", async () => {
    //console.log(cartClass.cartItem);
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartClass.cartItem,
        }),
      });
      const order = await response.json();
      addOrder(order);
      console.log(order);
    } catch (error) {
      console.log("UnExpected Error has occured. Please try again later");
    }
    window.location.href = "orders.html";
  });

function addOrder(order) {
  orders.unshift(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  console.log(orders);
}
