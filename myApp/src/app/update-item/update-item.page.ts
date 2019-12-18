import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService, Um } from '../services/database.service';
import { IngredientWithRecettes } from '../services/database.service';
import { IngObject } from '../items-list/items-list.page';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  public ums: Um[] = [];
  public initIngredient: IngredientWithRecettes = null;
  public ingredient: IngObject = {nom: '', um: null};

  constructor(private route : ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let ingredientId = params.get('id');
 
      this.db.getIngredient(ingredientId).then(data => {
        this.initIngredient = data;
        this.ingredient['nom'] = this.initIngredient.nom;
        this.ingredient['um'] = this.initIngredient.um_id;
      });
    });

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getUms().subscribe(ums => {
          this.ums = ums;
        })
      }
    });
  }

  /**
   * Update this item
   */
  updateIngredient() {
    this.db.updateIngredient(this.initIngredient.id, this.ingredient['nom'], this.ingredient['um'])
    .then(async _ => {
      let toast = await this.toast.create({
        message: 'Ingrédient mis à jour',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl(`/items/${this.initIngredient.id}`);
      this.ingredient = null;
    });
  }

}
