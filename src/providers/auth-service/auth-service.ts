	import { Injectable } from '@angular/core';
	import { Http,Headers, RequestOptions ,Response } from '@angular/http';
	import {Observable} from 'rxjs/Observable';
	import 'rxjs/add/operator/do';
	import 'rxjs/add/operator/catch';
	import 'rxjs/add/operator/map';
	import { Storage } from '@ionic/storage';
	/*
	  Generated class for the AuthServiceProvider provider.

	  See https://angular.io/guide/dependency-injection for more info on providers
	  and Angular DI.
	  */
	  @Injectable()
	  export class AuthServiceProvider {


	  	static readonly GENERATE_PIN_URL = 'http://semicolonites.website/tabs/api/user_pin';

	  	static readonly REGISTER_URL = 'http://semicolonites.website/tabs/api/user';
	  	access: boolean;
	  	token: string;

	  	constructor(public http: Http, private storage: Storage) {}

	  	storeLocally(data)
	  	{
	  		this.storage.clear();

	  		console.log(data.value);
	  		this.storage.set(data.key, data.value)
	  		.then(data => console.log('Stored item!'))
	  		.catch(
	  			error => console.error('Error storing item', error)
	  			);

	  	}

	  	fetchLocalData(key)
	  	{
	  		this.storage.get('email').then((val) => {
	  			console.log('Your email is', val);

	  			return val;
	  		})
	  		.catch(



	  			error => console.error(error)

	  			)

	  		;
	  	}


	  // SignUP
	  public  register(userRegistrationForm)  {


		/*var headers = new Headers();
		headers.append('Access-Control-Allow-Headers', '*');*/


		let body = new FormData();
		body.append('FirstName', userRegistrationForm.firstName);
		body.append('LastName', userRegistrationForm.lastName);
		body.append('password', userRegistrationForm.password);
		body.append('emailId', userRegistrationForm.emailId);

 

		return this.http.post(AuthServiceProvider.REGISTER_URL, body)
		.do( (res:Response) => console.log(res))
		.map( (res:Response) => res.json())
		.catch(error => {

			console.log("exception handler");
			return JSON.parse('[{"status":"systemError"}]');
		});

 

	}

	public  generatePIN(createPINForm,emailId)  { 

 
	/*var headers = new Headers();
	headers.append('Access-Control-Allow-Headers', '*');*/

	let body = new FormData();
	body.append('pin', createPINForm.PIN);
	body.append('emailId', emailId);



	return this.http.post(AuthServiceProvider.GENERATE_PIN_URL, body)
	.do( (res:Response) => console.log(res))
	.map( (res:Response) => res.json())
	.catch(error => {

		console.log("exception handler");
		return JSON.parse('[{"status":"systemError"}]');
	});



}



public  doLogin(loginForm)  { 

  var login_url = "http://semicolonites.website/tabs/api/user_authenticate?uname="+loginForm.email+"&password=" +loginForm.password;


	return this.http.get(login_url)
	.do( (res:Response) => console.log(res))
	.map( (res:Response) => res.json())
	.catch(error => {

		console.log("exception handler");
		return JSON.parse('[{"status":"systemError"}]');
	});



}


	  // Get Token
	  public getToken() {
	  	return this.token;
	  }

	  // Logout   
	  public logout() {
	  	return Observable.create(observer => {
	  		observer.next(true);
	  		observer.complete();
	  	});
	  }





	}