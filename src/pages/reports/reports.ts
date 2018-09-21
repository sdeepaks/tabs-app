import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

	reportData =[]
	createSuccess=true;


  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private sqlite: SQLite,

  	) {
  }

  ionViewDidLoad() {
    console.log('report page loaded');
    
  }
  ionViewWillEnter()
  {
this.createReport();
  }


  createReport() {

	
  this.sqlite.create({
    name: 'tabs.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

db.executeSql('SELECT category,SUM(amount) as totalAmount FROM expense where isDeleted !=1 GROUP BY category  ', [])
    .then(res => {
      this.reportData = [];
      for(var i=0; i<res.rows.length; i++) {
      	console.log("CATEGORY-->" + res.rows.item(i).category + "Amount-->" + res.rows.item(i).totalAmount);
        this.reportData.push({category:res.rows.item(i).category,totalAmout:res.rows.item(i).totalAmount })
      }
    })
    .catch(e => console.log('Error in generating the report'));

  }).catch(e => console.log(e));
}


}
