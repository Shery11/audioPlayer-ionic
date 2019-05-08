import { Component, Input, Output,EventEmitter } from '@angular/core';
import { MeditationModel } from '../../models/Meditation';

@Component({
  selector: 'recommend-meditation-card',
  templateUrl: 'recommend-meditation-card.html'
})
export class RecommendMeditationCardComponent{

  @Input('meditation') meditation:MeditationModel;
  @Output() showDetailEvent = new EventEmitter<MeditationModel>();

  public openDetailPage(){
    this.showDetailEvent.emit(this.meditation);
  }
}
