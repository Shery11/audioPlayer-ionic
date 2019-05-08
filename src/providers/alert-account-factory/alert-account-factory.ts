import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';


@Injectable()
export class AlertAccountFactoryProvider {

  constructor(public alertController: AlertController) {}


  createSimpleWrongUserPassword():Alert{
    return this.createSimpleGeneric('Whoopsie Daisy!','Wrong email or password');
  }

  createSimpleServerError():Alert{
    return this.createSimpleGeneric('Whoopsie Daisy!','An error ocurrs in our server. Please try again!');
  }

  createSimpleUserAlreadyExists():Alert{
    return this.createSimpleGeneric('Whoopsie Daisy!','User already exists!');
  }

  private createSimpleGeneric(title:String, message:String){
    let prompt = this.alertController.create({
      mode:'md',
      title: title.toString(),
      cssClass: 'custom-alert has-title',
      message: message.toString(),
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
