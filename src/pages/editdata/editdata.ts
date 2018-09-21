import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the EditdataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdata',
  templateUrl: 'editdata.html',
})
export class EditdataPage {

  
editExpenseForm={category:"", billNo : "" , amount :"", date : "", expenseID:0}
createSuccess=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite
,
 private alertCtrl: AlertController

  	) {

      this.getCurrentData(navParams.get("expenseID"));


  }

  getCurrentData(expenseID) {
    this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM expense WHERE expenseID=?', [expenseID])
        .then(res => {
          if(res.rows.length > 0) {
            this.editExpenseForm.expenseID = res.rows.item(0).expenseID;
            this.editExpenseForm.date = res.rows.item(0).date;
            this.editExpenseForm.category = res.rows.item(0).category;
            this.editExpenseForm.billNo = res.rows.item(0).billNo;
            this.editExpenseForm.amount = res.rows.item(0).amount;
          }
        })
        .catch(e => {
          console.log(e);
         
        });
    }).catch(e => {
      console.log(e);
     
    });
  }

updateExpense()
{

	  this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET date=?,category=?,billNo=?,amount=?,isSynced=0,isUpdated=1 WHERE expenseID=?',[this.editExpenseForm.date,this.editExpenseForm.category,this.editExpenseForm.billNo,this.editExpenseForm.amount,this.editExpenseForm.expenseID])
        .then(res => {
          console.log(res);
     		this.showPopup("Success", "Expense updated successfully!");
     		this.navCtrl.parent.select(1); 

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdataPage');
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
