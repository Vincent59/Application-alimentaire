import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Recette } from 'src/app/services/database.service';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.page.html',
  styleUrls: ['./recettes.page.scss'],
})
export class RecettesPage implements OnInit {

  recettes: Recette[] = [];
 
  recette = {};
 
  selectedView = 'recettes';

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecettes().subscribe(recettes => {
          this.recettes = recettes;
        })
      }
    });
  }

  addRecette() {
    this.db.addRecette(this.recette['nom'], this.recette['nbPers'], this.recette['source'], this.recette['page'])
    .then(_ => {
      this.recette = {};
    });
  }

}
