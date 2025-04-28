import { cartClass } from "../../data/cart-class.js";
import { formatCurrency } from "../utils/money.js";
import { products } from "../../data/products.js";
import {
  delivaryOptions,
  createDelivaryDate,
} from "../../data/delivaryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let orderSummaryHtml = ``;
  cartClass.cartItem.forEach((cartItem) => {
    const cartProduct = findProduct(cartItem.productId);
    orderSummaryHtml += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        cartItem.productId
      }">
        <div class="delivery-date">Delivery date:${createDelivaryDateCartItem(
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
            <div class="product-price">${cartProduct.getPrice()}</div>
            <div class="product-quantity js-product-quantity-${
              cartItem.productId
            }">
              <span> Quantity: <span class="quantity-label js-quantity-label-${
                cartItem.productId
              } ">${cartItem.quantity}</span> </span>
              <span class="update-quantity-link link-primary js-update-btn" data-product-id = "${
                cartItem.productId
              }">
                Update
              </span>
              <input class="js-quantity-input js-quantity-input-${
                cartItem.productId
              }" data-product-id = "${cartItem.productId}">
              <span class="js-save-quantity-link js-save-quantity-link-${
                cartItem.productId
              } link-primary" data-product-id = "${
      cartItem.productId
    }">Save</span>
              <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = "${
                cartItem.productId
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

  function findProduct(Id) {
    let matchingItem = "";
    products.forEach((product) => {
      if (product.id === Id) matchingItem = product;
    });
    return matchingItem;
  }

  function createDelivaryDateCartItem(cartItem) {
    let delivaryDays = "";
    delivaryOptions.forEach((delivaryOption) => {
      if (delivaryOption.id === cartItem.delivaryOptionId)
        delivaryDays = delivaryOption.delivaryDays;
    });
    return createDelivaryDate(delivaryDays);
  }

  function createDelivaryOptionsHTML(cartItem) {
    let delivaryOptionsHtml = ``;
    delivaryOptions.forEach((delivaryOption) => {
      const delivaryDate = createDelivaryDate(delivaryOption.delivaryDays);
      let delivaryPrice = "";
      if (delivaryOption.id === "1") delivaryPrice = "FREE";
      else delivaryPrice = `$${formatCurrency(delivaryOption.priceCents)} -`;
      let isChecked = "";
      if (delivaryOption.id === cartItem.delivaryOptionId)
        isChecked = "checked";
      delivaryOptionsHtml += `
      <div class="delivery-option js-delivary-option js-delivary-option-${cartItem.productId}-${delivaryOption.id}" 
      data-cart-item-id = "${cartItem.productId}" 
      data-delivary-option-id = "${delivaryOption.id}">
        <input
          type="radio"
          ${isChecked}
          class="delivery-option-input js-delivery-option-input-${cartItem}-${delivaryOption.id}"
          name="delivery-option-${cartItem.productId}"
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

  document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;

  document.querySelectorAll(".js-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      cartClass.removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
      document.querySelector(
        ".js-return-to-home-quantity"
      ).innerHTML = `${cartClass.cartQuantity} items`;
    });
  });
  document.querySelectorAll(".js-update-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-edditing-quantity");
    });
  });
  document.querySelectorAll(".js-save-quantity-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      const updateQuan = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      if (updateQuan > 0 && updateQuan <= 1000) {
        cartClass.updateQuantity(productId, updateQuan);
        renderOrderSummary();
        renderPaymentSummary();
        document.querySelector(
          ".js-return-to-home-quantity"
        ).innerHTML = `${cartClass.cartQuantity} items`;
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-edditing-quantity");
      } else if (updateQuan === 0) {
        cartClass.removeFromCart(productId);
        renderOrderSummary();
        renderPaymentSummary();
        document.querySelector(
          ".js-return-to-home-quantity"
        ).innerHTML = `${cartClass.cartQuantity} items`;
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
          cartClass.updateQuantity(productId, updateQuan);
          renderOrderSummary();
          renderPaymentSummary();
          document.querySelector(
            ".js-return-to-home-quantity"
          ).innerHTML = `${cartClass.cartQuantity} items`;
          document
            .querySelector(`.js-cart-item-container-${productId}`)
            .classList.remove("is-edditing-quantity");
        } else if (updateQuan === 0) {
          cartClass.removeFromCart(productId);
          renderOrderSummary();
          renderPaymentSummary();
          document.querySelector(
            ".js-return-to-home-quantity"
          ).innerHTML = `${cartClass.cartQuantity} items`;
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
  document.querySelectorAll(".js-delivary-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { cartItemId, delivaryOptionId } = element.dataset;
      cartClass.updateDelivaryOption(cartItemId, delivaryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
