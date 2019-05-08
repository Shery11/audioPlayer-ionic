import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { StoreProductModel, StoreProductType } from '../../models/storeProduct';
import { InAppPurchaseMobileProvider } from '../../providers/in-app-purchase-mobile/in-app-purchase-mobile';
import { SubsSuccessPage } from '../subs-success/subs-success';
import { AlertInAppFactoryProvider } from '../../providers/alert-in-app-factory/alert-in-app-factory';

@IonicPage()
@Component({
  selector: 'page-unlock-mobile',
  templateUrl: 'unlock-mobile.html',
})
export class UnlockMobilePage {
  themeSubscription:Subscription;
  theme:ThemeModel;
  storeProducts:StoreProductModel[];
  isDataAvailable:boolean = false;

  constructor(private alertFactory:AlertInAppFactoryProvider, private inAppMobile:InAppPurchaseMobileProvider, private plt: Platform, private observerManager: ObserverManagerProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.initTheme();
    this.initStore();
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

  getMontlySubscription(){
    return this.inAppMobile.getByAlias(StoreProductType.Monthly);
  }
  getYearlySubscription(){
    return this.inAppMobile.getByAlias(StoreProductType.Yearly);
  }
  getForever(){
    return this.inAppMobile.getByAlias(StoreProductType.Forever);
  }

  subscribe(product:StoreProductModel){
    this.inAppMobile.subscribe(product)
      .then(()=>{
        this.navCtrl.push(SubsSuccessPage);
      })
      .catch((error:Error)=>{
        if (error && error.message){
          this.alertFactory.createErrorPurchase();
          throw error;
        }
      })
  }

  buy(product:StoreProductModel){
    this.inAppMobile.buy(product);
  }

  initStore(){
    this.inAppMobile.getProducts()
      .then((products:StoreProductModel[]) =>{
        this.storeProducts = products;
        this.isDataAvailable = true;
      })
  }
}
