import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionModel } from '../../models/subscription';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { UserModel } from '../../models/user';
import { StoreProductType } from '../../models/storeProduct';

@Injectable()
export class PurchaseServiceProvider {

  constructor(public http: HttpClient, private observerManager:ObserverManagerProvider) {}

  async newPurchaseMobile(subscription:SubscriptionModel):Promise<any>{
    let query = `purchases/new`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    await this.http.post(url,subscription.convertToJSON()).toPromise();
    await this.observerManager.notifySubscription(subscription);
  }

  async newPurchaseWeb(subscription:SubscriptionModel):Promise<any>{
    let query = `purchases/new-stripe`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    await this.http.post(url,subscription.convertToJSON()).toPromise();
    await this.observerManager.notifySubscription(subscription);
  }

  async newPurchaseSpecialCouponWeb(subscription:SubscriptionModel):Promise<any>{
    let query = `coupon/${subscription.product.coupon}/activate`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    await this.http.post(url,subscription.convertToJSON()).toPromise();
    await this.observerManager.notifySubscription(subscription);
  }

  getPurchase(user:UserModel){
    let query = `users/${user._id}/purchase`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    return this.http.get<SubscriptionModel>(url)
      .map((response:SubscriptionModel)=>{
        let subs:SubscriptionModel =  Object.assign({},response);
        subs.product.alias = StoreProductType[response.product.alias.toString()];
        return subs;
      })
  }

  cancelWebPurchase(user:UserModel){
    let query = 'purchases/cancel-web-subscription';
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    return this.http.post(url,{user : user._id},{responseType: 'text'})
      .map((response:any)=>{
        return response;
      })
  }
}
