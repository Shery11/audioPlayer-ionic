import { ProductType } from "./ProductType";
import { CategoryType } from "./CategoryType";
import { MediaModel } from "./Media";

export class MeditationModel {
    
    private _id: string;
    private _meditationId: number;
    private _product: ProductType;
    private _category: CategoryType;
    private _title: string;
    private _img: string;
    private _isRandom: boolean;
    private _order: number;
    private _lock: boolean;
    private _free: boolean;
    private _new: boolean;
    private _medias: MediaModel[];
    private _tags:string;
    private _lengthOfMedias:number;

    private _mediasBySubcategory:MediasBySubcategory[] = [];

    /**
     * Getter mediasBySubcategory
     * @return {MediasBySubcategory[] }
     */
	public get mediasBySubcategory(): MediasBySubcategory[]  {
		return this._mediasBySubcategory;
	}

    public addMediaBySubcategory(media:MediaModel, subcategory:string){
        let mediasTemp:MediasBySubcategory = this._mediasBySubcategory.find((element)=>{
            return element.subcategory === subcategory;
        });
        if(typeof(mediasTemp) === 'undefined'){
            mediasTemp = new MediasBySubcategory();
            mediasTemp.subcategory = subcategory;
            mediasTemp.medias.push(media);
            this._mediasBySubcategory.push(mediasTemp);
        }else{
            mediasTemp.medias.push(media);
        }
    }

    public get lengthOfMedias(): number {
		return this._lengthOfMedias;
    }
    
    public set lengthOfMedias(value:number){
		this._lengthOfMedias = value
	}
    

    /**
     * Getter tags
     * @return {string}
     */
	public get tags(): string {
		return this._tags;
	}

    /**
     * Setter tags
     * @param {string} value
     */
	public set tags(value: string) {
		this._tags = value;
	}
    

    public isFree():boolean{
        return this.free;
    }


    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter meditationId
     * @return {number}
     */
	public get meditationId(): number {
		return this._meditationId;
	}

    /**
     * Getter product
     * @return {ProductType}
     */
	public get product(): ProductType {
        if(typeof(this._product) === 'string'){
            this.product = ProductType[<string>this._product];
        }
		return this._product;
	}

    /**
     * Getter category
     * @return {CategoryType}
     */
	public get category(): CategoryType {
        if(typeof(this._category) === 'string'){
            this.category = CategoryType[<string>this._category];
        }        
		return this._category;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Getter img
     * @return {string}
     */
	public get img(): string {
		return this._img;
	}

    /**
     * Getter isRandom
     * @return {boolean}
     */
	public get isRandom(): boolean {
        if(typeof(this._isRandom) === 'undefined'){
            this._isRandom = false;
        }  
		return JSON.parse(<any>this._isRandom);
	}

    /**
     * Getter order
     * @return {number}
     */
	public get order(): number {
		return this._order;
	}

    /**
     * Getter lock
     * @return {boolean}
     */
	public get lock(): boolean {
        if(typeof(this._lock) === 'undefined'){
            this._lock = false;
        }
        return JSON.parse(<any>this._lock);
	}

    /**
     * Getter free
     * @return {boolean}
     */
	public get free(): boolean {
        if(typeof(this._free) === 'undefined'){
            this._free = false;
        }        
		return JSON.parse(<any>this._free);
	}

    /**
     * Getter new
     * @return {boolean}
     */
	public get new(): boolean {
        if(typeof(this._new) == 'undefined'){
            this._new = false;
        }
		return JSON.parse(<any>this._new);
	}

    /**
     * Getter medias
     * @return {MediaModel[]}
     */
	public get medias(): MediaModel[] {
		return this._medias;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Setter meditationId
     * @param {number} value
     */
	public set meditationId(value: number) {
		this._meditationId = value;
	}

    /**
     * Setter product
     * @param {ProductType} value
     */
	public set product(value: ProductType) {
		this._product = value;
	}

    /**
     * Setter category
     * @param {CategoryType} value
     */
	public set category(value: CategoryType) {
		this._category = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter img
     * @param {string} value
     */
	public set img(value: string) {
		this._img = value;
	}

    /**
     * Setter isRandom
     * @param {boolean} value
     */
	public set isRandom(value: boolean) {
		this._isRandom = value;
	}

    /**
     * Setter order
     * @param {number} value
     */
	public set order(value: number) {
		this._order = value;
	}

    /**
     * Setter lock
     * @param {boolean} value
     */
	public set lock(value: boolean) {
		this._lock = value;
	}

    /**
     * Setter free
     * @param {boolean} value
     */
	public set free(value: boolean) {
		this._free = value;
	}

    /**
     * Setter new
     * @param {boolean} value
     */
	public set new(value: boolean) {
		this._new = value;
	}

    /**
     * Setter medias
     * @param {MediaModel[]} value
     */
	public set medias(value: MediaModel[]) {
		this._medias = value;
    }

    public getMediaIntro():MediaModel{
        var mediaFound = null;
        for(var index:number = 0 ; index < this.medias.length ; index++){
            let med = this.medias[index];
            if (med.isIntro){
                mediaFound = med;
                break;
            }
        }
        return mediaFound;
    }

    public isProgram():boolean{
        return this.product == ProductType.Program
    }

    public getProductName():string{
        return ProductType[this.product];
    }
}

export class MediasBySubcategory{
    private _medias:MediaModel[] = [];
    private _subcategory:string;


    /**
     * Getter subcategory
     * @return {string}
     */
	public get medias(): MediaModel[] {
		return this._medias;
	}

    /**
     * Getter subcategory
     * @return {string}
     */
	public get subcategory(): string {
		return this._subcategory;
	}
    /**
     * Setter medias
     * @param {MediaModel[]} value
     */
	public set medias(value: MediaModel[]) {
		this._medias = value;
    }

    /**
     * Setter subcategory
     * @param {string} value
     */
	public set subcategory(value: string) {
		this._subcategory = value;
    }
}