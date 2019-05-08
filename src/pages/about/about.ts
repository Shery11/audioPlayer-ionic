import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { IonicPage, NavController, ModalController, Platform } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';



@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  themeSubscription:Subscription;
  theme:ThemeModel;
  isUserAvailable:boolean = false;
  user:UserModel;

  constructor(private platform:Platform, private observerManager:ObserverManagerProvider,
              private navCtrl:NavController, private modalCtrl: ModalController,
              private userStorage:StorageProvider){
    this.theme = ThemeModel.default();
  }

  async ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.user = await this.userStorage.getUser();
    this.isUserAvailable = true;
  }

  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage);
    modal.present();
  }

  openUnlock(){
    if (this.platform.is('core')){
      this.openUnlockWebPage()
    }else{
      this.openUnlockMobileModal();
    }
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }
}
