import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

userProfile={firstName:"" ,lastName:"",emailId:"",password:"",confPassword:""};
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,private sqlite: SQLite) {
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
if(this.userProfile.password == this.userProfile.confPassword)
{
this.auth.updateUserInfo(this.userProfile.emailId,this.userProfile.firstName,this.userProfile.lastName,this.userProfile.password).subscribe(data =>{

  if (data.status === "success")
          {
this.showPopup("Success", 'Profile updated successfully.');
          }
else {
  this.showPopup("Error", 'Something went wrong. Please try later.');

  console.log("Error in update User -->"+ JSON.stringify(data));
}
});
 
}
else{
  this.showPopup("Error", 'The password confirmation does not match.');
}

}

showPopup(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
        {
          text: 'OK',
          handler: data => {
            if (false) {
              
            }
          }
        }
        ]
      });
      alert.present();
    }

}
