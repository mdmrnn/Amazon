import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDelivaryOption,
} from "../data/cart.js";
describe("test-suite: add to cart", () => {
  afterEach(() => {
    document.querySelector(".js-test-container-cart").innerHTML = "";
  });
  beforeEach(() => {
    document.querySelector(".js-test-container-cart").innerHTML = `
    <select class="js-quantity-selector-id1">
      <option selected value="1">1</option>
    </select>
    <select class="js-quantity-selector-id3">
      <option selected value="1">1</option>
    </select>
    <div class="js-added-to-cart-id1"></div>
    <div class="js-added-to-cart-id3"></div>
  `;
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "id1",
          quantity: 1,
          delivaryOptionId: "1",
        },
        {
          id: "id2",
          quantity: 2,
          delivaryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
  });
  it("add a new product to cart", () => {
    addToCart("id3");
    expect(cart.length).toEqual(3);
    expect(cart[2].id).toEqual("id3");
    expect(cart[2].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it("add an existing product to cart", () => {
    addToCart("id1");
    expect(cart.length).toEqual(2);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("test-suite: remove from cart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "id1",
          quantity: 1,
          delivaryOptionId: "1",
        },
        {
          id: "id2",
          quantity: 2,
          delivaryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
  });
  it("remove a product that is in the cart", () => {
    removeFromCart("id1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("id2");
    expect(cart[0].quantity).toEqual(2);
  });
  it("remove a product that is not in the cart", () => {
    removeFromCart("id3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(2);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(1);
  });
});

describe("test-suite: update delivary option", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "id1",
          quantity: 1,
          delivaryOptionId: "1",
        },
        {
          id: "id2",
          quantity: 2,
          delivaryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
  });
  it("update delivary option for an existig product", () => {
    updateDelivaryOption("id1", "3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(2);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].delivaryOptionId).toEqual("3");
  });
  it("update delivary option for a non existig product", () => {
    updateDelivaryOption("id3", "3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart.length).toEqual(2);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].delivaryOptionId).toEqual("1");
  });
  it("update delivary option for a non existig delivary option id", () => {
    updateDelivaryOption("id", "4");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart.length).toEqual(2);
    expect(cart[0].id).toEqual("id1");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].delivaryOptionId).toEqual("1");
  });
});
