import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreatheSettingsPage } from './breathe-settings';

@NgModule({
  declarations: [
    BreatheSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(BreatheSettingsPage),
  ],
})
export class BreatheSettingsPageModule {}
