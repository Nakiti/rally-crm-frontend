import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange'> {
  label?: string;
  title?: string;
  description?: string;
  error?: string;
  helperText?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  title,
  description,
  error,
  helperText,
  children,
  className = '',
  id,
  checked = false,
  onChange,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className="w-full">
      <div className="flex items-start">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={`
            h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300'
            }
            ${className}
          `}
          {...props}
        />
        <div className="ml-3">
          {(title || label || children) && (
            <label htmlFor={checkboxId} className="block text-sm font-medium text-gray-900">
              {title || label || children}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
