import { contabiliumApi } from '@/api/contabilium';
import { formatCurrency } from '@/helpers/formatCurrency';
import { addDisableStyles } from '@/scripts/addDisableStyles';
import { injectDialog } from '@/scripts/injectDialog';
import { injectDialogStyles } from '@/scripts/injectDialogStyles';
import { removeDuplicateButtons } from '@/scripts/removeDuplicateButtons';

export default defineContentScript({
  matches: [
    'https://pos.contabilium.com/',
    'https://app.contabilium.com/comprobantes.aspx',
  ],
  runAt: 'document_idle',
  main() {
    const DEPOSITO = 'LOCAL RIVADAVIA';
    // const DEPOSITO = 'SHOWROOM PRINGLES';
    // Function to handle product selection
    function showDialog(title: string, price: number): void {
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

    // Cuando se clickea un producto abre el dialog con las opciones de garantia
    async function addClickListenersToProducts() {
      const productItems =
        document.querySelectorAll<HTMLElement>('.item-product');

      productItems.forEach(async item => {
        item.removeEventListener('click', getInfoFromItemAndShowDialog);

        function getInfoFromItemAndShowDialog() {
          const productName = item.querySelector('h5')?.textContent?.trim();
          const productPriceText = item
            .querySelector('.price')
            ?.textContent?.trim();

          // Extract and parse the price
          const productPrice = parseFloat(
            productPriceText?.replace(/[^\d.-]/g, '') || '0',
          );

          showDialog(productName!, productPrice);
        }

        item.addEventListener('click', getInfoFromItemAndShowDialog);

        // Prevent dialog opening when clicking on the "Stock" text
        const stockLink = item.querySelector('.info .code a');
        if (stockLink) {
          stockLink.addEventListener('click', event => {
            console.log('Clicked on Stock link, preventing dialog!');
            event.stopPropagation(); // Prevent the event from bubbling up
          });
        }
      });
    }

    // Function to disable out-of-stock items
    async function disableOutOfStockItems() {
      const items = document.querySelectorAll<HTMLElement>('.item-product');
      items.forEach(async item => {
        const stockText = item
          .querySelector('.info .code b')
          ?.textContent?.trim();

        // Si el stock esta en 0, desabilitarlo de una
        if (stockText === 'Stock: 0') {
          addDisableStyles(item);
        } else {
          // Sino hacer una request y checkear si tiene stock para mercado libre
          const productName = item.querySelector('h5')?.textContent?.trim()!;

          if (!productName) {
            return;
          }

          const product = await contabiliumApi.getProductByName(productName);

          const itemAux = product?.Items[0];

          if (!itemAux) {
            return;
          }

          const productSku = itemAux.Codigo;

          if (!productSku) {
            return;
          }

          const stock = await contabiliumApi.getStockByDepositos(productSku);

          if (!stock) {
            return;
          }

          const mercadoLibreStock = stock.stock?.find(
            deposito => deposito.Codigo === DEPOSITO,
          );

          if (mercadoLibreStock?.StockActual === 0) {
            addDisableStyles(item);
          }
        }
      });
    }

    function deleteInjectedRowsFromTable() {
      const deleteAllButton = document.querySelector(
        '.btn-danger.full-width.remove-all.btn-big',
      );

      if (deleteAllButton) {
        deleteAllButton.addEventListener('click', () => {
          document
            .querySelectorAll('[data-dialog="row"]')
            .forEach(row => row.remove());
        });
      }
    }

    // Function to observe changes in the DOM
    function observeDOM(): void {
      const targetNode = document.body;
      const config: MutationObserverInit = { childList: true, subtree: true };

      const observer = new MutationObserver(() => {
        removeDuplicateButtons();

        deleteInjectedRowsFromTable();
      });

      observer.observe(targetNode, config);
    }

    function observeProductList() {
      const productList = document.querySelector('.item-list.ng-isolate-scope');

      if (!productList) {
        console.warn('Product list not found!');
        return;
      }

      const config: MutationObserverInit = {
        childList: true, // Observe when child nodes are added or removed
        subtree: false, // Observe only direct children
      };

      let debounceTimeout: number | null = null;

      const observer = new MutationObserver(() => {
        // Clear the previous timeout if it exists
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        // Set a new timeout
        debounceTimeout = window.setTimeout(() => {
          console.log('Product list changed, updating items...');
          disableOutOfStockItems();
          addClickListenersToProducts();
        }, 1000); // Wait 1 second after the last change
      });

      observer.observe(productList, config);

      console.log('Observing product list for changes.');
    }

    // Run when the page has loaded
    window.addEventListener('load', async () => {
      // Get access token and store it in local storage
      const token = await contabiliumApi.getAccessToken();
      if (token) {
        localStorage.setItem('contabilium_access_token', token);
      }
      observeDOM();
      observeProductList();
      removeDuplicateButtons();
      injectDialog();
      injectDialogStyles();
      addClickListenersToProducts();
    });
  },
});
