import { contabiliumApi } from '@/api/contabilium';
import { openCustomPrintWindow } from '../openCustomPrintWindow';
import { add, format } from 'date-fns';
import { injectProductRow } from './injectProductRow';

export function injectDialog(): void {
  // Check if the dialog is already injected
  if (document.getElementById('product-dialog')) {
    return;
  }

  // Create dialog container
  const dialogHTML = `
    <div id="product-dialog" class="dialog-overlay hidden">
      <div class="dialog-box">
        <h3 id="dialog-title">Añadir garantia extendida</h3>
        <p id="dialog-placeholder"></p>
        <p id="dialog-content">Elegí la opcion para extender la garantía:</p>

        <!-- Radio buttons for warranty options -->
        <div class="radio-group">
          <label>
            <input type="radio" name="warranty" value="1-year" id="warranty-1" />
            <div class="radio-text">
              <p>1 año de garantía extendida</p>
              <div>
                <span>25% |</span>
                <span id="dialog-1-año"></span>
              </div>
            </div>
          </label>
          <label>
            <input type="radio" name="warranty" value="2-year" id="warranty-2" />
            <div class="radio-text">
              <p>2 años de garantía extendida</p>
              <div>
                <span>45% |</span>
                <span id="dialog-2-años"></span>
              </div>
            </div>
          </label>
        </div>

        <!-- Footer with buttons -->
        <div class="dialog-footer">
          <button id="dialog-close" class="dialog-button">Cerrar</button>
          <button id="dialog-add" class="dialog-button">Agregar</button>
        </div>
      </div>
    </div>
  `;
  const dialogContainer = document.createElement('div');
  dialogContainer.innerHTML = dialogHTML;

  // Append dialog to the body
  document.body.appendChild(dialogContainer);

  // Add event listener to close the dialog
  const closeButton = document.getElementById('dialog-close')!;
  closeButton.addEventListener('click', () => {
    const dialog = document.getElementById('product-dialog')!;
    dialog.classList.add('hidden');
  });

  // Add event listener to "Agregar" button
  const addButton = document.getElementById('dialog-add')!;
  addButton.addEventListener('click', async () => {
    const dialog = document.getElementById('product-dialog')!;
    dialog.classList.add('hidden');

    // Handle adding the selected warranty
    const selectedWarranty = (
      document.querySelector(
        'input[name="warranty"]:checked',
      ) as HTMLInputElement
    )?.value;

    if (!selectedWarranty) {
      console.log('No warranty option selected.');
      return;
    }

    const productName = document.getElementById('dialog-placeholder');

    // Para obtener la garantia que tiene el producto hacer un fetch por nombre, de ahi extraer
    // El campo de observaciones, que tiene la garantia en formato 3L, 3F o 12F
    if (!productName) {
      return;
    }

    const product = await contabiliumApi.getProductByName(
      productName.textContent!,
    );

    const startDate = new Date();

    let firstDate = startDate;
    const observaciones = product?.Items[0].Observaciones;
    if (observaciones === '3L' || observaciones === '3F') {
      firstDate = add(startDate, { months: 3 });
    } else if (observaciones === '12F') {
      firstDate = add(startDate, { months: 12 });
    }

    // La segunda fecha que aparece en la impresion debe ser la fecha en la que acaba
    // la garantia del producto, mas la cantidad de meses que fueron seleccionados como
    // garantia extendida.
    const intervalMonths = selectedWarranty === '1-year' ? 12 : 24;
    const secondDate = add(firstDate, { months: intervalMonths });

    const formattedFirstDate = format(firstDate, 'dd/MM/yyyy');
    const formattedSecondDate = format(secondDate, 'dd/MM/yyyy');

    const mesesPrint =
      selectedWarranty === '1-year' ? '12 (doce)' : '24 (veinticuatro)';

    // Open the print popup
    openCustomPrintWindow(
      productName.textContent!,
      formattedFirstDate,
      formattedSecondDate,
      mesesPrint,
    );

    const warrantyDescription =
      selectedWarranty === '1-year'
        ? 'Extensión de mantenimiento prepago por 1 año'
        : 'Extensión de mantenimiento prepago por 2 años';

    const warrantyPrice =
      selectedWarranty === '1-year'
        ? document.getElementById('dialog-1-año')?.textContent
        : document.getElementById('dialog-2-años')?.textContent;

    const tableBody = document.querySelector('#tablaFacturacion tbody');
    if (tableBody) {
      // Create a new row
      const newRow = injectProductRow({
        description: warrantyDescription,
        price: warrantyPrice!,
      });

      tableBody.appendChild(newRow);

      // Optionally, add a click event listener to the delete button
      const deleteButton = newRow.querySelector('.table-button');
      deleteButton?.addEventListener('click', () => {
        newRow.remove();
      });
    }
  });
}
