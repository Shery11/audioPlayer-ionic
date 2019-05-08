import { NgModule } from '@angular/core';
import { FacebookComponent } from './facebook/facebook';
import { IonicModule } from 'ionic-angular';
import { MeditationCardComponent } from './meditation-card/meditation-card';
import { MediaRowPlayComponent } from './media-row-play/media-row-play';
import { FavouriteCardComponent } from './favourite-card/favourite-card';
import { MediaRowProgramPlayComponent } from './media-row-program-play/media-row-program-play';
import { JournalEntryComponent } from './journal-entry/journal-entry';
import { MoodCheckEntryComponent } from './mood-check-entry/mood-check-entry';
import { MoodCheckJournalEntryComponent } from './mood-check-journal-entry/mood-check-journal-entry';
import { MeditationEntryComponent } from './meditation-entry/meditation-entry';
import { MeditationDailyEntryComponent } from './meditation-daily-entry/meditation-daily-entry';
import { MediaRowSinglePlayComponent } from './media-row-single-play/media-row-single-play';
import { RecommendMeditationCardComponent } from './recommend-meditation-card/recommend-meditation-card';


@NgModule({
	declarations: [FacebookComponent,
    MeditationCardComponent,
    MediaRowPlayComponent,
    FavouriteCardComponent,
    MediaRowProgramPlayComponent,
    JournalEntryComponent,
    MoodCheckEntryComponent,
    MoodCheckJournalEntryComponent,
    MeditationEntryComponent,
    MeditationDailyEntryComponent,
    MediaRowSinglePlayComponent,
    RecommendMeditationCardComponent],
	imports: [IonicModule],
	exports: [FacebookComponent,
    MeditationCardComponent,
    MediaRowPlayComponent,
    FavouriteCardComponent,
    MediaRowProgramPlayComponent,
    JournalEntryComponent,
    MoodCheckEntryComponent,
    MoodCheckJournalEntryComponent,
    MeditationEntryComponent,
    MeditationDailyEntryComponent,
    MediaRowSinglePlayComponent,
    RecommendMeditationCardComponent]
})
export class ComponentsModule {}
