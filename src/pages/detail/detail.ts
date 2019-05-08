import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { TechniquesPage } from '../techniques/techniques';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  @ViewChild('content') content;
  themeSubscription:Subscription;
  theme:ThemeModel;
  isUserAvailable:boolean = false;
  user:UserModel;

  constructor(private platform:Platform, private observerManager: ObserverManagerProvider, 
    public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public alertCtrl:AlertController, 
    private userStorage:StorageProvider) {
    this.theme = ThemeModel.default();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Button!',
      subTitle: 'This is one more button in a item please check and confirm!',
      buttons: ['OK']
    });
    alert.present();
  }

  async ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.user = await this.userStorage.getUser();
    this.isUserAvailable = true;
  }

  openUnlock(){
    if (this.platform.is('core')){
      this.openUnlockWebPage()
    }else{
      this.openUnlockMobileModal();
    }
  }

  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage);
    modal.present();
  }
  openTechniquesModal() {
    let modal = this.modalCtrl.create(TechniquesPage);
    modal.present();
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }
}
