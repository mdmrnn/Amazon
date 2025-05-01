import { loadProductsFetch } from "../data/products.js";
import { renderOrderContainer } from "./orders/ordersSummary.js";
import { cartClass } from "../data/cart-class.js";

renderOrderPage();

async function renderOrderPage() {
  await loadProductsFetch();
  renderOrderContainer();
}

//localStorage.removeItem("orders");

//localStorage.getItem("orders");
