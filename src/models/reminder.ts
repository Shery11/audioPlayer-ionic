import * as moment from 'moment';

export class ReminderModel {
    
    private _id : number;
    private _time: string;


    constructor(id?:number, time? : string){
        this._id = id;
        this._time = time;
    }

    get id() : number {
        return this._id
    }

    set id (newId: number) {
        this._id = newId
    }

    get time(): string {
        return this._time;
    }

    set time(newName: string) {
        this._time = newName;
    }

    public getFirstTime() : Date{
        return moment(this._time).toDate();
    }
}