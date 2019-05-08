import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeMeditation',
})
export class TimeMeditationPipe implements PipeTransform {

  transform(totalSeconds:number):string {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds - (minutes * 60);
    seconds = Math.round(seconds);
    var result = '' + (minutes < 10 ? "0" + minutes : minutes);
    result += ':' + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
  }
}
