import { updateTotalPrice } from './updateTotalPrice';

export function attachDeleteListeners() {
  const table = document.getElementById('tablaFacturacion');

  if (!table) return;

  const deleteButtons = table.querySelectorAll('[title="Eliminar item"]');

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('ELIMINADO ITEM...');
      updateTotalPrice();
    });
  });
}
