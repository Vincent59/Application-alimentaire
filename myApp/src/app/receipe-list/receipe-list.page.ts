import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Recette } from '../services/database.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.page.html',
  styleUrls: ['./receipe-list.page.scss'],
})
export class ReceipeListPage implements OnInit {

  recettes: Recette[] = [];

  receipe = [
    {
      name: 'Burger Poulet Citron',
      personne: 2,
      ingredients: 5,
      image: 'assets/recette_1.jpg'
    },
    {
      name: 'Salade Asiatique épicée au poulet',
      personne: 3,
      ingredients: 6,
      image: 'assets/recette_2.jpg'
    },
    {
      name: 'Croque madame',
      personne: 2,
      ingredients: 5,
      image: 'assets/recette_3.jpg'
    },
  ]

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecettes().subscribe(recettes => {
          this.recettes = recettes;
        })
      }
    });
  }

}
