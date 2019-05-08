import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamsJoinPage } from './teams-join';

@NgModule({
  declarations: [
    TeamsJoinPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamsJoinPage),
  ],
})
export class TeamsJoinPageModule {}
