import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import { RecipeI } from 'src/app/interfaces/recipe';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rices',
  templateUrl: 'rices.page.html',
  styleUrls: ['rices.page.scss'],
})
export class RicesPage implements OnInit {
  public loading = true;
  public ricesRecipes: RecipeI[];

  // public recipes = [];

  private subscriptions = new Subscription();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.subscriptions.add(this.firestoreService.getRecipesFromSubcollection('rices', 'dishes').pipe(take(1)).subscribe(recipes => {
      // console.log('Rices recipe: ', recipe.payload.data());
      // this.ricesRecipes = recipe.payload.data() as RecipeI[];
      // this.loading = false;
      this.ricesRecipes = recipes.map(recipe => {
        const data = recipe.payload.doc.data() as RecipeI;
        const id = recipe.payload.doc.id;
        // console.log('Rices recipe: ', data);
        // this.ricesRecipes.push(recipe.payload.doc.data() as RecipeI);

        return {id, ...data};
      });

      this.loading = false;
      console.log('Rices: ', this.ricesRecipes);
    }));

    // this.subscriptions.add(this.firestoreService.getRecipes().pipe(take(1)).subscribe(recipesSnapshot => {
    //   let recipes: RecipeI;
    //   recipes = recipesSnapshot[0];    
    //   this.ricesRecipes = recipes['rices'].dishes;
    //   console.log('Rices: ', this.ricesRecipes);
    //   this.loading = false;
    // }));

    // this.subscriptions.add(this.firestoreService.getRecipes().subscribe(recipesSnapshot => {
    //   this.recipes = [];
    //   recipesSnapshot.forEach((recipeData: any) => {
    //     this.recipes.push({
    //       id: recipeData.payload.doc.id,
    //       data: recipeData.payload.doc.data()
    //     });
    //   });
    //   this.ricesRecipes = this.recipes['rices'].dishes;
    //   this.loading = false;
    // }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}