import { Injectable } from '@angular/core';
import { ReminderModel } from '../../models/reminder';



@Injectable()
export class ReminderNotificationProvider {


  scheduleAlarms(reminders:ReminderModel[]){
    reminders.forEach(reminder => {
      this.scheduleAlarm(reminder);
    });
  }

  turnOffAlarms(){
    (<any>window).cordova.plugins.notification.local.cancelAll();
  }

  updateScheduleAlarm(reminder:ReminderModel){
    (<any>window).cordova.plugins.notification.local.cancel(reminder.id);
    this.scheduleAlarm(reminder);
  }

  scheduleAlarm(reminder:ReminderModel){
    (<any>window).cordova.plugins.notification.local.schedule({
      id: reminder.id,
      trigger: { every: { hour: reminder.getFirstTime().getHours(), minute: reminder.getFirstTime().getMinutes() } },
      title: 'Welzen Reminder',
      text: 'A gentle reminder to come back and meditate with us.'
    });
  }
}
