import React from 'react';

const RecipeDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Image skeleton */}
        <div className="aspect-video w-full bg-gray-300"></div>
        
        {/* Content skeleton */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
          
          {/* Instructions */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-300 rounded w-28"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-8">
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-300"></div>
          
          {/* Content skeleton */}
          <div className="p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              </div>
            </div>
            
            {/* Ingredients */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
            
            {/* Instructions */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-300 rounded w-28"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailSkeleton;