import { StoreProductModel, StoreProductType } from "./storeProduct";

export abstract class InAppPurchaseWeb {

    protected products:StoreProductModel[];

    protected abstract searchProducts():Promise<StoreProductModel[]>;

    public async getProducts():Promise<StoreProductModel[]>{
        if (this.products && this.products.length > 0){
            return Promise.resolve(this.products);
        }else{
            this.products = await this.searchProducts()
            return Promise.resolve(this.products);
        }
    }

    public abstract subscribe(product:StoreProductModel);


    public abstract buy(product:StoreProductModel);

    public getProductByAlias(type:StoreProductType){
        var toReturn=null;
        if (this.products && this.products.length > 0){
          this.products.forEach((element:StoreProductModel) => {
              if (StoreProductType[element.alias.toString()] == type){
                 toReturn = element;
                 return;     
              }
          });
        }
        return toReturn;
      }

}