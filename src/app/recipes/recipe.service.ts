import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    /*
    private recipes: Recipe[] = [
        new Recipe(
            'Pepperoni Pizza',
            'A delicious pepperoni pizza baked with fresh doug and meat',
            'https://thumbs.dreamstime.com/b/italian-pepperoni-pizza-thick-pie-crust-spicy-sausage-mozzarella-tomato-isolated-white-viewed-whole-80010925.jpg',
            [
                new Ingredient('Dough', 1),
                new Ingredient('Grilled cheese', 1),
                new Ingredient('Pepperoni', 20)
            ]),
        new Recipe(
            'Cheese Burger',
            'The one and only All-American Cheese Burger',
            'https://www.cnet.com/a/img/mBC1W52TWFG0mD8fXKqcUFu1nUY=/1200x675/2017/03/22/1c848061-a343-460a-a044-b07cb94e7927/if-burger.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Patty', 1),
                new Ingredient('Cheese Slice', 1),
                new Ingredient('Veggies', 1)
            ])
    ];
    */
   private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        //Pass a new updated copy of the array
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}