import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Recette, Ingredient, Recette_ingredients } from '../services/database.service';
import { HomePage } from '../home/home.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { ExcelServicesService } from '../services/excel-services.service';


@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.page.html',
  styleUrls: ['./receipe-list.page.scss'],
})


export class ReceipeListPage implements OnInit {

  recettes: Recette[] = [];
  ingredients: Ingredient[] = [];
  recette_ingredients: Recette_ingredients[] = [];
  

  constructor(
    private db: DatabaseService,
    private router: Router,
    private toast: ToastController,
    private excelService:ExcelServicesService,
    private http: HttpClient,
    ) {
  }

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

  goToRecipePage(id) {
    this.router.navigateByUrl(`/recipes/${id}`);
  }

}
