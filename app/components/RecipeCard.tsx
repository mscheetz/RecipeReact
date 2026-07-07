import { StarIcon } from "@heroicons/react/24/solid";
import Recipe from "~/models/Recipe";

type RecipeCardProps = {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick}: RecipeCardProps) {

  return (
    <div onClick={onClick}
         className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900">
          {recipe.name}
          {recipe.favorite && (
            <StarIcon className="ml-2 inline h-6 w-6 text-yellow-500" />
          )}
        </h2>
        <p className="mt-1 text-sm text-blue-600">
          {recipe.category}
        </p>
        <p className="mt-3 text-gray-600">
          {recipe.ingredients.length} ingredients
        </p>
    </div>
  );
}
