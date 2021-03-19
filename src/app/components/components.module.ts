import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading/loading.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { StepsComponent } from "./steps/steps.component";
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  declarations: [
    LoadingComponent,
    RecipeComponent,
    StepsComponent,
    MenuComponent,
    HeaderComponent,
    AddRecipeComponent,
    ModalComponent,
  ],
  imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
  exports: [
    LoadingComponent,
    RecipeComponent,
    StepsComponent,
    MenuComponent,
    HeaderComponent,
    AddRecipeComponent,
  ],
  entryComponents: [ModalComponent],
})
export class ComponentsModule {}
