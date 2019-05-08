import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MediaModel } from '../../models/Media';
import { UserModel } from '../../models/user';
import { MembrecyType } from '../../models/MembrecyType';

/**
 * Generated class for the MediaRowPlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-row-play',
  templateUrl: 'media-row-play.html'
})
export class MediaRowPlayComponent {
  @Input() media: MediaModel;
  @Output() playEvent = new EventEmitter<MediaModel>();
  @Output() addFavEvent = new EventEmitter<MediaModel>();
  @Output() unlockEvent = new EventEmitter<MediaModel>();
  @Input() user: UserModel;

    /**
     * Getter color
     * @return {string}
     */
	public get color(): string {
    return this.media.isFav ? 'danger': 'light';
	}

  public play(){
    this.playEvent.emit(this.media);
  }

  public addFav(){
    this.addFavEvent.emit(this.media);
  }

  public unlock(){
    this.unlockEvent.emit(this.media);
  }

  public rowClick(){
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
