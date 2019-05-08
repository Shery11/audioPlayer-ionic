import { Component, Input } from '@angular/core';
import { MoodModel } from '../../models/mood';


@Component({
  selector: 'journal-entry',
  templateUrl: 'journal-entry.html'
})
export class JournalEntryComponent {

  @Input('meditation') meditation:any;
  isMoodCheckAvailable:boolean;

  moodCheck:MoodModel;

  constructor(){
  }

  ngOnInit(): void{
    this.isMoodCheckAvailable = false;
    this.moodCheck = this.meditation.mood;
    this.isMoodCheckAvailable = true;
  }

}
