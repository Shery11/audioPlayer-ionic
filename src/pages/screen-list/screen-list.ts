import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


import { LandingPage } from './../landing/landing';
import { SigninPage } from '../signin/signin';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { SignupPage } from '../signup/signup';
import { TermsPage } from '../terms/terms';
import { FavoritesPage } from '../favorites/favorites';
import { SettingsPage } from '../settings/settings';
import { DownloadManagerPage } from '../download-manager/download-manager';
import { RemindersPage } from '../reminders/reminders';
import { AboutPage } from '../about/about';
import { SciencePage } from '../science/science';
import { MergePage } from '../merge/merge';
import { SubsSuccessPage } from '../subs-success/subs-success';
import { SubsCancelPage } from '../subs-cancel/subs-cancel';
import { SubsAlreadyPage } from '../subs-already/subs-already';
import { MoodPostPage } from '../mood-post/mood-post';
import { ProfilePage } from '../profile/profile';
import { PlayerPage } from '../player/player';
import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';
import { BreathePage } from '../breathe/breathe';
import { BreatheSettingsPage } from '../breathe-settings/breathe-settings';
import { DashboardPage } from '../dashboard/dashboard';
import { DetailPage } from '../detail/detail';
import { DetailProgramPage } from '../detail-program/detail-program';
import { DetailSeriePage } from '../detail-serie/detail-serie';
import { DetailSinglePage } from '../detail-single/detail-single';
import { SupportPage } from '../support/support';
import { TeamsPage } from '../teams/teams';
import { TeamsNamePage } from '../teams-name/teams-name';
import { TeamsPaymentPage } from '../teams-payment/teams-payment';
import { TeamsDashboardPage } from '../teams-dashboard/teams-dashboard';
import { TeamsInvitePage } from '../teams-invite/teams-invite';
import { TeamsJoinPage } from '../teams-join/teams-join';
import { TeamsWelcomeUserPage } from '../teams-welcome-user/teams-welcome-user';
import { ChangeThemePage } from '../change-theme/change-theme';
import { GiftWelzenPage } from '../gift-welzen/gift-welzen';
import { GiftPreviewPage} from '../gift-preview/gift-preview';
import { HomePage } from '../home/home';
import { OnboardingPage } from '../onboarding/onboarding';
import { AfterSharePage } from '../after-share/after-share';
import { TechniquesPage } from '../techniques/techniques';



@IonicPage()
@Component({
  selector: 'page-screen-list',
  templateUrl: 'screen-list.html',
})
export class ScreenListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  openLandingPage(){
    this.navCtrl.push(LandingPage)
  }
  openSigninPage(){
    this.navCtrl.push(SigninPage)
  }
  openForgotPasswordPage(){
    this.navCtrl.push(ForgotPasswordPage)
  }
  openSignupPage(){
    this.navCtrl.push(SignupPage)
  }
  openTermsPage(){
    this.navCtrl.push(TermsPage)
  }
  openFavoritesPage(){
    this.navCtrl.push(FavoritesPage)
  }
  openSettingsPage(){
    this.navCtrl.push(SettingsPage)
  }
  openDownloadManagerPage(){
    this.navCtrl.push(DownloadManagerPage)
  }
  openRemindersPage(){
    this.navCtrl.push(RemindersPage)
  }
  openAboutPage(){
    this.navCtrl.push(AboutPage)
  }
  openSciencePage(){
    this.navCtrl.push(SciencePage)
  }
  openMergePage(){
    this.navCtrl.push(MergePage)
  }
  openSubsSuccessPage(){
    this.navCtrl.push(SubsSuccessPage)
  }
  openSubsCancelPage(){
    this.navCtrl.push(SubsCancelPage)
  }
  openSubsAlreadyPage(){
    this.navCtrl.push(SubsAlreadyPage)
  }
  openMoodPostPage(){
    this.navCtrl.push(MoodPostPage)
  }
  openProfilePage(){
    this.navCtrl.push(ProfilePage)
  }
  openPlayerPage(){
    this.navCtrl.push(PlayerPage)
  }
  openUnlockMobilePage(){
    this.navCtrl.push(UnlockMobilePage)
  }
  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openBreathePage(){
    this.navCtrl.push(BreathePage)
  }
  openBreatheSettingsPage(){
    this.navCtrl.push(BreatheSettingsPage)
  }
  openDashboardPage(){
    this.navCtrl.push(DashboardPage)
  }
  openDetailPage(){
    this.navCtrl.push(DetailPage)
  }
  openDetailProgramPage(){
    this.navCtrl.push(DetailProgramPage)
  }
  openDetailSeriePage(){
    this.navCtrl.push(DetailSeriePage)
  }
  openDetailSinglePage(){
    this.navCtrl.push(DetailSinglePage)
  }
  openSupportPage(){
    this.navCtrl.push(SupportPage)
  }
  openTeamsPage(){
    this.navCtrl.push(TeamsPage)
  }
  openTeamsNamePage(){
    this.navCtrl.push(TeamsNamePage)
  }
  openTeamsPaymentPage(){
    this.navCtrl.push(TeamsPaymentPage)
  }
  openTeamsDashboardPage(){
    this.navCtrl.push(TeamsDashboardPage)
  }
  openTeamsInvitePage(){
    this.navCtrl.push(TeamsInvitePage)
  }
  openTeamsJoinPage(){
    this.navCtrl.push(TeamsJoinPage)
  }
  openTeamsWelcomeUserPage(){
    this.navCtrl.push(TeamsWelcomeUserPage)
  }
  openChangeThemePage(){
    this.navCtrl.push(ChangeThemePage)
  }
  openOnboardingPage(){
    this.navCtrl.push(OnboardingPage)
  }
  openAfterSharePage(){
    this.navCtrl.push(AfterSharePage)
  }
  openTechniquesPage(){
    this.navCtrl.push(TechniquesPage)
  }
  openGiftWelzenPage(){
    this.navCtrl.push(GiftWelzenPage)
  }
  openGiftPreviewPage(){
    this.navCtrl.push(GiftPreviewPage)
  }
  openHomePage(){
    this.navCtrl.push(HomePage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreenListPage');
  }

}
