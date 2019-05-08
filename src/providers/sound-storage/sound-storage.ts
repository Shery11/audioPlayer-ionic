import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { BackgroundSound } from '../../models/backgroundSound';


@Injectable()
export class SoundStorageProvider {

  static readonly BACKGROUND_SOUND_KEY = "wlz_background";
  private allBackgroundSound:BackgroundSound[];


  constructor(private http:HttpClient, private storage:Storage, private observerManager:ObserverManagerProvider) {
  }

  async init(){
    var current:BackgroundSound = await this.get();
    if (current){
      this.observerManager.notifyBackgroundSound(new BackgroundSound(current['_id'],current['_name'],current['_free'],current['_url']))
    }else{
      this.observerManager.notifyBackgroundSound(BackgroundSound.default());
    }
  }

  save(background:BackgroundSound):Promise<BackgroundSound>{
    return this.storage.set(SoundStorageProvider.BACKGROUND_SOUND_KEY,background);
  }

  get() : Promise<BackgroundSound>{
    return this.storage.get(SoundStorageProvider.BACKGROUND_SOUND_KEY);
  }

  getAll():Observable<BackgroundSound[]>{
    if (this.allBackgroundSound &&  this.allBackgroundSound.length > 0){
      return Observable.of(this.allBackgroundSound);
    }else{
      return this.http.get<Object[]>("./assets/data/background-sound.json")
        .map((sounds) => { 
          this.allBackgroundSound = [BackgroundSound.default()];
          sounds.forEach(object => {
            this.allBackgroundSound.push(new BackgroundSound(object['id'],object['name'],object['free']=='true',object['url']));
          });
          return this.allBackgroundSound;
        })
    }
  }
}
