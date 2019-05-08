import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { BackgroundSound } from '../../models/backgroundSound';

@Injectable()
export class BackgroudSoundPlayerProvider {

  constructor(private nativeSound:NativeAudio) {
  }

  async play(sound:BackgroundSound, volume:number){
    await this.nativeSound.preloadComplex(sound.id.toString(), sound.url, volume, 1, 0);
    await this.nativeSound.loop(sound.id.toString());
  }

  async stop(sound:BackgroundSound):Promise<any> {
    await this.nativeSound.stop(sound.id.toString())
    await this.nativeSound.unload(sound.id.toString());
  }

  async setVolume(sound:BackgroundSound, value:number){
    await this.nativeSound.setVolumeForComplexAsset(sound.id.toString(),value)
  }
}
