import { Component, OnInit } from '@angular/core';
import { RecetteWithIngredients, DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  recette: RecetteWithIngredients = null;

  constructor(private route : ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recetteId = params.get('id');
 
      this.db.getRecette(recetteId).then(data => {
        this.recette = data;
      });
    });
  }

  deleteRecette(recetteId) {
    this.db.deleteRecette(recetteId).then(async () => {
      let toast = await this.toast.create({
        message: 'Recette supprimée',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/receipe-list');
    });
  }

}
