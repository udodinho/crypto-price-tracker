import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading crypto currency price data...</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we fetch the latest prices</p>
    </div>
  );
};

export default LoadingState;