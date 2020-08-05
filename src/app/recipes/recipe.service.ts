import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient,  } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  //private recipes: Recipe[] = [
  //  new Recipe(
  //    'Tasty Schnitzel',
  //    'A Super Tasty Schnitzel',
  //    'https://thecozyapron.com/wp-content/uploads/2012/02/schnitzel_thecozyapron_1.jpg',
  //    [
  //      new Ingredient('Meat', 1),
  //      new Ingredient('French Fries',20)
  //    ]),
  //  new Recipe(
  //    'burger',
  //    'things to say',
  //    'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg',
  //    [
  //      new Ingredient('Buns', 2),
  //      new Ingredient('Meat', 1)
  //    ])
  //];

  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {

    //this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
