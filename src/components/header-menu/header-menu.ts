import { Component,ViewChild } from '@angular/core';
import { App, Nav, MenuController,NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../../pages/login/login';
import { EditprofilePage } from '../../pages/editprofile/editprofile';

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

 		 	}

@ViewChild(NavController) nav: NavController;

 	logoutClicked() {
 		console.log("Logout");

 		this.menuCtrl.close();

 		this.auth.logout();
 		var nav = this.app.getRootNav();
    	nav.setRoot(LoginPage);
		

 	}

 	openProfile()
 	{
 		var nav = this.app.getRootNav();
    	nav.setRoot(EditprofilePage);
 	}
 }