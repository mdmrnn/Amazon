import { addToCart, cart, loadFromStorage } from "../data/cart.js";
describe("test-suite: add to cart", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container-cart").innerHTML = `
    <select class="js-quantity-selector-id1">
      <option selected value="1">1</option>
    </select>
    <div class="js-added-to-cart-id1"></div>
  `;
    spyOn(localStorage, "setItem");
  });
  it("add a new product to cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart("id1");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
  it("add an existing product to cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "id1",
          quantity: 1,
          delivaryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    addToCart("id1");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    document.querySelector(".js-quantity-selector-id1").innerHTML = "";
    document.querySelector(".js-added-to-cart-id1").innerHTML = "";
  });
});
