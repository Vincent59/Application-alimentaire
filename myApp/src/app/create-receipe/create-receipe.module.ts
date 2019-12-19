import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateReceipePageRoutingModule } from './create-receipe-routing.module';

import { CreateReceipePage } from './create-receipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateReceipePageRoutingModule,
  ],
  declarations: [CreateReceipePage]
})
export class CreateReceipePageModule {}
