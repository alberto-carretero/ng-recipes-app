import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeatsPage } from './meats.page';

const routes: Routes = [{
  path: '',
  component: MeatsPage,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeatsRoutingModule { }
