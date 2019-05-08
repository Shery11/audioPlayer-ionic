import { Component, Input, OnInit } from '@angular/core';
import { MoodModel } from '../../models/mood';
import { MoodCheckServiceProvider } from '../../providers/mood-check-service/mood-check-service';

@Component({
  selector: 'mood-check-entry',
  templateUrl: 'mood-check-entry.html'
})
export class MoodCheckEntryComponent implements OnInit {
  @Input('meditation') meditation:any;
  isMoodCheckAvailable:boolean;

  moodCheck:MoodModel;

  constructor(private moodCheckService:MoodCheckServiceProvider){
  }

  ngOnInit(): void{
    this.isMoodCheckAvailable = false;
    this.moodCheck = this.moodCheckService.getById(this.meditation.mood.mood_id);
    this.isMoodCheckAvailable = true;
  }

}
