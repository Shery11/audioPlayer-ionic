import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { ComponentsModule } from '../components/components.module';
import { ContactPage } from '../pages/contact/contact';
import { IonAffixModule} from 'ion-affix/dist';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpWelzenInterceptorProvider } from '../providers/http-welzen-interceptor/http-welzen-interceptor';
import { StorageProvider } from '../providers/storage/storage';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';



import { DirectivesModule } from '../directives/directives.module';
import { AboutPageModule } from '../pages/about/about.module';
import { BreathePageModule } from '../pages/breathe/breathe.module';
import { BreatheSettingsPageModule } from '../pages/breathe-settings/breathe-settings.module';
import { ChangeThemePageModule } from '../pages/change-theme/change-theme.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { DashboarPopoverPageModule } from '../pages/dashboar-popover/dashboar-popover.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { DetailProgramPageModule } from '../pages/detail-program/detail-program.module';
import { DetailSeriePageModule } from '../pages/detail-serie/detail-serie.module';
import { DetailSinglePageModule } from '../pages/detail-single/detail-single.module';
import { DownloadManagerPageModule } from '../pages/download-manager/download-manager.module';
import { FavoritesPageModule } from '../pages/favorites/favorites.module';
import { ForgotPasswordPageModule } from '../pages/forgot-password/forgot-password.module';
import { LandingPageModule } from '../pages/landing/landing.module';
import { MergePageModule } from '../pages/merge/merge.module';
import { MoodPostPageModule } from '../pages/mood-post/mood-post.module';
import { PlayerPageModule } from '../pages/player/player.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { RemindersPageModule } from '../pages/reminders/reminders.module';
import { SciencePageModule } from '../pages/science/science.module';
import { ScreenListPageModule } from '../pages/screen-list/screen-list.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SubsAlreadyPageModule } from '../pages/subs-already/subs-already.module';
import { SubsCancelPageModule } from '../pages/subs-cancel/subs-cancel.module';
import { SubsSuccessPageModule } from '../pages/subs-success/subs-success.module';
import { SupportPageModule } from '../pages/support/support.module';
import { TeamsPageModule } from '../pages/teams/teams.module';
import { TeamsNamePageModule } from '../pages/teams-name/teams-name.module';
import { TeamsPaymentPageModule } from '../pages/teams-payment/teams-payment.module';
import { TeamsDashboardPageModule } from '../pages/teams-dashboard/teams-dashboard.module';
import { TeamsInvitePageModule } from '../pages/teams-invite/teams-invite.module';
import { TeamsJoinPageModule } from '../pages/teams-join/teams-join.module';
import { TermsPageModule } from '../pages/terms/terms.module';
import { TeamsWelcomeUserPageModule } from '../pages/teams-welcome-user/teams-welcome-user.module';

import { UnlockMobilePageModule } from '../pages/unlock-mobile/unlock-mobile.module';
import { UnlockWebPageModule } from '../pages/unlock-web/unlock-web.module';

import { OnboardingPageModule } from '../pages/onboarding/onboarding.module';
import { AfterSharePageModule } from '../pages/after-share/after-share.module';
import { TechniquesPageModule } from '../pages/techniques/techniques.module';
import { SoundsOptionsPageModule } from '../pages/sounds-options/sounds-options.module';
import { GiftWelzenPageModule } from '../pages/gift-welzen/gift-welzen.module';
import { GiftPreviewPageModule } from '../pages/gift-preview/gift-preview.module';


