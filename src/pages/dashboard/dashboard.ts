import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Platform, Refresher } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';
import { BreathePage } from '../breathe/breathe';
import { MoodPostPage } from '../mood-post/mood-post';
import { ThemeModel } from '../../models/theme';
import { Subscription } from 'rxjs/Subscription';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { PlayerPage } from '../player/player';
import { MeditationModel } from '../../models/Meditation';
import { MeditationManagerProvider } from '../../providers/meditation-manager/meditation-manager';
import { ProductType } from '../../models/ProductType';
import { DetailProgramPage } from '../detail-program/detail-program';
import { DetailSeriePage } from '../detail-serie/detail-serie';
import { DetailSinglePage } from '../detail-single/detail-single';
import { LoginRequired } from '../../models/loginRequired';
import { SubscriptionInProgressProvider } from '../../providers/subscription-in-progress/subscription-in-progress';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';
import { MediaModel } from '../../models/Media';
import { DailyServiceProvider } from '../../providers/daily-service/daily-service';
import { MoodModel } from '../../models/mood';
import { ListMoodType } from '../../models/moodType';


@LoginRequired()
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  // public press: number = 0;
  isCellSelected :boolean ;
  themeSubscription:Subscription;
  meditationsSubscription: Subscription;
  platformBackgroundSubcription:Subscription;
  theme:ThemeModel;
  private meditations:Array<MeditationModel> = [];

  isUserAvailable:boolean = false;
  user:UserModel;

  favs:MediaModel[];

  meditationTags: string = '';
  dailyMedia:MediaModel;
  isDailyMeditationAvailable:boolean = false;

  recommends:MeditationModel[];
  moodChecks:MoodModel[] = ListMoodType.slice();

  


  constructor(private dailyService:DailyServiceProvider, private observerManager: ObserverManagerProvider,public navCtrl: NavController, 
    public navParams: NavParams,public alertCtrl: AlertController, public modalCtrl: ModalController,
    public meditationOfflineProvider:MeditationManagerProvider, private subsInProgress:SubscriptionInProgressProvider,
    private platform:Platform, private userStorage:StorageProvider, private favoriteService:FavouriteServiceProvider) {
    this.theme = ThemeModel.default();
    Array.prototype.push.apply(this.meditations, meditationOfflineProvider.meditations);
    this.recommends = [];
    console.log('dashboard::this.meditations.length', this.meditations.length)
  }

  openSettingsPage(){
    this.navCtrl.push(SettingsPage)
  }
  openMoodPostPage(mood:MoodModel){
    let modal = this.modalCtrl.create(MoodPostPage,{mood:mood}, {cssClass:"custom-modal-style"});
    modal.present();
  }

  public async openDetailPage(meditation:MeditationModel){
    if (meditation.lock && !this.user.paid){
      this.openUnlock();
      return;
    }
    if (meditation.isRandom){
      let media:MediaModel =  await this.meditationOfflineProvider.getRandomMediaByProductAndCategory(meditation.product, meditation.category)
      this.navCtrl.push(PlayerPage,{media:media});
      return;
    }
    switch(meditation.product){
       case ProductType.Series:{
         this.navCtrl.push(DetailSeriePage, meditation);
         break;
       }
       case ProductType.Program:{
         this.navCtrl.push(DetailProgramPage, meditation);
         break;
       }
       case ProductType.Singles:{
         this.navCtrl.push(DetailSinglePage, meditation);
         break;      
      }
    }
  }

  openProfilePage(){
    this.navCtrl.push(ProfilePage)
  }
  openBreathePage(){
    this.navCtrl.push(BreathePage)
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
  goToPlayer(index:number){ //borrar
    this.navCtrl.push(PlayerPage,{media:this.meditations[0].medias[index]});
  }

  playDailyMeditation(){
    if (this.user.paid){
      this.navCtrl.push(PlayerPage,{media:this.dailyMedia});
    }else{
      this.openUnlock();
    }
    
  }

  async ionViewWillEnter(){
    this.getDailyMeditation();
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.meditationsSubscription = this.observerManager.getMeditationsObservable()
      .subscribe((meditations:Array<MeditationModel>) => {
        this.meditations.length=0;
        Array.prototype.push.apply(this.meditations, meditations);
        this.recommends =this.meditationOfflineProvider.getRecommendMeditation();
    })

    if (this.subsInProgress.hasSubscriptionInProgress()){
      let inProgress = this.subsInProgress.getSubscriptionInProgress();
      this.navCtrl.push(UnlockWebPage,{coupon: inProgress.coupon});
    }
    this.user = await this.userStorage.getUser();
    this.isUserAvailable = true;
    this.getFavs(false)
  }

  refreshDashboard(refresher:Refresher){
    this.getFavs(true,()=>{
      refresher.complete();
    })
    this.getDailyMeditation();
  }

  getDailyMeditation(){
    if (this.dailyService.shouldRefresh(this.dailyMedia)){
      this.isDailyMeditationAvailable = false;
      this.dailyService.getMedia()
        .subscribe((daily:MediaModel)=>{
          this.isDailyMeditationAvailable = true;
          this.dailyMedia = daily;
        })
    }
  }

  getFavs(forceHttp:boolean, callback?:Function){
    this.favoriteService.getAll(this.user,forceHttp)
    .subscribe((favs:MediaModel[])=>{
      this.favs  = favs;
      if (callback){
        callback();
      }
    })
  }

  listeningBackgroundMode(){
    this.platformBackgroundSubcription = this.platform.resume.subscribe(()=>{
      this.getDailyMeditation();
    })
  }

  ionViewWillUnload(){
    if (this.platformBackgroundSubcription){
      this.platformBackgroundSubcription.unsubscribe();
    }
  }

  ionViewDidLoad(){
    this.listeningBackgroundMode();
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }
}
