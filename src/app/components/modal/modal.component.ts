import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/firestore.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() buttons: any[];

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {}

  async handleSelect(button: any) {
    if (button.action === "dismiss") {
      await this.closeModal();
    } else if (button.action === "delete") {
      await this.firestoreService
        .deteleRecipe(button.documentId, button.subCollection, button.recipeId)
        .then(() => {
          this.closeModal();
          this.router.navigate(["/home"]);
        })
        .catch((error) => console.log("The recipe has not been deleted."));
    }
  }

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: true,
    });
  }
}
