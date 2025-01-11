import { contabiliumApi } from '@/api/contabilium';
import { disableProductStyles } from './addDisableStyles';
import { DEPOSITO } from '@/data/constants/deposito';

// Cache local para evitar hacer llamados a la api si el producto ya fue consultado
const productsAlreadyFetched: { [key: string]: number } = {};

export async function disableOutOfStockItems() {
  const items = document.querySelectorAll<HTMLElement>('.item-product');

  for (const item of items) {
    const stockText = item.querySelector('.info .code b')?.textContent?.trim();

    // Si el stock esta en 0, desabilitarlo de una
    if (stockText === 'Stock: 0') {
      disableProductStyles(item);
    } else {
      // Sino hacer una request y checkear si tiene stock para mercado libre
      const productName = item.querySelector('h5')?.textContent?.trim()!;

      if (!productName) {
        return;
      }

      const productCached = productsAlreadyFetched[productName];

      if (productCached !== undefined) {
        if (productCached === 0) {
          disableProductStyles(item);
        }
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

      const result = await contabiliumApi.getStockByDepositos(productSku);

      if (!result) {
        return;
      }

      const stockPorDeposito = result.stock?.find(
        deposito => deposito.Codigo === DEPOSITO,
      );

      productsAlreadyFetched[productName] = stockPorDeposito?.StockActual ?? 0;

      if (stockPorDeposito?.StockActual === 0) {
        disableProductStyles(item);
      }
    }
  }
}
