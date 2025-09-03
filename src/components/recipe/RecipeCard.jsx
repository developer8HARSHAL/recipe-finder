import React from 'react';
import { Link } from 'react-router-dom';
import { getValidImageUrl, truncateText } from '../../utils/helpers';

const RecipeCard = ({ recipe }) => {
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    strArea
  } = recipe;

  return (
    <Link 
      to={`/recipe/${idMeal}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={getValidImageUrl(strMealThumb)}
          alt={strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Recipe';
          }}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Recipe title */}
        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[2.5rem]">
          {truncateText(strMeal, 60)}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {strCategory && (
            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
              {strCategory}
            </span>
          )}
          {strArea && (
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {strArea}
            </span>
          )}
        </div>

        {/* Call to action hint */}
        <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to view recipe →
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;