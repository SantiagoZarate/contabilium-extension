export function injectDialogStyles(): void {
  // Check if styles are already injected
  if (document.getElementById('dialog-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'dialog-styles';
  style.textContent = `
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 300px;
      text-align: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
    .hidden {
      display: none;
    }
    #dialog-close {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    #dialog-close:hover {
      background-color: #0056b3;
    }
  `;

  document.head.appendChild(style);
}