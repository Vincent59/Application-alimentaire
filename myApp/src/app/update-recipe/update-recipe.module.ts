import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRecipePageRoutingModule } from './update-recipe-routing.module';

import { UpdateRecipePage } from './update-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateRecipePageRoutingModule
  ],
  declarations: [UpdateRecipePage]
})
export class UpdateRecipePageModule {}
