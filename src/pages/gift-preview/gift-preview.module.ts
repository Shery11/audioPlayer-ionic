import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftPreviewPage } from './gift-preview';

@NgModule({
  declarations: [
    GiftPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftPreviewPage),
  ],
})
export class GiftPreviewPageModule {}
