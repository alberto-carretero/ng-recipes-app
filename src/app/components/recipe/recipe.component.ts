import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { RecipeI } from "src/app/interfaces/recipe";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { NavController, ModalController } from "@ionic/angular";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"],
})
export class RecipeComponent implements OnInit {
  @Input() documentId: string;
  @Input() recipes: RecipeI[];

  @Output() deleteRecipe = new EventEmitter<string>();

  public user$: Observable<any> = this.authService.afAuth.user;
  public showSteps = false;
  public recipeIndex = 0;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  showStepsInfo(index) {
    this.showSteps = true;
    this.recipeIndex = index;
  }

  async onBack() {
    await this.navCtrl.back();
  }

  async showDeleteModal(recipeId: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      // cssClass: "my-class",
      componentProps: {
        title: "Delete recipe",
        text: "You will delete this recipe. Are you sure?",
        buttons: [
          {
            text: "Yes",
            action: "delete",
          },
          {
            text: "No",
            action: "dismiss",
          },
        ],
      },
    });

    modal.onDidDismiss().then((value) => {
      if (value.data.dismissed === "delete") {
        this.deleteRecipe.emit(recipeId);
      }
    });

    return await modal.present();
  }
}
