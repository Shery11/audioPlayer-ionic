import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { MoodModel } from '../../models/mood';
import { ListMoodType } from '../../models/moodType';
import { StatServiceProvider } from '../../providers/stat-service/stat-service';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertStatsProvider } from '../../providers/alert-stats/alert-stats';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-mood-post',
  templateUrl: 'mood-post.html',
})
export class MoodPostPage {
  themeSubscription: Subscription;
  theme: ThemeModel;

  moodChecks: MoodModel[] = ListMoodType.slice();
  moodSelected: MoodModel
  journalSelected:string;
  user:UserModel;

  constructor(private alertService:AlertStatsProvider, private statsService:StatServiceProvider, private userStorage:StorageProvider, public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams, private observerManager: ObserverManagerProvider) {
    this.theme = ThemeModel.default();
    this.moodSelected = this.navParams.get('mood');
    this.journalSelected = '';
  }

  async ionViewWillEnter() {
    this.user = await this.userStorage.getUser()
    this.themeSubscription = this.observerManager.getThemeObservable()
      .subscribe((theme: ThemeModel) => {
        this.theme = theme
      })
  }

  close(){
    this.viewCtrl.dismiss();
  }

  ionViewWillLeave() {
    this.themeSubscription.unsubscribe();
  }

  changeMood(mood:MoodModel){
    this.moodSelected = mood;
  }

  isCurrentMood(mood: MoodModel): string {
    if (mood.mood_id == this.moodSelected.mood_id) {
      return 'checked'
    } else {
      return '';
    }
  }

  async saveMood(){
    if (this.journalSelected && this.journalSelected.length > 0){
      this.moodSelected.journal = this.journalSelected;
    }
    this.statsService.informMood(this.user,this.moodSelected)
      .subscribe(()=>{
        this.navCtrl.setRoot(ProfilePage);
      },
      (error: any) => {
        this.alertService.createAlertMoodError().present();
        throw error;
      })
  }
}
