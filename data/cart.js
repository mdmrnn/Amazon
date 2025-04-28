import { delivaryOptions } from "./delivaryOptions.js";
let cart;
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
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
loadFromStorage();
/*
export async function loadCartFetch() {
  const promise = await fetch("https://supersimplebackend.dev/cart")
    .then((response) => {
      console.log(response);
      console.log(response.json());
      return response.json();
    })
    .then((cart) => {
      console.log(cart);
    })
    .catch((error) => {
      console.log("UnExpected Error has occured. Please try again later");
    });
  return promise;
}
  */

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
let showAddedTimeoutId = 0;
let previousBtnId = "";
export let cartQuantity = 0;
updateCartQuantity();

export function updateDelivaryOption(productId, delivaryOptionId) {
  const cartItem = findCartItem(productId);
  if (!cartItem) return;

  let matchingDelivaryOption = "";
  delivaryOptions.forEach((delivaryOption) => {
    if (delivaryOption.id === delivaryOptionId)
      matchingDelivaryOption = delivaryOption;
  });
  if (matchingDelivaryOption === "") return;

  cartItem.delivaryOptionId = delivaryOptionId;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(id) {
  const cartItem = findCartItem(id);
  const quantitySelector = Number(
    document.querySelector(`.js-quantity-selector-${id}`).value
  );

  if (!cartItem) {
    cart.push({
      id,
      quantity: quantitySelector,
      delivaryOptionId: "1",
    });
  } else {
    cartItem.quantity += quantitySelector;
  }
  saveToStorage();
  showAddedToCart(id);
  updateCartQuantity();
}

export function removeFromCart(id) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id != id) newCart.push(cartItem);
  });
  cart = newCart;
  saveToStorage();
  updateCartQuantity();
  //renderOrderSummaryHTML();
}

export function findCartItem(id) {
  let matchingItem = "";
  cart.forEach((cartItem) => {
    if (cartItem.id === id) {
      matchingItem = cartItem;
    }
  });
  return matchingItem;
}

function showAddedToCart(productId) {
  const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
  addedToCart.classList.add("js-show-added");
  if (previousBtnId === productId) {
    clearTimeout(showAddedTimeoutId);
  }
  previousBtnId = productId;
  showAddedTimeoutId = setTimeout(() => {
    addedToCart.classList.remove("js-show-added");
  }, 1000);
}

export function updateCartQuantity() {
  cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += Number(cartItem.quantity);
  });
  //document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  //localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
}
export function updateQuantity(productId, updateQuantity) {
  const cartItem = findCartItem(productId);
  cartItem.quantity = updateQuantity;
  saveToStorage();
  updateCartQuantity();
}
