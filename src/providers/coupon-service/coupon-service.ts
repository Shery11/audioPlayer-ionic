import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouponModel } from '../../models/coupon';



@Injectable()
export class CouponServiceProvider {

  constructor(public http: HttpClient) {}

  get(code:string):Promise<CouponModel>{
    let query = `coupon/${code}`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query;
    return this.http.get<CouponModel>(url).toPromise();
  }

  isSpecialCoupon(coupon:CouponModel):boolean{
    if (coupon && coupon.metadata && coupon.metadata.isEspecial){
      return true;
    }
    return false;
  }

}
