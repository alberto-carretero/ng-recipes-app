import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeI } from '../interfaces/recipe';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(private firestore: AngularFirestore) {}

    // https://medium.com/angular-chile/angular-6-y-firestore-b7f270adcc96

    // db.collection('users').doc(this.username).collection('booksList').doc(myBookId).set({
    //     password: this.password,
    //     name: this.name,
    //     rollno: this.rollno
    //   })

    public addRecipe(data: RecipeI, documentId: string, subcollection: string) {
        // return this.firestore.collection('recipes').add(data);
        // return this.firestore.collection('recipes').doc(documentId).set(data);
        return this.firestore.collection('recipes').doc(documentId).collection(subcollection).add(data);
    }

    public getRecipesFromSubcollection(documentId: string, subcollection: string) {
        // return this.firestore.collection('recipes').doc(documentId).snapshotChanges();
        return this.firestore.collection('recipes').doc(documentId).collection(subcollection).snapshotChanges();
    }

    public getAllRecipes() {
        return this.firestore.collection('recipes').get().toPromise();

        // return this.firestore.collection('recipes').get().toPromise().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${doc.data()}`);
        //     });
        // });

        // return this.firestore.collection('recipes').snapshotChanges().pipe(
        //     map(recipes =>
        //         recipes.map(recipe => {
        //             const data = recipe.payload.doc.data() as RecipeI; // Si se quiere recuperar el id -> const id = recipe.payload.doc.id;
        //             return {...data}; // Si se quiere devolver también el id -> return {id, ...data};
        //         }))
        // );
        // return this.firestore.collection('recipes').snapshotChanges();
    }

    public updateRecipe(documentId: string, data: RecipeI) {
        return this.firestore.collection('recipes').doc(documentId).set(data);
    }

    public deteleRecipe(documentId: string, subcollection: string, recipeId: string) {
        return this.firestore.collection('recipes').doc(documentId).collection(subcollection).doc(recipeId).delete();
    }
}