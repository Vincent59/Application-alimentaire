import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SecondPage } from '../modals/second/second.page';
import { DatabaseService, Ingredient } from '../services/database.service';

@Component({
  selector: 'app-create-receipe',
  templateUrl: './create-receipe.page.html',
  styleUrls: ['./create-receipe.page.scss'],
})
export class CreateReceipePage implements OnInit {

  public ingredients: Ingredient[] = [
    {
      id: 1,
      nom:'test 1',
      um_id: 1,
      unite:'Gramme',
      nbRecettes:0
    },
    {
      id: 2,
      nom:'test 2',
      um_id: 2,
      unite:'Unité',
      nbRecettes:0
    }
  ];
  recette = {};
  ingList = [];

  public ingredientToShow = [];

  public choseIngredients: string;

  constructor(private modalController: ModalController, private db: DatabaseService, private toast: ToastController, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          // this.ingredients = ingredients;
        })
      }
    });
  }

  async openModalWithData() {
    const modal = await this.modalController.create({
      component: SecondPage,
      componentProps: {
        Ingredients: this.ingredients
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      this.choseIngredients = dataReturned.data;

     dataReturned.data.forEach(element => 

      this.ingredientToShow.push(element)

      );
      
      document.querySelector(".btnAdd").innerHTML = "Modifier les ingrédients";

    });

    return await modal.present().then(_ => {
      console.log('Sending: ', this.ingredients);
    })
  }

  addRecette() {
    this.db.addRecette(this.recette['nom'], this.recette['nbPers'], this.recette['source'], this.recette['page'], this.ingredientToShow)
    .then(async _ => {
      for(let ing of this.ingredientToShow){
        console.log("id : " + ing.id);
        console.log("name : " + ing.name);
        console.log("unite : " + ing.unite);
      }
      let toast = await this.toast.create({
        message: 'Recette créée',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/');
      this.recette = {};
    });
  }
}