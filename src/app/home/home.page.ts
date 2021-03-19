import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { FirestoreService } from "../services/firestore.service";
import { take } from "rxjs/operators";
import { RecipeI } from "../interfaces/recipe";
import { MenuI } from "../interfaces/menu";
// import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  // directives: [IONIC_DIRECTIVES]
})
export class HomePage implements OnInit, OnDestroy {
  public user$: Observable<any> = this.authService.afAuth.user;
  public generalInfo: object[];

  public recipes = [];

  public menuOptions: MenuI[] = [];

  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    // this.subscriptions.add(this.firestoreService.getRecipes().pipe(take(1)).subscribe(recipesSnapshot => {
    //   let recipes: RecipeI;
    //   recipes = recipesSnapshot[0];
    //   this.generalInfo = this.getGeneralInfo(recipes);
    //   console.log('Recipes: ', recipes);
    // }));
    // this.subscriptions.add(this.firestoreService.getRecipes().subscribe(recipesSnapshot => {
    //   this.recipes = [];
    //   recipesSnapshot.forEach((recipeData: any) => {
    //     this.recipes.push({
    //       id: recipeData.payload.doc.id,
    //       data: recipeData.payload.doc.data()
    //     });
    //   });
    //   this.generalInfo = this.getGeneralInfo(this.recipes[0]);
    //   console.log(this.recipes);
    // }));

    this.firestoreService.getAllRecipes().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.recipes.push(doc.data());
      });
      // console.log(this.recipes);
    });
  }

  // getGeneralInfo(recipes: RecipeI)  {
  //   if(recipes) {
  //     let generalInfo: object[] = [];
  //     for(let type in recipes) {
  //       generalInfo.push(recipes[type].general);
  //       // console.log('**: ', recipes)
  //     }
  //     return generalInfo;
  //   }
  // }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
