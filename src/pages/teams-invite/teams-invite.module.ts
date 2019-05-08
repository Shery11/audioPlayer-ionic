import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamsInvitePage } from './teams-invite';

@NgModule({
  declarations: [
    TeamsInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamsInvitePage),
  ],
})
export class TeamsInvitePageModule {}
