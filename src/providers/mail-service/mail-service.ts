import { Injectable } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer';
import { InfoSupportModel } from '../../models/InfoSupport';
import { StoreProductType } from '../../models/storeProduct';

@Injectable()
export class MailServiceProvider {

  SUPPORT_MAIL_TO = 'support@welzen.zendesk.com';


  constructor(private emailComposer: EmailComposer) {
  }

  send(info:InfoSupportModel){
    let options: EmailComposerOptions = {
      to : this.SUPPORT_MAIL_TO,
      subject: 'Welzen feedback for v' + info.version,
      body:    this.getBody(info),
      isHtml : true
    }
    this.emailComposer.open(options);
  }

  private getBody(info:InfoSupportModel):string{
    let body:string = '';
    body = `<b>User: </b> ${info.user.fullname}-${info.user.email}<br/>`
    if (info.user.paid){
      if (!info.user.free_premium){
        let alias:string = StoreProductType[info.subscription.product.alias]
        body = body.concat(`<b>Subscription:</b>${info.subscription.platform} - ${alias} <br/>` );
      }else{
        body = body.concat(`<b>Subscription:</b> FREE PREMIUM <br/>` );
      }
    }else{
      body = body.concat(`<b>Subscription:</b> FREE <br/>`);
    }
    return body
  }

}
