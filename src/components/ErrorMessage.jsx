// components/ErrorMessage.jsx
import React from 'react';

/**
 * Reusable error message component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Optional retry function
 * @param {string} props.type - Error type: 'error', 'warning', 'info'
 */
const ErrorMessage = ({ 
  message, 
  onRetry, 
  type = 'error' 
}) => {
  const typeClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconClasses = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`rounded-lg border p-6 text-center ${typeClasses[type]}`}>
      <div className="mb-3 text-2xl">{iconClasses[type]}</div>
      <h3 className="mb-2 text-lg font-semibold">
        {type === 'error' ? 'Oops!' : type === 'warning' ? 'Heads up!' : 'Info'}
      </h3>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;