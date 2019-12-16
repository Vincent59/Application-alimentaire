import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

export interface Recette {
  id: number,
  nom: string,
  nbPers: number,
  source: string,
  page: string,
  nbIngr: number
}

export interface Um {
  id: number,
  nom: string,
}

export interface Ingredient {
  id: number,
  nom: string,
  um_id: number,
  unite: string,
  nbRecettes: number
}

export interface Recette_ingredients {
  idRecette: number,
  idIngredient: number,
  nomIngredient: string,
  qteIngredient: number,
  unite: string
}

export interface RecetteWithIngredients {
  id: number,
  nom: string,
  nbPers: number,
  source: string,
  page: string,
  ingqtes: IngredientWithQte[]
}

export interface IngredientWithQte{
  id: number,
  nom: string,
  qte: number,
  unite: string
}

export interface IngredientWithRecettes {
  id: number,
  nom: string,
  um_id: number,
  unite: string,
  recettes: any[]
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  recettes = new BehaviorSubject([]);
  ingredients = new BehaviorSubject([]);
  recette_ingredients = new BehaviorSubject([]);
  ums = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient, private storage: Storage) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.loadDB();
              this.dbReady.next(true);
            } else {
              this.seedDatabase();
            }
          });
      });
    });
  }

  seedDatabase() {
    this.http.get('assets/database/test.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadDB();
          this.dbReady.next(true);
          this.storage.set('database_filled', true);
        })
        .catch(e => console.error(e));
    });
  }

  loadDB(){
    this.loadRecettes();
    this.loadIngredients();
    this.loadRecette_Ingredients();
    this.loadUms();
  }
  
  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getLastRowId(): Promise<any> {
    return this.database.executeSql('SELECT last_insert_rowid() as lastInsertId;', []).then(data => {
      return data.rows.item(0).lastInsertId;
    })
  }
 
  getRecettes(): Observable<Recette[]> {
    return this.recettes.asObservable();
  }

  loadRecettes() {
    return this.database.executeSql('select recette.id, recette.nom, recette.source, recette.page, recette.nb_pers, count(ingredients.nom) as nb_ingredients from recette LEFT JOIN recette_ingredients ON recette.id = recette_ingredients.id_recette LEFT JOIN ingredients ON recette_ingredients.id_ingredient = ingredients.id group by (recette.id);'
    , []).then(data => {
      let recettes: Recette[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            recettes.push({ 
            id: data.rows.item(i).id,
            nom: data.rows.item(i).nom,
            nbPers: data.rows.item(i).nb_pers,
            source: data.rows.item(i).source,
            page: data.rows.item(i).page,
            nbIngr: data.rows.item(i).nb_ingredients
           });
        }
      }
      this.recettes.next(recettes);
    });
  }

  addRecette(nom, nbPers, source, page, itemList) {
    let data = [nom, nbPers, source, page];
    let recetteId = null;
    return this.database.executeSql('INSERT INTO recette (nom, nb_pers, source, page) VALUES (?, ?, ?, ?)', data).then(data => {
      this.getLastRowId().then(last => {
        recetteId = last;
        if (itemList.length !== 0){
          for(let item of itemList){
            this.addRecette_Ingredients(recetteId, item.id, item.qte);
          }
        }
      }
      )
      this.loadDB();
    });
  }

  getRecette(id): Promise<RecetteWithIngredients> {
    return this.database.executeSql('select recette.id as id_recette, ingredients.id as id_ingredient, recette.nom as recette, recette.nb_pers, recette.source, recette.page, ingredients.nom as ingredient, qte_ingredient, um.nom as unite FROM recette LEFT JOIN recette_ingredients ON recette.id = recette_ingredients.id_recette LEFT JOIN ingredients ON recette_ingredients.id_ingredient = ingredients.id LEFT JOIN um ON um.id = ingredients.um_id WHERE recette.id= ? ;', [id]).then(data => {
      let ingqtes: IngredientWithQte[] = [];
      if (data.rows.length > 0  && data.rows.item(0).id_ingredient !== null) {
        for (var i = 0; i < data.rows.length; i++) {
            ingqtes.push({ 
              id: data.rows.item(i).id_ingredient,
              nom: data.rows.item(i).ingredient,
              qte: data.rows.item(i).qte_ingredient,
              unite: data.rows.item(i).unite
           });
        }
      }
      
      return {
        id: data.rows.item(0).id_recette,
        nom: data.rows.item(0).recette, 
        nbPers: data.rows.item(0).nb_pers, 
        source: data.rows.item(0).source,
        page: data.rows.item(0).page,
        ingqtes: ingqtes
      }
    });
  }
 
  deleteRecette(id) {
    return this.database.executeSql('DELETE FROM recette WHERE id = ?', [id]).then(_ => {
      this.loadDB();
    });
  }
 
  updateRecette(id, nom, nbPers, source, page, itemList) {
    let data = [nom, nbPers, source, page];
    return this.database.executeSql(`UPDATE recette SET nom = ?, nb_pers = ?, source = ?, page = ? WHERE id = ${id};`, data).then(data => {
      this.deleteRecette_IngredientsByRecette(id).then(_ => {
        for(let item of itemList) {
          this.addRecette_Ingredients(id, item.id, item.qte);
        }
      })
      this.loadDB();
    })
  }

  getUms(): Observable<Um[]> {
    return this.ums.asObservable();
  }

  loadUms() {
    let query = 'SELECT * from um';
    return this.database.executeSql(query, []).then(data => {
      let ums: Um[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            ums.push({ 
            id: data.rows.item(i).id,
            nom: data.rows.item(i).nom,
           });
        }
      }
      this.ums.next(ums);
    });
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients.asObservable();
  }

  loadIngredients() {
    let query = 'SELECT ingredients.id, ingredients.nom, ingredients.um_id, um.nom AS unite, count(recette.id) as nb_recettes FROM ingredients LEFT JOIN um ON um.id = ingredients.um_id LEFT JOIN recette_ingredients ON ingredients.id = recette_ingredients.id_ingredient LEFT JOIN recette ON recette_ingredients.id_recette = recette.id group by (ingredients.id);';
    return this.database.executeSql(query, []).then(data => {
      let ingredients: Ingredient[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            ingredients.push({ 
            id: data.rows.item(i).id,
            nom: data.rows.item(i).nom,
            um_id: data.rows.item(i).um_id,
            unite: data.rows.item(i).unite,
            nbRecettes: data.rows.item(i).nb_recettes
           });
        }
      }
      this.ingredients.next(ingredients);
    });
  }

  addIngredient(nom, um_id) {
    let data = [nom, um_id];
    return this.database.executeSql('INSERT INTO ingredients (nom, um_id) VALUES (?, ?)', data).then(data => {
      this.loadDB();
    });
  }

  getIngredient(id): Promise<IngredientWithRecettes> {
    return this.database.executeSql('SELECT ingredients.id, ingredients.nom, ingredients.um_id, um.nom AS unite, recette.id as id_recette, recette.nom as nom_recette FROM ingredients LEFT JOIN um ON um.id = ingredients.um_id LEFT join recette_ingredients ON ingredients.id = recette_ingredients.id_ingredient LEFT join recette ON recette_ingredients.id_recette = recette.id WHERE ingredients.id = ?', [id]).then(data => {
      let recettes: any[] = [];
      if (data.rows.length > 0 && data.rows.item(0).id_recette !== null) {
        for (var i = 0; i < data.rows.length; i++) {
            recettes.push({ 
              id: data.rows.item(i).id_recette,
              nom: data.rows.item(i).nom_recette,
           });
        }
      }
      
      return {
        id: data.rows.item(0).id,
        nom: data.rows.item(0).nom, 
        um_id: data.rows.item(0).um_id, 
        unite: data.rows.item(0).unite,
        recettes: recettes
      }
    });
  }

  deleteIngredient(id) {
    return this.database.executeSql('DELETE FROM ingredients WHERE id = ?', [id]).then(_ => {
      this.loadDB();
    });
  }

  updateIngredient(ingredient: Ingredient) {
    let data = [ingredient.nom, ingredient.um_id];
    return this.database.executeSql(`UPDATE ingredients SET nom = ?, um_id = ? WHERE id =  ${ingredient.id};`, data).then(data => {
      this.loadDB();
    })
  }

  getRecette_ingredients(): Observable<Recette_ingredients[]> {
    return this.recette_ingredients.asObservable();
  }

  loadRecette_Ingredients() {
    let query = 'select recette.id as id_recette, ingredients.id as id_ingredient, ingredients.nom as ingredient, qte_ingredient, um.nom as unite from recette join recette_ingredients ON recette.id = recette_ingredients.id_recette join ingredients ON recette_ingredients.id_ingredient = ingredients.id JOIN um ON um.id = ingredients.um_id;';
    return this.database.executeSql(query, []).then(data => {
      let recette_ingredients: Recette_ingredients[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            recette_ingredients.push({ 
            idRecette: data.rows.item(i).id_recette,
            idIngredient: data.rows.item(i).id_ingredient,
            nomIngredient: data.rows.item(i).ingredient,
            qteIngredient: data.rows.item(i).qte_ingredient,
            unite: data.rows.item(i).unite
           });
        }
      }
      this.recette_ingredients.next(recette_ingredients);
    });
  }

  addRecette_Ingredients(recette, ingredient, qte) {
    let data = [recette, ingredient, qte];
    return this.database.executeSql('INSERT INTO recette_ingredients (id_recette, id_ingredient, qte_ingredient) VALUES (?, ?, ?)', data).then(data => {
      this.loadDB();
    });
  }

  deleteRecette_IngredientsByRecette(recetteId){
    return this.database.executeSql(`DELETE FROM recette_ingredients WHERE id_recette = ?;`, [recetteId]).then(_ => {
      this.loadDB();
    });
  }

}
