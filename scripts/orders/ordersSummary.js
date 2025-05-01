import { formatCurrency } from "../utils/money.js";
import { products } from "../../data/products.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

//console.log(orders);

export function renderOrderContainer() {
  let orderHeaderHtml = ``;
  let orderDetailHtml = ``;

  orders.forEach((order) => {
    document.querySelector(
      ".js-orders-grid"
    ).innerHTML += `<div class="order-container js-order-container-${order.id}"></div>`;
  });

  orders.forEach((order) => {
    orderHeaderHtml = `
      <div class="order-header js-order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>`;
    document.querySelector(`.js-order-container-${order.id}`).innerHTML +=
      orderHeaderHtml;
    order.products.forEach((product) => {
      const orderProduct = findProduct(product.productId);
      orderDetailHtml = `
      <div class="order-details-grid js-order-details-grid">
        <div class="product-image-container">
          <img src="${orderProduct.image}" />
        </div>

        <div class="product-details">
          <div class="product-name">
            ${orderProduct.name}
          </div>
          <div class="product-delivery-date">Arriving on: ${product.estimatedDeliveryTime}</div>
          <div class="product-quantity">Quantity: ${product.quantity}</div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png" />
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
      `;
      document.querySelector(`.js-order-container-${order.id}`).innerHTML +=
        orderDetailHtml;
    });
  });
}

function findProduct(Id) {
  let matchingItem = "";
  products.forEach((product) => {
    if (product.id === Id) matchingItem = product;
  });
  return matchingItem;
}
