import { Component, Input } from '@angular/core';
import { MoodModel } from '../../models/mood';
import { MoodCheckServiceProvider } from '../../providers/mood-check-service/mood-check-service';

@Component({
  selector: 'mood-check-journal-entry',
  templateUrl: 'mood-check-journal-entry.html'
})
export class MoodCheckJournalEntryComponent {

  @Input('meditation') meditation:any;
  isMoodCheckAvailable:boolean;

  moodCheck:MoodModel;

  constructor(private moodCheckService:MoodCheckServiceProvider){
  }

  ngOnInit(): void{
    this.isMoodCheckAvailable = false;
    let mdId:MoodModel = this.moodCheckService.getById(this.meditation.mood.mood_id);
    this.moodCheck = new MoodModel(mdId.mood_id,mdId.mood,mdId.icon);
    this.moodCheck.journal = this.meditation.mood.journal;
    this.isMoodCheckAvailable = true;
  }
}
