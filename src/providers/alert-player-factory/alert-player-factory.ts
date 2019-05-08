import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertPlayerFactoryProvider {

  constructor(public alertController: AlertController) {}

  createAlertPaid():Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Information',
      cssClass: 'custom-alert has-title',
      message: 'This is a premium background sound. Since you are in the middle of a meditation and we don’t want to disturbe you. Please subscribe when you are done.',
      buttons: [
        {
          text: 'OK',
          cssClass: 'royal-alert-button full-width'
        }
      ]
    });
    return prompt;
  }

  createEndSession(handlerOK,handlerNO):Alert{
    let prompt = this.alertController.create({
      mode:'md',
      cssClass: 'custom-alert no-heading text-center' ,
      message: "End this session?",
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
