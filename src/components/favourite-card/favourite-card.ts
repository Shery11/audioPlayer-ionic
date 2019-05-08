import { Component, Input } from '@angular/core';
import { MediaModel } from '../../models/Media';
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';
import { AlertFavouriteFactoryProvider } from '../../providers/alert-favourite-factory/alert-favourite-factory';
import { PlayerPage } from '../../pages/player/player';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'favourite-card',
  templateUrl: 'favourite-card.html'
})
export class FavouriteCardComponent {
  @Input('media') media:MediaModel;
  private user:UserModel

  constructor(private favouriteService:FavouriteServiceProvider, private alertFactory:AlertFavouriteFactoryProvider,
              private userStorage:StorageProvider, private navCtrl:NavController){}

  async remove(){ 
    if (!this.user){
      this.user = await this.userStorage.getUser()
    }
    this.favouriteService.delete(this.user,this.media)
      .subscribe(()=>{
        this.media.isFav = false;
      })
  }
  
  tryToRemove(evn:Event){
    evn.stopPropagation();
    this.alertFactory.createAlertRemove(()=>{
      this.remove();
    },()=>{
    }).present();
  }

  play(){
    this.navCtrl.push(PlayerPage,{media:this.media});
  }
}
