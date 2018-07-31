import { Component } from '@angular/core';
import { IonicPage, NavController,Platform } from 'ionic-angular';
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
    private auth: AuthServiceProvider,
    private platform: Platform,
    ) {

 this. getAllCategories();

 platform.registerBackButtonAction(function (event) {
   platform.exitApp();
}, 100);


  }
  ionViewDidLoad() {

    
    

  }

  ionViewWillEnter() {
 

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


  



  

}
