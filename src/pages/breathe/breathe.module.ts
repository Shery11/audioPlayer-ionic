import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreathePage } from './breathe';

@NgModule({
  declarations: [
    BreathePage,
  ],
  imports: [
    IonicPageModule.forChild(BreathePage),
  ],
})
export class BreathePageModule {}
