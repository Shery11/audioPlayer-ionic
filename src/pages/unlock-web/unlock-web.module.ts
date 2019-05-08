import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnlockWebPage } from './unlock-web';
import { InAppPurchaseWeb } from '../../models/InAppPurchaseWeb';
import { InAppPurchaseWebSimpleProvider } from '../../providers/in-app-purchase-web-simple/in-app-purchase-web-simple';

@NgModule({
  declarations: [
    UnlockWebPage,
  ],
  imports: [
    IonicPageModule.forChild(UnlockWebPage),
  ],
  providers:[
    {provide: InAppPurchaseWeb, useClass: InAppPurchaseWebSimpleProvider}
  ]
})
export class UnlockWebPageModule {}
