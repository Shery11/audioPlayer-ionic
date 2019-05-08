import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController, Toast } from 'ionic-angular';


@Injectable()
export class ConnectionNetworkProvider {

  activeToast:Toast;

  constructor(public network: Network, private toastCtrl: ToastController) {}

  init(){
    this.network.onDisconnect().subscribe(() => {
      this.activeToast = this.toastCtrl.create({
        message: "It looks like you've lost your internet connection...",
        position: 'bottom'
      });
      this.activeToast.present();
    });

    this.network.onConnect().subscribe(() => {
      if (this.activeToast){
        this.activeToast.dismiss();
      }
    });
  }
}