import { AccountManagerProvider } from '../providers/account-manager/account-manager';
import { AlertAccountFactoryProvider } from '../providers/alert-account-factory/alert-account-factory';
import { ThemeServiceProvider } from '../providers/theme-service/theme-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ReminderStorageProvider } from '../providers/reminder-storage/reminder-storage';
import { ReminderNotificationProvider } from '../providers/reminder-notification/reminder-notification';
import { ObserverManagerProvider } from '../providers/observer-manager/observer-manager';
import { SoundStorageProvider } from '../providers/sound-storage/sound-storage';
import { BackgroudSoundPlayerProvider } from '../providers/backgroud-sound-player/backgroud-sound-player';
import { NativeAudio } from '@ionic-native/native-audio';
import { MeditationSoundPlayerProvider } from '../providers/meditation-sound-player/meditation-sound-player';
import { Media } from '@ionic-native/media';
import { PipesModule } from '../pipes/pipes.module';
import { AlertPlayerFactoryProvider } from '../providers/alert-player-factory/alert-player-factory';
import { InAppPurchaseMobileProvider } from '../providers/in-app-purchase-mobile/in-app-purchase-mobile';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PurchaseServiceProvider } from '../providers/purchase-service/purchase-service';
import { AlertInAppFactoryProvider } from '../providers/alert-in-app-factory/alert-in-app-factory';
import { MeditationManagerProvider } from '../providers/meditation-manager/meditation-manager';
import { CouponServiceProvider } from '../providers/coupon-service/coupon-service';
import { InAppPurchaseWebSimpleProvider } from '../providers/in-app-purchase-web-simple/in-app-purchase-web-simple';
import { StripeServiceProvider } from '../providers/stripe-service/stripe-service';
import { SubscriptionInProgressProvider } from '../providers/subscription-in-progress/subscription-in-progress';
import { HomePageModule } from '../pages/home/home.module';
import { FavouriteServiceProvider } from '../providers/favourite-service/favourite-service';
import { AlertSettingFactoryProvider } from '../providers/alert-setting-factory/alert-setting-factory';
import { AlertFavouriteFactoryProvider } from '../providers/alert-favourite-factory/alert-favourite-factory';
import { ConnectionNetworkProvider } from '../providers/connection-network/connection-network';
import { Network } from '@ionic-native/network';
import { AppRate } from '@ionic-native/app-rate';
import { AppRateProvider } from '../providers/app-rate/app-rate';
import { HealthkitServiceProvider } from '../providers/healthkit-service/healthkit-service';
import { AlertHealthKitFactoryProvider } from '../providers/alert-health-kit-factory/alert-health-kit-factory';
import { StatServiceProvider } from '../providers/stat-service/stat-service';
import { MoodCheckServiceProvider } from '../providers/mood-check-service/mood-check-service';
import { DailyServiceProvider } from '../providers/daily-service/daily-service';
import { AppVersion } from '@ionic-native/app-version';
import { InfoSupportServiceProvider } from '../providers/info-support-service/info-support-service';
import { MailServiceProvider } from '../providers/mail-service/mail-service';
import { EmailComposer } from '@ionic-native/email-composer';
import { GlobalErrorHandlerProvider } from '../providers/global-error-handler/global-error-handler';
import { AlertStatsProvider } from '../providers/alert-stats/alert-stats';


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
  ],
  imports: [
    PipesModule,
    GiftPreviewPageModule,
    GiftWelzenPageModule,
    SoundsOptionsPageModule,
    TechniquesPageModule,
    AfterSharePageModule,
    OnboardingPageModule,
    UnlockMobilePageModule,
    UnlockWebPageModule,
    TeamsWelcomeUserPageModule,
    TermsPageModule,
    TeamsJoinPageModule,
    TeamsInvitePageModule,
    TeamsDashboardPageModule,
    TeamsPaymentPageModule,
    TeamsNamePageModule,
    TeamsPageModule,
    SupportPageModule,
    SubsSuccessPageModule,
    SubsCancelPageModule,
    SubsAlreadyPageModule,
    SignupPageModule,
    SigninPageModule,
    SettingsPageModule,
    ScreenListPageModule,
    SciencePageModule,
    RemindersPageModule,
    ProfilePageModule,
    PlayerPageModule,
    MoodPostPageModule,
    MergePageModule,
    LandingPageModule,
    ForgotPasswordPageModule,
    FavoritesPageModule,
    DownloadManagerPageModule,
    DetailPageModule,
    DetailProgramPageModule,
    DetailSeriePageModule,
    DetailSinglePageModule,
    DashboarPopoverPageModule,
    DashboardPageModule,
    ChangeThemePageModule,
    BreatheSettingsPageModule,
    BreathePageModule,
    AboutPageModule,
    DirectivesModule,
    ComponentsModule,
    BrowserModule,
    ElasticHeaderModule,
    IonAffixModule,
    HttpClientModule,
    HomePageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'ios',
      backButtonIcon: 'wze-back-custom',
      pageTransition: 'md-transition'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage
  ],
  providers: [
    EmailComposer,
    AppVersion,
    SocialSharing,
    AppRate,
    InAppPurchase,
    BackgroundMode,
    Media,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    {provide: HTTP_INTERCEPTORS, useClass: HttpWelzenInterceptorProvider, multi: true },
    StorageProvider,
    Facebook,
    AccountManagerProvider,
    AccountManagerProvider,
    AlertAccountFactoryProvider,
    ThemeServiceProvider,
    UserServiceProvider,
    ReminderStorageProvider,
    ReminderNotificationProvider,
    ObserverManagerProvider,
    SoundStorageProvider,
    BackgroudSoundPlayerProvider,
    NativeAudio,
    MeditationSoundPlayerProvider,
    AlertPlayerFactoryProvider,
    InAppPurchaseMobileProvider,
    PurchaseServiceProvider,
    AlertInAppFactoryProvider,
    MeditationManagerProvider,
    CouponServiceProvider,
    InAppPurchaseWebSimpleProvider,
    StripeServiceProvider,
    SubscriptionInProgressProvider,
    FavouriteServiceProvider,
    AlertSettingFactoryProvider,
    AlertFavouriteFactoryProvider,
    ConnectionNetworkProvider,
    Network,
    AppRateProvider,
    HealthkitServiceProvider,
    AlertHealthKitFactoryProvider,
    StatServiceProvider,
    MoodCheckServiceProvider,
    DailyServiceProvider,
    InfoSupportServiceProvider,
    MailServiceProvider,
    [{provide: ErrorHandler, useClass: GlobalErrorHandlerProvider}],
    AlertStatsProvider
  ]
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
