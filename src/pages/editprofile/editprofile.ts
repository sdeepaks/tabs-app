import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

userProfile={firstName:"" ,lastName:"",emailId:"",password:"",confPassword:""};
  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');

    this.loadProfile();
  }


loadProfile()
{


  this.sqlite.create({
    name: 'tabs.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

db.executeSql('SELECT * FROM userInfo', [])
    .then(res => {
      
      this.userProfile.firstName=res.rows.item(0).firstName;
      this.userProfile.lastName=res.rows.item(0).lastName;
      this.userProfile.emailId=res.rows.item(0).email;
      this.userProfile.password=res.rows.item(0).password;
      this.userProfile.confPassword=res.rows.item(0).password;
    })
    .catch(e => console.log(e));


  }).catch(e => console.log(e));


}

saveProfile(){
	console.log("Save Profile Called");
}
}
