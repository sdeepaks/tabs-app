import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ActivitiesPage } from '../activities/activities';

@IonicPage()
@Component({
	selector: 'page-add-expenses',
	templateUrl: 'add-expenses.html',
})
export class AddExpensesPage {

	expenseForm={category:"", billNo : "" , amount :"", date : "",subCategory :""}
	createSuccess=true;
	categories: any= [];
	subCategories: any= [];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private sqlite: SQLite,
		private alertCtrl: AlertController
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



	addExpense()
	{

			this.sqlite.create({
			name: 'tabs.db',
			location: 'default'
		}).then((db: SQLiteObject) => {

			
				db.executeSql('INSERT INTO expense VALUES(null,?,?,?,?,0,0,0,?)',[this.expenseForm.billNo,this.expenseForm.date,this.expenseForm.category ,this.expenseForm.amount,this.expenseForm.subCategory])

				.then(res => {

					console.log("TABS Called -->" + res);



					this.showPopup("Success", "Data saved");
					this.expenseForm={category:"", billNo : "" , amount :"", date : "",subCategory :""}

					this.navCtrl.parent.select(1); 


				})
				.catch(e => {
					console.log(e);
					this.showPopup("Error", "Something Went Wrong");

				});

		}).catch(e => {
			console.log("error in INSERT" +JSON.stringify(e));
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
