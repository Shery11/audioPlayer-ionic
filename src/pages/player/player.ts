import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { SoundsOptionsPage} from '../sounds-options/sounds-options';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { SoundStorageProvider } from '../../providers/sound-storage/sound-storage';
import { BackgroundSound } from '../../models/backgroundSound';
import { MeditationSoundPlayerProvider } from '../../providers/meditation-sound-player/meditation-sound-player';
import { BackgroudSoundPlayerProvider } from '../../providers/backgroud-sound-player/backgroud-sound-player';
import { AlertPlayerFactoryProvider } from '../../providers/alert-player-factory/alert-player-factory';
import { BackgroundMode } from '@ionic-native/background-mode';
import { MediaModel } from '../../models/Media';
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';
import { ProfilePage } from '../profile/profile';

@IonicPage({
  segment: 'player'
})
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  themeSubscription:Subscription;
  backgroundSubscription:Subscription;
  statusMediaSubscription:Subscription;
  mediaCompletedSubscription:Subscription;

  theme:ThemeModel;
  backgroundSound:BackgroundSound;
  volume: number = 30;
  currentPosition: number = 0.0;
  taskIntervalCurrentPosition:any;
  isPlaying:boolean = false;
  mediaPlay:MediaModel;
  backgroundCss:string;
  showVolumeControls:boolean=true;
  loadingMedia:boolean = true;
  private static MIN_VOLUME_VOICE:number = 0.2 //20%

  user:UserModel;

  constructor(private backgroundPlayer:BackgroudSoundPlayerProvider,
              private meditationPlayer:MeditationSoundPlayerProvider,
              private soundStorage: SoundStorageProvider,
              public modalCtrl:ModalController,
              private observerManager: ObserverManagerProvider,
              private alertPlayer:AlertPlayerFactoryProvider,
              private navCtrl:NavController,
              private navParams:NavParams,
              private backgroundMode: BackgroundMode,
              private viewCtrl: ViewController,
              private favouriteService:FavouriteServiceProvider,
              private userStorage:StorageProvider) {
    this.mediaPlay = this.navParams.get('media');
    this.theme = ThemeModel.default();
    this.meditationPlayer.init(this.mediaPlay);
  }

  openSoundsOptionsModal() {
    let modal = this.modalCtrl.create(SoundsOptionsPage, {cssClass:"custom-modal-style"});
    modal.present();
  }

  async ionViewWillEnter(){
    this.statusMediaSubscription = this.meditationPlayer.getObserverStatus()
      .subscribe((status:number)=>{
        if (status == 2){//running
          this.loadingMedia = false;
        }
      })
    if (!this.mediaPlay.hasSound){
      this.backgroundSound = BackgroundSound.default();
      this.soundStorage.init();
      this.backgroundSubscription = this.observerManager.getBackgroundSoundObservable()
      .subscribe((background:BackgroundSound) => {
        if (!this.mediaPlay.hasSound && background.id != this.backgroundSound.id){
          this.playNewBackground(background);
        }
      })
    }
    this.play();
    this.mediaPlay.beginTime = new Date();
    this.viewCtrl.showBackButton(false);
    this.themeSubscription = this.observerManager.getThemeObservable()
      .subscribe((theme:ThemeModel) => {
        this.theme = theme
    })
    this.mediaCompletedSubscription = this.observerManager.getMediaCompletedObservable()
      .subscribe((md:MediaModel)=>{
        this.navCtrl.setRoot(ProfilePage);
      })
    this.user = await this.userStorage.getUser();
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
    if (this.backgroundSubscription){
      this.backgroundSubscription.unsubscribe();
    }
    this.statusMediaSubscription.unsubscribe();
    this.mediaCompletedSubscription.unsubscribe();
    this.release();
  }

  setVolume(){
    if (this.volume < 70){
      var unit = this.volume / 100;
      this.meditationPlayer.setVolume(1-unit);
      this.backgroundPlayer.setVolume(this.backgroundSound, unit);
    }else{
      this.setMaxVolume();
    }
  }

  setMaxVolume(){
    this.meditationPlayer.setVolume(PlayerPage.MIN_VOLUME_VOICE);
    this.backgroundPlayer.setVolume(this.backgroundSound,1-PlayerPage.MIN_VOLUME_VOICE);
  }

  play(){
    if (!this.isPlaying){
      this.startPlaying();
    }else{
      this.stopPlaying();
    }
  }

  startPlaying(){
    this.meditationPlayer.play();
    if (!this.mediaPlay.hasSound){
      this.backgroundPlayer.play(this.backgroundSound,this.volume/100);
    }
    this.startTimer();
    this.isPlaying = true;
    this.backgroundMode.enable();
    this.showVolumeControls  = true;
    this.backgroundCss='fadeIn';
  }

  stopPlaying(){
    this.backgroundCss='fadeOut';
    this.meditationPlayer.pause();
    if (!this.mediaPlay.hasSound){
      this.backgroundPlayer.stop(this.backgroundSound);
    }
    this.cancelTimer();
    this.isPlaying = false;
    this.backgroundMode.disable();
    setTimeout(()=>{
      this.showVolumeControls  = false;
    },1000)
  }

  async playNewBackground(newBackground:BackgroundSound){
      if (this.isPlaying){
        await this.backgroundPlayer.stop(this.backgroundSound);
      }
      this.backgroundSound = newBackground;
      await this.backgroundPlayer.play(this.backgroundSound,this.volume/100)
      this.setVolume();
  }

  rewind(){
    this.meditationPlayer.rewind();
  }

  forward(){
    this.meditationPlayer.forward();
  }

  startTimer(){
    this.taskIntervalCurrentPosition = setInterval(async () => {
      this.currentPosition = await this.meditationPlayer.getCurrentPosition()
    },1000);
  }

  cancelTimer(){
    clearInterval(this.taskIntervalCurrentPosition);
  }

  close(){
    this.alertPlayer.createEndSession(()=>{
      this.mediaPlay.endTime = new Date();
      this.observerManager.notifyMediaUncompleted(this.mediaPlay);
      this.navCtrl.pop();
    },()=>{

    }).present()
  }

  showFavorite(){
    return !this.mediaPlay.isDaily && this.mediaPlay.tracked
  }

  async release(){
    if (this.isPlaying){
      await this.stopPlaying();
    }
    this.meditationPlayer.release();
  }

  checkFavourite(){
    this.mediaPlay.changingStateFav = true;
    if (this.mediaPlay.isFav){
      this.favouriteService.delete(this.user,this.mediaPlay)
        .subscribe(()=>{
          this.mediaPlay.isFav = false;
          this.mediaPlay.changingStateFav = false;
        },(error: any) =>{
          this.mediaPlay.changingStateFav = false;
          throw error;
        })
    }else{
      this.favouriteService.save(this.user,this.mediaPlay)
        .subscribe(()=>{
          this.mediaPlay.isFav = true;
          this.mediaPlay.changingStateFav = false;
        },(error: any) =>{
          this.mediaPlay.changingStateFav = false;
          throw error;
        })
    }
  }
}
