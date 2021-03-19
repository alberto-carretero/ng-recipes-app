import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeatsRoutingModule } from './meats-routing.module';
import { MeatsPage } from './meats.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MeatsPage],
  imports: [
    CommonModule,
    ComponentsModule,
    MeatsRoutingModule
  ]
})
export class MeatsModule { }
