import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { SoundStorageProvider } from '../../providers/sound-storage/sound-storage';
import { BackgroundSound } from '../../models/backgroundSound';
import { UserModel } from '../../models/user';
import { AlertPlayerFactoryProvider } from '../../providers/alert-player-factory/alert-player-factory';


@IonicPage()
@Component({
  selector: 'page-sounds-options',
  templateUrl: 'sounds-options.html',
})
export class SoundsOptionsPage {

  themeSubscription:Subscription;
  theme:ThemeModel;
  backgrounds:BackgroundSound[];
  backgroundSoundSubscription:Subscription;
  currentBackground:BackgroundSound;
  userSubscription:Subscription;
  user:UserModel;
  isUserAvailable:boolean = false;
  isBackgroundAvailable:boolean = false;

  constructor(private alertController: AlertPlayerFactoryProvider, private soundStorage: SoundStorageProvider, private plt: Platform, public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private observerManager: ObserverManagerProvider) {
    this.initTheme();
    this.initSound();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter(){
    this.initUser();
    this.backgroundSoundSubscription= this.observerManager.getBackgroundSoundObservable()
    .subscribe((current:BackgroundSound) =>{
      if (current){
          this.currentBackground = current;
      }
    })
    if (!this.isDesktopOrTablet()) {
      this.themeSubscription = this.observerManager.getThemeObservable()
          .subscribe((theme:ThemeModel) => {
            this.theme = theme
      })
    }
  }

  ionViewWillLeave(){
    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
    if (this.userSubscription){
      this.userSubscription.unsubscribe();
    }
    if (this.backgroundSoundSubscription){
      this.backgroundSoundSubscription.unsubscribe();
    }
  }

  isDesktopOrTablet():boolean{
    return  (this.plt.is('core') || this.plt.is('tablet'));
  }

  initTheme(){
    if (!this.isDesktopOrTablet()){
      this.theme = ThemeModel.default();
    }else{
      this.theme = ThemeModel.settings();
    }
  }

  async initSound(){
    this.currentBackground = await this.soundStorage.get();
    if (!this.currentBackground){
      this.currentBackground = BackgroundSound.default();
    }
    this.soundStorage.getAll()
      .subscribe(
        (backgrounds:BackgroundSound[]) => {
          this.backgrounds = backgrounds;
          this.isBackgroundAvailable = true;
        })
  }

  initUser(){
    this.userSubscription = this.observerManager.getUserObservable()
    .subscribe((user:UserModel) => {
      this.user = user;
      this.isUserAvailable = true;
    })     
  }

  async selectSound(sound:BackgroundSound){
    if (!sound.free && !this.user.paid){
      this.alertController.createAlertPaid().present();
    }else{
      await this.soundStorage.save(sound);
      this.observerManager.notifyBackgroundSound(sound);
    }
  }

}
