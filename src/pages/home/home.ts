import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

import { SigninPage } from '../signin/signin';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { AboutPage } from '../about/about';
import { BreathePage } from '../breathe/breathe';
import { DashboardPage } from '../dashboard/dashboard';
import { TeamsPage } from '../teams/teams';
import { ContactPage } from '../contact/contact';
import { TermsPage } from '../terms/terms';
import { SignupPage } from '../signup/signup';
import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { NavController, ModalController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  themeSubscription:Subscription;
  theme:ThemeModel;
  smMenuActive:boolean = false;
  slidesPerView : number = 1;
  constructor(public navCtrl: NavController,public platform :Platform, private observerManager: ObserverManagerProvider, private modalCtrl: ModalController) {
    this.theme = ThemeModel.default();
    console.log('Screen Width is: ',this.platform.width());

  }
  openBreathePage(){
    this.navCtrl.push(BreathePage)
  }
  openDashboardPage(){
    this.navCtrl.push(DashboardPage)
  }
  openTeamsPage(){
    this.navCtrl.push(TeamsPage)
  }
  openContactPage(){
    this.navCtrl.push(ContactPage)
  }
  openTermsPage(){
    this.navCtrl.push(TermsPage)
  }
  openSignupPage(){
    this.navCtrl.push(SignupPage)
  }
  openSigninPage(){
    this.navCtrl.push(SigninPage)
  }
  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openAboutPage(){
    this.navCtrl.push(AboutPage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage);
    modal.present();
  }

  ionViewDidLoad(){
    console.log('Screen Width is: ',this.platform.width());


    if(this.platform.width() > 768) {
      this.slidesPerView = 2;
    }

    // On a desktop, and is wider than 1200px
    // if(this.platform.width() > 1200) {
    //   this.slidesPerView = 5;
    // }

    // On a desktop, and is wider than 768px
    // else if(this.platform.width() > 768) {
    //   this.slidesPerView = 2;
    // }

    // On a desktop, and is wider than 400px
    // else if(this.platform.width() > 400) {
    //   this.slidesPerView = 2;
    // }

    // On a desktop, and is wider than 319px
    // else if(this.platform.width() > 319) {
    //   this.slidesPerView = 1;
    // }
  }

  toggleClass(){
    this.smMenuActive = !this.smMenuActive;
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
