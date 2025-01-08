export const createDialogContainer = (): HTMLDivElement => {
  let container = document.getElementById('react-dialog-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'react-dialog-container';
    document.body.appendChild(container);
  }
  return container as HTMLDivElement;
};
