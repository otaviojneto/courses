import { getInitials } from "./getInitials";

describe("getInitials function", () => {
  it("deve retornar iniciais maiúsculas para nomes completos", () => {
    expect(getInitials("João Silva Costa")).toBe("JSC");
    expect(getInitials("Maria Eduarda")).toBe("ME");
  });

  it("deve lidar com espaços extras e casos mistos", () => {
    expect(getInitials("  ana paula   SOUZA ")).toBe("APS");
    expect(getInitials("PEDRO-maria")).toBe("P");
  });

  it("deve retornar string vazia para entradas inválidas", () => {
    expect(getInitials("")).toBe("");
    expect(getInitials(" ")).toBe("");
    expect(getInitials("   ")).toBe("");
  });
});
