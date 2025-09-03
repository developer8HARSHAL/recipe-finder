// src/utils/helpers.js

/**
 * Parse ingredients from a search string
 * Handles comma-separated ingredients and cleans them up
 */
export const parseIngredients = (searchTerm) => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return [];
  }

  return searchTerm
    .split(',')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0)
    .filter(ingredient => ingredient.length > 1) // Remove single character inputs
    .slice(0, 5); // Limit to 5 ingredients max
};


/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Check if image URL is valid, fallback to placeholder if not
 */
export const getValidImageUrl = (
  imageUrl,
  fallbackUrl = 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Recipe'
) => {
  return imageUrl || fallbackUrl;
};

/**
 * Format ingredient list from TheMealDB API response
 */
export const formatIngredients = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }

  return ingredients;
};


/**
 * Format search term for display
 */
export const formatSearchTerm = (searchTerm, isMultipleIngredients = false) => {
  if (!searchTerm) return '';
  
  if (isMultipleIngredients) {
    const ingredients = parseIngredients(searchTerm);
    if (ingredients.length <= 2) {
      return ingredients.join(' and ');
    } else {
      const lastIngredient = ingredients.pop();
      return `${ingredients.join(', ')}, and ${lastIngredient}`;
    }
  }
  
  return searchTerm;
};

/**
 * Extract ingredients from TheMealDB recipe object
 */
export const getRecipeIngredients = (recipe) => {
  const ingredients = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  
  return ingredients;
};

/**
 * Format recipe instructions into steps
 */
export const formatInstructions = (instructions) => {
  if (!instructions) return [];
  
  return instructions
    .split(/\r\n|\n|\r/)
    .map(step => step.trim())
    .filter(step => step.length > 0)
    .map((step, index) => ({
      id: index + 1,
      text: step
    }));
};

/**
 * Check if a string contains any of the search terms
 */
export const containsAnyIngredient = (text, searchIngredients) => {
  if (!text || !searchIngredients || !Array.isArray(searchIngredients)) {
    return false;
  }
  
  const lowerText = text.toLowerCase();
  return searchIngredients.some(ingredient => 
    lowerText.includes(ingredient.toLowerCase()) ||
    ingredient.toLowerCase().includes(lowerText)
  );
};

/**
 * Debounce function for search input
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get recipe difficulty based on ingredients count and instructions length
 */
export const getRecipeDifficulty = (recipe) => {
  const ingredients = getRecipeIngredients(recipe);
  const instructionLength = recipe.strInstructions ? recipe.strInstructions.length : 0;
  
  if (ingredients.length <= 5 && instructionLength <= 500) {
    return { level: 'Easy', color: 'green' };
  } else if (ingredients.length <= 10 && instructionLength <= 1000) {
    return { level: 'Medium', color: 'yellow' };
  } else {
    return { level: 'Hard', color: 'red' };
  }
};