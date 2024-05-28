import { IVariable } from "../models/variable.interface";

type TableProps = {
  columns: IVariable[];
  rows: any[];
  image: HTMLImageElement;
  onColumnsUpdate: (columns: IVariable[]) => void;
  onRowsUpdate: (rows: any[]) => void;
};

const Table: React.FunctionComponent<TableProps> = ({
  columns,
  rows,
  image,
  onColumnsUpdate,
  onRowsUpdate,
}) => {
  const deleteColumnHandler = (index: number) => {
    const newColumns = [...columns];

    newColumns.splice(index, 1);

    onColumnsUpdate(newColumns);
  };

  const setColumnValueHandler = (value: string, index: number) => {
    const newColumns = [...columns];

    newColumns[index].text = value;

    onColumnsUpdate(newColumns);
  };

  const deleteRowHandler = (index: number) => {
    const newRows = [...rows];

    newRows.splice(index, 1);

    onRowsUpdate(newRows);
  };

  const setRowValueHandler = (field: string, value: string, index: number) => {
    const newRows = [...rows];

    newRows[index][field] = value;

    onRowsUpdate(newRows);
  };

  const addRowHandler = () => {
    const newRows = [...rows];

    newRows.push({});

    onRowsUpdate(newRows);
  };

  const addColumnHandler = () => {
    const newColumns = [...columns];

    newColumns.push({ x: 0, y: 0, text: "Variable99" });

    onColumnsUpdate(newColumns);
  };

  return (
    <div className="w-1/2">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button onClick={addRowHandler} disabled={!columns.length}>
                Add Row
              </button>
            </li>
            <li>
              <button onClick={addColumnHandler} disabled={!image}>
                Add Column
              </button>
            </li>
          </ul>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nro</th>
            {columns.map((column, index) => (
              <th key={index}>
                <div className="join">
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs join-item"
                    value={column.text}
                    onChange={(e) =>
                      setColumnValueHandler(e.target.value, index)
                    }
                  />
                  <button
                    className="btn  btn-error join-item"
                    onClick={() => deleteColumnHandler(index)}
                  >
                    🧺
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={row[column.text!]}
                    onChange={(e) =>
                      setRowValueHandler(column.text!, e.target.value, rowIndex)
                    }
                  />
                </td>
              ))}
              <th>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteRowHandler(rowIndex)}
                >
                  🧺
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
