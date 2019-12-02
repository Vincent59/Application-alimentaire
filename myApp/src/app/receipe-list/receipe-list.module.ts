import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceipeListPageRoutingModule } from './receipe-list-routing.module';

import { ReceipeListPage } from './receipe-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceipeListPageRoutingModule
  ],
  declarations: [ReceipeListPage]
})
export class ReceipeListPageModule {}
