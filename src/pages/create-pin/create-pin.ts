import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {  FormBuilder, FormGroup, Validators   } from '@angular/forms';
import { MainPage } from '../main/main';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CreatePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-create-pin',
   templateUrl: 'create-pin.html',
 })
 export class CreatePinPage {
   createSuccess=true;
   emailId :string;

   createPINForm = { PIN: '', confPIN: ''};
   
   
   constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,

     private auth: AuthServiceProvider,
     private alertCtrl: AlertController
     
     ) {
     this.emailId = navParams.get('emailId');
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad CreatePinPage');
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

 }
