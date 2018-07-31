import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,Platform ,LoadingController} from 'ionic-angular';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-validate-pin',
  templateUrl: 'validate-pin.html',
})
export class ValidatePinPage {

  validatePINForm={ pin: ''};;
  email="";
  userPIN='';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
         
private platform: Platform,
     public loadingController: LoadingController
    ) {

    
    this.email=navParams.get("email");
this.userPIN=navParams.get("storedPIN");

platform.registerBackButtonAction(function (event) {
    event.preventDefault();
}, 100);

  }

  ionViewDidLoad() {
 
    }

    
	


  validatePIN()
  {

if(this.userPIN === this.validatePINForm.pin)
        {
          console.log('PIN validated!!');
         this.navCtrl.push(MainPage);
       }
       else
        {
          this.showPopup("Error","Invalid PIN")
        }

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

    showPopup(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
        {
          text: 'OK',
          handler: data => {
            if (true) {

            }
          }
        }
        ]
      });
      alert.present();
    }


  }

