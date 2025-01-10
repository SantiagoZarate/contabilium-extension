export function openCustomPrintWindow(
  productName: string,
  officialWarrantyDate: string,
  extendedWarrantyDate: string,
) {
  const currentDate = new Date().toLocaleDateString(); // Today's date (Fecha de emisión)

  // Format the custom text
  const termsAndConditionsText = `
    <html>
      <head>
        <style>
          .center-text {
            display: flex;
            justify-content: center;
            text-align: center;
          }
          .right-text {
            position: absolute;
            right: 20%;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
          }
          .no-margin {
            margin: 0;
          }
          .dot-line {
            margin-top: 5rem;
            margin-bottom: 0;
            text-align: center;
          }
          .right-text-date {
            display: flex;
            justify-content: flex-end;
            margin-right: 20%;
          }
        </style>
      </head>
      <body>
        <p class="right-text-date">${currentDate}</p>
        <h2 class="center-text">Términos y condiciones</h2>
        <p class="center-text">Términos y condiciones de Extensión de mantenimiento prepago en Electronorte S.R.L.</p>
        <p>
          Usted contrató la “Extensión de mantenimiento prepago” en <strong>${productName}</strong>, por 12 (doce) meses desde el día ${officialWarrantyDate} hasta el día ${extendedWarrantyDate}, 
          una vez terminada la garantía original; por el tiempo contratado, nos hacemos cargo de reparar, sin costo adicional, todas las fallas que se presenten en el producto por defectos 
          de fabricación y dentro de la utilización normal del equipo; bajo las mismas condiciones establecidas en la garantía de fábrica y con idénticas exclusiones que nos liberan de 
          responsabilidad.
        </p>
        <p>
          Para lo cual, en caso de hacer uso del servicio de “mantenimiento prepago”, deberá traer el producto a nuestro local comercial, junto a la factura de compra, para que nuestros técnicos 
          especializados, de corresponder, repararán el artefacto dentro de un plazo máximo de 21 días y en caso de <strong>NO PODER REPARARLO</strong>, se lo reemplazará por otro producto del mismo modelo 
          en las mismas condiciones al momento de adquirirlo o por otro de similares características.
        </p>
        <p>
          Una vez reparado o reemplazado el producto, se le avisará al cliente por WhatsApp o Correo Electrónico; luego de lo cual, se mantendrá el producto para ser retirado de la sede de la empresa, 
          por el plazo máximo de <strong>TREINTA (30) días corridos</strong>; transcurrido dicho plazo, el producto pasa a ser propiedad de la empresa y puesto nuevamente a la venta, sin posibilidad de 
          reclamo de parte del cliente.
        </p>
        <div class="right-text">
          <p class="center-text dot-line">...........................................</p>
          <p class="center-text no-margin">Firma</p>
        </div>
      </body>
    </html>
  `;

  // Open a new window
  const ventana = window.open('', '_blank')!;

  // Write the HTML content to the new window
  ventana.document.write(termsAndConditionsText);

  // Close the document to allow the content to be loaded
  ventana.document.close();

  // Once the content is loaded, trigger the print dialog
  ventana.onload = function () {
    ventana.print();
  };
}
