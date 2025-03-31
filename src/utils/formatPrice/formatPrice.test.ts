import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formata data corretamente o preço ", () => {
    const price = 5000;
    expect(formatPrice(price)).toBe("R$\u00A05.000,00");
  });

  it("formata valores com centavos", () => {
    expect(formatPrice(199.99)).toBe("R$\u00A0199,99");
  });

  it("formata milhões com notação compacta", () => {
    expect(formatPrice(1500000, { notation: "compact" })).toBe(
      "R$\u00A01,5\u00A0mi"
    );
  });
});
