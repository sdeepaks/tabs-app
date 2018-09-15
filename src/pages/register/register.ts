	import { Component } from '@angular/core';
	import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
	import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
	import { CreatePinPage } from '../create-pin/create-pin';

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
		userRegistrationForm = { firstName: '',lastName: '', emailId: '', password: '', confPassword: '' };
		storeData=null;

		

		constructor(public navCtrl: NavController, 
			public navParams: NavParams , 
			private auth: AuthServiceProvider,
			private alertCtrl: AlertController
			) 
		{

		

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

					console.log("data.status:"+data.status);

					if (data.status === "success")
					{
						

						this.storeData = {key:'email',value: this.userRegistrationForm.emailId};
						
						this.auth.storeLocally(this.storeData);

						this.showPopup("Success", "Account created successfully!");


						this.navCtrl.push(CreatePinPage,{emailId: this.userRegistrationForm.emailId,firstName:this.userRegistrationForm.firstName,lastName:this.userRegistrationForm.lastName,password:this.userRegistrationForm.password});

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
