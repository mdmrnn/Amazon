import { cartClass } from "../data/cart-class.js";

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
    /*
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
    cart.loadFromStorage();
    */
    cartClass.cartItem = [
      {
        productId: "id1",
        quantity: 1,
        delivaryOptionId: "1",
      },
      {
        productId: "id2",
        quantity: 2,
        delivaryOptionId: "1",
      },
    ];
  });
  it("add a new product to cart", () => {
    cartClass.addToCart("id3");
    expect(cartClass.cartItem.length).toEqual(3);
    expect(cartClass.cartItem[2].productId).toEqual("id3");
    expect(cartClass.cartItem[2].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it("add an existing product to cart", () => {
    cartClass.addToCart("id1");
    expect(cartClass.cartItem.length).toEqual(2);
    expect(cartClass.cartItem[0].productId).toEqual("id1");
    expect(cartClass.cartItem[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("test-suite: remove from cart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    cartClass.cartItem = [
      {
        productId: "id1",
        quantity: 1,
        delivaryOptionId: "1",
      },
      {
        productId: "id2",
        quantity: 2,
        delivaryOptionId: "1",
      },
    ];
  });
  it("remove a product that is in the cart", () => {
    cartClass.removeFromCart("id1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cartClass.cartItem.length).toEqual(1);
    expect(cartClass.cartItem[0].productId).toEqual("id2");
    expect(cartClass.cartItem[0].quantity).toEqual(2);
  });
  it("remove a product that is not in the cart", () => {
    cartClass.removeFromCart("id3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cartClass.cartItem.length).toEqual(2);
    expect(cartClass.cartItem[0].productId).toEqual("id1");
    expect(cartClass.cartItem[0].quantity).toEqual(1);
  });
});

describe("test-suite: update delivary option", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    cartClass.cartItem = [
      {
        productId: "id1",
        quantity: 1,
        delivaryOptionId: "1",
      },
      {
        productId: "id2",
        quantity: 2,
        delivaryOptionId: "1",
      },
    ];
  });
  it("update delivary option for an existig product", () => {
    cartClass.updateDelivaryOption("id1", "3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cartClass.cartItem.length).toEqual(2);
    expect(cartClass.cartItem[0].productId).toEqual("id1");
    expect(cartClass.cartItem[0].quantity).toEqual(1);
    expect(cartClass.cartItem[0].delivaryOptionId).toEqual("3");
  });
  it("update delivary option for a non existig product", () => {
    cartClass.updateDelivaryOption("id3", "3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cartClass.cartItem.length).toEqual(2);
    expect(cartClass.cartItem[0].productId).toEqual("id1");
    expect(cartClass.cartItem[0].quantity).toEqual(1);
    expect(cartClass.cartItem[0].delivaryOptionId).toEqual("1");
  });
  it("update delivary option for a non existig delivary option id", () => {
    cartClass.updateDelivaryOption("id", "4");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cartClass.cartItem.length).toEqual(2);
    expect(cartClass.cartItem[0].productId).toEqual("id1");
    expect(cartClass.cartItem[0].quantity).toEqual(1);
    expect(cartClass.cartItem[0].delivaryOptionId).toEqual("1");
  });
});
