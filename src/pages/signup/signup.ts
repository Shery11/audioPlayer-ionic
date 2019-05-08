import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { SigninPage } from '../signin/signin'; 
import { TermsPage } from '../terms/terms'; 
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AccountManagerProvider } from '../../providers/account-manager/account-manager';
import { AlertAccountFactoryProvider } from '../../providers/alert-account-factory/alert-account-factory';
import { DashboardPage } from '../dashboard/dashboard';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signUpform : FormGroup;

  constructor(private alertAccountFactory:AlertAccountFactoryProvider, public navCtrl: NavController, private accountManager:AccountManagerProvider,private formBuilder: FormBuilder) {
    this.signUpform = this.formBuilder.group({
      fullname: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      email: ['', Validators.compose([Validators.required,Validators.email, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }); 
  }
  openSigninPage(){
    this.navCtrl.push(SigninPage);
  }
  openTermsPage(){
    this.navCtrl.push(TermsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  signUp(){
    this.accountManager.createAccount(this.signUpform.value.fullname,
      this.signUpform.value.email,this.signUpform.value.password)
    .subscribe(
      newUser => {
          this.navCtrl.setRoot(DashboardPage)
      },
      error => {
          if (error.status === 409){
            this.alertAccountFactory.createSimpleUserAlreadyExists().present()
          }else{
            this.alertAccountFactory.createSimpleServerError().present();
            throw error;
          }
      });
  }

  signUpByFacebook(userLoggedFB){
    this.accountManager.createAccountByFacebook(userLoggedFB.name,userLoggedFB.email)
    .subscribe(
      newUser => {
        this.navCtrl.setRoot(DashboardPage);
      },
      error => {
        this.alertAccountFactory.createSimpleServerError().present();
        throw error;
      });
  }

}
