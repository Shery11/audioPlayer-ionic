import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  policies: string = "terms";
  isAndroid: boolean = false;
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private observerManager: ObserverManagerProvider, public navCtrl: NavController) {
    this.theme = ThemeModel.default();
  }

  openSignupPage(){
    this.navCtrl.push(SignupPage);
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
