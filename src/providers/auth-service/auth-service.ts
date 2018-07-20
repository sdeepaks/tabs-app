import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions ,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  
  // Change to this http://ed43bb3b.ngrok.io/api/login
  static readonly LOGIN_URL = 'http://contoh.dev/api/login';
  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = 'http://semicolonites.website/tabs/api/user';
  access: boolean;
  token: string;

  constructor(public http: Http) {}

  // Login
  /*public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {

        this.http.post(AuthServiceProvider.LOGIN_URL, credentials)
        .map(res => res.json())
        .subscribe( data => {
          if (data.access_token) {
            this.token = 'Bearer ' + data.access_token;
            this.access = true;
          } else {
            this.access = false;
          }
        });

        setTimeout(() => {
              observer.next(this.access);
          }, 500);

        setTimeout(() => {
              observer.complete();
          }, 1000);


      }, err => console.error(err));
    }
  }*/

  // Register
  public  register(credentials)  {

   
/*var headers = new Headers();
headers.append('Access-Control-Allow-Headers', '*');*/



let body = new FormData();
	body.append('FirstName', credentials.firstName);
	body.append('LastName', credentials.lastName);
    body.append('password', credentials.password);
    body.append('emailId', credentials.emailId);
   


return this.http.post(AuthServiceProvider.REGISTER_URL, body)
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