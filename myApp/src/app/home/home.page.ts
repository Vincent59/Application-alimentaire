import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private db: DatabaseService, private platform: Platform, public alertCtrl: AlertController) { }
  public alertShown: boolean = false;
  backButtonSubscription;

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecettes();
      }
    });
  }

  ionViewDidEnter(){
    this.backButtonSubscription = this.platform.backButton.subscribe(()=>{
        if(!this.alertShown){
          this.presentConfirm();
        }
    });
  }

  ionViewWillLeave(){
    this.backButtonSubscription.unsubscribe();
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Quitter',
      message: 'Voulez-vous quitter EasyCook ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.alertShown=false;
          }
        },
        {
          text: 'Quitter',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
      await alert.present().then(()=>{
      this.alertShown=true;
    });
  }

}
