import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechniquesPage } from './techniques';

@NgModule({
  declarations: [
    TechniquesPage,
  ],
  imports: [
    IonicPageModule.forChild(TechniquesPage),
  ],
})
export class TechniquesPageModule {}
