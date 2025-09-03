// src/components/recipe/RecipeDetail.jsx
import React, { useState } from 'react';
import { formatIngredients, getValidImageUrl } from '../../utils/helpers';

const RecipeDetail = ({ recipe }) => {
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const ingredients = formatIngredients(recipe);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Desktop: split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: image */}
        <div>
          <img
            src={getValidImageUrl(recipe.strMealThumb)}
            alt={recipe.strMeal}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right: details */}
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{recipe.strMeal}</h1>
          <div className="flex gap-3 text-sm">
            {recipe.strCategory && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                {recipe.strCategory}
              </span>
            )}
            {recipe.strArea && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {recipe.strArea}
              </span>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-6 space-y-1">
              {ingredients.map((item, idx) => (
                <li key={idx}>
                  {item.measure} {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {showFullInstructions
                ? recipe.strInstructions
                : recipe.strInstructions?.slice(0, 300) + '...'}
            </p>
            {recipe.strInstructions?.length > 300 && (
              <button
                onClick={() => setShowFullInstructions(!showFullInstructions)}
                className="text-orange-600 font-medium mt-2"
              >
                {showFullInstructions ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>

          {/* YouTube link */}
          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              Watch Tutorial on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
