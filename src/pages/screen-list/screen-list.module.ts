import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenListPage } from './screen-list';

@NgModule({
  declarations: [
    ScreenListPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenListPage),
  ],
})
export class ScreenListPageModule {}
