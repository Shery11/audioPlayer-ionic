import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { SubscriptionModel } from '../../models/subscription';
import { PurchaseServiceProvider } from '../../providers/purchase-service/purchase-service';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { AlertInAppFactoryProvider } from '../../providers/alert-in-app-factory/alert-in-app-factory';

@IonicPage()
@Component({
  selector: 'page-subs-cancel',
  templateUrl: 'subs-cancel.html',
})
export class SubsCancelPage {
  themeSubscription:Subscription;
  theme:ThemeModel;
  subscription:SubscriptionModel;
  user:UserModel;

  constructor(private observerManager: ObserverManagerProvider, private purchaseService:PurchaseServiceProvider,
              public navCtrl: NavController, private alertPurchase:AlertInAppFactoryProvider,
              private userStorage:StorageProvider, public navParams: NavParams, private platform:Platform) {
    this.theme = ThemeModel.default();
    this.subscription = this.navParams.get('subscription');
  }

  async ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.user = await this.userStorage.getUser() 
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }

  confirmCancel(){
    if (this.subscription.platform == 'Web' && this.platform.is('core')){
      this.purchaseService.cancelWebPurchase(this.user)
      .subscribe(()=>{
        this.alertPurchase.createCancelOKPurchase(()=>{
          this.navCtrl.setRoot(DashboardPage);
        }).present();
      },(error: any) =>{
        this.alertPurchase.createCancelErrorPurchase(()=>{
          this.navCtrl.setRoot(DashboardPage);
        }).present();
        throw error;
      })
    }else{
      this.navCtrl.setRoot(DashboardPage);
    }
    
  }
}
