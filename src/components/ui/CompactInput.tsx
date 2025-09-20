import React from 'react';

interface CompactInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const CompactInput: React.FC<CompactInputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const inputId = props.id || `compact-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-gray-600 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-2 py-1.5 text-sm border rounded-md placeholder-gray-400
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed bg-white
          ${error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
