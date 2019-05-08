import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { DashboarPopoverPage } from '../dashboar-popover/dashboar-popover';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-teams-dashboard',
  templateUrl: 'teams-dashboard.html',

})
export class TeamsDashboardPage {
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private observerManager: ObserverManagerProvider, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl:PopoverController, public alertCtrl:AlertController) {
  this.theme = ThemeModel.default();
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DashboarPopoverPage, {}, { cssClass: 'popover-custom' });
    popover.present({
      ev: myEvent
    });
  }
  showInfoAlert() {
    let prompt = this.alertCtrl.create({
      mode:'md',
      title: 'Title of the alert',
      cssClass: 'custom-alert has-title',
      message: "Congratulations on comleating your first meditation. Would you like to integrate with Apple Health to report Mindful Minutes?",
      buttons: [
        {
          text: 'Yes',
          cssClass: 'royal-alert-button full-width',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
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
