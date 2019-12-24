import { Component, OnInit, ElementRef } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { DatabaseService, Recette, Ingredient, Recette_ingredients } from '../services/database.service'; 
import { HomePage } from '../home/home.page'; 
import { Router } from '@angular/router'; 
import { ToastController, Platform, AlertController } from '@ionic/angular'; 

import { HttpClient } from '@angular/common/http'; 

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx'; 
import { File } from '@ionic-native/file/ngx'; 
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var cordova:any;

@Component({ 
  selector: 'app-receipe-list', 
  templateUrl: './receipe-list.page.html', 
  styleUrls: ['./receipe-list.page.scss'] 
}) 


export class ReceipeListPage implements OnInit { 

  recettes: Recette[] = []; 
  ingredients: Ingredient[] = []; 
  recette_ingredients: Recette_ingredients[] = [];
  public downloadFile;
  public listCourse = []
  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  pdfObj = null;
  
  constructor( 
    private db: DatabaseService, 
    private router: Router, 
    private toast: ToastController, 
    private http: HttpClient, 
    private transfer: FileTransfer, 
    private file: File,
    public platform: Platform,
    private fileOpener: FileOpener 
    ) { 

    } 

    onReceipeClick($event) {
      if ((<HTMLButtonElement>$event.target).innerHTML === "Sélectionner") {
        (<HTMLButtonElement>$event.target).innerHTML = "Retirer";
        if(document.getElementById("exportBtn")){
          document.getElementById("exportBtn").setAttribute("id", "exportReady");
        }

        this.db.getRecette((<HTMLButtonElement>event.target).getAttribute('data-info')).then(data => {
          let ingredientInfo = [];
  
          for(let i=0; i<data.ingqtes.length; i++)
          {
            ingredientInfo.push( data.ingqtes[i].qte + ' ' + data.ingqtes[i].unite + ' de ' + data.ingqtes[i].nom + '\n '+ '\n ');
          }
          
          this.listCourse.push({
            "id": data.id,
            "Nom": data.nom,
            "Nombre de personne": data.nbPers,
            "Source": data.source,
            "Ingrédients": ingredientInfo});
        });

      } else {
        console.log("else");
        this.db.getRecette((<HTMLButtonElement>event.target).getAttribute('data-info')).then(data => {
          for(let i=0; i < this.listCourse.length; i++) {
            console.log(this.listCourse[i]);
            if(this.listCourse[i].id === data.id) {
              console.log("delete");
              delete this.listCourse[i];
            }
          }

          console.log(this.listCourse);

          if(this.listCourse.length === 0) {
            console.log("list course length 0");
            if(document.getElementById("exportReady")){
              document.getElementById("exportReady").setAttribute("id", "exportBtn");
            }
          }
        });

        (<HTMLButtonElement>$event.target).innerHTML = "Sélectionner";        
      }
    }

    createPdf() {

      function buildTableBody(data, columns) {
          var body = [];
      
          body.push(columns);
      
          data.forEach(function(row) {
              var dataRow = [];
      
              columns.forEach(function(column) {
                  dataRow.push(row[column].toString());
              })
      
              body.push(dataRow);
          });

          body.toString().replace(',',' ')
      
          return body;
      }
    
      function table(data, columns) {
          return {
              table: {
                  headerRows: 1,
                  body: buildTableBody(data, columns)
              }
          };
      }


      var docDefinition = {
        content: [
          { text: 'LISTE DE COURSE', style: 'header' },
   
          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
   
          table(this.listCourse, ['Nom', 'Nombre de personne', 'Source', 'Ingrédients']),
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }  

    downloadPdf() {
      document.getElementById("exportReady").setAttribute("id", "exportBtn");
      if (this.platform.is('android')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
   
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'EasyCookListe.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'EasyCookListe.pdf', 'application/pdf');
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
    }


  ngOnInit() { 

    this.db.getDatabaseState().subscribe(rdy => { 
      if (rdy) {
        this.db.getRecettes().subscribe(recettes => { 
          this.recettes = recettes; 
        }); 
        this.db.getIngredients().subscribe(ingredients => { 
          this.ingredients = ingredients; 
        }); 
        this.db.getRecette_ingredients().subscribe(recette_ingredients => { 
          this.recette_ingredients = recette_ingredients;
        }) 
      }
    }); 
  } 

  /**  
   * Go to the recipe page based on its database ID 
   * @param id id of the recipe in database 
   */ 
  goToRecipePage(id) { 
    this.router.navigateByUrl(`/recipes/${id}`); 
  } 

} 