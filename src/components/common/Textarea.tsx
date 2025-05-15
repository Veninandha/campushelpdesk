import { TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  error,
  fullWidth = false,
  helperText,
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={rows}
        ref={ref}
        className={twMerge(
          'block p-4 rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500',
          fullWidth ? 'w-full' : '',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-description` : undefined}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${textareaId}-error`}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500" id={`${textareaId}-description`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;