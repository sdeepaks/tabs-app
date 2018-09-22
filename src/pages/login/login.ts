import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ValidatePinPage } from '../validate-pin/validate-pin';
import { RegisterPage } from '../register/register';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CreatePinPage } from '../create-pin/create-pin';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-login',
   templateUrl: 'login.html',
 })
 export class LoginPage {

   loginForm = { email: '', password: ''};
   createSuccess=true;
   storedPIN=0;


   constructor(public navCtrl: NavController, public navParams: NavParams,
     private auth: AuthServiceProvider,
     private alertCtrl: AlertController,
     private sqlite: SQLite,
     public loadingController: LoadingController
     ) {

   }

   ionViewDidLoad() {

      this.auth.createDB();
    let loader = this.loadingController.create({
         content: "Loading..."
       });  
       loader.present();


this.sqlite.create({
    name: 'tabs.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

db.executeSql('SELECT * FROM userInfo', [])
    .then(res => {

if(res.rows.length !=0)
{
 this.storedPIN=res.rows.item(0).pin;    
    console.log("userINFO:" +this.storedPIN);

     loader.dismiss();
  this.navCtrl.push(ValidatePinPage,{email: this.loginForm.email,storedPIN: this.storedPIN});

  }else{
     loader.dismiss();
  }

   })
  });
 loader.dismiss();
}


   authenticate()
   {
     console.log(this.loginForm);    
     console.log("Login EMAIL-->" + this.loginForm.email);


     this.auth.doLogin(this.loginForm).subscribe(data => {


       let loader = this.loadingController.create({
         content: "Authenticating..."
       });  
       loader.present();


       if (data.status === "success")
       {
         console.log("Authenticated Successfully");
         loader.dismiss();

      this.auth.insertPreLoadedExpense(this.loginForm.email);

         this.navCtrl.push(CreatePinPage,{emailId: this.loginForm.email});



        }else if(data.status === "error"){
         loader.dismiss();
         this.showPopup("Error", data.message);

       }
       else{
         loader.dismiss();
         this.showPopup("Error", "No internet detected!"); 

       }

     });

   }




   nav_register()
   {
     this.navCtrl.push(RegisterPage); 
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
