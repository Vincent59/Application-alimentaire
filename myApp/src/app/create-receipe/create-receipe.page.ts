import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SecondPage } from '../modals/second/second.page';
import { DatabaseService, Ingredient } from '../services/database.service';

export interface RecipeObject {
  nom: string,
  nbPers: number,
  source: string,
  page: string
}

@Component({
  selector: 'app-create-receipe',
  templateUrl: './create-receipe.page.html',
  styleUrls: ['./create-receipe.page.scss'],
})

export class CreateReceipePage implements OnInit {

  public ingredients: Ingredient[] = [];

  recette: RecipeObject = {nom: '', nbPers: null, source: '', page: ''};
  public qtes = [];
  public ingredientToShow = [];

  constructor(private modalController: ModalController, private db: DatabaseService, private toast: ToastController, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
        })
      }
    });
  }

  async openModalWithData() {
    const modal = await this.modalController.create({
      component: SecondPage,
      componentProps: {
        ingredients: this.ingredients,
        ingredientsToShow: this.ingredientToShow
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      this.ingredientToShow = [];
      if (dataReturned.data.length > 0) {
        dataReturned.data.forEach(element => 
        this.ingredientToShow.push(element)

        );
      
        document.querySelector(".btnAdd").innerHTML = "Modifier les ingrédients";
      }
    });

    return await modal.present().then(_ => {
    })
  }

  addRecette() {
    for(let i=0 ; i < this.ingredientToShow.length; i++){
  		this.ingredientToShow[i].qte = this.qtes[i];
      }
    this.db.addRecette(this.recette['nom'], this.recette['nbPers'], this.recette['source'], this.recette['page'], this.ingredientToShow)
    .then(async _ => {
      let toast = await this.toast.create({
        message: 'Recette créée',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/');
      this.recette = {nom: '', nbPers: null, source: '', page: ''};
    });
  }
}