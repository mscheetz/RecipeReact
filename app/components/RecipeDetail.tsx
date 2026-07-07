import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Recipe from "~/models/Recipe";

type RecipeDetailProps = {
  recipe: Recipe | null; 
  onSave: (recipe: Recipe) => void;
  onDelete: () => void;
  onClose: () => void;
}


export default function RecipeDetail({recipe, onSave, onDelete, onClose}: RecipeDetailProps) {
    const [newRecipe, setNewRecipe] = useState(false);
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [category, setCategory] = useState("");
    const [instructions, setInstructions] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>();

    useEffect(() => {
        if (recipe) {
            setNewRecipe(false);
            setId(recipe.id);
            setName(recipe.name);
            setIngredients(recipe.ingredients.join(","));
            setCategory(recipe.category);
            setInstructions(recipe.instructions);
            setFavorite(recipe.favorite);
        } else {
            setNewRecipe(true);
            setId(Date.now());
        }
    }, [recipe]);

    function toggleFavorite() {
        const status = !favorite;

        setFavorite(status);

        const recipe = new Recipe(
            id,
            name,
            ingredients.split(",").map((item) => item.trim()),
            category,
            instructions,
            status
        )

        onSave(recipe);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const recipe = new Recipe(
            id,
            name,
            ingredients.split(",").map((item) => item.trim()),
            category,
            instructions,
            favorite
        )

        onSave(recipe);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        {newRecipe ? "Add" : "Edit"} Recipe
                        {favorite && (
                            <StarIcon className="ml-2 inline h-6 w-6 text-yellow-500" />
                        )}
                    </h2>

                    <button onClick={onClose}
                            className="cursor-pointer rounded-lg px-3 py-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700">
                        X
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                        <input
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="e.g. Yolkie on Toppie"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Ingredients</label>
                        <input
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="Eggs, Butter..."
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                        Separate each ingredient with a comma.
                        </p>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                        <select 
                                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                required>
                            <option value="" disabled>Select</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Dessert</option>
                            <option>Snack</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Instructions</label>
                        <textarea 
                            className="h-40 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="Describe how to prepare the recipe..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        {!newRecipe && (
                            <>
                                <button className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                                        onClick={onDelete}
                                        type="button">
                                    Delete Recipe
                                </button>
                                <button className="cursor-pointer rounded-lg bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700"
                                        onClick={toggleFavorite}
                                        type="button">
                                    {favorite ? "Unfavorite" : "Favorite"}
                                </button>
                            </>
                        )}
                        <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                                type="submit">
                            Save Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}