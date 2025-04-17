import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../data/cart.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

describe("testRenderOrderSummary", () => {
  const product1Id = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const product2Id = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    document.querySelector(".js-test-container-order-summary").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-return-to-home-quantity"></div>
    `;
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: product1Id,
          quantity: 2,
          delivaryOptionId: "1",
        },
        {
          id: product2Id,
          quantity: 1,
          delivaryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-container-order-summary").innerHTML = "";
  });
  it("display carts", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${product1Id}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${product2Id}`).innerText
    ).toContain("Quantity: 1");
  });

  it("remove from cart", () => {
    document.querySelector(`.js-save-quantity-link-${product1Id}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-product-quantity-${product2Id}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-cart-item-container-${product1Id}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${product2Id}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual(product2Id);
  });
});

describe("test delivary option update", () => {
  const product1Id = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const product2Id = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    document.querySelector(".js-test-container-order-summary").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-return-to-home-quantity"></div>
    `;
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: product1Id,
          quantity: 2,
          delivaryOptionId: "1",
        },
        {
          id: product2Id,
          quantity: 1,
          delivaryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
    renderPaymentSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-container-order-summary").innerHTML = "";
  });
  it("update delivary click", () => {
    document.querySelector(`.js-delivary-option-${product1Id}-3`).click();

    expect(cart[0].delivaryOptionId).toEqual("3");
    expect(cart.length).toEqual(2);
    expect(document.querySelector(".js-shipping-cost").innerHTML).toEqual(
      "$14.98"
    );
    expect(document.querySelector(".js-order-cost").innerHTML).toEqual(
      "$63.50"
    );
  });
});
