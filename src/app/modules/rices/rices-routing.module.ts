import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RicesPage } from './rices.page';

const routes: Routes = [{
  path: '',
  component: RicesPage,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RicesRoutingModule { }
