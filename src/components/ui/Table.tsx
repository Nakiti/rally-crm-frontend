// src/components/ui/Table.tsx
import { ChevronUp, ChevronDown } from "lucide-react";
import { ColumnDefinition, SortConfig } from "@/lib/types";

interface TableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  sortConfig?: SortConfig<T>;
  onSort?: (key: keyof T) => void;
  onRowClick?: (row: T) => void;
}

const Table = <T extends { id: any }>({ data, columns, sortConfig, onSort, onRowClick }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessorKey as string}
                className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:text-gray-700' : ''
                }`}
                onClick={() => column.sortable && onSort?.(column.accessorKey)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortConfig && (
                    <span>
                      {sortConfig.key === column.accessorKey && sortConfig.direction === 'ascending' 
                        ? <ChevronUp className="w-3 h-3 text-blue-600" /> 
                        : <ChevronDown className="w-3 h-3 text-blue-600" />
                      }
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.accessorKey as string} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;