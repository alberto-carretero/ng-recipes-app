import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { FirestoreService } from "../services/firestore.service";
import { MenuI } from "../interfaces/menu";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  public generalInfo: object[];
  public recipes = [];
  public menuOptions: MenuI[] = [];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.getAllTypesOfRecipes();
  }

  getAllTypesOfRecipes() {
    this.firestoreService.getAllTypesOfRecipes().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.recipes.push(doc.data());
      });
    });
  }
}
