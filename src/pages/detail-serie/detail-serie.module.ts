import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailSeriePage } from './detail-serie';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DetailSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailSeriePage),
    ComponentsModule
  ],
})
export class DetailSeriePageModule {}
