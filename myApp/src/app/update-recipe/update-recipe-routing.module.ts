import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRecipePage } from './update-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRecipePageRoutingModule {}
