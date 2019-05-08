import { Pipe, PipeTransform } from '@angular/core';
import { MeditationModel } from '../../models/Meditation';

/**
 * Generated class for the TagsMeditationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tagsMeditation',
})
export class TagsMeditationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(meditations: Array<MeditationModel>, tag:string):Array<MeditationModel> {

    if(!tag){
      return meditations;
    }
    return meditations.filter(it => {
      if(!it.tags){
        return false;
      }
      let tagArr = it.tags.split(",");

      return tagArr.find(it => it === tag);
    });
  }
}
