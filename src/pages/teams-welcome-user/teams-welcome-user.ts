import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-teams-welcome-user',
  templateUrl: 'teams-welcome-user.html',
})
export class TeamsWelcomeUserPage {
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private observerManager: ObserverManagerProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.theme = ThemeModel.default();
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
