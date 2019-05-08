import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { InAppPurchaseWeb } from '../../models/InAppPurchaseWeb';
import { StoreProductModel, StoreProductType } from '../../models/storeProduct';
import { SubsSuccessPage } from '../subs-success/subs-success';
import { AlertInAppFactoryProvider } from '../../providers/alert-in-app-factory/alert-in-app-factory';
import { CouponServiceProvider } from '../../providers/coupon-service/coupon-service';
import { CouponModel } from '../../models/coupon';
import { LandingPage } from '../landing/landing';
import { StorageProvider } from '../../providers/storage/storage';
import { UserModel } from '../../models/user';
import { SigninPage } from '../signin/signin';
import { SubscriptionInProgressProvider } from '../../providers/subscription-in-progress/subscription-in-progress';

@IonicPage({
  segment: 'unlock/:coupon'
})
@Component({
  selector: 'page-unlock-web',
  templateUrl: 'unlock-web.html',
})
export class UnlockWebPage {
  themeSubscription: Subscription;
  theme: ThemeModel;
  isDataAvailable: boolean = false;

  monthly: StoreProductModel;
  yearly: StoreProductModel;
  forever: StoreProductModel;

  code: string;
  coupon: CouponModel
  isSpecialCode: boolean = false;


  constructor(private alertFactory: AlertInAppFactoryProvider,
    private inAppWeb: InAppPurchaseWeb,
    private observerManager: ObserverManagerProvider,
    private couponService: CouponServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private zone: NgZone,
    private userStorage: StorageProvider,
    private subscriptionInProgress: SubscriptionInProgressProvider) {
    this.theme = ThemeModel.default();
    this.initStore();
  }

  dismiss() {
    this.viewCtrl.dismiss()
      .then(() => {
      }, () => {
        this.navCtrl.setRoot(LandingPage);
      });
  }

  ionViewWillEnter() {
    this.themeSubscription = this.observerManager.getThemeObservable()
      .subscribe((theme: ThemeModel) => {
        this.theme = theme
      })
  }

  ionViewWillLeave() {
    this.themeSubscription.unsubscribe();
  }

  initStore() {
    this.inAppWeb.getProducts()
      .then((products: StoreProductModel[]) => {
        this.monthly = this.inAppWeb.getProductByAlias(StoreProductType.Monthly);
        this.yearly = this.inAppWeb.getProductByAlias(StoreProductType.Yearly);
        this.forever = this.inAppWeb.getProductByAlias(StoreProductType.Forever);
        this.redeemCode(this.navParams.get('coupon'));
        if (this.subscriptionInProgress.hasSubscriptionInProgress()) {
          let inProgress = this.subscriptionInProgress.getSubscriptionInProgress();
          this.subscribeInProgress(inProgress);
        }
        this.isDataAvailable = true;
      })
  }

  private subscribeInProgress(product: StoreProductModel){
    this.newSubscribe(product);
  }

  private async newSubscribe(product: StoreProductModel){
    let user: UserModel = await this.userStorage.getUser();
    if (user == null) {
      this.subscriptionInProgress.setSubscriptionInProgress(product);
      this.navCtrl.push(SigninPage);
    } else {
      this.inAppWeb.subscribe(product)
        .then(() => {
          this.navCtrl.push(SubsSuccessPage);
        })
        .catch((error: Error) => {
          this.subscriptionInProgress.clearSubscriptionInProgress();
          if (error && error.message) {
            this.alertFactory.createErrorPurchase().present();
            throw error;
          }
        })
    }
  }

  async subscribe(product: StoreProductModel) {
    if (product.priceWithDiscount) {
      product.coupon = this.coupon.id
      product.isSpecialCoupon = this.couponService.isSpecialCoupon(this.coupon);
    }
    this.newSubscribe(product);
  }

  redeemCode(newCode?: string) {
    if (newCode) {
      this.code = newCode;
    }
    if (!this.code) {
      this.removeDiscount();
      return;
    }
    this.couponService.get(this.code)
      .then((coupon: CouponModel) => {
        this.zone.run(() => {
          this.coupon = coupon;
          this.isSpecialCode = this.couponService.isSpecialCoupon(this.coupon);
          this.monthly.priceWithDiscount = (Number(this.monthly.price) - (Number(this.monthly.price) * coupon.percent_off) / 100).toFixed(2);
          this.yearly.priceWithDiscount = (Number(this.yearly.price) - (Number(this.yearly.price) * coupon.percent_off) / 100).toFixed(2);
          this.forever.priceWithDiscount = (Number(this.forever.price) - (Number(this.forever.price) * coupon.percent_off) / 100).toFixed(2);
        });
      }, (error: any) => {
        this.removeDiscount();
        this.alertFactory.createCouponNotValid().present();
        throw error;
      })
  }

  getSpecialProduct(): StoreProductModel {
    if (this.coupon.metadata &&
      this.coupon.metadata.isEspecial &&
      this.coupon.metadata.type) {
      let alias = this.coupon.metadata.alias;
      return this.inAppWeb.getProductByAlias(StoreProductType[alias]);
    } else {
      return this.inAppWeb.getProductByAlias(StoreProductType.Forever);
    }
  }

  buy(product: StoreProductModel) {
    this.subscribe(product);
  }

  removeDiscount(){
    this.zone.run(() => {
      this.isSpecialCode = false;
      this.code = null;
      this.coupon = null;
      this.monthly.priceWithDiscount = null;
      this.yearly.priceWithDiscount = null;
      this.forever.priceWithDiscount = null;
    })
  }
}
