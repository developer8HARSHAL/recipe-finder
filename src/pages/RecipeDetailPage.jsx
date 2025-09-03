import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeDetail from '../components/recipe/RecipeDetail';
import RecipeDetailSkeleton from '../components/common/RecipeDetailSkeleton';
import { getRecipeById } from '../services/mealAPI';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('No recipe ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err.message || 'Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors font-medium"
      >
        ← Back to Search
      </Link>

      {/* Loading state with skeleton */}
      {loading && <RecipeDetailSkeleton />}

      {/* Error state */}
      {error && (
        <div className="text-center space-y-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Recipe Not Found</h2>
            <p>{error}</p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            ← Back to Search
          </Link>
        </div>
      )}

      {/* Success state */}
      {recipe && !loading && !error && <RecipeDetail recipe={recipe} />}
    </div>
  );
};

export default RecipeDetailPage;