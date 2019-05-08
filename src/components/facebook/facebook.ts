import { Component,  Output, EventEmitter } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';


/**
 * Generated class for the FacebookComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'facebook',
  templateUrl: 'facebook.html'
})
export class FacebookComponent {

  @Output() userLoggedEvent = new EventEmitter<object>();

  constructor(private fb: Facebook) {

  }

  async login() {
    try{
      let user = await this.fb.getLoginStatus();
      if (user.status === "connect"){
        this.userLoggedEvent.emit(user); 
        return;
      }
      let response = await this.fb.login(['public_profile']);
      if (response.status === "connected") {
        user = await this.fb.api("/"+response.authResponse.userID+"/?fields=id,email,name,picture",["public_profile"])
        this.userLoggedEvent.emit(user); 
        return;
      }
    }catch(error){
      throw error;
    }
  }
}
