import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { UnlockMobilePage } from '../unlock-mobile/unlock-mobile';
import { UnlockWebPage } from '../unlock-web/unlock-web';

import { LandingPage } from '../landing/landing';
import { AboutPage } from '../about/about';
import { RemindersPage } from '../reminders/reminders';
import { SubsAlreadyPage } from '../subs-already/subs-already';
import { TermsPage } from '../terms/terms';
import { ChangeThemePage } from '../change-theme/change-theme';
import { DownloadManagerPage } from '../download-manager/download-manager';
import { TeamsDashboardPage } from '../teams-dashboard/teams-dashboard';
import { TeamsJoinPage } from '../teams-join/teams-join';
import { SciencePage } from '../science/science';
import { GiftWelzenPage } from '../gift-welzen/gift-welzen';
import { TeamsPage } from '../teams/teams';
import { ThemeServiceProvider } from '../../providers/theme-service/theme-service';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';
import { ScreenListPage } from '../screen-list/screen-list';
import { UserModel } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertSettingFactoryProvider } from '../../providers/alert-setting-factory/alert-setting-factory';
import { AppRate } from '@ionic-native/app-rate';
import { HealthkitServiceProvider } from '../../providers/healthkit-service/healthkit-service';
import { AlertHealthKitFactoryProvider } from '../../providers/alert-health-kit-factory/alert-health-kit-factory';
import { HealthKitModel } from '../../models/healthKit';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MailServiceProvider } from '../../providers/mail-service/mail-service';
import { InfoSupportServiceProvider } from '../../providers/info-support-service/info-support-service';
import { InfoSupportModel } from '../../models/InfoSupport';
import { AppVersion } from '@ionic-native/app-version';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  themeSubscription:Subscription;
  themes : ThemeModel[];
  theme:ThemeModel;
  isUserAvailable:boolean = false;
  user:UserModel;
  healthKit:HealthKitModel;
  appVersionNumber:string;
  isAppVersionNumberAvailable:boolean = false;





  constructor(private appVersion:AppVersion,  private mailService:MailServiceProvider, private infoService:InfoSupportServiceProvider,  private platform:Platform, private themeService:ThemeServiceProvider, private socialSharing:SocialSharing,
    private observerManager: ObserverManagerProvider,  private modalCtrl: ModalController,
    public authenticationProvider:AuthenticationProvider, public navCtrl: NavController, private appRate:AppRate,
    public navParams: NavParams, private userStorage:StorageProvider,private alertHealthKitFactory:AlertHealthKitFactoryProvider,
    private alertSettingFactory:AlertSettingFactoryProvider, private healthKitService:HealthkitServiceProvider) {
    this.theme = ThemeModel.default();
    this.themeService.getAllThemes()
         .subscribe( (themes:ThemeModel[]) => {
            this.themes = themes;
    })
    this.healthKit = new HealthKitModel();
  }

  isCurrentTheme(thm:ThemeModel):string{
    if (this.theme.id == thm.id){
      return 'active'
    }else{
      return '';
    }
  }

  async ionViewWillEnter(){
    this.isAppVersionNumberAvailable = false;
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.theme = theme
    })
    if (this.platform.is('mobile')){
      this.appVersionNumber = await this.appVersion.getVersionNumber();
      this.isAppVersionNumberAvailable = true;
    }
    this.user = await this.userStorage.getUser();
    this.isUserAvailable = true;
    this.healthKit = await this.healthKitService.init();

  }

  openScreenList(){
    this.navCtrl.push(ScreenListPage)
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }

  changeTheme(theme:ThemeModel){
    this.observerManager.notifyTheme(theme);
  }

  openTeamsPage(){
    this.navCtrl.push(TeamsPage)
  }
  openGiftWelzenPage(){
    this.navCtrl.push(GiftWelzenPage)
  }
  openAboutPage(){
    this.navCtrl.push(AboutPage)
  }
  openSciencePage(){
    this.navCtrl.push(SciencePage)
  }
  openRemindersPage(){
    this.navCtrl.push(RemindersPage)
  }
  openSubsAlreadyPage(){
    this.navCtrl.push(SubsAlreadyPage)
  }
  openSupportPage(){
    this.infoService.build()
      .then((info:InfoSupportModel)=>{
        this.mailService.send(info);
      })
  }
  openTermsPage(){
    this.navCtrl.push(TermsPage)
  }
  openChangeThemePage(){
    let modal = this.modalCtrl.create(ChangeThemePage);
    modal.present();
  }
  openDownloadManagerPage(){
    this.navCtrl.push(DownloadManagerPage)
  }
  openTeamsDashboardPage(){
    this.navCtrl.push(TeamsDashboardPage)
  }
  openTeamsJoinPage(){
    this.navCtrl.push(TeamsJoinPage)
  }

  openUnlockWebPage(){
    this.navCtrl.push(UnlockWebPage)
  }
  openUnlockMobileModal() {
    let modal = this.modalCtrl.create(UnlockMobilePage, {cssClass:"custom-modal-style"});
    modal.present();
  }

  openUnlock(){
    if (this.platform.is('core')){
      this.openUnlockWebPage()
    }else{
      this.openUnlockMobileModal();
    }
  }

  giveUsStars(){
    this.appRate.promptForRating(true);
  }


  disconnectHealthKit(){
		this.alertHealthKitFactory.createAlertDisconnect().present();
	}

  turnOnOffHealthKit(){
    this.healthKit.toggle = !this.healthKit.toggle;
    if (this.healthKit.toggle && !this.healthKit.askPermission){
			if ((<any>window).cordova && (<any>window).cordova.plugins){
			 	this.healthKitService.showWelcomeHealthKit().then((success)=>{
          this.alertHealthKitFactory.createAlertWelcome(()=>{
            this.tryActiveHealthKit();
          }).present();
		 		}, (error)=>{
           console.warn("This device cannot connect wirh HealthKit service ");
		 		})
			}
		}else{
      this.alertHealthKitFactory.createAlertGoToSettingPermission(()=>{
          this.healthKit.toggle = false;
      }).present();
		}
  }

  tryActiveHealthKit(){
  	this.healthKitService.start(()=>{
      this.alertHealthKitFactory.createAlertAcceptPermission().present();
      this.healthKit.askPermission = true;
      this.healthKit.enable = true;
		}, ()=>{
      this.alertHealthKitFactory.createAlertRejectPermission().present();
      this.healthKit.askPermission = true;
      this.healthKit.enable = false;
      this.healthKit.toggle = false;
    });
  }

  share(){
    this.socialSharing.share("Hey, I thought this may be an interesting app for you to try. It's about mindfulness meditation",
    'Welzen',
     null,
    'http://welzen.org');
  }


  tryLogout(){
    this.alertSettingFactory.createAlertLogout(()=>{
      this.logout();
    },()=>{
    }).present();
  }

  logout(){
    this.authenticationProvider.logout()
      .then(() => {
        this.navCtrl.setRoot(LandingPage);
      })
      .catch( error =>{
        throw error
      })
  }
}
