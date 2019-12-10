import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-part',
  templateUrl: './search-part.page.html',
  styleUrls: ['./search-part.page.scss'],
})
export class SearchPartPage implements OnInit {

  public infos = [
    {
      id: '1',
      name: 'Burger Poulet Citron',
    },
    {
      id: '2',
      name: 'Tomate',
    },
    {
      id: '3',
      name: 'Salade',
    },
    {
      id: '4',
      name: 'Salade Asiatique épicée au poulet',
    },
    {
      id: '5',
      name: 'Sauce Tomate',
    },
    {
      id: '6',
      name: 'Sauce mayonnaise',
    },
    {
      id: '7',
      name: 'Croque Madame',
    },
    {
      id: '8',
      name: 'Burger',
    },
    {
      id: '9',
      name: 'Burger',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
