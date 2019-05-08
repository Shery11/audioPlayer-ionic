import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MediaModel } from '../../models/Media';
import { UserModel } from '../../models/user';
import { MembrecyType } from '../../models/MembrecyType';

/**
 * Generated class for the MediaRowProgramPlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-row-program-play',
  templateUrl: 'media-row-program-play.html'
})
export class MediaRowProgramPlayComponent {

  @Input() media: MediaModel;
  @Input() user: UserModel;
  @Output() playEvent = new EventEmitter<MediaModel>();
  @Output() addFavEvent = new EventEmitter<MediaModel>();
  @Output() unlockEvent = new EventEmitter<MediaModel>();

  public play(){
    this.playEvent.emit(this.media);
  }

  public get color(): string {
    return this.media.isFav ? 'danger': 'light';
	}

  public addFav(){
    event.stopPropagation()
    this.addFavEvent.emit(this.media);
  }

  public unlock(){
    event.stopPropagation()
    this.unlockEvent.emit(this.media);
  }

  public rowClick(event:Event){
    if (this.showLock()){
      this.unlock();
    }else{
      this.play()
    }
  }

  public showLock(){
    if (this.media.membrecy == MembrecyType.Free){
      return false;
    }
    if (this.user.paid){
      return false;
    }
    return true;
  }

}
