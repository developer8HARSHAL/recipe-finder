// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { 
  searchRecipesByIngredient, 
  searchRecipesByMultipleIngredients 
} from '../../services/mealAPI';
import { parseIngredients } from '../../utils/helpers';

const SearchBar = ({ onSearchResults, onLoadingChange, onErrorChange }) => {
  const [ingredient, setIngredient] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!ingredient.trim()) {
      onErrorChange('Please enter an ingredient');
      return;
    }

    onLoadingChange(true);
    onErrorChange(null);

    try {
      const ingredients = parseIngredients(ingredient.trim());
      let recipes;

      // Use different API functions based on ingredient count
      if (ingredients.length === 1) {
        recipes = await searchRecipesByIngredient(ingredients[0]);
      } else {
        recipes = await searchRecipesByMultipleIngredients(ingredients);
      }

      // ✅ Extra safety: ensure recipes is always an array
      const safeRecipes = Array.isArray(recipes) ? recipes : [];
      
      onSearchResults(safeRecipes, ingredient.trim());
    } catch (error) {
      console.error('Search error:', error);
      onErrorChange('Failed to search recipes. Please try again.');
      onSearchResults([], ingredient.trim());
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Enter ingredients (e.g., chicken, tomato or pasta, mushroom)"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Search Recipes
          </button>
        </div>
      </form>
      
      {/* Search tips */}
      <div className="text-center text-sm text-gray-500">
        💡 Tip: Use commas to search multiple ingredients (e.g., "chicken, rice, tomato")
      </div>
    </div>
  );
};

export default SearchBar;