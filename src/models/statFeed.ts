import { MoodModel } from "./mood";

export class StatFeedModel{
    private _date:Date
    private _media_id:number;
    private _time:Date;
    private _mood:MoodModel;

    get date(): Date {
        return this._date;
    }
    set date(value: Date) {
        this._date = value;
    }

    get media_id(): number {
        return this._media_id;
    }
    set media_id(value: number) {
        this._media_id = value;
    }

    get time(): Date {
        return this._time;
    }
    set time(value: Date) {
        this._time = value;
    }
    
    get mood(): MoodModel {
        return this._mood;
    }
    set mood(value: MoodModel) {
        this._mood = value;
    }
}

