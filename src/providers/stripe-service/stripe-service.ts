import { Injectable } from '@angular/core';
import { StoreProductModel } from '../../models/storeProduct';
import { UserModel } from '../../models/user';

@Injectable()
export class StripeServiceProvider {

  getToken(user:UserModel, 
           product:StoreProductModel):Promise<any>{
    return new Promise((resolve, reject) => {
      let handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_zSO5jEuvDChSQYjQKmNjOO19',
        token: function (token: any) {
          resolve(token);
        },
        closed: reject
      });

      handler.open({
        name: product.alias,
        description: product.description,
        image: "https://s3.amazonaws.com/stripe-uploads/acct_16msxSIeHy0T3AvSmerchant-icon-1453276811164-round.png",
        locale:"US",
        email : user.email
      });
    })
  }
}