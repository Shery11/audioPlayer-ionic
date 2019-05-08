import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SciencePage } from './science';

@NgModule({
  declarations: [
    SciencePage,
  ],
  imports: [
    IonicPageModule.forChild(SciencePage),
  ],
})
export class SciencePageModule {}
