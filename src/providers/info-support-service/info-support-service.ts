import { Injectable } from '@angular/core';
import { PurchaseServiceProvider } from '../purchase-service/purchase-service';
import { AppVersion } from '@ionic-native/app-version';
import { InfoSupportModel } from '../../models/InfoSupport';
import { StorageProvider } from '../storage/storage';
import { SubscriptionModel } from '../../models/subscription';

@Injectable()
export class InfoSupportServiceProvider {

  constructor(public purchaseService: PurchaseServiceProvider, 
              private appVersion:AppVersion,
              private userStorage:StorageProvider) {
  }

  build():Promise<InfoSupportModel>{
    return new Promise(async (resolve, reject) => {
      let info:InfoSupportModel = new InfoSupportModel();
      info.version = await this.appVersion.getVersionNumber();
      info.user = await this.userStorage.getUser();
      if (info.user.paid){
        this.purchaseService.getPurchase(info.user)
          .subscribe((subs:SubscriptionModel)=>{
            info.subscription = subs;
            resolve(info);
          })
      }else{
        resolve(info)
      }
    })
  }

}
