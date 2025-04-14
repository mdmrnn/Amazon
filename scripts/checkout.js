import {
  cart,
  // findCartItem,
  // updateCartQuantity,
  removeFromCart,
} from "./cart.js";
import { formatCurrency } from "./utils/money.js";
import { findProduct } from "../data/products.js";
renderOrderSummaryHTML();
//const cartQuantity = Number(cartModule.updateCartQuantity());
function renderOrderSummaryHTML() {
  let orderSummaryHtml = ``;
  cart.forEach((cartItem) => {
    const cartProduct = findProduct(cartItem.id);
    //console.log(cartProduct);
    orderSummaryHtml += `
  <div class="cart-item-container">
    <div class="delivery-date">Delivery date: Tuesday, June 21</div>
  
    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${cartProduct.image}"
      />
  
      <div class="cart-item-details">
        <div class="product-name">
          ${cartProduct.name}
        </div>
        <div class="product-price">$${formatCurrency(
          cartProduct.priceCents
        )}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label">${
            cartItem.quantity
          }</span> </span>
          <span class="update-quantity-link link-primary js-update-btn">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = "${
            cartItem.id
          }">
            Delete
          </span>
        </div>
      </div>
  
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}"
          />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}"
          />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}"
          />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  });
  document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;
}

document.querySelectorAll(".js-delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productId } = btn.dataset;
    removeFromCart(productId);
    //renderOrderSummaryHTML();
  });
});
//console.log(orderSummaryHtml);

/*const cartItemsCost = Number(calcCartItemsCost());
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
//const cartQuantity = cartModule.updateCartQuantity;
/*document.querySelector(
  ".js-return-to-home-quantity"
).innerHTML = `${cartQuantity} items`;
*/
