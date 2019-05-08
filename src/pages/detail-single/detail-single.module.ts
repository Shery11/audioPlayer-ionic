import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailSinglePage } from './detail-single';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DetailSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailSinglePage),
    ComponentsModule
  ],
})
export class DetailSinglePageModule {}
