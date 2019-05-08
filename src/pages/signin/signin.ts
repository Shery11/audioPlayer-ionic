import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MergePage } from '../merge/merge';
import { AlertAccountFactoryProvider } from '../../providers/alert-account-factory/alert-account-factory';
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
 myfrom : FormGroup;
  constructor(private alertAccountFactory:AlertAccountFactoryProvider, public authService: AuthenticationProvider, public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.myfrom = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }
  openSignupPage(){
    this.navCtrl.push(SignupPage);
  }
  openForgotPasswordPage(){
    this.navCtrl.push(ForgotPasswordPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  auth(info){
    let email = info.email;
    let password = info.password;
    this.authService.login(email,password)
    .subscribe(
      user => {
          this.navCtrl.setRoot(DashboardPage)
      },
      error => {
          if (error.status === 404){
            this.alertAccountFactory.createSimpleWrongUserPassword().present();
          }else{
            this.alertAccountFactory.createSimpleServerError().present();
            throw(error);
          }
      });
  }

  authFacebook(userFacebook){
    this.authService.loginByFacebook(userFacebook['email'])
    .subscribe(
      user => {
          this.navCtrl.setRoot(DashboardPage)
      },
      error => {
          if (error.status === 409){ //Go To merge account
            this.navCtrl.push(MergePage,{emailFB:userFacebook.email});
          }else{
            this.alertAccountFactory.createSimpleServerError().present();
            throw(error);
          }
      });
  }
}
