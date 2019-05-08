import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';

@Injectable()
export class AppRateProvider {

  constructor(private appRate: AppRate) {}

  init(){
    if (this.appRate && this.appRate.preferences){
      this.appRate.preferences.storeAppURL = {
        ios: '1065762791',
        android: 'market://details?id=com.welzen.welzen'
      };
    }
  }
}
