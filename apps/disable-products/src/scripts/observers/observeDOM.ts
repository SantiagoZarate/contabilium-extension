import { attachDeleteListeners } from '../attachDeleteButtonListeners';
import { deleteInjectedRowsFromTable } from '../deleteInjectedRow';
import { disableOutOfStockItems } from '../disableOutOfStockItem';
import { removeDuplicateButtons } from '../removeDuplicateButtons';

export function observeDOM(): void {
  let firstTimeLoadingDOM = true;
  const targetNode = document.body;
  const config: MutationObserverInit = { childList: true, subtree: true };

  const observer = new MutationObserver(() => {
    removeDuplicateButtons();
    attachDeleteListeners();
    deleteInjectedRowsFromTable();

    if (firstTimeLoadingDOM) {
      disableOutOfStockItems();
      firstTimeLoadingDOM = false;
    }
  });

  observer.observe(targetNode, config);
}
