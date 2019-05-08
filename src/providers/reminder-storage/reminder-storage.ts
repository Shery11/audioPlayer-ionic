import { Injectable } from '@angular/core';
import { ReminderModel } from '../../models/reminder';
import { Storage } from '@ionic/storage';


@Injectable()
export class ReminderStorageProvider {

  static readonly REMINDER_KEY = "wlz_reminders";
  static readonly REMINDER_ACTIVE_KEY = "wlz_reminder_active";


  constructor(public storage: Storage) {
  }

  saveAllReminders(remiders:ReminderModel[]):void{
    this.storage.set(ReminderStorageProvider.REMINDER_KEY,remiders);
  }

  async getAllReminders(filter?:Function):Promise<ReminderModel[]>{
    var reminders: ReminderModel[] = await this.storage.get(ReminderStorageProvider.REMINDER_KEY);
    var toReturn:ReminderModel[] = [];
    if (!reminders){
      return toReturn;
    }
    reminders.forEach((element:ReminderModel) => {
      var remider = new ReminderModel();
      Object.assign(remider, element);
      if (filter == null ||  !filter(remider)){
        toReturn.push(remider);
      }
    });
    return toReturn;
  }

  saveActiveReminder(active:boolean):void{
    this.storage.set(ReminderStorageProvider.REMINDER_ACTIVE_KEY,active);
  }

  isActiveReminder():Promise<boolean>{
    return this.storage.get(ReminderStorageProvider.REMINDER_ACTIVE_KEY);
  }
}
