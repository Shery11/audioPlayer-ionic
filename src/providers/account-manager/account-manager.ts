import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../storage/storage';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';

@Injectable()
export class AccountManagerProvider {

  constructor(private observerManager:ObserverManagerProvider, public http: HttpClient,  private storageProvider:StorageProvider) {
  }

  createAccount(fullname:String, email:String, password:String ){
    let query = `users`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    return this.http.post<UserModel>(url,{fullname:fullname,email:email,password:password})
        .map(async newUser => {
            let userSaved:UserModel = await this.storageProvider.saveUser(newUser)
            this.observerManager.notifyUser(userSaved);
            return userSaved;
        });
  }


  createAccountByFacebook(fullname:String, email:String){
    let query = `users/fb_account`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    return this.http.post<UserModel>(url,{name:fullname,emailFB:email})
        .map(async newUser => {
            let userSaved:UserModel = await this.storageProvider.saveUser(newUser)
            this.observerManager.notifyUser(userSaved);
            return userSaved;
        });
  }


  linkedAccountWithFacebook(emailFB:String, linkEmail:String, linkPassword:String){
    let query = `users/${linkEmail}/fb_link`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    return this.http.post<UserModel>(url,{emailFB:emailFB,password:linkPassword})
        .map(async newUser => {
            let userSaved:UserModel = await this.storageProvider.saveUser(newUser)
            this.observerManager.notifyUser(userSaved);
            return userSaved;
        });
  }


}
