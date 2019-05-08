import { Injectable } from '@angular/core';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { MediaModel } from '../../models/Media';
import { ProductType } from '../../models/ProductType';
import { Platform } from 'ionic-angular';
import { HealthKitModel } from '../../models/healthKit';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class HealthkitServiceProvider {

  private permission: string = 'HKCategoryTypeIdentifierMindfulSession';
  meditationCompletedObserver:Subscription;
  meditationUnCompletedObserver:Subscription;




  constructor(private observerManager: ObserverManagerProvider, private platform:Platform) {
  }

  subscribeMeditation() {
    if (this.meditationCompletedObserver){
      return;
    }
    this.meditationCompletedObserver = this.observerManager.getMediaCompletedObservable()
      .subscribe((media: MediaModel) => {
        if (!media.isIntro){
          this.informMindful(media);
        }
      })
    if (this.meditationUnCompletedObserver){
       return;
    }
    this.meditationUnCompletedObserver = this.observerManager.getMediaUncompletedObservable()
      .subscribe((media: MediaModel) => {
        var diffMillSeconds:number = media.endTime.getTime() - media.beginTime.getTime();
        var diffSeconds:number = diffMillSeconds / 1000;
        if (!media.isIntro && diffSeconds > 30 ){
          this.informMindful(media);
        }else{
          console.warn('Meditation was a intro or  wasnt tracked because its length is minor',diffSeconds)
        }
      })
  }

  unSubscribeMeditation(){
    if (this.meditationCompletedObserver){
      this.meditationCompletedObserver.unsubscribe();
      this.meditationCompletedObserver = null;
    }
    if (this.meditationUnCompletedObserver){
      this.meditationUnCompletedObserver.unsubscribe();
      this.meditationUnCompletedObserver = null;
    }
  }


  async init():Promise<HealthKitModel>{
    return new Promise<HealthKitModel>(async (resolve, reject) => {
      let healthKit:HealthKitModel = new HealthKitModel();
      healthKit.askPermission = false;
      healthKit.enable = false;
      healthKit.platformIsEnabled = true;
      if (!(this.platform.is('ios') && !this.platform.is('ipad'))){
        healthKit.platformIsEnabled = false;
        this.unSubscribeMeditation();
        resolve(healthKit)
        return;
      }
      let auth:string = await this.isEnabled();
      if (auth == 'authorized'){
        healthKit.askPermission = true;
        healthKit.enable = true;
        this.subscribeMeditation();
        resolve(healthKit)
        return;
      }
      if (auth == 'denied'){
        healthKit.askPermission = true;
        healthKit.enable = false;
        this.unSubscribeMeditation();
        resolve(healthKit)
        return;
      }
      this.unSubscribeMeditation();
      resolve(healthKit);
    });
  }


  isEnabled():Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (window && window['plugins'] && window['plugins']['healthkit']){
        (<any>window).plugins.healthkit.checkAuthStatus(
          {
            'type': this.permission
          },
          (auth) => {
            resolve(auth);
          }
        ),
          () => {
            reject()
          }
      }else{
        reject()
      }
    });
  }

  showWelcomeHealthKit():Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      (<any>window).plugins.healthkit.available((yes) => {
        if (!yes) {
          reject()
          return;
        }
        resolve(true)
      }, (error) => {
        resolve(false);
      })
    });
  }

  start(allow: Function, dontAllow: Function):void {
    (<any>window).plugins.healthkit.requestAuthorization(
      {
        readTypes: [],
        writeTypes: [this.permission]
      }
      , (success) => {
        this.isEnabled().then((auth: string) => {
          if (auth == 'authorized') {
            allow();
          } else {
            dontAllow();
          }
        }, (error) => {
          dontAllow();
        })
        //workaround. Tengo que preguntar por el status Issue abierto en el plugin.
      }, (error) => {
        dontAllow();
      })
  }

  informMindful(media: MediaModel):void {
    var healthkitObject = {
      'startDate': media.beginTime,
      'endDate': media.endTime,
      'sampleType': this.permission,
      'amount': 'HLCategoryValue',
      'metadata': {
        'Product': ProductType[media.product]
      }
    };

    if (media.title) {
      healthkitObject.metadata['Title'] = media.title;
    }

    (<any>window).plugins.healthkit.saveCategorySample(
      healthkitObject,
      (success) => {
        console.log("HealthKit. OK");
      },
      (error) => {
        throw error;
      }
    )
  }
}
