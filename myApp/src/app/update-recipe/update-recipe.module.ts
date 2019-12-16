import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRecipePageRoutingModule } from './update-recipe-routing.module';

import { UpdateRecipePage } from './update-recipe.page';
import { SecondPage } from '../modals/second/second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateRecipePageRoutingModule
  ],
  declarations: [UpdateRecipePage]
})
export class UpdateRecipePageModule {}
