import { contabiliumApi } from '@/api/contabilium';

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
        return
      }

      const result = await contabiliumApi.getStockByDepositos(productSKU);

      if (!result) {
        return
      }

      const stockMercadoLibre = result.stock?.find(deposito => deposito.Codigo === 'MERCADO LIBRE');

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
          const title = modalContent.querySelector('h4')
          console.log(title);

          //@ts-ignore
          if (title) {
            console.log('Modal content matches the text!');
            const modalBody = modalContent.querySelector('.bootbox-body')!;

            // Now, you can modify the modal content
            modalBody.innerHTML = '<b>No hay stock de este producto para tu depósito</b>';

            // Find and remove the 'Aceptar' button
            const acceptButton = modalContent.querySelector('#btnAceptar');
            if (acceptButton) {
              acceptButton.remove(); // Remove the accept button
            }
          }
          console.log('No existe el modal!');
        }
      }, 1000)
    }

    // Function to add click listeners to product items
    function addClickListenersToProducts(): void {
      const productItems =
        document.querySelectorAll<HTMLElement>('.item-product');
      productItems.forEach(item => {
        const productName = item.querySelector('h5')?.textContent?.trim();
        if (productName) {
          item.addEventListener('click', () => {
            onProductSelect(productName);
          });
        }
      });
    }

    // Function to remove duplicate buttons
    function removeDuplicateButtons(): void {
      if (window.location.pathname === '/comprobantes.aspx') {
        console.log('Intentando borrar botones duplicados');
        const duplicateButtons = document.querySelectorAll<HTMLButtonElement>(
          'button[onclick^="duplicar("][class="delete-row"]',
        );
        duplicateButtons.forEach(button => button.remove());
      }
    }

    // Function to disable out-of-stock items
    function disableOutOfStockItems(): void {
      const items = document.querySelectorAll<HTMLElement>('.item-product');
      items.forEach(item => {
        const stockText = item
          .querySelector('.info .code b')
          ?.textContent?.trim();
        if (stockText === 'Stock: 0') {
          item.style.backgroundColor = '#f8d7da';
          item.style.pointerEvents = 'none';
          item.style.opacity = '0.5';
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
