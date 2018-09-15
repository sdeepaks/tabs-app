	import { Injectable } from '@angular/core';
	import { Http ,Response } from '@angular/http';
	import {Observable} from 'rxjs/Observable';
	import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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
	  userPIN=0;

	  	constructor(public http: Http, private storage: Storage,private sqlite: SQLite) {}

	  	getAllCategories(){

var category_url = "http://semicolonites.website/tabs/api/categories_all";


	return this.http.get(category_url)
	.do( (res:Response) => console.log(res))
	.map( (res:Response) => res.json())
	.catch(error => {

		console.log("exception handler");
		return JSON.parse('[{"status":"systemError"}]');
	});

	  	}

	getAllSubCategories(){

var subCategory_url = "http://semicolonites.website/tabs/api/get_all_sub_categories";


	return this.http.get(subCategory_url)
	.do( (res:Response) => console.log(res))
	.map( (res:Response) => res.json())
	.catch(error => {

		console.log("exception handler");
		return JSON.parse('[{"status":"systemError"}]');
	});

	  	}


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

	


createDB()
  {
    this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


      db.executeSql('CREATE TABLE IF NOT EXISTS expense(expenseID INTEGER PRIMARY KEY AUTOINCREMENT ,billNo TEXT, date TEXT, category TEXT, amount INT,isSynced INT, isDeleted INT,subCategory TEXT)',[])
      .then(res => console.log('TABS:info:expense table created'))
      .catch(e => console.log("TABS:Error:while creating expense table" + e));  

      

      db.executeSql('CREATE TABLE IF NOT EXISTS categories(categoryID INTEGER PRIMARY KEY AUTOINCREMENT ,category TEXT)',[])
      .then(res => console.log('TABS:info:categories table created'))
      .catch(e => console.log("TABS:Error:in creating categories table" + e));  

      db.executeSql('CREATE TABLE IF NOT EXISTS subCategories(subCategory TEXT PRIMARY KEY,category TEXT)',[])
      .then(res => console.log('TABS:info:sub-categories table created'))
      .catch(e => console.log("TABS:Error:in creating sub-categories table" + e));  

      db.executeSql('CREATE TABLE IF NOT EXISTS userInfo(userID INTEGER PRIMARY KEY AUTOINCREMENT ,email TEXT, pin TEXT,firstName TEXT, lastName TEXT)',[])
      .then(res => console.log('TABS:info:userInfo table created'))
      .catch(e => console.log("TABS:Error:in userInfo categories table" + e));  

      

    }


    ).catch(e => console.log(e));
  }

logout()
{

	


	this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

 

       db.executeSql('DROP TABLE IF EXISTS userInfo',[])
      .then(res => console.log('TABS:info:userInfo table deleted'))
      .catch(e => console.log("TABS:Error:in deletion of userInfo  table" + e));  

      db.executeSql('DROP TABLE IF EXISTS expense',[])
      .then(res => console.log('TABS:info:expense table deleted'))
      .catch(e => console.log("TABS:Error:while deleting expense table" + e));  


 


    }


    ).catch(e => console.log(e));


    
  }





  

 storeUserInfo(email,pin,firstName,lastName)
   {



console.log("email"+ email+ "pin" +pin);
     this.sqlite.create({
      name: 'tabs.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO userInfo VALUES(1,?,?,?,?)',[email,pin,firstName,lastName])

      .then(res => {
        console.log("DataSaved userInfo" + res);
        

      })
      .catch(e => {
        console.log("Error in StoreUserInfo"+ JSON.stringify(e));
        
      });

    }).catch(e => {
      console.log("error in INSERT"+JSON.stringify(e));

    });

   }


	}