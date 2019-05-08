import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SigninPage } from '../signin/signin';
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  forgotform : FormGroup;

  constructor(public authService: AuthenticationProvider,public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.forgotform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email, Validators.minLength(5)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  openSigninPage(){
    this.navCtrl.push(SigninPage);
  }

  resetPassword(){
    this.authService.resetPassword(this.forgotform.value.email)
    .subscribe(
      ()=> {
        this.navCtrl.setRoot(DashboardPage);
      })
  }

}
