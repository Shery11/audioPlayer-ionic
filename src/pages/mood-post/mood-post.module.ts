import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoodPostPage } from './mood-post';

@NgModule({
  declarations: [
    MoodPostPage,
  ],
  imports: [
    IonicPageModule.forChild(MoodPostPage),
  ],
})
export class MoodPostPageModule {}
