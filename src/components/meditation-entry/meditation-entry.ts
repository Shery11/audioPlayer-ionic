import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MeditationManagerProvider } from '../../providers/meditation-manager/meditation-manager';
import { MediaModel } from '../../models/Media';

@Component({
  selector: 'meditation-entry',
  templateUrl: 'meditation-entry.html'
})
export class MeditationEntryComponent implements OnInit {
  
  @Input('meditation') meditation:any;
  isMeditationAvailable:boolean;
  meditationStat:MediaModel;
  @Output() playEvent = new EventEmitter<MediaModel>();


  constructor(private meditationManager:MeditationManagerProvider){

  }

  ngOnInit(): void{
    this.isMeditationAvailable = false;
    this.meditationStat = this.meditationManager.getMediaById(this.meditation.media_id);
    this.isMeditationAvailable = true;
  }

  goToPlay(){
    this.playEvent.emit(this.meditationStat);
  }

}
