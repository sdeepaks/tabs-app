import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { MainPage } from '../main/main';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


 @IonicPage()
 @Component({
   selector: 'page-create-pin',
   templateUrl: 'create-pin.html',
 })
 export class CreatePinPage {
   createSuccess=true;
   emailId :string;
   firstName :string;
   lastName :string;
   password :string;
   userInfo: any= [];

   createPINForm = { PIN: '', confPIN: ''};
   
   
   constructor(public navCtrl: NavController, public navParams: NavParams,

     private auth: AuthServiceProvider,
     private alertCtrl: AlertController
     
     ) {
     this.emailId = navParams.get('emailId');
     this.firstName =navParams.get('firstName');
     this.lastName=navParams.get('lastName');
     this.password=navParams.get('lastName');
   }

   ionViewDidLoad() {
     console.log('CreatePinPage Loaded');
   }

   createPIN()
   {
     console.log(this.createPINForm);

    console.log("emailId from lastPage -->" + this.emailId);
     console.log("PIN-->" + this.createPINForm.PIN);

     if (this.createPINForm.PIN != this.createPINForm.confPIN) {

       this.showPopup("Error", 'The PIN confirmation does not match.');

     } else 
     {

       this.auth.generatePIN(this.createPINForm, this.emailId).subscribe(data => {

         console.log("data.status in generatePIN:"+data.status);

         if (data.status === "success")
         {
           this.showPopup("Successfully", 'PIN Created successfully!');
           this.auth.storeUserInfo(this.emailId,this.createPINForm.PIN,this.firstName,this.lastName);
           this.navCtrl.push(MainPage,{emailId: this.emailId});


         }else if(data.status === "error"){
           this.showPopup("Error", "Something went wrong. Please try later.");

         }
         else{
           this.showPopup("Error", "No internet detected!"); 

         }

       });


       
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
           if (this.createSuccess) {

           }
         }
       }
       ]
     });
     alert.present();
   }


   isValidNumber(event)
   {
    //return /\d|Backspace/.test(event.key);
    if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        // backspace, enter, escape, arrows
        return true;
      } else if (event.keyCode >= 48 && event.keyCode <= 57) {
        // numbers 0 to 9
        return true;
      } else if (event.keyCode >= 96 && event.keyCode <= 105) {
        // numpad number
        return true;
      }
      return false;
    }


  }
