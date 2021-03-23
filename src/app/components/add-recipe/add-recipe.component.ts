import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirestoreService } from "src/app/services/firestore.service";
import { RecipeI } from "src/app/interfaces/recipe";
import { AngularFireStorage } from "@angular/fire/storage";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.component.html",
  styleUrls: ["./add-recipe.component.scss"],
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm = new FormGroup({
    type: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    autor: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    ingredients: new FormControl(""),
    steps: new FormControl(""),
    images: new FormControl(""),
  });

  typesOfRecipes: string[] = [];
  inputTextArray: string[] = [
    "title",
    "autor",
    "description",
    "ingredients",
    "steps",
  ];
  path: string;
  // basePath: string = "assets/images";
  // selectedImage: any = null;

  // constructor(private router: Router) { }
  constructor(
    private firestoreService: FirestoreService,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {
    this.firestoreService.getAllTypesOfRecipes().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        this.typesOfRecipes.push(doc.id);
      });
      console.log(this.typesOfRecipes);
    });
  }

  // onBack() {
  //   this.router.navigate(['/home']);
  // }

  async onAddRecipe() {
    let recipe: RecipeI;
    recipe = this.addRecipeForm.value;
    try {
      // let filePath = `${this.imageSrc}${recipe.type}/${this.selectedImage.name}`;
      // let imageUrl = `${this.imagePath}/${recipe.type}/${this.imagePath}`;
      await this.firestoreService
        .addRecipe(recipe, recipe.type, "dishes")
        .then(() => {
          // this.storage.upload(this.path, this.path);
          this.router.navigate([`/${recipe.type}`]);
          console.log("Add recipe: ", recipe.type);
        })
        .catch((error) => console.log("Add recipe error"));
    } catch (error) {
      console.log("Add recipe error");
    }
  }

  // async onLogin() {
  //   const {email, password} = this.loginForm.value;
  //   try {
  //     const user = await this.authService.login(email, password);
  //     if (user && user.user.emailVerified) {
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.router.navigate(['/home']);
  //     } else if (user) {
  //       this.router.navigate(['/verification-email']);
  //     } else {
  //       this.router.navigate(['/register']);
  //     }
  //   }
  //   catch (error) {
  //     console.log('Login error');
  //   }
  // }

  // uploadImage(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.path = event.target.files[0];

  //     // this.storage.upload(this.path, this.path);
  //   }
  // }
}
