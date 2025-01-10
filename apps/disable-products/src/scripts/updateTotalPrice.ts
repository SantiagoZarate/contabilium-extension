import { sumCurrencies } from '@/helpers/sumCurrencyString';

export function updateTotalPrice() {
  console.log('UPDATING TOTAL PRICE...');

  const totalPriceElement = document.querySelector(
    '.btn.btn-success.full-width.btn-big .pull-right.ng-binding',
  );

  if (!totalPriceElement) {
    return;
  }

  const table = document.getElementById('tablaFacturacion');
  const tableBody = table?.querySelector('tbody');

  // NO SIEMPRE TIENE QUE SUMAR, TAMBIEN RESTAR
  let totalPriceWithouthWarranty = '$0.00';
  const tableRows = tableBody!.querySelectorAll('tr');

  tableRows.forEach(row => {
    const priceCell = row.querySelector('td:nth-child(6)'); // Assuming the price is in the 6th column
    console.log(priceCell?.textContent);
    if (priceCell) {
      totalPriceWithouthWarranty = sumCurrencies(
        totalPriceWithouthWarranty!,
        priceCell.textContent!,
      );
    }
  });

  totalPriceElement.textContent = totalPriceWithouthWarranty;
}
