import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Recette, Ingredient, Recette_ingredients } from '../services/database.service';
import { HomePage } from '../home/home.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.page.html',
  styleUrls: ['./receipe-list.page.scss'],
})
export class ReceipeListPage implements OnInit {

  recettes: Recette[] = [];
  ingredients: Ingredient[] = [];
  recette_ingredients: Recette_ingredients[] = [];

  constructor(private db: DatabaseService, private router: Router, private toast: ToastController) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecettes().subscribe(recettes => {
          this.recettes = recettes;
        });
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
        });
        this.db.getRecette_ingredients().subscribe(recette_ingredients => {
          this.recette_ingredients = recette_ingredients;
          for(let recette_ingredient of recette_ingredients){
            console.log("recette_ingredient : " + recette_ingredient.idRecette + ", " + recette_ingredient.idIngredient + ", " + recette_ingredient.nomIngredient + ", " + recette_ingredient.qteIngredient + ", " + recette_ingredient.unite);
          }
        })
      }
    });
  }

  deleteRecette(recetteId) {
    this.db.deleteRecette(recetteId).then(async () => {
      let toast = await this.toast.create({
        message: 'Recette supprimée',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/receipe-list');
    });
  }

}
