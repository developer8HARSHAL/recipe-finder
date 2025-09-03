import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      <div className={`animate-spin rounded-full border-b-2 border-orange-600 ${sizeClasses[size]}`}></div>
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
