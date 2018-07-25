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

