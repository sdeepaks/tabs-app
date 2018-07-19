import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidatePinPage } from './validate-pin';

@NgModule({
  declarations: [
    ValidatePinPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidatePinPage),
  ],
})
export class ValidatePinPageModule {}
