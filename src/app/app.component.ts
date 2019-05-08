import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { UserModel } from '../models/user';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { ObserverManagerProvider } from '../providers/observer-manager/observer-manager';
import { ThemeServiceProvider } from '../providers/theme-service/theme-service';

import * as meditations from "../assets/data/meditations.json";
import { MeditationsDataModel } from '../models/MeditationsData';
import { MeditationManagerProvider } from '../providers/meditation-manager/meditation-manager';
import { SubscriptionInProgressProvider } from '../providers/subscription-in-progress/subscription-in-progress';
import { ConnectionNetworkProvider } from '../providers/connection-network/connection-network';
import { FavouriteServiceProvider } from '../providers/favourite-service/favourite-service';
import { AppRateProvider } from '../providers/app-rate/app-rate';
import { HealthkitServiceProvider } from '../providers/healthkit-service/healthkit-service';
import { StatServiceProvider } from '../providers/stat-service/stat-service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = DashboardPage;
  resumePlatformSubscription:Subscription;

  constructor(private observerManager:ObserverManagerProvider,
              private userService:UserServiceProvider,
              private themeService:ThemeServiceProvider,
              private storageProvider:StorageProvider,
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private subscriptionInProgress: SubscriptionInProgressProvider,
              private meditationManagerProvider:MeditationManagerProvider,
              private connectionInternet:ConnectionNetworkProvider,
              private favouriteService:FavouriteServiceProvider, 
              private appRateService:AppRateProvider,
              private healthkitService:HealthkitServiceProvider,
              private statsService:StatServiceProvider) {
    this.platform.ready().then(() => {
      this.resumePlatformSubscription =this.platform.resume.subscribe(()=>{
        this.healthkitService.init();
      })
      // initialize the meditations from JSON and save them in a @MeditationManagerProvider
      const meditationsData:MeditationsDataModel = <any>meditations;
      this.meditationManagerProvider.fromJson(meditationsData);

      this.statusBar.show();
      this.splashScreen.hide();
      this.themeService.init();
      this.userService.init();
      this.subscriptionInProgress.init();
      this.connectionInternet.init();
      this.favouriteService.init();
      this.appRateService.init();
      this.healthkitService.init();
      this.statsService.init();
      this.storageProvider.getUser()
        .then((user:UserModel) => {
          console.log("User ",user);
          if (user){
            this.observerManager.notifyUser(user);
          }
        })
    });
  }

  ionViewWillUnload() {
    if (this.resumePlatformSubscription){
      this.resumePlatformSubscription.unsubscribe();
    }
  }
}
