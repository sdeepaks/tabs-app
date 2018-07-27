import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  addExpensesRoot = 'AddExpensesPage'
  activitiesRoot = 'ActivitiesPage'
  reportsRoot = 'ReportsPage'


  constructor(public navCtrl: NavController, private sqlite: SQLite) {



  }
 ionViewDidLoad() {
  
 this.createDB();
}

ionViewWillEnter() {
	
  this.createDB();


}
createDB()
{
	 this.sqlite.create({
    name: 'tabs.db',
    location: 'default'
  }).then((db: SQLiteObject) => {


   db.executeSql('CREATE TABLE IF NOT EXISTS expense(expenseID INTEGER PRIMARY KEY AUTOINCREMENT ,billNo, date TEXT, category TEXT, amount INT)',[])
    .then(res => console.log('TABS:info:getData() Executed SQL'))
    .catch(e => console.log("TABS:Error:getData()" + e));  

      }).catch(e => console.log(e));
}

}
