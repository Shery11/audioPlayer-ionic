import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  static readonly USER_KEY = 'user';


  constructor(private storage: Storage) {
  }

  saveUser(user:UserModel):Promise<UserModel>{
    return this.storage.set(StorageProvider.USER_KEY,user);
  }

  getUser() : Promise<UserModel>{
    return this.storage.get(StorageProvider.USER_KEY);
  }

  removeUser():Promise<any>{
    return this.storage.remove(StorageProvider.USER_KEY);
  }
}
