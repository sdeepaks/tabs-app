import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  FormBuilder, FormGroup, Validators   } from '@angular/forms';
import { MainPage } from '../main/main';

/**
 * Generated class for the ValidatePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-validate-pin',
  templateUrl: 'validate-pin.html',
})
export class ValidatePinPage {

validatePINForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {


  	this.validatePINForm = this.formBuilder.group({
        PIN : ['',Validators.required]
       

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValidatePinPage');
  }

validatePIN()
{
	console.log('PIN validated!!');
	this.navCtrl.push(MainPage);
}

}
