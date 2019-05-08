
export class CouponMetadata{
    private _alias:string;
    private _isEspecial:boolean;
    private _type:string;
    private _description:string;

    get alias(): string {
        return this._alias;
    }

    set alias(alias: string) {
        this._alias = alias;
    }

    get isEspecial(): boolean {
        return this._isEspecial;
    }

    set isEspecial(isEspecial: boolean) {
        this._isEspecial = isEspecial;
    }

    get type(): string {
        return this._type;
    }

    set type(type: string) {
        this._type = type;
    }

    get description(): string {
        return this._description;
    }

    set description(desc: string) {
        this._description = desc;
    }

}

export class CouponModel {

    private _id:string;
    private _amount_off:string;
    private _metadata:CouponMetadata;
    private _percent_off:number;


    get id(): string {
        return this._id;
    }

    set id(newId: string) {
        this._id = newId;
    }

    get amount_off(): string {
        return this._amount_off;
    }

    set amount_off(amount: string) {
        this._amount_off = amount;
    }

    get metadata():CouponMetadata {
        return this._metadata;
    }

    set metadata(metadata: CouponMetadata) {
        this._metadata = metadata;
    }

    get percent_off(): number {
        return this._percent_off;
    }

    set percent_off(off: number) {
        this._percent_off = off;
    }

}