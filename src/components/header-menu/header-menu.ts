import { Component } from '@angular/core';
import { App, Nav, MenuController,NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
 	selector: 'header-menu',
 	templateUrl: 'header-menu.html'
 })

 export class HeaderMenuComponent {
 	constructor(
 		public menuCtrl: MenuController,
 		public app: App,
 		private auth: AuthServiceProvider
 		//public navCtrl: NavController
 		) {

 		console.log('Hello HeaderMenuComponent Component');
 	}

 	logoutClicked() {
 		console.log("Logout");

 		this.menuCtrl.close();

 		this.auth.logout();

// 		this.navCtrl.push(LoginPage);

 	}
 }