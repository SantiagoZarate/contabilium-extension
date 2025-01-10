export function formatCurrency(
  amount: number,
  currency: string = 'ARS',
): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
