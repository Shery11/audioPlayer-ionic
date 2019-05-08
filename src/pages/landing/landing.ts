import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup'; 
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MergePage } from '../merge/merge';
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthenticationProvider) {
  }
  openSignupPage(){
    this.navCtrl.push(SignupPage);
  }
  openSigninPage(){
    this.navCtrl.push(SigninPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  authFacebook(userFacebook){
    this.authService.loginByFacebook(userFacebook.email)
    .subscribe(
      user => {
        this.navCtrl.setRoot(DashboardPage);
      },
      error => {
          if (error.status === 409){ //Go To merge account
            this.navCtrl.push(MergePage,{emailFB:userFacebook.email});
          }else{
            throw error;
          }
      });
  }
}
