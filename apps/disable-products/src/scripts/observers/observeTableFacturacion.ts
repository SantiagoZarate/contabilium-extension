import { updateTotalPrice } from '../updateTotalPrice';

// Cada vez que se agregue o elimiine un producto de la tabla de facturacion
// se va a volver a calcular el total que aparece en el boton verde
export function observeTablaFacturacion() {
  const tablaFacturacion = document.getElementById('tablaFacturacion');

  if (!tablaFacturacion) {
    console.warn('tabla facturacion not found!');
    return;
  }

  const config: MutationObserverInit = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(() => {
    updateTotalPrice();
  });

  observer.observe(tablaFacturacion!, config);
}
