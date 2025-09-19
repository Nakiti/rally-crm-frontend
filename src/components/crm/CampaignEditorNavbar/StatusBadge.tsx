import React from 'react';
import { getStatusBadgeClass, formatStatus } from './utils';

interface StatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(status)}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
