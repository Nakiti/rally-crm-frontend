// src/hooks/useTable.ts

import { useState, useMemo } from 'react';
import { SortConfig } from '@/lib/types';

// Hook to manage table state: sorting and pagination
export const useTable = <T extends { id: any }>(
  initialData: T[],
  rowsPerPage: number = 10
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    const sortableData = [...initialData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [initialData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return sortedData.slice(indexOfFirstRow, indexOfLastRow);
  }, [sortedData, currentPage, rowsPerPage]);

  const sort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return {
    paginatedData,
    sort,
    sortConfig,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};