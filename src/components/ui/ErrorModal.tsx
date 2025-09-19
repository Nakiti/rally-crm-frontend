import React from 'react';
import { Button } from './Button';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
  title?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ 
  message, 
  onClose, 
  title = 'Error' 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="primary">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
