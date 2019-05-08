import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { MediaModel } from '../../models/Media';
import { Observable } from 'rxjs/Observable';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { Subscription } from 'rxjs/Subscription';



@Injectable()
export class MeditationSoundPlayerProvider {

  media : MediaObject ;
  successSubscription:Subscription;
  private static SKIP_REWIND_FORWARD_MILLISECONDS : number = 15 * 1000; //15 seconds

  constructor(private mediaPlayer: Media, private observerManager:ObserverManagerProvider) {

  }

  init(meditation:MediaModel){
    this.media = this.mediaPlayer.create(meditation.url);
    this.successSubscription = this.media.onSuccess.subscribe(()=>{
      meditation.endTime = new Date();
      this.observerManager.notifyMediaCompleted(meditation);
    })
  }

  play(){
    this.media.play();
  }

  pause(){
    this.media.pause();
  }

  stop(){
    this.media.stop();
  }

  async rewind(){
    let actualPositonSeconds:number = await this.media.getCurrentPosition()
    this.media.seekTo(actualPositonSeconds*1000 - MeditationSoundPlayerProvider.SKIP_REWIND_FORWARD_MILLISECONDS);
  }

  async forward(){
    let actualPositonSeconds:number = await this.media.getCurrentPosition()
    this.media.seekTo(actualPositonSeconds*1000 + MeditationSoundPlayerProvider.SKIP_REWIND_FORWARD_MILLISECONDS);
  }

  setVolume(volume:number){
    this.media.setVolume(volume);
  }

  getCurrentPosition():Promise<number>{
    return this.media.getCurrentPosition()
  }

  release(){
    this.media.release();
    if (this.successSubscription){
      this.successSubscription.unsubscribe();
    }
  }

  getObserverStatus():Observable<any>{
    return this.media.onStatusUpdate;
  }
}
