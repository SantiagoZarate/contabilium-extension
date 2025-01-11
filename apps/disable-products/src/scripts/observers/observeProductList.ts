import { addClickListenersToProducts } from '../addClickListenersToProducts';
import { disableOutOfStockItems } from '../disableOutOfStockItem';

export function observeProductList() {
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
    }, 300); // Wait 1 second after the last change
  });

  observer.observe(productList, config);

  console.log('Observing product list for changes.');
}
