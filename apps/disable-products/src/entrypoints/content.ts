import { contabiliumApi } from '@/api/contabilium';
import { injectDialog } from '@/scripts/injecters/injectDialog';
import { injectDialogStyles } from '@/scripts/injecters/injectDialogStyles';
import { observeDOM } from '@/scripts/observers/observeDOM';
import { observeProductList } from '@/scripts/observers/observeProductList';
import { observeTablaFacturacion } from '@/scripts/observers/observeTableFacturacion';
import { removeDuplicateButtons } from '@/scripts/removeDuplicateButtons';

export default defineContentScript({
  matches: [
    'https://pos.contabilium.com/',
    'https://app.contabilium.com/comprobantes.aspx',
  ],
  runAt: 'document_idle',
  main() {
    window.addEventListener('load', async () => {
      // Get access token and store it in local storage
      const token = await contabiliumApi.getAccessToken();
      if (token) {
        localStorage.setItem('contabilium_access_token', token);
      }
      // Observers
      observeDOM();
      observeProductList();
      observeTablaFacturacion();

      // Injects elements
      injectDialog();
      injectDialogStyles();

      removeDuplicateButtons();
    });
  },
});
