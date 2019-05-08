import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeThemePage } from './change-theme';

@NgModule({
  declarations: [
    ChangeThemePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeThemePage),
  ],
})
export class ChangeThemePageModule {}
