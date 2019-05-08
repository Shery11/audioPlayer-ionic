import { Component, ViewChild, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { TechniquesPage } from '../techniques/techniques';
import { MeditationModel } from '../../models/Meditation';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MediaModel } from '../../models/Media';
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';
import { MeditationSoundPlayerProvider } from '../../providers/meditation-sound-player/meditation-sound-player';
import { PlayerPage } from '../player/player';

@IonicPage()
@Component({
  selector: 'page-detail-program',
  templateUrl: 'detail-program.html',
})
export class DetailProgramPage {
  @ViewChild('content') content;
  themeSubscription:Subscription;
  statusMediaSubscription:Subscription;
  theme:ThemeModel;
  meditation:MeditationModel;
  isUserAvailable:boolean = false;
  user:UserModel;
  mediaIntro:MediaModel;
  loadingMediaIntro:boolean = false;
  playingMediaIntro:boolean = false;
  hasMediaIntro:boolean = true;

  constructor(private platform:Platform, private observerManager: ObserverManagerProvider, public navCtrl: NavController, 
    public navParams: NavParams, private userStorage:StorageProvider, 
    public modalCtrl: ModalController, public alertCtrl:AlertController, private zone:NgZone,
    private favouriteService:FavouriteServiceProvider, private meditationPlayer:MeditationSoundPlayerProvider) {
    this.meditation = navParams.data;
    this.theme = ThemeModel.default();
    this.mediaIntro = this.meditation.getMediaIntro();
    if (!this.mediaIntro){ //some series dont have intro
      this.hasMediaIntro = false;
    }
  }

  playIntro(){
    if (this.platform.is('cordova')){
      this.loadingMediaIntro = true;
      this.meditationPlayer.play();
    }
  }

  pauseIntro(){
    this.playingMediaIntro = false;
    this.meditationPlayer.pause();
  }

  play(media:MediaModel) {
    this.stopMediaIntro();
    this.navCtrl.push(PlayerPage,{media:media});
  }  

  async ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.user = await this.userStorage.getUser();
    this.isUserAvailable = true;
    if (this.hasMediaIntro && this.platform.is('cordova')){
      this.meditationPlayer.init(this.mediaIntro);
      this.statusMediaSubscription = this.meditationPlayer.getObserverStatus()
        .subscribe((status:number)=>{
          if (status == 2){//running
            this.zone.run(() => {
              this.loadingMediaIntro = false;
              this.playingMediaIntro = true;
            })
          } 
      })
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

  openUnlock() {
    if (this.platform.is('core')) {
      this.openUnlockWebPage()
    } else {
      this.openUnlockMobileModal();
    }
  }

  stopMediaIntro(){
    if (this.playingMediaIntro){
      this.playingMediaIntro = false;
      this.meditationPlayer.pause()
      this.meditationPlayer.release();
    }
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
    if (this.hasMediaIntro && this.statusMediaSubscription){
      this.statusMediaSubscription.unsubscribe();
      this.stopMediaIntro();
    }
  }

  addFav(media: MediaModel) {
    media.changingStateFav = true;
    if (media.isFav) {
      this.favouriteService.delete(this.user, media)
        .subscribe(() => {
          media.isFav = false;
          media.changingStateFav = false;
        }, (error: any) => {
          media.changingStateFav = false;
          throw error;
        })
    } else {
      this.favouriteService.save(this.user, media)
        .subscribe(() => {
          media.isFav = true;
          media.changingStateFav = false;
        }, (error: any) => {
          media.changingStateFav = false;
          throw error;
        })
    }
  }
}
