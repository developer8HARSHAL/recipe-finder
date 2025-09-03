// src/services/mealAPI.js
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Safe API response handler - ensures we always return an array
 */
const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // TheMealDB returns null when no results found
  // Always return an array to prevent .map errors
  return Array.isArray(data.meals) ? data.meals : [];
};

/**
 * Search recipes by single ingredient
 */
export const searchRecipesByIngredient = async (ingredient) => {
  try {
    if (!ingredient || typeof ingredient !== 'string') {
      return [];
    }

    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient.length === 0) {
      return [];
    }

    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(trimmedIngredient)}`);
    return await handleApiResponse(response);
    
  } catch (error) {
    console.error('Error searching recipes by ingredient:', error);
    throw new Error('Failed to fetch recipes. Please check your connection and try again.');
  }
};

/**
 * Enhanced search for multiple ingredients
 */
export const searchRecipesByMultipleIngredients = async (ingredients) => {
  try {
    // Parse ingredients array
    const ingredientList = Array.isArray(ingredients) 
      ? ingredients 
      : ingredients.split(',').map(ing => ing.trim()).filter(ing => ing.length > 0);

    if (ingredientList.length === 0) {
      return [];
    }

    // If only one ingredient, use the regular search
    if (ingredientList.length === 1) {
      return await searchRecipesByIngredient(ingredientList[0]);
    }

    // For multiple ingredients, search by the first (main) ingredient
    const mainIngredient = ingredientList[0];
    const otherIngredients = ingredientList.slice(1);
    
    const allRecipes = await searchRecipesByIngredient(mainIngredient);
    
    if (allRecipes.length === 0) {
      return [];
    }

    // Get detailed recipe info for better filtering
    const recipesWithDetails = await Promise.all(
      allRecipes.slice(0, 20).map(async (recipe) => { // Limit to first 20 for performance
        try {
          const fullRecipe = await getRecipeById(recipe.idMeal);
          return fullRecipe;
        } catch (error) {
          console.warn(`Failed to get details for recipe ${recipe.idMeal}`);
          return recipe; // Return basic info if detailed fetch fails
        }
      })
    );

    // Filter recipes that contain other ingredients
    const filteredRecipes = recipesWithDetails.filter(recipe => {
      // Get all ingredients from the recipe
      const recipeIngredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient && ingredient.trim()) {
          recipeIngredients.push(ingredient.toLowerCase().trim());
        }
      }

      // Check if recipe contains any of the other ingredients
      return otherIngredients.some(searchIngredient => 
        recipeIngredients.some(recipeIngredient => 
          recipeIngredient.includes(searchIngredient.toLowerCase()) ||
          searchIngredient.toLowerCase().includes(recipeIngredient)
        )
      );
    });

    // If filtering results in no matches, return original results
    return filteredRecipes.length > 0 ? filteredRecipes : allRecipes;

  } catch (error) {
    console.error('Error searching recipes with multiple ingredients:', error);
    throw new Error('Failed to fetch recipes. Please check your connection and try again.');
  }
};

/**
 * Get recipe details by ID
 */
export const getRecipeById = async (id) => {
  try {
    if (!id) {
      throw new Error('Recipe ID is required');
    }

    const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      throw new Error('Recipe not found');
    }
    
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

/**
 * Get random recipe
 */
export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      throw new Error('No random recipe found');
    }
    
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw new Error('Failed to fetch random recipe. Please try again.');
  }
};

/**
 * Search recipes by category
 */
export const getRecipesByCategory = async (category) => {
  try {
    if (!category || typeof category !== 'string') {
      return [];
    }

    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    return await handleApiResponse(response);
    
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw new Error('Failed to fetch recipes by category. Please try again.');
  }
};

/**
 * Get all available categories
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data.categories) ? data.categories : [];
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again.');
  }
};