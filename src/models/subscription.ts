import { StoreProductModel, StoreProductType } from "./storeProduct";
import { UserModel } from "./user";

export class SubscriptionModel {
    
    private _product:StoreProductModel;
    private _user:string;
    private _platform:string;
    private _receiptsBase64?:any;
    private	_purchaseToken?:string
    private _toBeCancelled:Date


    get product() : StoreProductModel {
        return this._product
    }

    set product (newProduct: StoreProductModel) {
        this._product = newProduct
    }

    get user() : string {
        return this._user
    }

    set user (u: string) {
        this._user = u
    }

    get platform() : string {
        return this._platform
    }

    set platform (u: string) {
        this._platform = u
    }

    get receiptsBase64() : any {
        return this._receiptsBase64
    }

    set receiptsBase64 (u: any) {
        this._receiptsBase64 = u
    }

    get purchaseToken() : string {
        return this._purchaseToken
    }

    set purchaseToken (u: string) {
        this._purchaseToken = u
    }

    get toBeCancelled() : Date {
        return this._toBeCancelled
    }
    set toBeCancelled (u: Date) {
        this._toBeCancelled = u
    }

    public static createFromIOSMobileTransaction(mobileTx:any,user:UserModel,product:StoreProductModel):SubscriptionModel{
        var subscription:SubscriptionModel = new SubscriptionModel();
        subscription.product = product;
        subscription.product.alias = <any>StoreProductType[subscription.product.alias]
        subscription.product.email = user.email.toString();
        subscription.user = user._id.toString();
        subscription.platform = 'IOS';
        subscription.receiptsBase64={
            appStoreReceipt:mobileTx.receipt
        }
        return subscription;
    }

    public static createFromAndroidMobileTransaction(mobileTx:any,user:UserModel,product:StoreProductModel):SubscriptionModel{
        let subscription = new SubscriptionModel();
        subscription.product = product;
        subscription.product.alias = <any>StoreProductType[subscription.product.alias]
        subscription.product.email = user.email.toString();
        subscription.user = user._id.toString();
        subscription.platform = 'Android';
        subscription.purchaseToken = mobileTx.transactionId;
        subscription.product.transaction = {
            receipt:mobileTx.receipt,
            signature: mobileTx.signature
        }
        return subscription;
    }


    public static createFromWebTransaction(token:any,user:UserModel,product:StoreProductModel):SubscriptionModel{
        let subscription = new SubscriptionModel();
        subscription.product = product;
        subscription.product.email = user.email.toString();
        subscription.user = user._id.toString();
        subscription.platform = 'Web';
        subscription.purchaseToken = token;
        return subscription;
    }

    public static createFromSpecialCouponWeb(user:UserModel,product:StoreProductModel):SubscriptionModel{
        let subscription = new SubscriptionModel();
        subscription.product = product;
        subscription.product.email = user.email.toString();
        subscription.user = user._id.toString();
        subscription.platform = 'Web';
        return subscription;
    }


    public convertToJSON(): string {
        let json = JSON.stringify(this);
        Object.keys(this.product).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });
        Object.keys(this).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return json;
    }
}

