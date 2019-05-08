import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoundsOptionsPage } from './sounds-options';

@NgModule({
  declarations: [
    SoundsOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SoundsOptionsPage),
  ],
})
export class SoundsOptionsPageModule {}
