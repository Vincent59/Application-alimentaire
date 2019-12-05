import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Recette {
  id: number,
  nom: string,
  nbPers: number,
  source: string,
  page: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  recettes = new BehaviorSubject([]);
  // ingredients = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'recettes.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
          /* db.executeSql('CREATE TABLE IF NOT EXISTS `recette` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nom` varchar(255) NOT NULL, `nb_pers` REAL NOT NULL, `source` varchar(255) NOT NULL, `page` varchar(255) DEFAULT NULL ); INSERT or IGNORE INTO `recette` VALUES (1, Riz épicé au poulet,2,Cuisine des étudiants,80),(2,`Pizza pattates chorizo`,4,`Cuisine des étudiants`,`82`),(3,Sauté de poulet au sésame,2,Cuisine des étudiants,90);')
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e)); */
        })
        .catch(e => console.log(e));;
    })
  }

  seedDatabase() {
    this.http.get('assets/database/test.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadRecettes();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getRecettes(): Observable<Recette[]> {
    return this.recettes.asObservable();
  }


  loadRecettes() {
    return this.database.executeSql('SELECT * FROM recette', []).then(data => {
      let recettes: Recette[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
 
          recettes.push({ 
            id: data.rows.item(i).id,
            nom: data.rows.item(i).nom, 
            nbPers: data.rows.item(i).nb_pers, 
            source: data.rows.item(i).source,
            page: data.rows.item(i).page
           });
        }
      }
      this.recettes.next(recettes);
    });
  }
 
  addRecette(nom, nbPers, source, page) {
    let data = [nom, nbPers, source, page];
    return this.database.executeSql('INSERT INTO recette (nom, nb_pers, source, page) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadRecettes();
    });
  }
 
  getRecette(id): Promise<Recette> {
    return this.database.executeSql('SELECT * FROM recette WHERE id = ?', [id]).then(data => {
      
      return {
        id: data.rows.item(0).id,
        nom: data.rows.item(0).nom, 
        nbPers: data.rows.item(0).nb_pers, 
        source: data.rows.item(0).source,
        page: data.rows.item(0).page
      }
    });
  }
 
  deleteRecette(id) {
    return this.database.executeSql('DELETE FROM recette WHERE id = ?', [id]).then(_ => {
      this.loadRecettes();
    });
  }
 
  updateRecette(recette: Recette) {
    let data = [recette.nom, recette.nbPers, recette.source, recette.page];
    return this.database.executeSql(`UPDATE recette SET nom = ?, nbPers = ?, source = ?, page = ? WHERE id = ${recette.id}`, data).then(data => {
      this.loadRecettes();
    })
  }
}
