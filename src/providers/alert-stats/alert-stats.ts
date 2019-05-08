import { Injectable } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';

@Injectable()
export class AlertStatsProvider {

  constructor(private alertController: AlertController) {}

  createAlertMoodError():Alert{
    let prompt = this.alertController.create({
      mode:'md',
      title: 'Whoopsie Daisy!',
      cssClass: 'custom-alert has-title',
      message: 'An error ocurrs in our server. Please try again!',
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
