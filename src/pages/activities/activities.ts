import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EditdataPage } from '../editdata/editdata';
/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

expenses: any = [];
createSuccess =true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite
,
 private alertCtrl: AlertController

  	) {
  	
  }

 
  ionViewDidLoad() {
  this.getData();
  
}

ionViewWillEnter() {
  this.getData();


}

editData(expenseID) {
  this.navCtrl.push(EditdataPage, {
    expenseID:expenseID
  });

}


deleteData(rowid) {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
    .then(res => {
      console.log(res);
      this.getData();
    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));

}



getData() {

	
  this.sqlite.create({
    name: 'tabs.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

db.executeSql('SELECT * FROM expense ORDER BY expenseID DESC', [])
    .then(res => {
      this.expenses = [];
      for(var i=0; i<res.rows.length; i++) {
        this.expenses.push({expenseID:res.rows.item(i).expenseID,date:res.rows.item(i).date,category:res.rows.item(i).category,amount:res.rows.item(i).amount})
      }
    })
    .catch(e => console.log(e));

  }).catch(e => console.log(e));
}




showPopup(title, text) {
     let alert = this.alertCtrl.create({
       title: title,
       subTitle: text,
       buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {

           }
         }
       }
       ]
     });
     alert.present();
   }

}







