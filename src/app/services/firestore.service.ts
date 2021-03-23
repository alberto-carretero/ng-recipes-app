import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { RecipeI } from "../interfaces/recipe";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  public addRecipe(data: RecipeI, documentId: string, subcollection: string) {
    return this.firestore
      .collection("recipes")
      .doc(documentId)
      .collection(subcollection)
      .add(data);
  }

  public getRecipesFromSubcollection(
    documentId: string,
    subcollection: string
  ) {
    return this.firestore
      .collection("recipes")
      .doc(documentId)
      .collection(subcollection)
      .snapshotChanges();
  }

  public getAllTypesOfRecipes() {
    return this.firestore.collection("recipes").get().toPromise();
  }

  public updateRecipe(documentId: string, data: RecipeI) {
    return this.firestore.collection("recipes").doc(documentId).set(data);
  }

  public deteleRecipe(
    documentId: string,
    subcollection: string,
    recipeId: string
  ) {
    return this.firestore
      .collection("recipes")
      .doc(documentId)
      .collection(subcollection)
      .doc(recipeId)
      .delete();
  }
}
