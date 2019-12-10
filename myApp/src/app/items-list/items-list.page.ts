import { Component, OnInit } from '@angular/core';
import { DatabaseService, Ingredient, Um } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  ingredients: Ingredient[] = [];
  ums: Um[] = [];

  ingredient = {};

  selectedView = 'items-list';

  constructor(private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
          for(let ing of ingredients){
            console.log("ingrédient : " + ing.nom + "(" + ing.unite + ")")
          }
        })
        this.db.getUms().subscribe(ums => {
          this.ums = ums;
        })
      }
    });
  }

  addIngredient() {
    this.db.addIngredient(this.ingredient['nom'], this.ingredient['um'])
    .then(async _ => {
      this.ingredient = {};
      let toast = await this.toast.create({
        message: 'Ingrédient ajouté',
        duration: 3000
      });
      toast.present();
      this.selectedView = 'items-list';
      this.router.navigateByUrl('/items-list');
    });
  }

  async deleteIngredient(ingredientId) {
    if (this.ingredients.find(x=>x.id == ingredientId).nbRecettes == 0) {
      this.db.deleteIngredient(ingredientId).then(async () => {
        let toast = await this.toast.create({
          message: 'Ingrédient supprimé',
          duration: 3000
        });
        toast.present();
        this.router.navigateByUrl('/items-list');
      });      
    } else {
      let toast = await this.toast.create({
        message: 'Ingrédient non supprimé car présent dans au moins une recette',
        duration: 5000
      });
      toast.present();
    }
  }

}
