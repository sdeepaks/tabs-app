	import { Component } from '@angular/core';
	import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
	import {  FormBuilder, FormGroup, Validators 	} from '@angular/forms';
	import { CreatePinPage } from '../create-pin/create-pin';
	import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

	/**
	* Generated class for the RegisterPage page.
	*
	* See https://ionicframework.com/docs/components/#navigation for more info on
	* Ionic pages and navigation.
	*/

	@IonicPage()
	@Component({
		selector: 'page-register',
		templateUrl: 'register.html',
	})
	export class RegisterPage {

		createSuccess = false;
  		userRegistrationForm = { name: '', email: '', password: '', confPassword: '' };


	

		constructor(public navCtrl: NavController, 
					public navParams: NavParams , 
					private formBuilder: FormBuilder,
    				private auth: AuthServiceProvider,
    				private alertCtrl: AlertController
					) 
		{

			/*this.userRegistrationForm = this.formBuilder.group({
				name : ['',Validators.required],
				email: ['',Validators.required],
				password: ['',Validators.required],
				confPassword :['',Validators.required]

			});*/

		}

		ionViewDidLoad() {
			console.log('ionViewDidLoad RegisterPage');
		}

		onSignUp()
		{
			console.log(this.userRegistrationForm);
		
 if (this.userRegistrationForm.password != this.userRegistrationForm.confPassword) {
     
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {


    this.auth.register(this.userRegistrationForm).subscribe(data => {

console.log("data.status:"+data);

if (data.status === "success")
{
	this.showPopup("Success", "Account created successfully!");

	this.navCtrl.push(CreatePinPage);

}else if(data.status === "error"){
	this.showPopup("Error", "Email already Registered!");

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
