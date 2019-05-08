import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-after-share',
  templateUrl: 'after-share.html',
})
export class AfterSharePage {
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private observerManager: ObserverManagerProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.theme = ThemeModel.default();
  }
  showFeedbackConfirm() {
    let prompt = this.alertCtrl.create({
      mode:'md',
      title: 'Meditation Feedback',
      cssClass: 'custom-alert no-heading text-center feedback-alert' ,
      message: "Enjoy this meditation?",
      buttons: [
        {
          text: 'YES',
          cssClass: 'pink-alert-button',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'NO',
          cssClass: 'royal-alert-button',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  openDashboardPage(){
    this.navCtrl.push(DashboardPage)
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
}
