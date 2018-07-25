import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ValidatePinPage } from '../validate-pin/validate-pin';
import { RegisterPage } from '../register/register';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



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


   constructor(public navCtrl: NavController, public navParams: NavParams,
     private auth: AuthServiceProvider,
     private alertCtrl: AlertController,
     public loadingController: LoadingController
     ) {
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad LoginPage');
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
         loader.dismiss();
         this.navCtrl.push(ValidatePinPage);

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
