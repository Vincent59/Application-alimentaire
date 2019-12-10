import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateReceipePageRoutingModule } from './create-receipe-routing.module';

import { CreateReceipePage } from './create-receipe.page';
import { SecondPage } from '../modals/second/second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReceipePageRoutingModule
  ],
  declarations: [CreateReceipePage, SecondPage],
  entryComponents: [SecondPage]
})
export class CreateReceipePageModule {}
