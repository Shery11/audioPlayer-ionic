import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamsDashboardPage } from './teams-dashboard';

@NgModule({
  declarations: [
    TeamsDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamsDashboardPage),
  ],
})
export class TeamsDashboardPageModule {}
