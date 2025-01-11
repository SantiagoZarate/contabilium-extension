import { deleteInjectedRowsFromTable } from '../deleteInjectedRow';
import { removeDuplicateButtons } from '../removeDuplicateButtons';

export function observeDOM(): void {
  const targetNode = document.body;
  const config: MutationObserverInit = { childList: true, subtree: true };

  const observer = new MutationObserver(() => {
    removeDuplicateButtons();
    deleteInjectedRowsFromTable();
  });

  observer.observe(targetNode, config);
}
