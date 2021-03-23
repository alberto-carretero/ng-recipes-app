import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FirestoreService } from "src/app/services/firestore.service";
import { Subscription } from "rxjs";
import { RecipeI } from "src/app/interfaces/recipe";
import { take } from "rxjs/operators";

@Component({
  selector: "app-rices",
  templateUrl: "rices.page.html",
  styleUrls: ["rices.page.scss"],
})
export class RicesPage implements OnInit {
  public loading = true;
  public ricesRecipes: RecipeI[];

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
        .getRecipesFromSubcollection("rices", "dishes")
        .pipe(take(1))
        .subscribe((recipes) => {
          this.ricesRecipes = recipes.map((recipe) => {
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
      .deteleRecipe("rices", "dishes", recipeId)
      .then(() => (this.loading = false));
    this.getRecipesFromSubcollection();
  }
}
