export class UserModel {
    
    private id : String;
    private _fullname:String;
    private _email:String;
    private _emailFB:String;
    private _theme: String;
    private _paid: Boolean
    private _paidDate: Date;
    private _free_premium:boolean;


    _id():String{
        return this.id
    }

    get emailFB(): String {
        return this._emailFB;
    }

    set emailFB(newName: String) {
        this._emailFB = newName;
    }

    get fullname(): String {
        return this._fullname;
    }

    set fullname(newName: String) {
        this._fullname = newName;
    }

    get email(): String {
        return this._email;
    }

    set email(newName: String) {
        this._email = newName;
    }

    get paid(): Boolean {
        return this._paid;
    }

    set paid(newName: Boolean) {
        this._paid = newName;
    }

    get theme(): String {
        return this._theme;
    }

    set theme(newName: String) {
        this._theme = newName;
    }

    get paidDate(): Date {
        return this._paidDate;
    }

    set paidDate(newDate: Date) {
        this._paidDate = newDate;
    }

    get free_premium(): boolean {
        return this._free_premium;
    }

    set free_premium(newValue: boolean) {
        this._free_premium = newValue;
    }
}