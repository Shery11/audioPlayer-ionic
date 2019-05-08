import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppPurchaseWeb } from '../../models/InAppPurchaseWeb';
import { StoreProductModel } from '../../models/storeProduct';
import { StripeServiceProvider } from '../stripe-service/stripe-service';
import { StorageProvider } from '../storage/storage';
import { SubscriptionModel } from '../../models/subscription';
import { PurchaseServiceProvider } from '../purchase-service/purchase-service';

@Injectable()
export class InAppPurchaseWebSimpleProvider extends InAppPurchaseWeb {

  constructor(public http: HttpClient, 
              private stripeService:StripeServiceProvider,
              private userStorage:StorageProvider,
              private purchaseService:PurchaseServiceProvider) {
    super();
  }

  async searchProducts():Promise<StoreProductModel[]>{
    let query = `products/web`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query;
    return await this.http.get<StoreProductModel[]>(url).toPromise();
  }

  async subscribe(product:StoreProductModel){
    let user = await this.userStorage.getUser();
    let subscription:SubscriptionModel = null;
    if (!product.isSpecialCoupon){
      let token = await this.stripeService.getToken(user,product);
      subscription = SubscriptionModel.createFromWebTransaction(token,user,product);
      await this.purchaseService.newPurchaseWeb(subscription);
    }else{
      subscription = SubscriptionModel.createFromSpecialCouponWeb(user,product);
      await this.purchaseService.newPurchaseSpecialCouponWeb(subscription);
    }
  }

  async buy(product:StoreProductModel){
    await this.subscribe(product);
  }

}
