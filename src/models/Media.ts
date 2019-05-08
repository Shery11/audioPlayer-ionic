import { MembrecyType } from "./MembrecyType";
import { MediaType } from "./MediaType";
import { ProductType } from "./ProductType";

export class MediaModel {
    private _id: string;
    private _meditationId: number;
    private _mediaId: number; //_media_id
    private _membrecy: MembrecyType;
    private _url: string;
    private _length: number;
    private _realLength: number; //real_length
    private _type: MediaType;
    private _order: number;
    private _title: string;
    private _hasSound: boolean;
    private _albumCoverImg: string; //AlbumCoverImg
    private _tracked: boolean;
    private _isIntro: boolean;
    private _subCat: string;
    private _product: ProductType;
    private _productTitle: string; //product_title"
    private _isDaily: boolean;

    private _wasListened:boolean;
    private _isFav: boolean;
    private _changingStateFav:boolean = false;

    private _beginTime:Date;
    private _endTime:Date;
    private _segs:number;

    private _date:Date;

    /**
     * Getter isFav
     * @return {boolean}
     */
	public get isFav(): boolean {
        if(typeof(this._isFav) === 'undefined'){
            this._isFav = false;
        }          
		return JSON.parse(<any>this._isFav);
    }
    
    public get isFree(): boolean{
        return MembrecyType.Free === this.membrecy;
    }

    /**
     * Setter isFav
     * @param {boolean} value
     */
	public set isFav(value: boolean) {
		this._isFav = value;
	}

    /**
     * Getter wasListened
     * @return {boolean}
     */
	public get wasListened(): boolean {
		return this._wasListened;
	}

    /**
     * Setter wasListened
     * @param {boolean} value
     */
	public set wasListened(value: boolean) {
		this._wasListened = value;
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
     * Getter mediaId
     * @return {number}
     */
	public get mediaId(): number {
		return this._mediaId;
	}

    /**
     * Getter membrecy
     * @return {MembrecyType}
     */
	public get membrecy(): MembrecyType {
        if(typeof(this._membrecy) === 'string'){
            this.membrecy = MembrecyType[<string>this._membrecy];
        }
		return this._membrecy;
	}

    /**
     * Getter url
     * @return {string}
     */
	public get url(): string {
		return this._url;
	}

    /**
     * Getter length
     * @return {number}
     */
	public get length(): number {
		return this._length;
	}

    /**
     * Getter realLength
     * @return {number}
     */
	public get realLength(): number {
		return this._realLength;
	}

    /**
     * Getter type
     * @return {MediaType}
     */
	public get type(): MediaType {
        if(typeof(this._type) === 'string'){
            this.type = MediaType[<string>this._type];
        }
		return this._type;
	}

    /**
     * Getter order
     * @return {number}
     */
	public get order(): number {
		return this._order;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Getter hasSound
     * @return {boolean}
     */
	public get hasSound(): boolean {
        if(typeof(this._hasSound) === 'undefined'){
            this._hasSound = false;
        }  
		return JSON.parse(<any>this._hasSound);
	}

    /**
     * Getter albumCoverImg
     * @return {string}
     */
	public get albumCoverImg(): string {
		return this._albumCoverImg;
	}

    /**
     * Getter tracked
     * @return {boolean}
     */
	public get tracked(): boolean {
        if(typeof(this._tracked) === 'undefined'){
            this._tracked = false;
        }  
		return JSON.parse(<any>this._tracked);
	}

    /**
     * Getter isIntro
     * @return {boolean}
     */
	public get isIntro(): boolean {
        if(typeof(this._isIntro) === 'undefined'){
            this._isIntro = false;
        }          
		return JSON.parse(<any>this._isIntro);
	}

    /**
     * Getter subCat
     * @return {string}
     */
	public get subCat(): string {
		return this._subCat;
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
     * Getter productTitle
     * @return {string}
     */
	public get productTitle(): string {
		return this._productTitle;
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
     * Setter mediaId
     * @param {number} value
     */
	public set mediaId(value: number) {
		this._mediaId = value;
	}

    /**
     * Setter membrecy
     * @param {MembrecyType} value
     */
	public set membrecy(value: MembrecyType) {
		this._membrecy = value;
	}

    /**
     * Setter url
     * @param {string} value
     */
	public set url(value: string) {
		this._url = value;
	}

    /**
     * Setter length
     * @param {number} value
     */
	public set length(value: number) {
		this._length = value;
	}

    /**
     * Setter realLength
     * @param {number} value
     */
	public set realLength(value: number) {
		this._realLength = value;
	}

    /**
     * Setter type
     * @param {MediaType} value
     */
	public set type(value: MediaType) {
		this._type = value;
	}

    /**
     * Setter order
     * @param {number} value
     */
	public set order(value: number) {
		this._order = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter hasSound
     * @param {boolean} value
     */
	public set hasSound(value: boolean) {
		this._hasSound = value;
	}

    /**
     * Setter albumCoverImg
     * @param {string} value
     */
	public set albumCoverImg(value: string) {
		this._albumCoverImg = value;
	}

    /**
     * Setter tracked
     * @param {boolean} value
     */
	public set tracked(value: boolean) {
		this._tracked = value;
	}

    /**
     * Setter isIntro
     * @param {boolean} value
     */
	public set isIntro(value: boolean) {
		this._isIntro = value;
	}

    /**
     * Setter subCat
     * @param {string} value
     */
	public set subCat(value: string) {
		this._subCat = value;
	}

    /**
     * Setter product
     * @param {ProductType} value
     */
	public set product(value: ProductType) {
		this._product = value;
	}

    /**
     * Setter productTitle
     * @param {string} value
     */
	public set productTitle(value: string) {
		this._productTitle = value;
    }
    
    /**
     * Getter isDaily
     * @return {boolean}
     */
	public get isDaily(): boolean {
        if(typeof(this._isDaily) === 'undefined'){
            this._isDaily = false;
        }          
		return JSON.parse(<any>this._isDaily);
	}

    /**
     * Setter isDaily
     * @param {boolean} value
     */
	public set isDaily(value: boolean) {
		this._isDaily = value;
    }

    /**
     * Getter changingStateFav
     * @return {boolean}
     */
	public get changingStateFav(): boolean {
		return this._changingStateFav;
	}

    /**
     * Setter changingStateFav
     * @param {boolean} value
     */
	public set changingStateFav(value: boolean) {
		this._changingStateFav = value;
	}
    
    public convertToJSON(): string {
        let json = JSON.stringify(this);
        Object.keys(this).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });
        return json;
    }

    /**
     * Setter beginTime
     * @param {Date} value
     */
	public set beginTime(value: Date) {
		this._beginTime = value;
    }

    /**
     * Getter beginTime
     * @return {Date}
     */
	public get beginTime(): Date {
		return this._beginTime;
    }
    
        /**
     * Setter endTime
     * @param {Date} value
     */
	public set endTime(value: Date) {
		this._endTime = value;
    }

    /**
     * Getter endTime
     * @return {Date}
     */
	public get endTime(): Date {
		return this._endTime;
    }
    

    /**
     * Getter segs
     * @return {number}
     */
	public set segs(value: number){
		this._segs = value
	}

    /**
     * Getter mediaId
     * @return {number}
     */
	public get segs(): number {
		return this._segs;
    }
 
    /**
     * Setter date
     * @param {Date} value
     */
	public set date(value: Date) {
		this._date = value;
    }

    /**
     * Getter date
     * @return {Date}
     */
	public get date(): Date {
		return this._date;
    }

    public isSingleMeditation():boolean{
        return this.product == ProductType.Singles;
    }



}