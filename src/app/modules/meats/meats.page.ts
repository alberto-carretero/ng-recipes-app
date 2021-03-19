import { Component } from "@angular/core";
import { RecipeI } from "src/app/interfaces/recipe";
import { Subscription } from "rxjs";
import { FirestoreService } from "src/app/services/firestore.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-meats",
  templateUrl: "meats.page.html",
  styleUrls: ["meats.page.scss"],
})
export class MeatsPage {
  public loading = true;
  public meatsRecipes: RecipeI[];

  // public recipes = [];

  private subscriptions = new Subscription();

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.firestoreService
        .getRecipesFromSubcollection("meats", "dishes")
        .pipe(take(1))
        .subscribe((recipes) => {
          // console.log('Meats recipe: ', recipe.payload.data());
          // this.meatsRecipes = recipe.payload.data() as RecipeI[];
          this.meatsRecipes = recipes.map((recipe) => {
            const data = recipe.payload.doc.data() as RecipeI;
            const id = recipe.payload.doc.id;
            // console.log('Rices recipe: ', data);
            // this.ricesRecipes.push(recipe.payload.doc.data() as RecipeI);

            return { id, ...data };
          });

          this.loading = false;
          console.log("Meats: ", this.meatsRecipes);
        })
    );

    // this.subscriptions.add(this.firestoreService.getRecipes().pipe(take(1)).subscribe(recipesSnapshot => {
    //   let recipes: RecipeI;
    //   recipes = recipesSnapshot[0];
    //   this.meatsRecipes = recipes['meats'].dishes;
    //   console.log('Meats: ', this.meatsRecipes);
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
    //   this.meatsRecipes = this.recipes['meats'].dishes;
    //   this.loading = false;
    // }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
