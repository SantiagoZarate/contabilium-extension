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
        <h3 id="dialog-title">Product Details</h3>
        <p id="dialog-content">Loading...</p>
        <button id="dialog-close">Close</button>
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
}