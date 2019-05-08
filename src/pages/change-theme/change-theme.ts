import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ThemeServiceProvider } from '../../providers/theme-service/theme-service';
import { Subscription } from 'rxjs/Subscription';
import { ThemeModel } from '../../models/theme';
import { ObserverManagerProvider } from '../../providers/observer-manager/observer-manager';

@IonicPage()
@Component({
  selector: 'page-change-theme',
  templateUrl: 'change-theme.html',
})
export class ChangeThemePage {

  themeSubscription:Subscription;
  currentTheme:ThemeModel;
  themes : ThemeModel[];
  isThemesAvailable:boolean = false;


  constructor(public themeService: ThemeServiceProvider, private observerManager: ObserverManagerProvider,  public viewCtrl:ViewController) {
    this.currentTheme = ThemeModel.default();
    themeService.getAllThemes()
      .subscribe(
        (themes:ThemeModel[]) => {
          this.themes = themes;
          this.isThemesAvailable=true;
        })
  }

  ionViewWillEnter(){
    this.themeSubscription = this.observerManager.getThemeObservable()
         .subscribe((theme:ThemeModel) => {
           this.currentTheme = theme
    })
  }

  ionViewWillLeave(){
    this.themeSubscription.unsubscribe();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeTheme(theme:ThemeModel){
    this.currentTheme = theme;
    this.observerManager.notifyTheme(theme);
  }


  isCurrentTheme(thm:ThemeModel):string{
    if (this.currentTheme.id == thm.id){
      return 'checked'
    }else{
      return '';
    }
  }

}
