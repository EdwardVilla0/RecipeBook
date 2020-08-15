import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { switchMap, map } from 'rxjs/operators';
import * as RecipesActions from './recipe.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(
          'https://ng-course-recipe-book-f21e5.firebaseio.com/recipes.json');
    }),
    map(recipes => {
      return recipes.map(recipes => {
        return {
          ...recipes,
          ingredients: recipes.ingredients ? recipes.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  constructor(
    private actions$: Actions, private http: HttpClient) { }
}
