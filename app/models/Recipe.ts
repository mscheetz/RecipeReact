export default class Recipe {
    id: number;
    name: string;
    ingredients: string[];
    category: string;
    instructions: string;
    favorite: boolean;    

    constructor(
        id: number,
        name: string,
        ingredients: string[],
        category: string,
        instructions: string,
        favorite: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.category = category;
        this.instructions = instructions;
        this.favorite = favorite;
    }
}