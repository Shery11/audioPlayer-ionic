export class BackgroundSound {

    private _id : number;
    private _name: string;
    private _free: boolean;
    private _url: string;



    constructor(id?:number,name?:string,free?:boolean, url?:string){
        this._id = id;
        this._name = name;
        this._free = free;
        this._url = url;
    }

    get id() : number {
        return this._id
    }

    set id (newId: number) {
        this._id = newId
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }

    get url(): string {
        return this._url;
    }

    set url(newName: string) {
        this._url = newName;
    }

    get free(): boolean {
        return this._free;
    }

    set free(type: boolean) {
        this._free = type;
    }

    public static default():BackgroundSound{
        return new BackgroundSound(1,'Calm Sailing',true,"assets/audios/loops/calm-sailing.wav");
    }

}
