import { Injectable } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';

@Injectable()
export class AlertSettingFactoryProvider {

  constructor(public alertController:AlertController) {
  }

  createAlertInternet():Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Information',
      cssClass: 'custom-alert has-title',
      message: 'No internet connection',
      buttons: [
        {
          text: 'OK',
          cssClass: 'royal-alert-button full-width'
        }
      ]
    });
    return prompt;
  }

  createAlertLogout(handlerOK,handlerNO):Alert{
    let prompt = this.alertController.create({
      mode:'md',
      cssClass: 'custom-alert no-heading text-center' ,
      message: "Are you sure you want to log out?",
      buttons: [
        {
          text: 'YES',
          cssClass: 'pink-alert-button',
          handler: data => {
            if (handlerOK){
              handlerOK(data);
            }
          }
        },
        {
          text: 'NO',
          cssClass: 'royal-alert-button',
          handler: data => {
            if (handlerNO){
              handlerNO(data);
            }
          }
        }
      ]
    });
    return prompt;
  }

}
