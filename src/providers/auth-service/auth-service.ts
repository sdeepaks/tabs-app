	import { Injectable } from '@angular/core';
	import { Http ,Response } from '@angular/http';
	import {Observable} from 'rxjs/Observable';
	import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
	import 'rxjs/add/operator/do';
	import 'rxjs/add/operator/catch';
	import 'rxjs/add/operator/map';
	import { Storage } from '@ionic/storage';
	import { Events  } from 'ionic-angular';
	/*
	  Generated class for the AuthServiceProvider provider.

	  See https://angular.io/guide/dependency-injection for more info on providers
	  and Angular DI.
	  */
	  @Injectable()
	  export class AuthServiceProvider {


	  	static readonly GENERATE_PIN_URL = 'http://semicolonites.website/tabs/api/user_pin';

	  	static readonly REGISTER_URL = 'http://semicolonites.website/tabs/api/user';
	  	static readonly UPDATE_USER_URL = 'http://semicolonites.website/tabs/api/edit_user';
	  	static readonly ADD_EXPENSE_URL= 'http://semicolonites.website/tabs/api/add_expenses';
	  	static readonly UPDATE_EXPENSE_URL= 'http://semicolonites.website/tabs/api/update_expeses';
	  	access: boolean;
	  	token: string;
	  	userPIN=0;
	  	email ="";

	  	constructor(public http: Http, private storage: Storage,private sqlite: SQLite,public events: Events) {

	  		events.subscribe('syncExpense', (expenseID) => {
	  			
	  			console.log('NonSync Data found --> ', expenseID);

	  			
	  		});

	  	}

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


	  	public downloadExpenses(emailID)
	  	{

	  		var user_expense_url = "http://semicolonites.website/tabs/api/user_all_expense?email="+emailID;
	  		console.log("downloadExpenses called!! " +user_expense_url);
	  		return this.http.get(user_expense_url)
	  		.do( (res:Response) => console.log(res))
	  		.map( (res:Response) => res.json())
	  		.catch(error => {

	  			console.log("exception handler");
	  			return JSON.parse('[{"status":"systemError"}]');
	  		});
	  		

	  	}

	  	insertPreLoadedExpense(emailID)

	  	{

	  		this.downloadExpenses(emailID).subscribe(data => {

	  			console.log("Data fetch from WS-" +data);
	  			this.sqlite.create({
	  				name: 'tabs.db',
	  				location: 'default'
	  			}).then((db: SQLiteObject) => {

	  				for (var i = 0; i < data.data.length; ++i) {
	  					let row=data.data[i];
	  					console.log("row -->"+ row);
	  					db.executeSql('INSERT INTO expense VALUES(?,?,?,?,?,1,0,0,?)',[row.id,row.billNo,row.lastmodified,row.category ,row.amount,row.subCategory]) .then(res => {
	  						console.log("categories inserted" + res);
	  					})
	  					.catch(e => {
	  						console.log(e);
	  					});
	  				}

	  			}).catch(e => {
	  				console.log("error in INSERT category"+JSON.stringify(e));
	  			});

	  		});

	  	}


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


	  		db.executeSql('CREATE TABLE IF NOT EXISTS expense(expenseID INTEGER PRIMARY KEY AUTOINCREMENT ,billNo TEXT, date TEXT, category TEXT, amount INT,isSynced INT, isDeleted INT,isUpdated INT,subCategory TEXT)',[])
	  		.then(res => console.log('TABS:info:expense table created'))
	  		.catch(e => console.log("TABS:Error:while creating expense table" + e));  

	  		

	  		db.executeSql('CREATE TABLE IF NOT EXISTS categories(categoryID INTEGER PRIMARY KEY AUTOINCREMENT ,category TEXT)',[])
	  		.then(res => console.log('TABS:info:categories table created'))
	  		.catch(e => console.log("TABS:Error:in creating categories table" + e));  

	  		db.executeSql('CREATE TABLE IF NOT EXISTS subCategories(subCategory TEXT PRIMARY KEY,category TEXT)',[])
	  		.then(res => console.log('TABS:info:sub-categories table created'))
	  		.catch(e => console.log("TABS:Error:in creating sub-categories table" + e));  

	  		db.executeSql('CREATE TABLE IF NOT EXISTS userInfo(userID INTEGER PRIMARY KEY AUTOINCREMENT ,email TEXT, pin TEXT,firstName TEXT, lastName TEXT,password TEXT)',[])
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





	  

	  storeUserInfo(email,pin,firstName,lastName,password)
	  {



	  	console.log("email"+ email+ "pin" +pin);
	  	this.sqlite.create({
	  		name: 'tabs.db',
	  		location: 'default'
	  	}).then((db: SQLiteObject) => {
	  		db.executeSql('INSERT INTO userInfo VALUES(1,?,?,?,?,?)',[email,pin,firstName,lastName,password])

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


	  updateUserInfo(email,firstName,lastName,password)
	  {



	  	console.log("IN update --> email"+ email);
	  	this.sqlite.create({
	  		name: 'tabs.db',
	  		location: 'default'
	  	}).then((db: SQLiteObject) => {
	  		db.executeSql('UPDATE userInfo set firstName=?, lastName=?, password=? where email=?',[firstName,lastName,password,email])

	  		.then(res => {
	  			console.log("DataUpdated userInfo" + res);
	  			

	  		})
	  		.catch(e => {
	  			console.log("Error in updateUserInfo"+ JSON.stringify(e));
	  			
	  		});

	  	}).catch(e => {
	  		console.log("error in UPDATE"+JSON.stringify(e));

	  	});



	  	let body = new FormData();
	  	body.append('FirstName', firstName);
	  	body.append('LastName', lastName);
	  	body.append('password', password);
	  	body.append('emailId', email);

	  	

	  	return this.http.post(AuthServiceProvider.UPDATE_USER_URL, body)
	  	.do( (res:Response) => console.log(res))
	  	.map( (res:Response) => res.json())
	  	.catch(error => {

	  		console.log("exception handler");
	  		return JSON.parse('[{"status":"systemError"}]');
	  	});

	  }



	  uploadExpense()
	  {
	  	
	  	this.sqlite.create({
	  		name: 'tabs.db',
	  		location: 'default'
	  	}).then((db: SQLiteObject) => {


	  		db.executeSql('Select email from userInfo',[])
	  		.then(res => {
	  			console.log('TABS:info:userInfo queried : ' + res.rows.item(0).email);
	  			this.email= res.rows.item(0).email;
	  		})
	  		.catch(e => {
	  			console.log("TABS:Error:in getEmail function" + e);
	  		});  

	  		db.executeSql('SELECT * FROM expense where isSynced =0 ORDER BY expenseID DESC', [])
	  		.then(res => {
	  			
	  			

	  			for(var i=0; i<res.rows.length; i++) {

	  				console.log("GetEmail function --"+this.email);
	  				console.log("Inside Upload Expense -->" + res.rows.item(i).billNo +":"+res.rows.item(i).amount );
	  				let body = new FormData();
	  				body.append('BillNo', res.rows.item(i).billNo);
	  				body.append('Category', res.rows.item(i).category);
	  				body.append('amount', res.rows.item(i).amount);
	  				body.append('email', this.email);
	  				body.append('userExpenseId', res.rows.item(i).expenseID);
	  				body.append('subCategory', res.rows.item(i).subCategory);


	  				let expenseID = res.rows.item(i).expenseID;
	  				if(res.rows.item(i).isDeleted ==1  )
	  				{
	  					
	  					body.append('userID', '404');
	  					
	  					this.callUploadExpenseHttp(body,AuthServiceProvider.UPDATE_EXPENSE_URL).subscribe(data => {

	  						

	  						if(data.status === "success")
	  						{

	  							
	  							db.executeSql('DELETE from expense where expenseID =?',[expenseID]);
	  							console.log("Expense Deleted");
	  						}
	  					})

	  				} else if(res.rows.item(i).isUpdated==1)
	  				{
	  					
	  					this.callUploadExpenseHttp(body,AuthServiceProvider.UPDATE_EXPENSE_URL).subscribe(data => {

	  						

	  						if(data.status === "success")
	  						{

	  							this.updateSyncFlag(expenseID,1,0);
	  							console.log("Expense Updated");
	  						}
	  					})
	  				}
	  				else
	  				{
	  					

	  					this.callUploadExpenseHttp(body,AuthServiceProvider.ADD_EXPENSE_URL).subscribe(data => {
	  						console.log("Status-->" +data.status );

	  						if(data.status === "success")
	  						{

	  							this.updateSyncFlag(expenseID,1,0);
	  							console.log("Expense Added");
	  						}
	  					});
	  				}


	  			}

	  		}).catch(e => console.log(e));


	  	}).catch(e => console.log(e))

	  }


	  callUploadExpenseHttp(body,URL)
	  {
	  	return this.http.post(URL, body)
	  	.do( (resp:Response) => console.log("Uploaded --> "+resp.json()))
	  	.map((resp: Response) => resp.json())	
	  	.catch(error => {
	  		console.log("Upload Sync exception handler");
	  		return JSON.parse('[{"status":"systemError"}]');
	  	})

	  }



	  updateSyncFlag(expenseID,isSync,isUpdated)
	  {

	  	console.log("updateSyncFlag called: "+expenseID);

	  	this.sqlite.create({
	  		name: 'tabs.db',
	  		location: 'default'
	  	}).then((db: SQLiteObject) => {
	  		db.executeSql('UPDATE expense SET isSynced=?,isUpdated=? where expenseID =?',[isSync,isUpdated,expenseID])

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