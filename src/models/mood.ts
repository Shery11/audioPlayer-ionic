export class MoodModel{
    private _mood:string
    private _mood_id: number
    private _count: number
    private _icon:string
    private _journal:string;

    constructor(mood_id?:number,mood?:string,icon?:string){
        this._mood = mood;
        this._mood_id = mood_id;
        this._icon = icon;
        this.count = 0;
    }
    get icon(): string {
        return this._icon;
    }
    set icon(value: string) {
        this._icon = value;
    }

    get mood(): string {
        return this._mood;
    }
    set mood(value: string) {
        this._mood = value;
    }
    
    get mood_id(): number {
        return this._mood_id;
    }
    set mood_id(value: number) {
        this._mood_id = value;
    }

    get count(): number {
        return this._count;
    }
    set count(value: number) {
        this._count = value;
    }

    get journal(): string {
        return this._journal;
    }
    set journal(value: string) {
        this._journal = value;
    }

    public convertToJSON(): string {
        let json = JSON.stringify(this);
        Object.keys(this).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });
        return json;
    }
}