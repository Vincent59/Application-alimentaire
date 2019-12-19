import { Component, OnInit } from '@angular/core';
import { DatabaseService, Ingredient, Um } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  public itemForm : FormGroup;

  ingredients: Ingredient[] = [];
  ums: Um[] = [];

  selectedView = 'items-list';

  constructor(private db: DatabaseService, private router: Router, private toast: ToastController, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      nom: ['', Validators.required],
      um: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
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

  /**
   * Add the item in database
   */
  addIngredient() {
    this.db.addIngredient(this.itemForm.value.nom, this.itemForm.value.um)
    .then(async _ => {
      this.itemForm.reset();
      let toast = await this.toast.create({
        message: 'Ingrédient ajouté',
        duration: 3000
      });
      toast.present();
      this.selectedView = 'items-list';
      this.router.navigateByUrl('/items-list');
    });
  }

  /**
   * Go to the item page based on its database ID
   * @param id id of the item in database
   */
  goToItemPage(id) {
    this.router.navigateByUrl(`/items/${id}`);
  }

}
