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

  const now = dayjs() + 2;
  const delivaryTime = dayjs(orderProduct.estimatedDeliveryTime);
  const orderTime = dayjs(order.orderTime);
  const progressPercent = Math.round(
    ((now - orderTime) / (delivaryTime - orderTime)) * 100
  );
  //let status;
  //style='color: rgb(6, 125, 98);'

  document.querySelector(".js-order-tracking").innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${delivaryTime.format(
      "dddd, MMMM D"
    )}</div>
  
    <div class="product-info">
      ${product.name}
    </div>
  
    <div class="product-info">Quantity: ${orderProduct.quantity}</div>
  
    <img
      class="product-image"
      src=${product.image}
    />

    <div class="progress-labels-container">
      <div class="progress-label js-progress-label-preparing">Preparing</div>
      <div class="progress-label js-progress-label-shipped">Shipped</div>
      <div class="progress-label js-progress-label-delivered">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style='width:${progressPercent}%;'></div>
    </div>
  `;

  if (progressPercent < 50)
    document
      .querySelector(".js-progress-label-preparing")
      .classList.add("current-status");
  else if (progressPercent < 100)
    document
      .querySelector(".js-progress-label-shipped")
      .classList.add("current-status");
  else
    document
      .querySelector(".js-progress-label-delivered")
      .classList.add("current-status");
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
