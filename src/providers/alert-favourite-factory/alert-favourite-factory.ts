import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertFavouriteFactoryProvider {

  constructor(public alertController:AlertController) {
  }

  createAlertRemove(handlerOK,handlerNO):Alert{
    let prompt = this.alertController.create({
      mode:'md',
      cssClass: 'custom-alert no-heading text-center' ,
      message: "Are you sure to delete this favorite?",
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
