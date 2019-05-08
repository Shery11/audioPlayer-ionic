import { Injectable } from '@angular/core';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { StoreProductModel } from '../../models/storeProduct';
import { SubscriptionModel } from '../../models/subscription';

@Injectable()
export class SubscriptionInProgressProvider {

  private subscriptionInProgress: StoreProductModel;

  constructor(public observerManager: ObserverManagerProvider) { }

  init() {
    this.observerManager.getSubscriptionObservable()
      .subscribe(
        (subs: SubscriptionModel) => {
          this.clearSubscriptionInProgress();
        })
  };

  setSubscriptionInProgress(subs: StoreProductModel) {
    this.subscriptionInProgress = subs;
  }

  clearSubscriptionInProgress() {
    this.subscriptionInProgress = null;
  }

  getSubscriptionInProgress():StoreProductModel {
    return this.subscriptionInProgress
  }

  hasSubscriptionInProgress():boolean{
    return (this.subscriptionInProgress != null)
  }

}
