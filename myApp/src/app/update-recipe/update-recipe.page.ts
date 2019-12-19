import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { SecondPage } from '../modals/second/second.page';
import { DatabaseService, Ingredient, RecetteWithIngredients } from '../services/database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface RecipeObject {
  nom: string,
  nbPers: number,
  source: string,
  page: string
}

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.page.html',
  styleUrls: ['./update-recipe.page.scss'],
})
export class UpdateRecipePage implements OnInit {

  public recetteForm : FormGroup;

  public initRecette: RecetteWithIngredients = null;
  public ingredients: Ingredient[] = [];
  public ingredientToShow = [];

  constructor(private modalController: ModalController, private db: DatabaseService, private toast: ToastController, private router: Router, private route : ActivatedRoute, private formBuilder: FormBuilder) {
    this.recetteForm = this.formBuilder.group({
      nom: ['', Validators.required],
      nbPers: ['', Validators.required],
      source: ['', Validators.required],
      page: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recetteId = params.get('id');
 
      this.db.getRecette(recetteId).then(data => {
        this.initRecette = data;
        this.recetteForm.controls['nom'].setValue(this.initRecette.nom);
        this.recetteForm.controls['nbPers'].setValue(this.initRecette.nbPers);
        this.recetteForm.controls['source'].setValue(this.initRecette.source);
        this.recetteForm.controls['page'].setValue(this.initRecette.page);
        for(let ing of this.initRecette.ingqtes){
          this.ingredientToShow.push({
            "id": ing.id,
            "name": ing.nom,
            "unite": ing.unite,
            "qte": ing.qte
          })
        }
      });
    });

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getIngredients().subscribe(ingredients => {
          this.ingredients = ingredients;
        })
      }
    });
  }

  /**
   * Opens a modal to modify items of the recipe
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
      if (dataReturned.data.length > 0) {
        this.ingredientToShow = [];

        dataReturned.data.forEach(element => 

        this.ingredientToShow.push(element)

        );
      }
    });

    return await modal.present().then(_ => {
    })
  }

  isQteValid(qte){
    if(qte == 0 || qte == '' || qte == null){
      (<HTMLLIElement>event.target).classList.remove("valid");
      (<HTMLLIElement>event.target).className += " invalid";
    } else {
      (<HTMLLIElement>event.target).classList.remove("invalid");
      (<HTMLLIElement>event.target).className += " valid";
      
    }
  }

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

  /**
   * Update this recipe, using ingredientToShow as itemList
   */
  updateRecette() {
    this.db.updateRecette(this.initRecette.id, this.recetteForm.value.nom, this.recetteForm.value.nbPers, this.recetteForm.value.source, this.recetteForm.value.page, this.ingredientToShow)
    .then(async _ => {
      let toast = await this.toast.create({
        message: 'Recette mise à jour',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl(`/recipes/${this.initRecette.id}`);
      this.recetteForm.reset();
      this.ingredientToShow = [];
    });
  }
}