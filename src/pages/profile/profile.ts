import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ModalController, Platform, InfiniteScroll, Content } from 'ionic-angular';
import { ActionPopoverPage } from '../action-popover/action-popover';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';
import { StatServiceProvider } from '../../providers/stat-service/stat-service';
import { StatSummaryModel, StatModel } from '../../models/statSummary';
import { MoodModel } from '../../models/mood';
import { ListMoodType } from '../../models/moodType';
import { MediaModel } from '../../models/Media';
import { PlayerPage } from '../player/player';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Content) content: Content;
  @ViewChild('feedContent') feedContent: any;

  themeSubscription:Subscription;
  theme:ThemeModel;
  isUserAvailable:boolean = false;
  user:UserModel;

  moodChecks:MoodModel[] = ListMoodType.slice();
  isMoodCheckAvailable:boolean;

  statsSummary:StatModel;
  isSummaryStatsAvailable:boolean

  stats:any[];
  isStatsAvailable:boolean
  statPageNumber:number;

  constructor(private platform:Platform, public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,public popoverCtrl:PopoverController,
              private observerManager: ObserverManagerProvider, private statsService:StatServiceProvider,
              public modalCtrl: ModalController,private userStorage:StorageProvider) {
    this.theme = ThemeModel.default();
  }
    
  openDashboardPage(){
    this.navCtrl.push(DashboardPage)
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
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ActionPopoverPage, {}, { cssClass: 'popover-custom' });
    popover.present({
      ev: myEvent
    });
  }

  async ionViewWillEnter(){

    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.user = await this.userStorage.getUser();
    this.statPageNumber = 0;
    this.stats = [];
    this.isUserAvailable = true;
    this.refreshStatSummary();
    this.isStatsAvailable = false;
    this.refreshStat();
  }


  refreshStatSummary(){
    this.isMoodCheckAvailable = false;
    this.isSummaryStatsAvailable = false;
    this.statsService.getSummary(this.user)
      .subscribe((summary:StatSummaryModel)=>{
        summary.stats.totalSecondsInDate = new Date(1970, 0, 1);
        summary.stats.totalSecondsInDate.setSeconds(summary.stats.totalSeconds);
        this.statsSummary = summary.stats;
        this.isSummaryStatsAvailable = true;
        ListMoodType.forEach((element:MoodModel)=>{
          element.count = 0;
          for(let index=0; index < summary.moods.length ; index++){
            let backMood:MoodModel = summary.moods[index]
            if (backMood.mood_id == element.mood_id){
              element.count = backMood.count
              break;
            }
          }
        })
        this.isMoodCheckAvailable = true;
      })
  }

  refreshStat(infinitScroll?:InfiniteScroll){
    this.statsService.getFeed(this.user,this.statPageNumber)
      .subscribe((summary:any)=>{
        if (summary.data.length == 0){
          this.isStatsAvailable = true;
          if (infinitScroll){
            infinitScroll.enable(false);
          }
          return;
        }
        summary.data.forEach(element => {
          this.stats.push(element);
        });
        if (infinitScroll){
          infinitScroll.complete();
        }
        if (!this.navCtrl.canGoBack()){
          this.content.scrollTo(0,this.feedContent.nativeElement.offsetTop);
        }
        this.isStatsAvailable = true;
      })
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }

  ifAJournalCheck(meditation){
    if (meditation.mood && meditation.mood.journal && meditation.mood.mood_id === undefined){
      return true;
    }
    return false
  }

  ifAMoodJournalCheck(meditation){
    if (meditation.mood && meditation.mood.journal && meditation.mood.mood_id !== undefined){
      return true;
    }
    return false
  }


  ifAMoodCheck(meditation){
    if (meditation.mood && meditation.mood.mood_id !== undefined && meditation.mood.journal === undefined){
      return true;
    }
    return false
  }

  ifAMeditation(meditation){
    if (meditation.media_id){
      return true;
    }
    return false
  }

  ifADailyMeditation(meditation){
    if (!meditation.media_id && (meditation.product == 'Daily Meditation' || meditation.productTitle == 'Daily Meditation')){
      return true;
    }
    return false
  }


  searchMoreStats(infinitScroll:InfiniteScroll){
    this.statPageNumber+=1;
    this.refreshStat(infinitScroll);
  }

  goToPlay(media:MediaModel){
    this.navCtrl.push(PlayerPage,{media:media});
  }
}
