import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import RecipeList from '../components/recipe/RecipeList';
import { formatSearchTerm, parseIngredients } from '../utils/helpers';
import { getRandomRecipe } from '../services/mealAPI';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMultipleIngredients, setIsMultipleIngredients] = useState(false);
  const [surpriseLoading, setSurpriseLoading] = useState(false);
  
  const navigate = useNavigate();

  // Handle search results from SearchBar component
  const handleSearchResults = (searchResults, term) => {
    // ✅ Safety check to prevent recipes.map errors
    const safeResults = Array.isArray(searchResults) ? searchResults : [];
    setRecipes(safeResults);
    setSearchTerm(term);

    // Detect if this was a multiple ingredient search
    const ingredients = parseIngredients(term);
    setIsMultipleIngredients(ingredients.length > 1);
  };

  // Handle loading state from SearchBar component
  const handleLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  // Handle error state from SearchBar component
  const handleErrorState = (errorMessage) => {
    setError(errorMessage);
  };

  // Handle "Surprise Me" button
  const handleSurpriseMe = async () => {
    setSurpriseLoading(true);
    setError(null);
    
    try {
      const randomRecipe = await getRandomRecipe();
      // Navigate directly to recipe detail page
      navigate(`/recipe/${randomRecipe.idMeal}`);
    } catch (err) {
      setError('Failed to fetch surprise recipe. Please try again!');
    } finally {
      setSurpriseLoading(false);
    }
  };

  // Format the search term for display
  const displaySearchTerm = formatSearchTerm(searchTerm, isMultipleIngredients);

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16 py-8">
      {/* Enhanced Hero Section */}
      <div className="text-center space-y-6">
        {/* Main heading with gradient */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          What's in your kitchen?
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Enter one or more ingredients and discover amazing recipes you can make right now. 
          Perfect for busy professionals who need quick meal inspiration.
        </p>
        
        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <div className="text-gray-500 text-sm font-medium">
            Ready to cook? Start searching below
          </div>
          <div className="text-gray-400">or</div>
          <button
            onClick={handleSurpriseMe}
            disabled={surpriseLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {surpriseLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Surprise Me...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                🎲 Surprise Me!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto">
        <SearchBar
          onSearchResults={handleSearchResults}
          onLoadingChange={handleLoadingState}
          onErrorChange={handleErrorState}
        />
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* No results */}
        {searchTerm && !loading && !error && recipes.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p>No recipes found for "{displaySearchTerm}". Try a different ingredient!</p>
          </div>
        )}

        {/* Results info */}
        {searchTerm && recipes.length > 0 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} with "{displaySearchTerm}"
            </h2>
            <div className="text-gray-500">Click any recipe to see the full details</div>
          </div>
        )}

        {/* Recipe List */}
        <RecipeList
          recipes={recipes}
          loading={loading}
          searchTerm={displaySearchTerm}
        />
      </div>
    </div>
  );
};
export default Home;