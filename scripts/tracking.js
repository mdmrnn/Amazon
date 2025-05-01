import { cartClass } from "../data/cart-class.js";
import { orders } from "./orders/ordersSummary.js";
import { products, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function trackingSummary() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const order = findOrder(orderId);
  const product = findProduct(productId);

  const orderProduct = findOrderProduct(productId, order);
  const delivaryTime = formatTime(orderProduct.estimatedDeliveryTime);
  document.querySelector(".js-order-tracking").innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${delivaryTime}</div>
  
    <div class="product-info">
      ${product.name}
    </div>
  
    <div class="product-info">Quantity: ${orderProduct.quantity}</div>
  
    <img
      class="product-image"
      src=${product.image}
    />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;
}

async function renderTracking() {
  await loadProductsFetch();
  document.querySelector(
    ".js-cart-quantity"
  ).innerHTML = `${cartClass.cartQuantity}`;
  trackingSummary();
}

renderTracking();

function findOrderProduct(Id, order) {
  let matchingItem = "";
  order.products.forEach((element) => {
    if (element.productId === Id) matchingItem = element;
  });
  return matchingItem;
}

function findOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) matchingOrder = order;
  });
  return matchingOrder;
}

function findProduct(Id) {
  let matchingItem = "";
  products.forEach((product) => {
    if (product.id === Id) matchingItem = product;
  });
  return matchingItem;
}

function formatTime(time) {
  return dayjs(time).format("dddd, MMMM D");
}
