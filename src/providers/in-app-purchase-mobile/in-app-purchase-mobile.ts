import { Injectable } from '@angular/core';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import 'rxjs/add/observable/of';
import { StoreProductModel,StoreProductType } from '../../models/storeProduct';
import { SubscriptionModel } from '../../models/subscription';
import { Platform } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { PurchaseServiceProvider } from '../purchase-service/purchase-service';


@Injectable()
export class InAppPurchaseMobileProvider {

  private products:StoreProductModel[] = [];

  private static STORE_PRODUCTS: {[key: string]: StoreProductType} = {
    '15':StoreProductType.Monthly,
    '18':StoreProductType.Yearly,
    '03':StoreProductType.Forever
  }

  constructor(private plt: Platform, 
              private iap: InAppPurchase, 
              private userStorage: StorageProvider,
              private purchaseService:PurchaseServiceProvider) {}

  async getProducts():Promise<StoreProductModel[]>{
    if (this.products && this.products.length > 0){
      return Promise.resolve(this.products);
    }else{
      let keys:string[] = [];
      for (let key in InAppPurchaseMobileProvider.STORE_PRODUCTS) {
        keys.push(key);
      }
      (await this.iap.getProducts(keys)).forEach(element => {
        this.products.push(new StoreProductModel(element.productId,element.title,element.description,element.price,element.currency,InAppPurchaseMobileProvider.STORE_PRODUCTS[element.productId]))
      });
      return this.products;
    }
  }

  getByAlias(type:StoreProductType):StoreProductModel{
    var toReturn=null;
    if (this.products && this.products.length > 0){
      this.products.forEach(element => {
          if (element.alias == type){
             toReturn = element;
             return;     
          }
      });
    }
    return toReturn;
  }

  async subscribe(product:StoreProductModel){
    let result = await this.iap.subscribe(product.id);
    await this.createNewSubscription(product,result);
  }

  async buy(product:StoreProductModel){
    let result = await this.iap.buy(product.id);
    await this.createNewSubscription(product,result)
  };

  private async createNewSubscription (product:StoreProductModel,mobileTX:any){
    let user = await this.userStorage.getUser();
    let subscription:SubscriptionModel = new SubscriptionModel();
    if (this.plt.is('android')){
      subscription = SubscriptionModel.createFromAndroidMobileTransaction(mobileTX,user,product);
    }else{
      subscription = SubscriptionModel.createFromIOSMobileTransaction(mobileTX,user,product);
    }
    await this.purchaseService.newPurchaseMobile(subscription);
  }
}
