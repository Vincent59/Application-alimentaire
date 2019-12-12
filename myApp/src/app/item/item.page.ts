import { Component, OnInit } from '@angular/core';
import { IngredientWithRecettes, DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  item: IngredientWithRecettes = null;

  constructor(private route : ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let itemId = params.get('id');
 
      this.db.getIngredient(itemId).then(data => {
        console.log(data);
        this.item = data;
      });
    });
  }

  goToRecipePage(recetteId) {
    this.router.navigateByUrl(`/recipes/${recetteId}`);
  }

  async deleteIngredient() {
    if (this.item.recettes.length == 0) {
      this.db.deleteIngredient(this.item.id).then(async () => {
        let toast = await this.toast.create({
          message: 'Ingrédient supprimé',
          duration: 3000
        });
        toast.present();
        this.router.navigateByUrl('/items-list');
      });      
    } else {
      let toast = await this.toast.create({
        message: 'Cet ingrédient ne peut pas être supprimé car présent dans au moins une recette',
        duration: 5000
      });
      toast.present();
    }
  }

}
