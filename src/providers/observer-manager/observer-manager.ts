import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { UserModel } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { ThemeModel } from '../../models/theme';
import { BackgroundSound } from '../../models/backgroundSound';
import { SubscriptionModel } from '../../models/subscription';
import { MediaModel } from '../../models/Media';
import { MeditationModel } from '../../models/Meditation';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ObserverManagerProvider {

  //User
  private userSubject = new ReplaySubject<UserModel>(1);
  private user$ = this.userSubject.asObservable();

  public notifyUser(newUser: UserModel) {
    this.userSubject.next(newUser);
  }
  public getUserObservable(): Observable<UserModel> {
    return this.user$;
  }

  //Theme
  private themeSubject = new ReplaySubject<ThemeModel>(1);
  private theme$ = this.themeSubject.asObservable();

  public notifyTheme(newTheme: ThemeModel) {
    this.themeSubject.next(newTheme);
  }
  public getThemeObservable(): Observable<ThemeModel> {
    return this.theme$;
  }

    //Meditations
    private meditationSubject = new ReplaySubject<Array<MeditationModel>>(1);
    private meditation$ = this.meditationSubject.asObservable();
  
    public notifyMeditations(newMeditations: Array<MeditationModel>) {
      this.meditationSubject.next(newMeditations);
    }
    public getMeditationsObservable(): Observable<Array<MeditationModel>> {
    return this.meditation$;
  }
  

  //Background Sound
  private backgroundSoundSubject = new ReplaySubject<BackgroundSound>(1);
  private background$ = this.backgroundSoundSubject.asObservable();

  public notifyBackgroundSound(newBackgroundSound: BackgroundSound) {
    this.backgroundSoundSubject.next(newBackgroundSound);
  }
  public getBackgroundSoundObservable(): Observable<BackgroundSound> {
    return this.background$;
  }

  //Buy
  private subscriptionSubject = new ReplaySubject<any>(1);
  private subscription$ = this.subscriptionSubject.asObservable();

  public notifySubscription(subscription: SubscriptionModel) {
    this.subscriptionSubject.next(subscription);
  }
  public getSubscriptionObservable(): Observable<SubscriptionModel> {
    return this.subscription$;
  }

  //logout
  private logoutSubject = new ReplaySubject<any>(1);
  private logout$ = this.logoutSubject.asObservable();

  public notifyLogout() {
    this.logoutSubject.next(null);
  }
  public getLogoutObservable(): Observable<any> {
    return this.logout$;
  }

  //Completed
  private mediaCompletedSubject = new Subject<MediaModel>();
  private mediaCompleted$ = this.mediaCompletedSubject.asObservable();

  public notifyMediaCompleted(media) {
    this.mediaCompletedSubject.next(media);
  }
  public getMediaCompletedObservable(): Observable<MediaModel> {
    return this.mediaCompleted$;
  }

  //Completed
  private mediaUncompletedSubject = new Subject<MediaModel>();
  private mediaUncompleted$ = this.mediaUncompletedSubject.asObservable();

  public notifyMediaUncompleted(media) {
    this.mediaUncompletedSubject.next(media);
  }
  public getMediaUncompletedObservable(): Observable<MediaModel> {
    return this.mediaUncompleted$;
  }




}
