import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ActivitiesPage } from '../activities/activities';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
	selector: 'page-add-expenses',
	templateUrl: 'add-expenses.html',
})
export class AddExpensesPage {

	expenseForm={category:"", billNo : "" , amount :"", date : ""}
	createSuccess=true;
	categories: any= [];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private sqlite: SQLite,
		private alertCtrl: AlertController,
		private auth: AuthServiceProvider
		) {



	}

	ionViewDidLoad() {

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



	addExpense()
	{

		this.sqlite.create({
			name: 'tabs.db',
			location: 'default'
		}).then((db: SQLiteObject) => {
			db.executeSql('INSERT INTO expense VALUES(null,?,?,?,?,0,0)',[this.expenseForm.billNo,this.expenseForm.date,this.expenseForm.category ,this.expenseForm.amount])

			.then(res => {
				console.log("TABS Called" + res);
				this.showPopup("Success", "Data saved");
				this.navCtrl.parent.select(1); 

			})
			.catch(e => {
				console.log(e);
				this.showPopup("Error", "Something Went Wrong");
				
			});

		}).catch(e => {
			console.log("error in INSERT"+JSON.stringify(e));
			this.showPopup("Error", "System Error");

		});
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
