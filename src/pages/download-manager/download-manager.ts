import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ThemeModel } from '../../models/theme';
import { Subscription } from 'rxjs/Subscription';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-download-manager',
  templateUrl: 'download-manager.html',
})
export class DownloadManagerPage {

  themeSubscription:Subscription;
  theme:ThemeModel;


  constructor(private observerManager: ObserverManagerProvider, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.theme = ThemeModel.default();
  }
  items = [
    {title:'Body Scan',type:'Stress', time:'- 10 Min.',size:'34.5'},
    {title:'Relaxing the Body',type:'Sleep', time:'- 10 Min.',size:'23.6'},
    {title:'Breathe and Relax',type:'Sleep', time:'- 10 Min.',size:'55.3'},
    {title:'The River',type:'Sleep', time:'- 8 Min.',size:'20.5'},
    {title:'Compassion',type:'Parenting - Kids', time:'- 5 Min.',size:'234.5'},
    {title:'What\'s Mindfulness',type:'5 Days', time:'- 8 Min.',size:'44.4'},
    {title:'No Judgement',type:'5 Days', time:'- 8 Min.',size:'75.6'},
    {title:'More Mindfulness',type:'5 Days', time:'- 8 Min.',size:'89.3'},
    {title:'Breathing Awareness',type:'Stress', time:'- 15 Min.',size:'56.0'},
  ];

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

  ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }

}
