import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { SecondPage } from '../modals/second/second.page';
import { DatabaseService, Ingredient, RecetteWithIngredients } from '../services/database.service';
import { RecipeObject } from '../create-receipe/create-receipe.page';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.page.html',
  styleUrls: ['./update-recipe.page.scss'],
})
export class UpdateRecipePage implements OnInit {

  public initRecette: RecetteWithIngredients = null;
  public ingredients: Ingredient[] = [];
  public ingredientToShow = [];
  public recette: RecipeObject = {nom: '', nbPers: null, source: '', page: ''};

  constructor(private modalController: ModalController, private db: DatabaseService, private toast: ToastController, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recetteId = params.get('id');
 
      this.db.getRecette(recetteId).then(data => {
        this.initRecette = data;
        this.recette['nom'] = this.initRecette.nom;
        this.recette['nbPers'] = this.initRecette.nbPers;
        this.recette['source'] = this.initRecette.source;
        this.recette['page'] = this.initRecette.page;
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

  updateRecette() {
    this.db.updateRecette(this.initRecette.id, this.recette['nom'], this.recette['nbPers'], this.recette['source'], this.recette['page'], this.ingredientToShow)
    .then(async _ => {
      let toast = await this.toast.create({
        message: 'Recette mise à jour',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl(`/recipes/${this.initRecette.id}`);
      this.recette = null;
      this.ingredientToShow = [];
    });
  }
}