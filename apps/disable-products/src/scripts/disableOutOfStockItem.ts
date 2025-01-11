import { contabiliumApi } from '@/api/contabilium';
import { addDisableStyles } from './addDisableStyles';

const DEPOSITO = 'LOCAL RIVADAVIA';

export async function disableOutOfStockItems() {
  const items = document.querySelectorAll<HTMLElement>('.item-product');
  items.forEach(async item => {
    const stockText = item.querySelector('.info .code b')?.textContent?.trim();

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
