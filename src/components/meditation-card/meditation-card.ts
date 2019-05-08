import { Component, Input, Output,EventEmitter } from '@angular/core';
import { MeditationModel } from '../../models/Meditation';
import { UserModel } from '../../models/user';

/**
 * Generated class for the MeditationCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'meditation-card',
  templateUrl: 'meditation-card.html'
})
export class MeditationCardComponent {
  @Input('meditation') meditation:MeditationModel;
  @Input('user') user:UserModel;
  @Output() showDetailEvent = new EventEmitter<MeditationModel>();

  public openDetailPage(){
    console.log("MeditationCardComponent::: click openDetailPage");
    this.showDetailEvent.emit(this.meditation);
  }

}
