import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateReceipePage } from './create-receipe.page';

const routes: Routes = [
  {
    path: '',
    component: CreateReceipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateReceipePageRoutingModule {}
