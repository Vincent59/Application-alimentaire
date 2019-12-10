import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SecondPage } from '../modals/second/second.page';

@Component({
  selector: 'app-create-receipe',
  templateUrl: './create-receipe.page.html',
  styleUrls: ['./create-receipe.page.scss'],
})
export class CreateReceipePage implements OnInit {

  constructor(private modalController: ModalController) { }

  public ingredientToShow = [];

  ngOnInit() {
  }

  public Ingredients = [
    {
      id: '1',
      name: 'Concombre',
      unite: 'g'
    },
    {
      id: '2',
      name: 'Pates',
      unite: 'g'
    },
    {
      id: '3',
      name: 'Roquette',
      unite: 'g'
    },
    {
      id: '4',
      name: 'Piment',
      unite: 'pincé'
    },
    {
      id: '5',
      name: 'Ail',
      unite: 'g'
    },
    {
      id: '6',
      name: 'Mayonnaise',
      unite: 'ml'
    },
    {
      id: '7',
      name: 'Poivrons',
      unite: 'g'
    },
    {
      id: '8',
      name: 'Oeufs',
      unite: 'g'
    },
    {
      id: '9',
      name: 'Bouillon de légumes',
      unite: 'L'
    },
  ]

  public choseIngredients: string;

  async openModalWithData() {
    const modal = await this.modalController.create({
      component: SecondPage,
      componentProps: {
        Ingredients: this.Ingredients
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
      console.log('Sending: ', this.Ingredients);
    })
  }

}
