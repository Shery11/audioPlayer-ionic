import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { BreatheSettingsPage } from '../breathe-settings/breathe-settings';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';

@IonicPage()
@Component({
  selector: 'page-breathe',
  templateUrl: 'breathe.html',
})
export class BreathePage {

  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private platform:Platform, public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController, private observerManager:ObserverManagerProvider) {
  this.theme = ThemeModel.default();
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
  openBreatheSettingsModal() {
    let modal = this.modalCtrl.create(BreatheSettingsPage);
    modal.present();
  }
  ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BreathePage');
  }

}
