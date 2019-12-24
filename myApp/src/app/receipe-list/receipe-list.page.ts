import { Component, OnInit } from '@angular/core'; 
import { DatabaseService, Recette, Ingredient, Recette_ingredients } from '../services/database.service'; 
import { Router } from '@angular/router'; 
import { Platform } from '@ionic/angular'; 
import { File } from '@ionic-native/file/ngx'; 
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  pdfObj = null;
  
  constructor( 
    private db: DatabaseService, 
    private router: Router,
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
        this.db.getRecette((<HTMLButtonElement>event.target).getAttribute('data-info')).then(recette => {
          for(let i=0; i<recette.ingqtes.length; i++) {
            this.listCourse.push({
              "id": recette.ingqtes[i].id,
              "id_recette": recette.id,
              "Ingrédient": `${recette.ingqtes[i].nom} : ${recette.ingqtes[i].qte} ${recette.ingqtes[i].unite}${recette.ingqtes[i].qte > 1 && recette.ingqtes[i].unite !== 'CàC' && recette.ingqtes[i].unite !== 'CàS' ? 's' : ''}`,
              "Recette": `${recette.nom} (${recette.source}, ${recette.nbPers} personne${recette.nbPers > 1 ? 's' : ''})`
            });
          }         
        });
      } else {
          let recetteId = +(<HTMLButtonElement>event.target).getAttribute('data-info');
          for(let i = this.listCourse.length - 1; i >= 0; i--) {
            if(this.listCourse[i].id_recette === recetteId) {
              this.listCourse.splice(i, 1);
            }
          }
          if(this.listCourse.length === 0) {
            if(document.getElementById("exportReady")){
              document.getElementById("exportReady").setAttribute("id", "exportBtn");
            }
          }
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
          { text: 'LISTE DE COURSES', style: 'header' },
          { text: '', style: 'story', margin: [0, 20, 0, 20] },
          table(this.listCourse.sort((a, b) => a.Ingrédient.localeCompare(b.Ingrédient)), ['Ingrédient', 'Recette']),
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
      if (this.platform.is('android')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
   
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'Liste-EasyCook.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'Liste-EasyCook.pdf', 'application/pdf');
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