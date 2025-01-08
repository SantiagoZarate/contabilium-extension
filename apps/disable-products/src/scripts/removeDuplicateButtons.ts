// Function to remove duplicate buttons
export function removeDuplicateButtons(): void {
  if (window.location.pathname === '/comprobantes.aspx') {
    console.log('Intentando borrar botones duplicados');
    const duplicateButtons = document.querySelectorAll<HTMLButtonElement>(
      'button[onclick^="duplicar("][class="delete-row"]',
    );
    duplicateButtons.forEach(button => button.remove());
  }
}
