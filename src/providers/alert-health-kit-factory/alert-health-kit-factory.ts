import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertHealthKitFactoryProvider {

  constructor(public alertController: AlertController) {}

  createAlertWelcome(handlerOK):Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Apple Health Kit',
      cssClass: 'custom-alert has-title',
      message: "We have integrated the Welzen app with Apple to record your Mindful Minutes to Apple's Health App. Enjoy!.",
      buttons: [
        {
          text: 'Awesome',
          cssClass: 'royal-alert-button full-width',
          handler: data => {
            if (handlerOK){
              handlerOK(data);
            }
          }
        }
      ]
    });
    return prompt;
  }

  createAlertAcceptPermission():Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Apple Health Kit',
      cssClass: 'custom-alert has-title',
      message: "You have authorized our app to report Mindful Minutes to Apple Health!. You can manage this from the setting page.",
      buttons: [
        {
          text: 'Thanks!',
          cssClass: 'royal-alert-button full-width'
        }
      ]
    });
    return prompt;
  }

  createAlertGoToSettingPermission(handlerOK):Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Apple Health Kit',
      cssClass: 'custom-alert has-title',
      message: "To connect Welzen to the iOS Health app, simply open the Apple Health app, tap 'Sources' in the menu bar along the bottom. Tap 'Welzen'. Make sure that 'Mindful Minutes' is turned on.",
      buttons: [
        {
          text: 'Thanks!',
          cssClass: 'royal-alert-button full-width',
          handler: data => {
            if (handlerOK){
              handlerOK(data);
            }
          }
        }
      ]
    });
    return prompt;
  }


  createAlertDisconnect():Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Apple Health Kit',
      cssClass: 'custom-alert has-title',
      message: 'To disconnect Welzen to the iOS Health app, simply open the Apple Health app, tap "Sources" in the menu bar along the bottom. Tap "Welzen". Make sure that "Mindful Minutes" is turned off',
      buttons: [
        {
          text: 'Thanks!',
          cssClass: 'royal-alert-button full-width'
        }
      ]
    });
    return prompt;
  }

  createAlertRejectPermission():Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Apple Health Kit',
      cssClass: 'custom-alert has-title',
      message: "It looks like you didn't allow us to report Mindful Minutes to Apple.",
      buttons: [
        {
          text: 'OK',
          cssClass: 'royal-alert-button full-width'
        }
      ]
    });
    return prompt;
  }

  

}
