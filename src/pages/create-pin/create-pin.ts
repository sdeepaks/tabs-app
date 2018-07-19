import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  FormBuilder, FormGroup, Validators   } from '@angular/forms';
import { MainPage } from '../main/main';
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
createPINForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {

    this.createPINForm = this.formBuilder.group({
        PIN : ['',Validators.required],
        confPIN: ['',Validators.required]
       

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePinPage');
  }

  createPIN()
  {
  	console.log("PIN Created");

  	this.navCtrl.push(MainPage);
  }

}
