import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Platform} from 'ionic-angular';
import { ReminderModel } from '../../models/reminder';
import { ReminderStorageProvider } from '../../providers/reminder-storage/reminder-storage';
import { ReminderNotificationProvider } from '../../providers/reminder-notification/reminder-notification';

import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';

import * as moment from 'moment';
import { ThemeModel } from '../../models/theme';
import { Subscription } from 'rxjs/Subscription';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {

  reminders : ReminderModel[];
  activeReminder : boolean = false;
  themeSubscription:Subscription;
  theme:ThemeModel;
  isUserAvailable:boolean = false;
  user:UserModel;

  constructor(private platform:Platform, private reminderNotificationService:ReminderNotificationProvider, public navCtrl: NavController, private reminderStorage:ReminderStorageProvider,
     public modalCtrl: ModalController, private observerManager: ObserverManagerProvider,
     private userStorage:StorageProvider) {
    this.theme = ThemeModel.default();
  }
  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage);
    modal.present();
  }

  openUnlock(){
    if (this.platform.is('core')){
      this.openUnlockWebPage()
    }else{
      this.openUnlockMobileModal();
    }
  }

  async ionViewWillEnter(){
    this.activeReminder = await this.reminderStorage.isActiveReminder();
    this.reminders  = await this.reminderStorage.getAllReminders()
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    this.user = await this.userStorage.getUser();
    this.isUserAvailable = true;
  }

  turnOnOffReminder(){
    this.reminderStorage.saveActiveReminder(this.activeReminder);
    if (this.activeReminder){
      this.turnOn();
    }else{
      this.turnOff();
    }
  }

  private turnOn(){
    if (this.reminders.length == 0){
      var today : moment.Moment = moment().add(1, 'hours');
      var id:number =  today.valueOf();
      var newReminder = new ReminderModel(id,today.format());
      this.reminders.push(newReminder)
      this.reminderStorage.saveAllReminders(this.reminders);
      this.reminderNotificationService.scheduleAlarms(this.reminders);
    }else{
      this.reminderNotificationService.scheduleAlarms(this.reminders);
    }
  }

  private turnOff(){
    this.reminderNotificationService.turnOffAlarms();
  }

  addReminder(reminder:ReminderModel){
    this.reminderStorage.saveAllReminders(this.reminders);
    this.reminderNotificationService.updateScheduleAlarm(reminder);
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }
}
