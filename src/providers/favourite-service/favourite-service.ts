import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import { MediaModel } from '../../models/Media';
import { Observable } from 'rxjs/Observable';
import { MeditationManagerProvider } from '../meditation-manager/meditation-manager';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';


@Injectable()
export class FavouriteServiceProvider {

  private allFavs: MediaModel[];

  constructor(private observerManager:ObserverManagerProvider,  public http: HttpClient, private meditationManager: MeditationManagerProvider){
    this.allFavs = [];
   }

  init(){
    this.observerManager.getLogoutObservable()
      .subscribe(()=>{
        this.allFavs.forEach((media:MediaModel)=>{
          media.isFav = false;
        })
        this.allFavs = [];
    })
  }

  //checkear internet
  getAll(user: UserModel, forceHttp:boolean=false): Observable<MediaModel[]> {
    let query = `favorites/${user._id}`;
    let url = 'https://amazon.welzen.org/' + query
    if ( (this.allFavs && this.allFavs.length > 0) && !forceHttp) {
      return Observable.of(this.allFavs);
    } else {
      return this.http.get<any[]>(url)
        .map((mediasFav: any[]) => {
          this.allFavs = [];
          mediasFav.forEach((element) => {
            var mediaId =  element.media.media_id;
            var meditationId = element.media.meditationid;
            var fav: MediaModel = this.meditationManager.getMediaByMeditationId(meditationId, mediaId);
            fav.isFav = true; 
            this.allFavs.push(fav);
          });
          return this.allFavs;
        });
    }
  }

  //checkear internet
  save(user: UserModel, media: MediaModel): Observable<void> {
    let query = `favorites/new`;
    let url = 'https://amazon.welzen.org/' + query
    media['media_id'] = media.mediaId; //workaround favs ionic 1
    media['meditationid'] = media.meditationId; //workaround favs ionic 1
    var data = {
      user: user._id,
      media: { media: JSON.parse(media.convertToJSON()) }
    }
    return this.http.post<any>(url, data)
      .map(() => {
        this.allFavs.push(media);
        return;
      })
  }

  //checkear internet
  delete(user: UserModel, media: MediaModel): Observable<void> {
    let query = `favorites/del`;
    let url = 'https://amazon.welzen.org/' + query
    var data = {
        user: user._id,
        media_id: media.mediaId
    }
    return this.http.request('delete',url, {body:data})
      .map(() => {
        for (var index = 0; index < this.allFavs.length; index++) {
          if (this.allFavs[index].mediaId == media.mediaId) {
            this.allFavs.splice(index, 1);
            return;
          }
        }
      });
  }
}
