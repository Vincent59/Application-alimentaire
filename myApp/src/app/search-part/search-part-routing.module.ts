import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPartPage } from './search-part.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPartPageRoutingModule {}
