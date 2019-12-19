import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService, Um } from '../services/database.service';
import { IngredientWithRecettes } from '../services/database.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface IngObject {
  nom: string,
  um: number
}

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  public itemForm : FormGroup;
  public ums: Um[] = [];
  public initIngredient: IngredientWithRecettes = null;

  constructor(private route : ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      nom: ['', Validators.required],
      um: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let ingredientId = params.get('id');
 
      this.db.getIngredient(ingredientId).then(data => {
        this.initIngredient = data;
        this.itemForm.controls['nom'].setValue(this.initIngredient.nom);
        this.itemForm.controls['um'].setValue(this.initIngredient.um_id);
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
    this.db.updateIngredient(this.initIngredient.id, this.itemForm.value.nom, this.itemForm.value.um)
    .then(async _ => {
      this.itemForm.reset();
      let toast = await this.toast.create({
        message: 'Ingrédient mis à jour',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl(`/items/${this.initIngredient.id}`);
    });
  }

}
