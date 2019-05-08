export enum StoreProductType
{
    Monthly,
    Yearly,
    Forever
}



export class StoreProductModel {
    
    private _id : string;
    private _title: string;
    private _description: string;
    private _price: string
    private _currency:string
    private _alias:StoreProductType;
    private _email:string
    private _transaction?:any
    private _type:string
    private _coupon:string;
    private _priceWithDiscount:string;
    private _isSpecialCoupon:boolean


    constructor(id?:string,title?:string, description?:string, price?:string, currency?:string, alias?:StoreProductType){
        this._id = id;
        this._title = title;
        this._description = description;
        this._price = price;
        this._currency = currency;
        this._alias = alias;
    }

    get id() : string {
        return this._id
    }

    set id (newId: string) {
        this._id = newId
    }

    get title(): string {
        return this._title;
    }

    set title(newName: string) {
        this._title = newName;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get price(): string {
        return this._price;
    }

    set price(price: string) {
        this._price = price;
    }

    get currency(): string {
        return this._currency;
    }

    set currency(currency: string) {
        this._currency = currency;
    }

    get alias(): StoreProductType {
        if(typeof(this._alias) === 'string'){
            this.alias = StoreProductType[<string>this._alias];
        }
		return this._alias;
	}

    set alias(alias: StoreProductType) {
        this._alias = alias;
    }

    get email(): string {
        return this._email;
    }

    set email(newEmail: string) {
        this._email = newEmail;
    }

    get transaction() : any {
        return this._transaction
    }

    set transaction (u: any) {
        this._transaction = u
    }

    get type() : string {
        return this._type
    }

    set type (u: string) {
        this._type = u
    }

    get coupon() : string {
        return this._coupon
    }

    set coupon (u: string) {
        this._coupon = u
    }

    get priceWithDiscount() : string {
        return this._priceWithDiscount
    }

    set priceWithDiscount (u: string) {
        this._priceWithDiscount = u
    }

    get isSpecialCoupon() : boolean {
        return this._isSpecialCoupon
    }

    set isSpecialCoupon (u: boolean) {
        this._isSpecialCoupon = u
    }
}

