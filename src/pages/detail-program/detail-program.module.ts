import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailProgramPage } from './detail-program';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DetailProgramPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailProgramPage),
    ComponentsModule
  ],
})
export class DetailProgramPageModule {}
