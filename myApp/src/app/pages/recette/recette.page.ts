import { DatabaseService, Recette } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {
  recette: Recette = null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recetteId = params.get('id');
 
      this.db.getRecette(recetteId).then(data => {
        this.recette = data;
      });
    });
  }

  delete() {
    this.db.deleteRecette(this.recette.id).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  updateRecette() {
    this.db.updateRecette(this.recette).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Recette modifiée',
        duration: 3000
      });
      toast.present();
    });
  }

}
