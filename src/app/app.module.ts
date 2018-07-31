import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { EditdataPage } from '../pages/editdata/editdata';
import { RegisterPage } from '../pages/register/register';
import { CreatePinPage } from '../pages/create-pin/create-pin';
import { ValidatePinPage } from '../pages/validate-pin/validate-pin';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    RegisterPage,
    CreatePinPage,
    ValidatePinPage,
    EditdataPage,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    RegisterPage,
    CreatePinPage,
    ValidatePinPage,
    EditdataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
     SQLite,
     Toast

  ]
})
export class AppModule {}
