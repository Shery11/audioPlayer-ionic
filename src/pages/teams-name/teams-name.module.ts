import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamsNamePage } from './teams-name';

@NgModule({
  declarations: [
    TeamsNamePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamsNamePage),
  ],
})
export class TeamsNamePageModule {}
