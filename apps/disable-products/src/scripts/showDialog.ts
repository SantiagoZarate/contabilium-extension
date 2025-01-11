import { formatCurrency } from '@/helpers/formatCurrency';

export function showDialog(title: string, price: number): void {
  const dialog = document.getElementById('product-dialog')!;
  const dialogPlaceholder = document.getElementById('dialog-placeholder')!;
  const unAñoGarantiaPricePlaceholder =
    document.getElementById('dialog-1-año')!;
  const dosAñosGarantiaPricePlaceholder =
    document.getElementById('dialog-2-años')!;

  dialogPlaceholder.textContent = title;

  // Calculate prices with extended warranties
  const porcenajeUnAñoGarantia = 0.25;
  const porcenajeDosAñosGarantia = 0.45;

  const priceWithOneYearWarranty = price * porcenajeUnAñoGarantia;
  const priceWithTwoYearWarranty = price * porcenajeDosAñosGarantia;

  // Render the options
  unAñoGarantiaPricePlaceholder.innerHTML = formatCurrency(
    priceWithOneYearWarranty,
  );
  dosAñosGarantiaPricePlaceholder.innerHTML = formatCurrency(
    priceWithTwoYearWarranty,
  );

  // Show the dialog
  dialog.classList.remove('hidden');
}
