import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import { StatSummaryModel } from '../../models/statSummary';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { MediaModel } from '../../models/Media';
import { StorageProvider } from '../storage/storage';
import { MoodModel } from '../../models/mood';

@Injectable()
export class StatServiceProvider {



  constructor(public http: HttpClient, private observerManager:ObserverManagerProvider, private userStorage:StorageProvider) {
  }

  init() {
    this.observerManager.getMediaCompletedObservable()
      .subscribe((media: MediaModel) => {
        if (!media.isIntro){
          this.informStat(media,media.realLength);
        }
      })
    this.observerManager.getMediaUncompletedObservable()
      .subscribe((media: MediaModel) => {
        var diffMillSeconds:number = media.endTime.getTime() - media.beginTime.getTime();
        var diffSeconds:number = diffMillSeconds / 1000;
        if (!media.isIntro && diffSeconds > 30 ){
          this.informStat(media,diffSeconds);
        }else{
          console.warn('Meditation was a intro or wasnt tracked because its length is minor',diffSeconds)
        }
      })
  }

  private async informStat(media: MediaModel, segs:number){
    let user:UserModel  = await this.userStorage.getUser();
    media['media_id'] = media.mediaId;
    media['__id'] = 'stats_' + media.beginTime.toISOString();
    media.segs = segs;
    let query = `/stats/${user._id}/new`;
    let url = 'https://amazon.welzen.org/' + query
    this.http.post(url,media.convertToJSON()).subscribe();
  }

  public informMood(user:UserModel, mood: MoodModel){
    let query = `/stats/${user._id}/new`;
    let url = 'https://amazon.welzen.org/' + query
    let json = mood.convertToJSON();
    let data = {beginTime:new Date(),mood:JSON.parse(json)};
    return this.http.post(url,data);
  }

  getSummary(user: UserModel) {
    let query = `/stats/${user._id}`;
    let url = 'https://amazon.welzen.org/' + query
    return this.http.get<StatSummaryModel>(url)
        .map((summary:StatSummaryModel) => {
          return summary;
        });
  }

  getFeed(user:UserModel, page:number){
    let query = `/stats/${user._id}/data`;
    let url = 'https://amazon.welzen.org/' + query
    
    return this.http.post<any>(url,{page:page})
        .map((stats:any) => {
          return stats;
        });
  }
}
