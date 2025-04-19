import { delivaryOptions } from "./delivaryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItem: undefined,
    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },
    showAddedTimeoutId: 0,
    previousBtnId: "",
    cartQuantity: 0,
    findCartItem(id) {
      let matchingItem = "";
      this.cartItem.forEach((cartItem) => {
        if (cartItem.id === id) {
          matchingItem = cartItem;
        }
      });
      return matchingItem;
    },
    showAddedToCart(productId) {
      const addedToCart = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      if (!addedToCart) return;
      else {
        addedToCart.classList.add("js-show-added");
        if (this.previousBtnId === productId) {
          clearTimeout(this.showAddedTimeoutId);
        }
        this.previousBtnId = productId;
        this.showAddedTimeoutId = setTimeout(() => {
          addedToCart.classList.remove("js-show-added");
        }, 1000);
      }
    },
    updateCartQuantity() {
      this.cartQuantity = 0;
      this.cartItem.forEach((cartItem) => {
        this.cartQuantity += Number(cartItem.quantity);
      });
    },
    addToCart(id) {
      const matchingItem = this.findCartItem(id);
      const quantitySelector = 1;
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
    },
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
    },
    removeFromCart(id) {
      let newCart = [];
      this.cartItem.forEach((cartItem) => {
        if (cartItem.id != id) newCart.push(cartItem);
      });
      this.cartItem = newCart;
      this.saveToStorage();
      this.updateCartQuantity();
    },
    updateQuantity(productId, updateQuantity) {
      const matchingItem = this.findCartItem(productId);
      matchingItem.quantity = updateQuantity;
      this.saveToStorage();
      this.updateCartQuantity();
    },
  };
  return cart;
}

const cart = Cart("cart");
const bussinessCart = Cart("bussiness-cart");

cart.loadFromStorage();
cart.updateCartQuantity();
cart.addToCart("3ebe75dc-64d2-4137-8860-1f5a963e534b");
bussinessCart.loadFromStorage();
bussinessCart.updateCartQuantity();
console.log(cart);
console.log(bussinessCart);
