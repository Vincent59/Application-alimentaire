import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-receipe',
    loadChildren: () => import('./create-receipe/create-receipe.module').then( m => m.CreateReceipePageModule)
  },
  {
    path: 'items-list',
    loadChildren: () => import('./items-list/items-list.module').then( m => m.ItemsListPageModule)
  },
  {
    path: 'receipe-list',
    loadChildren: () => import('./receipe-list/receipe-list.module').then( m => m.ReceipeListPageModule)
  },
  {
    path: 'search-part',
    loadChildren: () => import('./search-part/search-part.module').then( m => m.SearchPartPageModule)
  },
  {
    path: 'second',
    loadChildren: () => import('./modals/second/second.module').then( m => m.SecondPageModule)
  },
  {
    path: 'recipes/:id',
    loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
  },
  {
    path: 'items/:id',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
