import { Component, OnInit } from '@angular/core';
import { DatabaseService, Ingredient } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

type IngInRec = { ingredientId: number; qte: number;};

@Component({
  selector: 'app-create-receipe',
  templateUrl: './create-receipe.page.html',
  styleUrls: ['./create-receipe.page.scss'],
})

export class CreateReceipePage implements OnInit {

  ingredients: Ingredient[] = [];

  recette = {};

  ingList: IngInRec[] = [];

  selectedView = 'recette';

  constructor(private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
        })
      }
    });
    this.ingList.push({ingredientId : 1 , qte : 100});
    this.ingList.push({ingredientId : 2 , qte : 50});
  }

  addRecette() {
    this.db.addRecette(this.recette['nom'], this.recette['nbPers'], this.recette['source'], this.recette['page'], this.ingList)
    .then(async _ => {
      let toast = await this.toast.create({
        message: 'Recette créée',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/');
      this.recette = {};
    });
  }

  openAddIngr(){
    this.selectedView = 'addIngr';
  }

}
