import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private observerManager: ObserverManagerProvider) {
  this.theme = ThemeModel.default();
  }
  cards = [
    {title:'Best of Daily',msg:'12 Meditations', free:'yes',new:'yes',img:'assets/imgs/covers/best-of-daily.png'},
    {title:'5 Days Cover',msg:'12 Meditations', free:'no',new:'yes',img:'assets/imgs/covers/5-days-cover.png'},
    {title:'Alternative',msg:'12 Meditations', free:'no',new:'no',img:'assets/imgs/covers/alternative-thinking.png'},
    {title:'Awake Sleep',msg:'12 Meditations', free:'no',new:'yes',img:'assets/imgs/covers/awake-sleep.png'},
  ];

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
