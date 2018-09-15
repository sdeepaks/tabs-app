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
    this.getAllSubCategories();

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



  getAllSubCategories()

  {

    this.auth.getAllSubCategories().subscribe(data => {


      this.sqlite.create({
        name: 'tabs.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

const myObj = data;

const myObjStr = JSON.stringify(myObj);


        console.log("All Sub Categories -->" + myObjStr); 

        for (let tempData of myObj) {
          console.log("TempData -->"+tempData.category);   
          for (let sub_cat of tempData.subcategory)
          {
             console.log(sub_cat);

             db.executeSql('INSERT INTO subCategories VALUES(?,?)',[sub_cat,tempData.category])
          .then(res => {
            console.log("subCategories inserted " + sub_cat);
          })
          .catch(e => {
            console.log(e);
          });
           
          }

        }
      



        }).catch(e => {
          console.log("error in INSERT category"+JSON.stringify(e));
        });

      });

  }


  



  

}
