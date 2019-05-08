import { NgModule } from '@angular/core';
import { TimeMeditationPipe } from './time-meditation/time-meditation';
import { TagsMeditationPipe } from './tags-meditation/tags-meditation';
@NgModule({
	declarations: [TimeMeditationPipe,
    TagsMeditationPipe],
	imports: [],
	exports: [TimeMeditationPipe,
    TagsMeditationPipe]
})
export class PipesModule {}
