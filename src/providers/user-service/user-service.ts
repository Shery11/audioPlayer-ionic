import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import { ThemeModel } from '../../models/theme';
import { StorageProvider } from '../storage/storage';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { HttpClient } from '@angular/common/http';
import { SubscriptionModel } from '../../models/subscription';

@Injectable()
export class UserServiceProvider {

  constructor(private http:HttpClient, private observerManager:ObserverManagerProvider, private userStorage:StorageProvider){
  }

  init(){
    this.observerManager.getThemeObservable()
      .subscribe((theme:ThemeModel) => {
        this.userStorage.getUser()
          .then((user:UserModel)=>{
            if (user.theme != theme.css){
              user.theme = theme.css;
              this.userStorage.saveUser(user);
              this.updateRemoteUserTheme(user);
            }
          })
    })

    this.observerManager.getSubscriptionObservable()
      .subscribe(async (subcription:SubscriptionModel)=>{
        let user = await this.userStorage.getUser();
        user.paid = true;
        user.paidDate = new Date();
        await this.userStorage.saveUser(user);
        this.observerManager.notifyUser(user);
      })
  }

  private updateRemoteUserTheme(user:UserModel):void{
    let query = `users/${user._id}/theme?theme=${user.theme}`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    this.http.put(url, {})
    .subscribe(
      (response) => {
        
      },
      error => {
        throw error;
      });
  }
}
