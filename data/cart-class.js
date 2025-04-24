import { delivaryOptions } from "./delivaryOptions.js";

class Cart {
  cartItem;
  #localStorageKey;
  #showAddedTimeoutId = 0;
  #previousBtnId = "";
  cartQuantity = 0;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
    this.updateCartQuantity();
  }

  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        delivaryOptionId: "1",
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        delivaryOptionId: "2",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  findCartItem(id) {
    let matchingItem = "";
    this.cartItem.forEach((cartItem) => {
      if (cartItem.id === id) {
        matchingItem = cartItem;
      }
    });
    return matchingItem;
  }

  showAddedToCart(productId) {
    const addedToCart = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    if (!addedToCart) return;
    else {
      addedToCart.classList.add("js-show-added");
      if (this.#previousBtnId === productId) {
        clearTimeout(this.#showAddedTimeoutId);
      }
      this.#previousBtnId = productId;
      this.#showAddedTimeoutId = setTimeout(() => {
        addedToCart.classList.remove("js-show-added");
      }, 1000);
    }
  }

  updateCartQuantity() {
    this.cartQuantity = 0;
    this.cartItem.forEach((cartItem) => {
      this.cartQuantity += Number(cartItem.quantity);
    });
  }

  addToCart(id) {
    const matchingItem = this.findCartItem(id);
    let quantitySelector = 1;
    if (document.querySelector(`.js-quantity-selector-${id}`))
      quantitySelector = Number(
        document.querySelector(`.js-quantity-selector-${id}`).value
      );
    if (!matchingItem) {
      this.cartItem.push({
        id,
        quantity: quantitySelector,
        delivaryOptionId: "1",
      });
    } else {
      matchingItem.quantity += quantitySelector;
    }
    this.saveToStorage();
    this.showAddedToCart(id);
    this.updateCartQuantity();
  }

  updateDelivaryOption(productId, delivaryOptionId) {
    const cartItem = this.findCartItem(productId);
    if (!cartItem) return;
    let matchingDelivaryOption = "";
    delivaryOptions.forEach((delivaryOption) => {
      if (delivaryOption.id === delivaryOptionId)
        matchingDelivaryOption = delivaryOption;
    });
    if (matchingDelivaryOption === "") return;
    cartItem.delivaryOptionId = delivaryOptionId;
    this.saveToStorage();
  }

  removeFromCart(id) {
    let newCart = [];
    this.cartItem.forEach((cartItem) => {
      if (cartItem.id != id) newCart.push(cartItem);
    });
    this.cartItem = newCart;
    this.saveToStorage();
    this.updateCartQuantity();
  }

  updateQuantity(productId, updateQuantity) {
    const matchingItem = this.findCartItem(productId);
    matchingItem.quantity = updateQuantity;
    this.saveToStorage();
    this.updateCartQuantity();
  }
}

export const cart = new Cart("cart-oop");
const bussinessCart = new Cart("business-cart");
