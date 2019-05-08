import { Injectable } from '@angular/core';
import { MoodModel } from '../../models/mood';
import { ListMoodType } from '../../models/moodType';

@Injectable()
export class MoodCheckServiceProvider {

  moodChecks:MoodModel[] = ListMoodType.slice();


  getById(moodId:number):MoodModel{
    let mod:MoodModel;
    this.moodChecks.forEach((element:MoodModel)=>{
      if (element.mood_id == moodId){
        mod = element;
      }
    })
    return mod;
  }


}
