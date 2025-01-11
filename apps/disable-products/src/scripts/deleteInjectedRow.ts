export function deleteInjectedRowsFromTable() {
  const deleteAllButton = document.querySelector(
    '.btn-danger.full-width.remove-all.btn-big',
  );

  if (deleteAllButton) {
    deleteAllButton.addEventListener('click', () => {
      document
        .querySelectorAll('[data-dialog="row"]')
        .forEach(row => row.remove());

      document.querySelector(
        '.btn.btn-success.full-width.btn-big .pull-right.ng-binding',
      )!.textContent = '$0.00';
    });
  }
}
