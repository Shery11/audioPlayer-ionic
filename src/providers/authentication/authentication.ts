import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import 'rxjs/add/operator/map'
import { StorageProvider } from '../storage/storage';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';



@Injectable()
export class AuthenticationProvider {

  constructor(private observerManager: ObserverManagerProvider , public http: HttpClient, public storageProvider:StorageProvider) {

  }

  login(username: String, password: String) {
    let query = `users?email=${username}&password=${password}`;
    let url = 'https://welzen-test-api.mybluemix.net/' + query
    return this.http.get<UserModel>(url)
        .map(async user => { 
          let userSaved:UserModel = await this.storageProvider.saveUser(user)
          this.observerManager.notifyUser(userSaved);
          return userSaved;
        });
  }

  loginByFacebook(email: String){
    let url = `https://welzen-test-api.mybluemix.net/users/${email}/fb_login`
    return this.http.get<UserModel>(url)
    .map(async user => { 
          let userSaved:UserModel = await this.storageProvider.saveUser(user)
          this.observerManager.notifyUser(userSaved);
          return userSaved;
    });
  }

  resetPassword(email:String){
    let url = `https://welzen-test-api.mybluemix.net/tokens/new`
    return this.http.put(url,{userMail:email});
  }

  async logout(){ 
    await this.storageProvider.removeUser();
    this.observerManager.notifyLogout();
  }
}
