import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loading: any;

  constructor(private loadingController: LoadingController) { }

  async ionViewWillEnter() {
    this.loading = await this.loadingController.create({
      duration: 1000,
      message: ''
    });

    this.loading.present();

  }

  ngOnInit() {
    console.log("ok");
  }

}
