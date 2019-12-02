import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'recettes',
    loadChildren: () => import('./pages/recettes/recettes.module').then( m => m.RecettesPageModule)
  },
  {
    path: 'recettes/:id',
    loadChildren: () => import('./pages/recette/recette.module').then( m => m.RecettePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
