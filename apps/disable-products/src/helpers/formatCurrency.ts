export function formatCurrency(
  amount: number,
  currency: string = 'USD',
): string {
  // Format the number with the correct locale (es-AR) for the currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);

  // Replace the comma with a dot and the period with a comma in the number part of the formatted string
  return formattedAmount;
}
