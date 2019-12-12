import { Component, OnInit } from '@angular/core';
import { DatabaseService, Ingredient, Um } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface IngObject {
  nom: string,
  um: number
}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  ingredients: Ingredient[] = [];
  ums: Um[] = [];

  ingredient: IngObject = {
    nom: '',
    um: null
  };

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
          for(let um of ums) {
            um.nom = um.nom.charAt(0).toUpperCase() + um.nom.slice(1)
          }
          this.ums = ums;
        })
      }
    });
  }

  addIngredient() {
    this.db.addIngredient(this.ingredient['nom'], this.ingredient['um'])
    .then(async _ => {
      this.ingredient = {nom:'', um: null};
      let toast = await this.toast.create({
        message: 'Ingrédient ajouté',
        duration: 3000
      });
      toast.present();
      this.selectedView = 'items-list';
      this.router.navigateByUrl('/items-list');
    });
  }

  goToItemPage(id) {
    this.router.navigateByUrl(`/items/${id}`);
  }

}
