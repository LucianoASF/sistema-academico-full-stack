interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className={`w-full text-center  overflow-hidden`}>
        <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
