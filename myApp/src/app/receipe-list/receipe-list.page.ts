import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.page.html',
  styleUrls: ['./receipe-list.page.scss'],
})
export class ReceipeListPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
