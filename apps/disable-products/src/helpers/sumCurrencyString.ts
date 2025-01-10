function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function sumCurrencies(currency1: string, currency2: string) {
  // Remove the dollar sign and commas, then convert to a number
  const num1 = parseFloat(currency1.replace(/[^0-9.-]+/g, ''));
  const num2 = parseFloat(currency2.replace(/[^0-9.-]+/g, ''));

  // Sum the values
  const sum = num1 + num2;

  // Return the formatted result
  return formatCurrency(sum);
}
