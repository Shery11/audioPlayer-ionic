import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPopoverPage } from './action-popover';

@NgModule({
  declarations: [
    ActionPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionPopoverPage),
  ],
})
export class ActionPopoverPageModule {}
