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


   editExpenseForm={category:"", billNo : "" , amount :"", date : "", expenseID:0,subCategory :""}
   createSuccess=true;
   categories: any= [];
   subCategories: any= [];
   expenseID=0;
   constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite
     ,
     private alertCtrl: AlertController

     ) {

this.expenseID=navParams.get("expenseID");
     this.getCurrentData(this.expenseID);


   }

   ionViewWillEnter() {
     this.getCategories();


   }
   getCategories() {


     this.sqlite.create({
       name: 'tabs.db',
       location: 'default'
     }).then((db: SQLiteObject) => {

       db.executeSql('SELECT * FROM categories', [])
       .then(res => {
         this.categories = [];
         for(var i=0; i<res.rows.length; i++) {
           console.log("CATEGORY" + res.rows.item(i).category);
           this.categories.push({category:res.rows.item(i).category})
         }
       })
       .catch(e => console.log(e));

     }).catch(e => console.log(e));
   }


   getSubCategories(category) {

     console.log("getSubCategories called:" + category);

     this.sqlite.create({
       name: 'tabs.db',
       location: 'default'
     }).then((db: SQLiteObject) => {

       db.executeSql('SELECT subCategory FROM subCategories where category=?', [category])
       .then(res => {
         this.subCategories = [];
         for(var i=0; i<res.rows.length; i++) {
           console.log("Sub-CATEGORY-->" + res.rows.item(i).subCategory);
           this.subCategories.push({subCategory:res.rows.item(i).subCategory})
         }
       })
       .catch(e => console.log('Error in fetching sub-categories'));

     }).catch(e => console.log(e));
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
           this.editExpenseForm.subCategory=res.rows.item(0).subCategory;
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
       db.executeSql('UPDATE expense SET date=?,category=?,billNo=?,amount=?,isSynced=0,isUpdated=1,subCategory=? WHERE expenseID=?',[this.editExpenseForm.date,this.editExpenseForm.category,this.editExpenseForm.billNo,this.editExpenseForm.amount,this.editExpenseForm.subCategory,this.expenseID])
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
