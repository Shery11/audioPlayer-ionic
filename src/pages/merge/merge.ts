import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountManagerProvider } from '../../providers/account-manager/account-manager';
import { AlertAccountFactoryProvider } from '../../providers/alert-account-factory/alert-account-factory';
import { DashboardPage } from '../dashboard/dashboard';




@IonicPage({
  segment: 'merge'
})
@Component({
  selector: 'page-merge',
  templateUrl: 'merge.html'
})
export class MergePage {

  mergeform : FormGroup;

  constructor(private alertAccountFactory:AlertAccountFactoryProvider, private accountManager:AccountManagerProvider, public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.mergeform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }); 
  }


  linkAccount(){
    let emailFB = this.navParams.get('emailFB');
    this.accountManager.linkedAccountWithFacebook(emailFB,
                                                  this.mergeform.value.email,
                                                  this.mergeform.value.password)
      .subscribe(
        newUser => {
          this.navCtrl.setRoot(DashboardPage);
        },
        error => {
          if (error === 404){
            this.alertAccountFactory.createSimpleWrongUserPassword().present();
          }else{
            this.alertAccountFactory.createSimpleServerError().present();
            throw error;
          }
        });
  }

}
