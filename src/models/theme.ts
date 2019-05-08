
export enum ThemeType
{
    Color,
    Image,
    Video
}

export class ThemeModel {
    
    private _id : number;
    private _css: string;
    private _title: string;
    private _type: ThemeType
    private _thumbCss:string;

    constructor(id?:number,title?:string,css?:string, type?:ThemeType,thumbCss?:string){
        this._css = css;
        this._id = id;
        this._title = title;
        this._type = type;
        this._thumbCss = thumbCss;
    }

    get id() : number {
        return this._id
    }

    set id (newId: number) {
        this._id = newId
    }

    get css(): string {
        return this._css;
    }

    set css(newName: string) {
        this._css = newName;
    }

    get title(): string {
        return this._title;
    }

    set title(newName: string) {
        this._title = newName;
    }

    get type(): ThemeType {
        return this._type;
    }

    set type(type: ThemeType) {
        this._type = type;
    }
    
    get thumbCss(): string {
        return this._thumbCss;
    }

    set thumbCss(newName: string) {
        this._thumbCss = newName;
    }

    public static default():ThemeModel{
        return new ThemeModel(1,'Welzen','default',ThemeType.Color)
    }

    public static settings():ThemeModel{
        return new ThemeModel(101,'Welzen','settings-palette',ThemeType.Color)
    }

    public isImage():boolean{
        return (this._type  === ThemeType.Image) 
    }

    public isVideo():boolean{
        return (this._type  === ThemeType.Video) 
    }
}

