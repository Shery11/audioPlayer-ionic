import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertInAppFactoryProvider {


  constructor(public alertController: AlertController) {}

  createErrorPurchase():Alert{
    return this.createSimpleGeneric('Whoopsie Daisy!','We have an error. Please contact us!');
  }

  createCouponNotValid():Alert{
    return this.createSimpleGeneric('Whoopsie Daisy!','This coupon code is invalid or has expired');
  }

  createCancelOKPurchase(handlerOK):Alert{
    return this.createSimpleGeneric('Cancel','This subscription has been set to cancel at the end of the billing period.',handlerOK);
  }

  createCancelErrorPurchase(handlerOK):Alert{
    return this.createSimpleGeneric('Error','Occurred an error with try to cancel this subscription. Please contact us!.',handlerOK);
  }

  private createSimpleGeneric(title:String, message:String, handlerOK?){
    let prompt = this.alertController.create({
      mode:'md',
      title: title.toString(),
      cssClass: 'custom-alert has-title',
      message: message.toString(),
      buttons: [
        {
          text: 'OK',
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

}
