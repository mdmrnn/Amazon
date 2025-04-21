import { Products, Clothing, Appliance } from "../data/products.js";
import { formatCurrency } from "../scripts/utils/money.js";

describe("test classes of products", () => {
  beforeEach(() => {
    const product1 = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
      type: "appliance",
      instructions: "images/appliance-instructions.png",
      warranty: "images/appliance-warranty.png",
    });
    const product2 = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
    const product3 = new Products({
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    });
  });
  afterEach(() => {});
  it("test products", () => {
    const product3 = new Products({
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    });
    expect(product3.instructions).toEqual(undefined);
    expect(product3.name).toEqual("Intermediate Size Basketball");
    expect(product3.warranty).toEqual(undefined);
    expect(product3.sizeChartLink).toEqual(undefined);
    expect(product3.getRatingUrl()).toEqual(
      `images/ratings/rating-${product3.rating.stars * 10}.png`
    );
    expect(product3.getPrice()).toEqual(
      `$${formatCurrency(product3.priceCents)}`
    );
    expect(product3.extraInfoHTML()).toEqual(``);
  });
  it("test clothing products", () => {
    const product2 = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
    expect(product2.instructions).toEqual(undefined);
    expect(product2.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(product2.warranty).toEqual(undefined);
    expect(product2.sizeChartLink).toEqual("images/clothing-size-chart.png");
    expect(product2.getRatingUrl()).toEqual(
      `images/ratings/rating-${product2.rating.stars * 10}.png`
    );
    expect(product2.getPrice()).toEqual(
      `$${formatCurrency(product2.priceCents)}`
    );
    expect(product2.extraInfoHTML()).toEqual(
      `<a href=${product2.sizeChartLink} target="_blank">Size Chart</a>`
    );
  });
  it("test appliance products", () => {
    const product1 = new Appliance({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "appliance",
      instructions: "images/appliance-instructions.png",
      warranty: "images/appliance-warranty.png",
    });
    expect(product1.instructions).toEqual("images/appliance-instructions.png");
    expect(product1.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(product1.warranty).toEqual("images/appliance-warranty.png");
    expect(product1.sizeChartLink).toEqual(undefined);
    expect(product1.getRatingUrl()).toEqual(
      `images/ratings/rating-${product1.rating.stars * 10}.png`
    );
    expect(product1.getPrice()).toEqual(
      `$${formatCurrency(product1.priceCents)}`
    );
    expect(product1.extraInfoHTML()).toEqual(`
    <div><a href=${product1.instructions} target="_blank">Instruction</a></div>
    <div><a href=${product1.warranty} target="_blank">Warranty</a></div>`);
  });
});
