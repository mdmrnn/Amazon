import {
  cart,
  cartQuantity,
  removeFromCart,
  updateQuantity,
  updateDelivaryOption,
} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { findProduct } from "../data/products.js";
import { delivaryOptions } from "../data/delivaryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

document.querySelector(
  ".js-return-to-home-quantity"
).innerHTML = `${cartQuantity} items`;

createOrderSummaryHTML();

function createOrderSummaryHTML() {
  let orderSummaryHtml = ``;
  cart.forEach((cartItem) => {
    const cartProduct = findProduct(cartItem.id);
    orderSummaryHtml += `
  <div class="cart-item-container js-cart-item-container-${cartItem.id}">
    <div class="delivery-date">Delivery date:${createDelivaryDate(
      cartItem
    )}</div>  
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
          ${createDelivaryOptionsHTML(cartItem)}
      </div>
      </div>
    </div>
  </div>
  `;
  });
  document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;
}

function createDelivaryDate(cartItem) {
  const today = dayjs();
  let delivaryDays = "";
  delivaryOptions.forEach((delivaryOption) => {
    if (delivaryOption.id === cartItem.delivaryOptionId)
      delivaryDays = delivaryOption.delivaryDays;
  });
  const delivaryDate = today.add(delivaryDays, "days").format("dddd, MMMM D");
  return delivaryDate;
}

function createDelivaryOptionsHTML(cartItem) {
  let delivaryOptionsHtml = ``;
  delivaryOptions.forEach((delivaryOption) => {
    const today = dayjs();
    const delivaryDate = today
      .add(delivaryOption.delivaryDays, "days")
      .format("dddd, MMMM D");
    let delivaryPrice = "";
    if (delivaryOption.id === "1") delivaryPrice = "FREE";
    else delivaryPrice = `$${formatCurrency(delivaryOption.priceCents)} -`;
    let isChecked = "";
    if (delivaryOption.id === cartItem.delivaryOptionId) isChecked = "checked";
    delivaryOptionsHtml += `
    <div class="delivery-option js-delivary-option" 
    data-cart-item-id = "${cartItem.id}" 
    data-delivary-option-id = "${delivaryOption.id}">
      <input
        type="radio"
        ${isChecked}
        class="delivery-option-input"
        name="delivery-option-${cartItem.id}"
      />
      <div>
        <div class="delivery-option-date">${delivaryDate}</div>
        <div class="delivery-option-price">${delivaryPrice} Shipping</div>
      </div>
    </div>
  `;
  });
  return delivaryOptionsHtml;
}

document.querySelectorAll(".js-delivary-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { cartItemId, delivaryOptionId } = element.dataset;
    updateDelivaryOption(cartItemId, delivaryOptionId);
  });
});

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
    const updateQuan = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );
    if (updateQuan > 0 && updateQuan <= 1000) {
      updateQuantity(productId, updateQuan);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        updateQuan;
      document.querySelector(
        ".js-return-to-home-quantity"
      ).innerHTML = `${cartQuantity} items`;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-edditing-quantity");
    } else if (updateQuan === 0) {
      removeFromCart(productId);
      document.querySelector(
        ".js-return-to-home-quantity"
      ).innerHTML = `${cartQuantity} items`;
      //renderOrderSummaryHTML();
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
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
      const updateQuan = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      if (updateQuan > 0 && updateQuan <= 1000) {
        updateQuantity(productId, updateQuan);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          updateQuan;
        document.querySelector(
          ".js-return-to-home-quantity"
        ).innerHTML = `${cartQuantity} items`;
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-edditing-quantity");
      } else if (updateQuan === 0) {
        removeFromCart(productId);
        document.querySelector(
          ".js-return-to-home-quantity"
        ).innerHTML = `${cartQuantity} items`;
        //renderOrderSummaryHTML();
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
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
