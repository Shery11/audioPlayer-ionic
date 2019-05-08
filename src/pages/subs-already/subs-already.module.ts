import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubsAlreadyPage } from './subs-already';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    SubsAlreadyPage,
  ],
  providers: [DatePipe],
  imports: [
    IonicPageModule.forChild(SubsAlreadyPage),
  ],
})
export class SubsAlreadyPageModule {}
