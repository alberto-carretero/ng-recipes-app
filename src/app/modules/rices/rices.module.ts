import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RicesRoutingModule } from './rices-routing.module';
import { RicesPage } from './rices.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [RicesPage],
  imports: [
    CommonModule,
    ComponentsModule,
    RicesRoutingModule
  ]
})
export class RicesModule { }
