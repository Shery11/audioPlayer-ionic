import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaModel } from '../../models/Media';
import { ProductType } from '../../models/ProductType';

@Injectable()
export class DailyServiceProvider {

  constructor(public http: HttpClient) {}


  shouldRefresh(daily:MediaModel):boolean{
    if (!daily){
      return true;
    }
    var today = new Date();
    var toSearch = daily.date;
    if (  today.getFullYear() == toSearch.getFullYear() &&
          today.getMonth() == toSearch.getMonth() &&
          today.getDate() == toSearch.getDate()){
         return false;  
    }
    return true;
  }

  getMedia() {
    var today = new Date();
    let query:string = ("0" + today.getDate()).slice(-2);
    let url = 'https://xgee98a4wc.execute-api.us-east-1.amazonaws.com/prod/dailymeditation?day=' + query
    return this.http.get(url)
        .map((response:any) => {
          let daily:MediaModel = new MediaModel();
          daily.realLength = parseInt(response.length);
          daily.url = 'https://d37yyvms5rmvcq.cloudfront.net/V2/' + 'daily/' + query + '.mp3',
					daily.title =  response.name,
          daily.isDaily = true;
          daily.tracked = true;
          daily.date = today;
          daily.product = ProductType.Daily
          daily.productTitle = 'Daily Meditation'
          return daily;
        });
  }
}
