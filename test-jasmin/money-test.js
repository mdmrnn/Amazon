import { formatCurrency } from "../scripts/utils/money.js";

describe("test suite : formatCurrency", () => {
  it("converts cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("Work with zore", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Round up", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
