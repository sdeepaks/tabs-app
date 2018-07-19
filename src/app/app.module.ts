import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { RegisterPage } from '../pages/register/register';
import { CreatePinPage } from '../pages/create-pin/create-pin';
import { ValidatePinPage } from '../pages/validate-pin/validate-pin';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    RegisterPage,
    CreatePinPage,
    ValidatePinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    RegisterPage,
    CreatePinPage,
    ValidatePinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
