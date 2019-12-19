import { Component, OnInit } from '@angular/core';
import { RecetteWithIngredients, DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  recette: RecetteWithIngredients = null;

  constructor(private route : ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController, public alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recetteId = params.get('id');

      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getRecette(recetteId).then(data => {
            this.recette = data;
          })
        }
      });

    });
  }

  /**
   * Opens a confirm alert to delete or not this recipe :
   ** Annuler - do nothing
   ** Ok - delete the recipe
   */
  async presentAlertConfirmDelete() {
    const alert = await this.alertController.create({
      header: `Confirmer`,
      message: `Êtes-vous sûr de vouloir supprimer la recette "<strong>${this.recette.nom}</strong>" ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.deleteRecette();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Delete the recipe
   */
  deleteRecette() {
    this.db.deleteRecette(this.recette.id).then(async () => {
      let toast = await this.toast.create({
        message: 'Recette supprimée',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/receipe-list');
    });
  }

  /**
   * Go to the update page of this recipe
   */
  goToUpdate() {
    this.router.navigateByUrl(`/update-recipe/${this.recette.id}`);
  }

}
