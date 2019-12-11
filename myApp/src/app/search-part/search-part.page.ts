import { Component, OnInit } from '@angular/core';
import { DatabaseService, Recette } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-part',
  templateUrl: './search-part.page.html',
  styleUrls: ['./search-part.page.scss'],
})

export class SearchPartPage implements OnInit {
  
  public recettes: Recette[] = [];
  public recettesToShow: Recette[] = [];
  

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecettes().subscribe(recettes => {
          this.recettes = recettes;
          this.initializeRecettes();
        });
      }
    });
  }

  initializeRecettes(){ 
    this.recettesToShow = this.recettes;
  }

    getRecettes(ev: any) {
      // Reset items back to all of the items
      this.initializeRecettes();

      // Set val to the value of the searchbar
      const val = ev.target.value;

      // If the value is an empty string, don't filter the items
      if (val && val.trim() != '') {
        this.recettesToShow = this.recettesToShow.filter((recette) => {
          return (recette.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

  goToRecipePage(id) {
    this.router.navigateByUrl(`/recipes/${id}`);
  }


}
