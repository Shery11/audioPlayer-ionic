import { MoodModel } from "./mood";

export class StatSummaryModel{
    private _stats:StatModel
    private _moods:MoodModel[];

    get stats(): StatModel {
        return this._stats;
    }
    set stats(value: StatModel) {
        this._stats = value;
    }
    get moods(): MoodModel[] {
        return this._moods;
    }
    set moods(value: MoodModel[]) {
        this._moods = value;
    }
}

export class StatModel{
    private _days:number
    private _totalSession: number
    private _totalSeconds: number
    private _totalSecondsInDate:Date;

    get days(): number {
        return this._days;
    }
    set days(value: number) {
        this._days = value;
    }
    get totalSession(): number {
        return this._totalSession;
    }
    set totalSession(value: number) {
        this._totalSession = value;
    }
    get totalSeconds(): number {
        return this._totalSeconds;
    }
    set totalSeconds(value: number) {
        this._totalSeconds = value;
    }
    get totalSecondsInDate(): Date {
        return this._totalSecondsInDate;
    }
    set totalSecondsInDate(value: Date) {
        this._totalSecondsInDate = value;
    }
}