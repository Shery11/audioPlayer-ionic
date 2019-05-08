import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamsWelcomeUserPage } from './teams-welcome-user';

@NgModule({
  declarations: [
    TeamsWelcomeUserPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamsWelcomeUserPage),
  ],
})
export class TeamsWelcomeUserPageModule {}
