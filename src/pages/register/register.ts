	import { Component } from '@angular/core';
	import { IonicPage, NavController, NavParams } from 'ionic-angular';
	import {  FormBuilder, FormGroup, Validators 	} from '@angular/forms';
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

		userRegistrationForm: FormGroup;

		constructor(public navCtrl: NavController, public navParams: NavParams , private formBuilder: FormBuilder) {

			this.userRegistrationForm = this.formBuilder.group({
				name : ['',Validators.required],
				email: ['',Validators.required],
				password: ['',Validators.required],
				confPassword :['',Validators.required]

			});

		}

		ionViewDidLoad() {
			console.log('ionViewDidLoad RegisterPage');
		}

		onSignUp()
		{
			console.log(this.userRegistrationForm.valid);
		
			if ( this.userRegistrationForm.valid ) {

				console.log('email:' + this.userRegistrationForm.controls['email'].value);
				console.log('Password: ' +
					this.userRegistrationForm.controls['password'].value);


			}

			this.navCtrl.push(CreatePinPage);
		}

	}
