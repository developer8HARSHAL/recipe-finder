// src/components/recipe/RecipeList.jsx
import React from 'react';
import RecipeCard from './RecipeCard';
import RecipeGridSkeleton from '../common/RecipeGridSkeleton';

const RecipeList = ({ recipes, loading, searchTerm }) => {
  // Show skeleton loader while loading
  if (loading) {
    return <RecipeGridSkeleton count={8} />;
  }

  // Don't render anything if no recipes and no search term
  if (!recipes || recipes.length === 0) {
    return null;
  }

  // Ensure recipes is always an array (extra safety)
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {safeRecipes.map((recipe) => (
        <RecipeCard 
          key={recipe.idMeal} 
          recipe={recipe} 
        />
      ))}
    </div>
  );
};

export default RecipeList;