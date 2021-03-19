import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
// import { StepsComponent } from './components/steps/steps.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./components/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'rices',
    loadChildren: () => import('./modules/rices/rices.module').then(m => m.RicesModule)
  },
  {
    path: 'meats',
    loadChildren: () => import('./modules/meats/meats.module').then(m => m.MeatsModule)
  },
  {
    path: 'verification-email',
    component: SendEmailComponent
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
