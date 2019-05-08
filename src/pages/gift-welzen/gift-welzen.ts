import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-gift-welzen',
  templateUrl: 'gift-welzen.html',
})
export class GiftWelzenPage {
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private observerManager: ObserverManagerProvider) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftWelzenPage');
  }

}
