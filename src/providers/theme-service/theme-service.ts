import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThemeModel, ThemeType } from '../../models/theme';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { UserModel } from '../../models/user';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';





@Injectable()
export class ThemeServiceProvider {

  private allAvailableThemes:ThemeModel[];

  constructor(private observerManager:ObserverManagerProvider, private http: HttpClient){
  }

  public getAllThemes() : Observable<ThemeModel[]>{
    if (this.allAvailableThemes &&  this.allAvailableThemes.length > 0){
      return Observable.of(this.allAvailableThemes);
    }else{
      return this.http.get<Object[]>("./assets/data/themes.json")
        .map(themes => { 
          this.allAvailableThemes = [];
          this.allAvailableThemes.push(ThemeModel.default());
          themes.forEach(object => {
            var typeString:string = object['type'];
            this.allAvailableThemes.push(new ThemeModel(object['id'],object['title'],object['css'],ThemeType[typeString],object['thumbCss']));
          });
          return this.allAvailableThemes;
        })
    }
  }
  
  private getThemeByCssName(css:String):ThemeModel{
    var toReturn :ThemeModel = null;
    this.allAvailableThemes.forEach((element:ThemeModel) => {
        if (element.css == css){
          return (toReturn=element);
        }
    });
    return toReturn;
  }

  public init(){
    this.getAllThemes()
      .subscribe(() =>{
        this.observerManager.getUserObservable()
          .subscribe((user:UserModel) => {
              var userTheme:ThemeModel = this.getThemeByCssName(user.theme);
              if (userTheme){
                this.observerManager.notifyTheme(userTheme)
              }else{
                this.observerManager.notifyTheme(ThemeModel.default());
              }
          })     
      })
  }
}
