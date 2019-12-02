import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceipeListPage } from './receipe-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReceipeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceipeListPageRoutingModule {}
