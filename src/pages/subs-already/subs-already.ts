import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { PurchaseServiceProvider } from '../../providers/purchase-service/purchase-service';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';
import { SubscriptionModel } from '../../models/subscription';
import { StoreProductType, StoreProductModel } from '../../models/storeProduct';
import { DatePipe } from '@angular/common';
import { SubsCancelPage } from '../subs-cancel/subs-cancel';

@IonicPage()
@Component({
  selector: 'page-subs-already',
  templateUrl: 'subs-already.html',
})
export class SubsAlreadyPage {
  themeSubscription: Subscription;
  theme: ThemeModel;
  subscription: SubscriptionModel;
  user: UserModel;
  isSubsAvailable:boolean;

  constructor(private observerManager: ObserverManagerProvider,
    public navCtrl: NavController,
    private userStorage: StorageProvider,
    private datePipe:DatePipe,
    public purchaseService: PurchaseServiceProvider) {
    this.theme = ThemeModel.default();
  }

  async ionViewWillEnter() {
    this.isSubsAvailable = false;
    this.themeSubscription = this.observerManager.getThemeObservable()
      .subscribe((theme: ThemeModel) => {
        this.theme = theme
      })
    this.user = await this.userStorage.getUser()
    if (this.user.free_premium) {
      let productFree: StoreProductModel = new StoreProductModel();
      productFree.alias = StoreProductType.Forever;
      this.subscription = new SubscriptionModel();
      this.subscription.product = productFree;
      this.subscription.platform = 'Web';
      this.isSubsAvailable = true;
    } else {
      this.purchaseService.getPurchase(this.user)
        .subscribe((subs: SubscriptionModel) => {
          this.subscription = subs;
          this.isSubsAvailable = true;
        })
    }
  }

  getMessage(): string {
    if (!this.subscription) {
      return '';
    } else {
      var message = 'You subscribed to Welzen '
      if (!this.user.free_premium) {
        var dataSubs = ' on ' + this.datePipe.transform(this.user.paidDate,'dd/MM/yyyy');
        message = message + dataSubs;
      }
      var platformMessage = ' on your ' + this.subscription.platform + '.';
      if (this.subscription.platform === 'Web') {
        platformMessage = ' our website.';
      }
      message += platformMessage;
      return message;
    }
  }

  getMessageForever(): string {
    if (!this.subscription) {
      return '';
    } else {
      var message = 'This means you have access to Welzen forever without having to pay another penny!';
      if (this.subscription.product.alias === StoreProductType.Forever) {
        return message;
      }
      return '';
    }
  }

  getMessagePlatform(): string {
    if (!this.subscription) {
      return '';
    } else {
      let alias:string = StoreProductType[this.subscription.product.alias];
      return `You have a ${alias} subscription.`;
    }
  }

  getMessageCancelled():string{
    return "However, your subscription has been set to cancel on " + this.datePipe.transform(this.subscription.toBeCancelled,'dd/MM/yyyy');
  }

  hasForeverSubsription():boolean{
    if (this.user.free_premium){
      return true;
    }
    return (this.subscription.product.alias == StoreProductType.Forever)
  }

  ionViewWillLeave() {
    this.themeSubscription.unsubscribe();
  }

  cancelSubs(){
    this.navCtrl.push(SubsCancelPage,{subscription:this.subscription})
  }
}
