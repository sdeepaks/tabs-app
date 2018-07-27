import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  addExpensesRoot = 'AddExpensesPage'
  activitiesRoot = 'ActivitiesPage'
  reportsRoot = 'ReportsPage'


  constructor(public navCtrl: NavController, private sqlite: SQLite,
    private auth: AuthServiceProvider
    ) {

 this. getAllCategories();

  }
  ionViewDidLoad() {

    this.createDB();
   

  }

  ionViewWillEnter() {

    this.createDB();
    

  }

  getAllCategories()

  {

    this.auth.getAllCategories().subscribe(data => {


      this.sqlite.create({
        name: 'tabs.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

 for (var i = 0; i < data.length; ++i) {
          db.executeSql('INSERT INTO categories VALUES(?,?)',[data[i].cat_id ,data[i].cat_name])
          .then(res => {
            console.log("categories inserted" + res);
          })
          .catch(e => {
            console.log(e);
          });
}
  




   }).catch(e => {
        console.log("error in INSERT category"+JSON.stringify(e));
      });

 });

  }


  createDB()
  {
    this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


      db.executeSql('CREATE TABLE IF NOT EXISTS expense(expenseID INTEGER PRIMARY KEY AUTOINCREMENT ,billNo TEXT, date TEXT, category TEXT, amount INT,isSynced INT, isDeleted INT)',[])
      .then(res => console.log('TABS:info:expense table created'))
      .catch(e => console.log("TABS:Error:while creating expense table" + e));  

      

      db.executeSql('CREATE TABLE IF NOT EXISTS categories(categoryID INTEGER PRIMARY KEY AUTOINCREMENT ,category TEXT)',[])
      .then(res => console.log('TABS:info:categories table created'))
      .catch(e => console.log("TABS:Error:in creating categories table" + e));  

      

    }


    ).catch(e => console.log(e));
  }

}
