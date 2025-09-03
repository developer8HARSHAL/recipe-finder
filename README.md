# 🍳 Recipe Finder

A simple, responsive **Recipe Finder** built with **React + TailwindCSS** and powered by **TheMealDB API**.  
Search for recipes by ingredients, explore detailed instructions, and even get a random "Surprise Me" dish.

🔗 **Live Demo:** [Recipe Finder on CodeSandbox](https://3j7x7r-3000.csb.app/)

---

## 🚀 Features

### ✅ Day 1 – Setup + Search Flow
- **React project with TailwindCSS** – Project setup in `App.jsx` + `index.css`.
- **Homepage with search bar + button** – Implemented in `Home.jsx` + `SearchBar.jsx`.
- **Fetch recipes by ingredient** – API call via `searchRecipesByIngredient()` in `mealAPI.js`.
- **Display recipe cards** – Responsive grid layout in `RecipeList.jsx` (1-2-3-4 columns).
- **Loading + error states** – Fully handled in `Home.jsx`.

---

### ✅ Day 2 – Cards + Detail View
- **RecipeCard with hover effects** – Transform + scale hover animations in `RecipeCard.jsx`.
- **Click → RecipeDetail view** – Navigation to `/recipe/:id` works.
- **RecipeDetail component** (`RecipeDetail.jsx`):
  - Fetches recipe details using `lookup.php?i={idMeal}` via `getRecipeById()`.
  - Displays **image, title, category, cuisine**.
  - Ingredient list formatted with `formatIngredients()` helper.
  - Collapsible instructions ("Read more/less").
- **Missing data handling** – Graceful fallbacks via `helpers.js` and components.
- **Edge case handling** – Error states in `RecipeDetailPage.jsx`.

---

### ✅ Day 3 – Polish + Extra Features
- **Surprise Me button** – Fetches a random recipe and navigates to detail page.
- **Skeleton loaders** – Smooth professional loading experience.
- **Multi-ingredient search** – Search using multiple ingredients (e.g., `chicken, rice`).
- **Enhanced Hero Section** – Gradient design with call-to-action elements.

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS
- **API:** [TheMealDB](https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient})
- **Deployment:** CodeSandbox

---

## 📸 Preview

- **Search Recipes:** Enter ingredients to get matching recipes.  
- **Recipe Cards:** Responsive grid with hover effects.  
- **Recipe Details:** Full instructions, ingredients, category & cuisine.  
- **Surprise Me:** Random recipe generator.  

---

## 📌 Future Enhancements

- Add **favorites** with local storage.  
- Pagination for large search results.  
- Dark mode support.  



