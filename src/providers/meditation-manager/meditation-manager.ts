import { Injectable } from '@angular/core';
import { MeditationModel } from '../../models/Meditation';
import { MeditationsDataModel } from '../../models/MeditationsData';
import { MediaModel } from '../../models/Media';
import { ObserverManagerProvider } from '../observer-manager/observer-manager';
import { ProductType } from '../../models/ProductType';
import { CategoryType } from '../../models/CategoryType';

/*
  Generated class for the MeditationManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MeditationManagerProvider {
  private _meditations:Array<MeditationModel> = [];
  
  constructor(private observerManager:ObserverManagerProvider) {
    console.log('Hello MeditationManagerProvider Provider');
  }

  public fromJson(json:any){
    
	const meditationsDataModel:MeditationsDataModel = json;
		
    meditationsDataModel.meditations.forEach(meditation => {
      
		const meditationModel:MeditationModel = new MeditationModel();
		Object.assign(meditationModel, meditation);
		let countOfMedias:number = 0;
		for (let index = 0; index < meditation.medias.length; index++) {
			const media = meditation.medias[index];
			const mediaModel:MediaModel = new MediaModel();
			Object.assign(mediaModel, media);
			if (!mediaModel.isIntro){
				countOfMedias+=1;
			}
			meditationModel.medias[index] = mediaModel;
					
			// group by subcategories
			if (media.subCat !== 'Introduction'){
				meditationModel.addMediaBySubcategory(mediaModel,media.subCat);
			}
		}
		meditationModel.lengthOfMedias = countOfMedias;     
    	this._meditations.push(meditationModel);
	});
		
		//notify
		console.log('notify meditations', this._meditations.length);
		this.observerManager.notifyMeditations(this._meditations);
  }
    /**
     * Setter meditations
     * @param {Array<MeditationModel>} value
     */
	public set meditations(value: Array<MeditationModel>) {
		this._meditations = value;
  }
  

    /**
     * Getter meditations
     * @return {Array<MeditationModel>}
     */
	public get meditations(): Array<MeditationModel> {
		return this._meditations;
	}
  
	getRecommendMeditation():MeditationModel[]{
		let recommends:MeditationModel[] = [];
		let love:MeditationModel[] = <any>this.getMeditationsByProductAndCategory(ProductType.Series,CategoryType.Love)
		let five:MeditationModel[] = <any>this.getMeditationsByProductAndCategory(ProductType.Program,CategoryType.Foundation)
		five.forEach(element => {
			recommends.push(element);
		  });
        love.forEach(element => {
          recommends.push(element);
        });
		return recommends;
	}

  	getMeditationsByProductAndCategory(productName, category){
		var meds = [];
		for (var i = 0; i < this._meditations.length; i++) {
			var meditation = this._meditations[i];
			if ((meditation.product === productName) && (meditation.category === category)){
				meds.push(meditation);
			}
		}
		return meds;
	}

	getMeditationsByProduct(productName){
		var meds = [];
		for (var i = 0; i < this._meditations.length; i++) {
			var meditation = this._meditations[i];
			if (meditation.product === productName){
				meds.push(meditation);
			}
		}
		// las ordeno
		meds.sort(function(a, b) {
			//logica media extraña, pero Free viene antes que Premium en el diccionario
			return a.order - b.order;
		});		
		return meds;
	}

	getAllMediasByProduct(productName){
		var all = [];
		for (var i = 0; i < this._meditations.length; i++) {
			var meditation = this._meditations[i];
			if (meditation.product === productName){
				all = all.concat(meditation.medias);
			}
		}
		if('MindfulnessCoaching' === productName){
			all.sort(function(a, b) {
				//logica media extraña, pero Free viene antes que Premium en el diccionario
				if(a.membrecy < b.membrecy) return -1;
				if(a.membrecy > b.membrecy) return 1;
				return 0;
			});
		}
		return all;
	}

	getAllMediasByProductAndCategory(productName, category){
		var meds = this.getMeditationsByProductAndCategory(productName,category);
		var all = [];
		for (var i = 0; i < meds.length; i++) {
			var meditation = meds[i];
			all = all.concat(meditation.medias);
		}
		return all;
	}
	
	public getMediaByMeditationId(meditationId:number, mediaId:number):MediaModel{
		var media:MediaModel;
		var found:boolean = false;
		for (let index=0; index < this._meditations.length && !found; index++){
			let meditation:MeditationModel = this._meditations[index];
			if (meditation.meditationId == meditationId){
				for (let subIndex=0; subIndex < meditation.medias.length && !found; subIndex++){
					let mediaModel = meditation.medias[subIndex];
					if (mediaModel.mediaId == mediaId){
						media = mediaModel;
						found = true;
						break;
					}
				}
			}
		}
		return media;
	}

	public getMediaById(mediaId:number):MediaModel{
		var media:MediaModel;
		var found:boolean = false;
		for (let index=0; index < this._meditations.length && !found; index++){
			let meditation:MeditationModel = this._meditations[index];
			for (let subIndex=0; subIndex < meditation.medias.length && !found; subIndex++){
				let mediaModel = meditation.medias[subIndex];
				if (mediaModel.mediaId == mediaId){
					media = mediaModel;
					found = true;
					break;
				}
			}
		}
		return media;
	}

	randomNoRepeats(array) {
		var copy = array.slice(0);
		return () =>{
			if (copy.length < 1) { 
				copy = array.slice(0); 
			}
			var index = Math.floor(Math.random() * copy.length);
			var item = copy[index];
			copy.splice(index, 1);
			return item;
		};
	}

	randomList:any[] = [];
	getRandomMediaByProductAndCategory(productName, category){
		var find = false;
		var randomObj = {};
		this.randomList.forEach((value, index, array) =>{
			if (value.name === productName+category) {
				find = true;
				randomObj = value;
			}
		});

		if(find){
			var media:MediaModel = (<any>randomObj).getRndMedia();
			return media;
		} else {
			randomObj = {
					name: productName+category,
					getRndMedia:  this.randomNoRepeats(this.getAllMediasByProductAndCategory(productName, category))
			};
			this.randomList.push(randomObj);
			return this.getRandomMediaByProductAndCategory(productName, category);
		}
	}
}
