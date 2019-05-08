import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Platform } from 'ionic-angular';
import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  themeSubscription:Subscription;
  theme:ThemeModel;

  constructor(private platform: Platform, private observerManager: ObserverManagerProvider, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.theme = ThemeModel.default();
  }
  
  items = [
    {title:'Body Scan',type:'Stress', time:'- 10 Min.'},
    {title:'Relaxing the Body',type:'Sleep', time:'- 10 Min.'},
    {title:'Breathe and Relax',type:'Sleep', time:'- 10 Min.'},
    {title:'The River',type:'Sleep', time:'- 8 Min.'},
    {title:'Compassion',type:'Parenting - Kids', time:'- 5 Min.'},
    {title:'What\'s Mindfulness',type:'5 Days', time:'- 8 Min.'},
    {title:'No Judgement',type:'5 Days', time:'- 8 Min.'},
    {title:'More Mindfulness',type:'5 Days', time:'- 8 Min.'},
    {title:'Breathing Awareness',type:'Stress', time:'- 15 Min.'},
  ];

  ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }

  showDeleteConfirm() {
    let prompt = this.alertCtrl.create({
      mode:'md',
      // title: 'Login',
      cssClass: 'custom-alert no-heading',
      message: "Are you sure to delete this favorite?",
      buttons: [
        {
          text: 'No',
          cssClass: 'pink-alert-button',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          cssClass: 'royal-alert-button',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage);
    modal.present();
  }

  openUnlock(){
    if (this.platform.is('core')){
      this.openUnlockWebPage()
    }else{
      this.openUnlockMobileModal();
    }
  }
}
