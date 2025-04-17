import { addToCart, cart, loadFromStorage } from "../data/cart.js";
describe("test-suite: add to cart", () => {
  it("add a new product to cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, "setItem");
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
    spyOn(localStorage, "setItem");
    loadFromStorage();
    addToCart("id1");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
});
