import { cart, cartQuantity, removeFromCart, updateQuantity } from "./cart.js";
import { formatCurrency } from "./utils/money.js";
import { findProduct } from "../data/products.js";
renderOrderSummaryHTML();

document.querySelector(
  ".js-return-to-home-quantity"
).innerHTML = `${cartQuantity} items`;

function renderOrderSummaryHTML() {
  let orderSummaryHtml = ``;
  cart.forEach((cartItem) => {
    const cartProduct = findProduct(cartItem.id);
    //console.log(cartProduct);
    orderSummaryHtml += `
  <div class="cart-item-container js-cart-item-container-${cartItem.id}">
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
          <span> Quantity: <span class="quantity-label js-quantity-label-${
            cartItem.id
          } ">${cartItem.quantity}</span> </span>
          <span class="update-quantity-link link-primary js-update-btn" data-product-id = "${
            cartItem.id
          }">
            Update
          </span>
          <input class="js-quantity-input js-quantity-input-${
            cartItem.id
          }" data-product-id = "${cartItem.id}">
          <span class="js-save-quantity-link link-primary" data-product-id = "${
            cartItem.id
          }">Save</span>
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
    document.querySelector(
      ".js-return-to-home-quantity"
    ).innerHTML = `${cartQuantity} items`;
    //renderOrderSummaryHTML();
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

document.querySelectorAll(".js-update-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productId } = btn.dataset;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-edditing-quantity");
    //renderOrderSummaryHTML();
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productId } = btn.dataset;
    const updateQuan = document.querySelector(
      `.js-quantity-input-${productId}`
    ).value;
    if (updateQuan >= 0 && updateQuan <= 1000) {
      updateQuantity(productId, updateQuan);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        updateQuan;
      document.querySelector(
        ".js-return-to-home-quantity"
      ).innerHTML = `${cartQuantity} items`;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-edditing-quantity");
    } else {
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        "Not a Valid Quantity";
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-edditing-quantity");
    }
  });
});

document.querySelectorAll(".js-quantity-input").forEach((inp) => {
  inp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const { productId } = inp.dataset;
      const updateQuan = document.querySelector(
        `.js-quantity-input-${productId}`
      ).value;
      if (updateQuan >= 0 && updateQuan <= 1000) {
        updateQuantity(productId, updateQuan);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          updateQuan;
        document.querySelector(
          ".js-return-to-home-quantity"
        ).innerHTML = `${cartQuantity} items`;
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-edditing-quantity");
      } else {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          "Not a Valid Quantity";
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-edditing-quantity");
      }
    }
  });
});

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
