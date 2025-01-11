import { showDialog } from './showDialog';

const ARTICULOS_CON_GARANTIA_EXTENDIDA = [
  'ventilador',
  'cocina',
  'lavarropa',
  'heladera',
];

export async function addClickListenersToProducts() {
  console.log('AGREGANDO EVENT LISTENER');

  const productItems = document.querySelectorAll<HTMLElement>('.item-product');

  productItems.forEach(async item => {
    item.removeEventListener('click', getInfoFromItemAndShowDialog);

    function getInfoFromItemAndShowDialog() {
      const productName = item.querySelector('h5')?.textContent?.trim();

      if (
        ARTICULOS_CON_GARANTIA_EXTENDIDA.some(
          articulo => productName?.toLowerCase().indexOf(articulo) !== -1,
        )
      ) {
        const productPriceText = item
          .querySelector('.price')
          ?.textContent?.trim();

        // Extract and parse the price
        const productPrice = parseFloat(
          productPriceText?.replace(/[^\d.-]/g, '') || '0',
        );

        showDialog(productName!, productPrice);
      }
    }

    item.addEventListener('click', getInfoFromItemAndShowDialog);

    // Prevent dialog opening when clicking on the "Stock" text
    const stockLink = item.querySelector('.info .code a');
    if (stockLink) {
      stockLink.addEventListener('click', event => {
        event.stopPropagation(); // Prevent the event from bubbling up
      });
    }
  });
}
