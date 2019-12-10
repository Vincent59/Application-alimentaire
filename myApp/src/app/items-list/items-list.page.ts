import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  public infos = [
    {
      id: '1',
      name: 'Burger Poulet Citron',
      unite: 'g'
    },
    {
      id: '2',
      name: 'Tomate',
      unite: 'g'
    },
    {
      id: '3',
      name: 'Salade',
      unite: 'g'
    },
    {
      id: '4',
      name: 'Salade Asiatique épicée au poulet',
      unite: 'g'
    },
    {
      id: '5',
      name: 'Sauce Tomate',
      unite: 'g'
    },
    {
      id: '6',
      name: 'Sauce mayonnaise',
      unite: 'g'
    },
    {
      id: '7',
      name: 'Croque Madame',
      unite: 'g'
    },
    {
      id: '8',
      name: 'Burger',
      unite: 'g'
    },
    {
      id: '9',
      name: 'Burger',
      unite: 'g'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
