import { Component, Input, OnInit } from "@angular/core";
import { RecipeI } from "src/app/interfaces/recipe";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NavController, ModalController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/firestore.service";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"],
})
export class RecipeComponent implements OnInit {
  @Input() documentId: string;
  @Input() recipes: RecipeI[];

  public user$: Observable<any> = this.authService.afAuth.user;
  public showSteps = false;
  public recipeIndex = 0;

  constructor(
    private authService: AuthService,
    // private router: Router,
    private navCtrl: NavController,
    // private firestoreService: FirestoreService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log("^^^^ Recipes ^^^^ ", this.recipes);
  }

  showStepsInfo(index) {
    this.showSteps = true;
    this.recipeIndex = index;
  }

  onBack() {
    // this.router.navigate(['/home']);
    this.navCtrl.back();
  }

  // async onLogout() {
  //   try {
  //     await this.authService.logout();
  //     this.router.navigate(['/login']);
  //   }
  //   catch (error){
  //     console.log('Logout error');
  //   }
  // }

  async showModal(recipeId: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      // cssClass: "my-class",
      componentProps: {
        title: "My Modal",
        text: "You will delete this recipe. Are you sure?",
        buttons: [
          {
            text: "Yes",
            action: "delete",
            documentId: this.documentId,
            subCollection: "dishes",
            recipeId: recipeId,
          },
          {
            text: "No",
            action: "dismiss",
          },
        ],
      },
    });
    return await modal.present();
  }

  // async deleteRecipe(recipeId: string) {
  //   console.log(recipeId);
  //   await this.firestoreService.deteleRecipe(
  //     this.documentId,
  //     "dishes",
  //     recipeId
  //   );
  // }
}
