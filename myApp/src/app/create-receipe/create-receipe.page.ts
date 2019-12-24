import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SecondPage } from '../modals/second/second.page';
import { DatabaseService, Ingredient } from '../services/database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-receipe',
  templateUrl: './create-receipe.page.html',
  styleUrls: ['./create-receipe.page.scss'],
})

export class CreateReceipePage implements OnInit {

  public recetteForm : FormGroup;

  public ingredients: Ingredient[] = [];
  public qtes = [];
  public ingredientToShow = [];

  constructor(private modalController: ModalController, private db: DatabaseService, private toast: ToastController, private router: Router, private formBuilder: FormBuilder) {
    this.recetteForm = this.formBuilder.group({
      nom: ['', Validators.required],
      nbPers: ['', Validators.required],
      source: ['', Validators.required],
      page: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
        })
      }
    });
  }

  /**
   * Opens a modal to select items to add to the recipe
   */
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

  /**
   * Add the recipe in database, using ingredientToShow as the itemList
   */
  addRecette() {
    this.db.addRecette(this.recetteForm.value.nom, this.recetteForm.value.nbPers, this.recetteForm.value.source, this.recetteForm.value.page, this.ingredientToShow)
    .then(async _ => {
      let toast = await this.toast.create({
        message: 'Recette créée',
        duration: 3000,
        color: "success",
        showCloseButton: true,
        closeButtonText: "Fermer",
        animated: true
      });
      toast.present();
      this.router.navigateByUrl('/');
      this.recetteForm.reset();
    });
  }

  /**
   * Change the class of the input if quantity is null (valid - invalid)
   * @param qte quantity of the item
   */
  isQteValid(qte){
    if(qte == 0 || qte == '' || qte == null){
      (<HTMLLIElement>event.target).classList.remove("valid");
      (<HTMLLIElement>event.target).className += " invalid";
    } else {
      (<HTMLLIElement>event.target).classList.remove("invalid");
      (<HTMLLIElement>event.target).className += " valid";
      
    }
  }

  /**
   * Check if all the quantities are set.
   * Useful to disable a form submit button.
   * @returns true if quantities are missing
   */
  checkQtes(){
    let bool = false;
    if(this.ingredientToShow.length == 0){
      bool = true;
    }
    for (let item of this.ingredientToShow) {
      if(item.qte == 0 || item.qte == '' || item.qte == null) {
        bool = true;
      }
    }
    return bool;
  }
}