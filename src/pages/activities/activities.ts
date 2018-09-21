import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Events  } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EditdataPage } from '../editdata/editdata';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

expenses: any = [];
createSuccess =true;
totalAmount =0;
syncCalled =false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite
,
 private alertCtrl: AlertController,
 public auth: AuthServiceProvider

  	) {
  	

  }

 
  ionViewDidLoad() {
  this.getData();

  
}

ionViewWillEnter() {
  this.getData();

  this.syncCalled=false;
}

editData(expenseID) {
  this.navCtrl.push(EditdataPage, {
    expenseID:expenseID
  });

}

deleteConfirm(expenseID){

   let alert = this.alertCtrl.create({
        title: 'Confirm delete expense',
        message: 'Are you sure you want to permanently delete this expense?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Delete Cancelled');
                }
            },
            {
                text: 'Yes',
                handler: () => {
                   this.deleteExpense(expenseID);
                   this.navCtrl.parent.select(1); 
                }
            }
        ]
    });

    alert.present();
}


deleteExpense(expenseID) {

  this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET isDeleted=1,isSynced=0 where expenseID=?',[expenseID])
        .then(res => {
          console.log(res);
          this.auth.uploadExpense();
         this.showPopup("Success", "Expense deleted successfully!");
       

        })
        .catch(e => {
          console.log(e);
         this.showPopup("Error", "Expense not updated");

        });
    }).catch(e => {
      console.log(e);
      this.showPopup("Error", "Something went wrong");

     
    });

}



getData() {

	
  this.sqlite.create({
    name: 'tabs.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

db.executeSql('SELECT * FROM expense where isDeleted=0 ORDER BY expenseID DESC', [])
    .then(res => {
      this.expenses = [];
      for(var i=0; i<res.rows.length; i++) {

          if(res.rows.item(i).isSynced == 0 && this.syncCalled == false)
          {
           this.auth.uploadExpense();
          this.syncCalled=true;
          }
       
        this.expenses.push({expenseID:res.rows.item(i).expenseID,date:res.rows.item(i).date,category:res.rows.item(i).category,amount:res.rows.item(i).amount,subCategory:res.rows.item(i).subCategory})
      }
    })
    .catch(e => console.log(e));

  db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense', [])
    .then(res => {
      if(res.rows.length>0) {
        this.totalAmount = parseInt(res.rows.item(0).totalExpense);
      }
    }).catch(e => console.log(e));
  



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
  this.navCtrl.push(ActivitiesPage);
           }
         }
       }
       ]
     });
     alert.present();
   }

}







