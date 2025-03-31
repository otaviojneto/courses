import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formata data corretamente com opções padrão", () => {
    const date = new Date(2026, 11, 25);
    expect(formatDate(date)).toBe("25 de dezembro de 2026");
  });

  it("deve formatar a data com opções personalizadas", () => {
    const date = new Date(2026, 0, 15);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };
    const expected = "15 de jan. de 26";
    expect(formatDate(date, options)).toBe(expected);
  });
});
