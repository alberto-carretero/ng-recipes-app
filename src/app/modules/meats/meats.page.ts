import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { RecipeI } from "src/app/interfaces/recipe";
import { Subscription } from "rxjs";
import { FirestoreService } from "src/app/services/firestore.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-meats",
  templateUrl: "meats.page.html",
  styleUrls: ["meats.page.scss"],
})
export class MeatsPage implements OnInit {
  public loading = true;
  public meatsRecipes: RecipeI[];

  private subscriptions = new Subscription();

  constructor(
    private firestoreService: FirestoreService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getRecipesFromSubcollection();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getRecipesFromSubcollection() {
    this.subscriptions.add(
      this.firestoreService
        .getRecipesFromSubcollection("meats", "dishes")
        .pipe(take(1))
        .subscribe((recipes) => {
          this.meatsRecipes = recipes.map((recipe) => {
            const data = recipe.payload.doc.data() as RecipeI;
            const id = recipe.payload.doc.id;
            return { id, ...data };
          });

          this.loading = false;
          this.cd.detectChanges();
        })
    );
  }

  async deleteRecipe(recipeId: string) {
    this.loading = true;
    await this.firestoreService
      .deteleRecipe("meats", "dishes", recipeId)
      .then(() => (this.loading = false));
    this.getRecipesFromSubcollection();
  }
}
