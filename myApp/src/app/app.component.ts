import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  public items = [
    {
      name: 'Burger',
      path: ''
    },
    {
      name: 'Tomate',
      path: ''
    },
    {
      name: 'Salade',
      path: ''
    },
    {
      name: 'Riz',
      path: ''
    },
    {
      name: 'Sauce Tomate',
      path: ''
    },
    {
      name: 'Sauce mayonnaise',
      path: ''
    },
    {
      name: 'Pomme de terre',
      path: ''
    },
    {
      name: 'Burger',
      path: ''
    },
    {
      name: 'Burger',
      path: ''
    },
  ]
}
