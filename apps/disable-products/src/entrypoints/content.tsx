import { contabiliumApi } from '@/api/contabilium';
import { addDisableStyles } from '@/scripts/addDisableStyles';
import { removeDuplicateButtons } from '@/scripts/removeDuplicateButtons';

export default defineContentScript({
  matches: [
    'https://pos.contabilium.com/',
    'https://app.contabilium.com/comprobantes.aspx',
  ],
  runAt: 'document_idle',
  main() {
    // Function to handle product selection
    async function onProductSelect(productName: string) {
      const productData = await contabiliumApi.getProductByName(productName);

      if (!productData) {
        return;
      }

      const productSKU = productData.Items[0]?.Codigo;

      if (!productSKU) {
        return;
      }

      const result = await contabiliumApi.getStockByDepositos(productSKU);

      if (!result) {
        return;
      }

      const stockMercadoLibre = result.stock?.find(
        deposito => deposito.Codigo === 'MERCADO LIBRE',
      );

      if ((stockMercadoLibre?.StockActual ?? 0) <= 0) {
        console.log('MERCADO LIBRE NO TIENE STOCK');
        observeModalAndModifyContent();
      }
    }

    function observeModalAndModifyContent(): void {
      // Create a MutationObserver to monitor changes in the DOM
      setTimeout(() => {
        const modalContent = document.body.querySelector('.modal-content');
        console.log(modalContent);

        if (modalContent) {
          // Check if the modal contains the specific text
          const title = modalContent.querySelector('h4');
          console.log(title);

          //@ts-ignore
          if (title) {
            console.log('Modal content matches the text!');
            const modalBody = modalContent.querySelector('.bootbox-body')!;

            // Now, you can modify the modal content
            modalBody.innerHTML =
              '<b>No hay stock de este producto para tu depósito</b>';

            // Find and remove the 'Aceptar' button
            const acceptButton = modalContent.querySelector('#btnAceptar');
            if (acceptButton) {
              acceptButton.remove(); // Remove the accept button
            }
          }
          console.log('No existe el modal!');
        }
      }, 1000);
    }

    function showDialog(title: string, content: string): void {
      const dialog = document.getElementById('product-dialog')!;
      const dialogTitle = document.getElementById('dialog-title')!;
      const dialogContent = document.getElementById('dialog-content')!;

      dialogTitle.textContent = title;
      dialogContent.textContent = content;

      // Show the dialog
      dialog.classList.remove('hidden');
    }

    // Function to add click listeners to product items
    async function addClickListenersToProducts() {
      const productItems =
        document.querySelectorAll<HTMLElement>('.item-product');

      productItems.forEach(async item => {
        const productName = item.querySelector('h5')?.textContent?.trim();

        item.addEventListener('click', () => {
          console.log('CLICKEANDO ITEM ' + productName);
        });
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
          const product = await contabiliumApi.getProductByName(productName);
          console.log('Producto fetcheado:', product?.Items[0].Nombre);

          const productSku = product?.Items[0].Codigo;

          if (!productSku) {
            return;
          }

          const stock = await contabiliumApi.getStockByDepositos(productSku);

          if (!stock) {
            return;
          }

          const mercadoLibreStock = stock.stock?.find(
            deposito => deposito.Codigo === 'MERCADO LIBRE',
          );

          if (mercadoLibreStock?.StockActual === 0) {
            addDisableStyles(item);
          }
        }
      });
    }

    // Function to observe changes in the DOM
    function observeDOM(): void {
      const targetNode = document.body;
      const config: MutationObserverInit = { childList: true, subtree: true };

      const observer = new MutationObserver(() => {
        disableOutOfStockItems();
        removeDuplicateButtons();
        addClickListenersToProducts();
      });

      observer.observe(targetNode, config);
    }

    // Run when the page has loaded
    window.addEventListener('load', async () => {
      // Get access token and store it in local storage
      const token = await contabiliumApi.getAccessToken();
      if (token) {
        localStorage.setItem('contabilium_access_token', token);
      }
      observeDOM();
      removeDuplicateButtons();
      addClickListenersToProducts();
    });
  },
});
