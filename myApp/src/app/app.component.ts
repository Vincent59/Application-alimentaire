import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';

import { ExcelServicesService } from './services/excel-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  rootPage: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private excelService:ExcelServicesService,private http: HttpClient,
  ) {
    this.initializeApp();
    this.getJSON().subscribe(data => {
      data.forEach(row => {
        this.excel.push(row);
      });
     });
  }

  title = 'excel-upload-download';
  ngOnInit(){
  }
    excel=[];    
    exportAsXLSX():void {
       this.excelService.exportAsExcelFile(this.excel, 'sample');
    }
    public getJSON(): Observable<any> {
      return this.http.get('https://api.myjson.com/bins/zg8of');
    }

  showSplash = true; // <-- show animation

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('android')) {
        this.statusBar.styleBlackOpaque();
      } else this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }

  
}
