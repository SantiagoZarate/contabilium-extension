type Props = {
  price: string;
  description: string;
};

export function injectProductRow({ description, price }: Props) {
  const newRow = document.createElement('tr');

  newRow.dataset.dialog = 'row';

  newRow.innerHTML = `
        <td>
          <input class="form-control" type="number" value="1" readonly />
        </td>
        <td>${description}</td>
        <td>
          <input class="form-control" type="text" value="${price}" readonly />
        </td>
        <td>
          <input class="form-control" type="number" value="0" readonly />
        </td>
        <td>-</td>
        <td>${price}</td>
        <td class="text-right">
          <button class="table-button" title="Eliminar item">
            <i class="ion ion-md-trash"></i>
          </button>
        </td>
      `;
  return newRow;
}
