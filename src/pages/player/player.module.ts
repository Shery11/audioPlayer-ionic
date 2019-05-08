import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerPage } from './player';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    PlayerPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(PlayerPage),
  ],
})
export class PlayerPageModule {}
