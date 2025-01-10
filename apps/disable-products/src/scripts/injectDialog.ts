export function injectDialog(): void {
  // Check if the dialog is already injected
  if (document.getElementById('product-dialog')) {
    return;
  }

  console.log('Inyectando dialog');

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
                <span>30% |</span>
                <span id="dialog-1-año"></span>
              </div>
            </div>
          </label>
          <label>
            <input type="radio" name="warranty" value="2-year" id="warranty-2" />
            <div class="radio-text">
              <p>2 años de garantía extendida</p>
              <div>
                <span>60% |</span>
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
  addButton.addEventListener('click', () => {
    const dialog = document.getElementById('product-dialog')!;
    dialog.classList.add('hidden');

    // Handle adding the selected warranty (for now, just log the selected option)
    const selectedWarranty = (
      document.querySelector(
        'input[name="warranty"]:checked',
      ) as HTMLInputElement
    )?.value;
    if (selectedWarranty) {
      console.log(`Selected warranty: ${selectedWarranty}`);
    } else {
      console.log('No warranty option selected.');
    }
  });
}
