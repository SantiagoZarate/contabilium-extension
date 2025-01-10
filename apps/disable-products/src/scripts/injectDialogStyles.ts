export function injectDialogStyles(): void {
  // Check if styles are already injected
  if (document.getElementById('dialog-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'dialog-styles';
  style.textContent = `
    :root{
      --accent: #007bff;
    }

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
      width: 350px;
      text-align: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
    .radio-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .radio-group label{
      display: flex;
      align-items: center;
      transition: background-color 200ms;
      padding: .5em;
      border-radius: .25em;
      gap: .5em;
    }
    .radio-group label:hover {
      background-color: #dddddd;
      cursor: pointer;
    }
    .radio-text{
      display: flex;
      flex-direction: column;
      gap: 0.25em;
      align-items: start;
    }
    #dialog-1-año{
      color: var(--accent);
    }
    #dialog-2-años{
      color: var(--accent)
    }
    .hidden {
      display: none;
    }
    .dialog-button {
      margin-top: 20px;
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      }
    #dialog-add {
      background-color: #007bff;
    }
      #dialog-close {
        background-color: red;
      }
    .dialog-button:hover {
      opacity: 0.5;
    }
  `;

  document.head.appendChild(style);
}
