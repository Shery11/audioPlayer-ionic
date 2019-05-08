import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-breathe-settings',
  templateUrl: 'breathe-settings.html',
})
export class BreatheSettingsPage {
  range: number = 20;
  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private plt: Platform, public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController, private observerManager:ObserverManagerProvider) {
    this.initTheme();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }


  ionViewWillEnter(){
    if (!this.isDesktopOrTablet()) {
      this.themeSubscription = this.observerManager.getThemeObservable()
          .subscribe((theme:ThemeModel) => {
            this.theme = theme
      })
    }
  }

  ionViewWillLeave(){
    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
  }

  isDesktopOrTablet():boolean{
    return  (this.plt.is('core') || this.plt.is('tablet'));
  }

  initTheme(){
    if (!this.isDesktopOrTablet()){
      this.theme = ThemeModel.default();
    }else{
      this.theme = ThemeModel.settings();
    }
  }
}
