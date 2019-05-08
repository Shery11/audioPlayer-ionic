import { Component, Input } from '@angular/core';

@Component({
  selector: 'meditation-daily-entry',
  templateUrl: 'meditation-daily-entry.html'
})
export class MeditationDailyEntryComponent {

  @Input('meditation') meditation:any;

}
