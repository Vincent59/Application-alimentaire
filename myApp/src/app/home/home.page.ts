import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loading: any;

  constructor(private loadingController: LoadingController, private db: DatabaseService) { }

  async ionViewWillEnter() {
    this.loading = await this.loadingController.create({
      duration: 1000,
      message: ''
    });

    this.loading.present();

  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecettes().subscribe(recettes => {
          console.log("ok");
        })
      }
    });
  }

}
