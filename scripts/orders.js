import { loadProductsFetch } from "../data/products.js";
import { renderOrderContainer } from "./orders/ordersSummary.js";
import { cartClass } from "../data/cart-class.js";

renderOrderPage();

async function renderOrderPage() {
  await loadProductsFetch();

  document.querySelector(".js-cart-quantity").innerHTML =
    cartClass.cartQuantity;

  renderOrderContainer();
}

//localStorage.removeItem("orders");

//localStorage.getItem("orders");
