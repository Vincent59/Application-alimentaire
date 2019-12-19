import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsListPageRoutingModule } from './items-list-routing.module';

import { ItemsListPage } from './items-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemsListPageRoutingModule
  ],
  declarations: [ItemsListPage]
})
export class ItemsListPageModule {}
