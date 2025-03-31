type CurrencyOptions = {
  currency?: "BRL" | "USD";
  notation?: "standard" | "compact";
};

export function formatPrice(
  value: number,
  options: CurrencyOptions = { currency: "BRL", notation: "standard" }
): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: options.currency || "BRL",
    notation: options.notation || "standard",
    maximumFractionDigits: 2,
  }).format(value);
}
