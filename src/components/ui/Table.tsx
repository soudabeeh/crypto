import { JSX } from 'react';

interface Column {
  header: string;
  accessor: string;
  renderCell?: (row: any) => JSX.Element;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
}
const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full table-fixed border-collapse border border-gray-200 rounded-xl'>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className='px-4 py-2 border-b border-gray-300 text-center w-1/4'
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className='px-4 py-2 border-b border-gray-300 w-1/4'
                >
                  {col.renderCell ? (
                    col.renderCell(row)
                  ) : (
                    <span>{row[col.accessor] || '-'}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
