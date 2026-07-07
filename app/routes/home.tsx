import { useState } from "react";
import type { Route } from "./+types/home";
import Recipe from "~/models/Recipe";
import RecipeCard from "~/components/RecipeCard";
import RecipeDetail from "~/components/RecipeDetail";
import { SampleRecipes } from "~/models/SampleRecipes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipe Catalog" },
    { name: "description", content: "What should we make?" },
  ];
}

export default function Home() {
  // Preseeded with sample recipes
  const [recipes, setRecipes] = useState<Recipe[]>(SampleRecipes);
  const [search, setSearch] = useState("");
  const [searchFavorites, setSearchFavorites] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes
    .filter((recipe) => {
      if (searchFavorites && !recipe.favorite) {
        return false;
      }

      const searchText = search.toLocaleLowerCase();

      return (        
        recipe.name.toLocaleLowerCase().includes(searchText) ||
        recipe.category.toLocaleLowerCase().includes(searchText) ||
        recipe.ingredients.join(" ").toLocaleLowerCase().includes(searchText) ||
        recipe.instructions.toLocaleLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => {
      if (a.favorite !== b.favorite) {
        return a.favorite ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });

  function saveRecipe(recipe: Recipe) {
    setRecipes(current => {
      const exists = current.some(r => r.id == recipe.id);

      if (exists) {
        return current.map(r => 
          r.id === recipe.id ? recipe : r
        );
      }

      return [...current, recipe];
    })

    setShowRecipeModal(false);
    setSelectedRecipe(null);
  }

  function toggleFavorite() {
    if (selectedRecipe === null){
      return;
    }

    const updatedRecipe = {
      ...selectedRecipe,
      favorite: !selectedRecipe.favorite
    }

    setSelectedRecipe(updatedRecipe);

    setRecipes(current => {
        return current.map(r => 
          r.id === updatedRecipe.id ? updatedRecipe : r
        );
      });
  }

  function deleteRecipe() {
    if (selectedRecipe === null) {
      return;
    }

    setRecipes(recipes => recipes.filter(r => r.id !== selectedRecipe.id));

    setShowRecipeModal(false);
    setSelectedRecipe(null);
  }

  function startNewRecipe() {
    setSelectedRecipe(null);
    setShowRecipeModal(true);
  }

  function editRecipe(recipe: Recipe) {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">Recipes</h1>


      <div className="mb-6 flex items-end gap-4">
        <button 
                type="button"
                onClick={startNewRecipe}
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow transition hover:bg-blue-700 active:scale-95">
          + Add Recipe
        </button>
        
        <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">Filter recipes</label>

            <div className="flex gap-2">
              <input
                  className="flex-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Filter by name, category, ingredients, or instructions"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />

              <button 
                    type="button"
                    onClick={() => setSearch("")}                    
                    className="cursor-pointer rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
                Clear
              </button>

              <button
                    type="button"
                    onClick={() => setSearchFavorites(!searchFavorites)}
                    className={`cursor-pointer rounded-full px-4 py-3 font-medium transition ${
                      searchFavorites
                        ? "bg-yellow-400 text-yellow-950 shadow"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-1">{searchFavorites ? "★" : "☆"}</span>
                    Favorites ({recipes.filter(r => r.favorite).length})
              </button>
            </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id}
            recipe={recipe}
            onClick={() => editRecipe(recipe)}
          />
        ))}
      </div>

      {showRecipeModal && (
        <RecipeDetail
          recipe={selectedRecipe}
          onSave={saveRecipe}
          onDelete={deleteRecipe}
          onClose={() => setShowRecipeModal(false)} />
      )}
    </main>
  );
}
