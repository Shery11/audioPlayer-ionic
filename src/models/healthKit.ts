export class HealthKitModel{
    private _toggle:boolean=false;
    private _askPermission:boolean=false;
    private _enable:boolean=false;
    private _platformIsEnabled:boolean = false;

    get toggle(): boolean {
        return this._toggle;
    }
    set toggle(value: boolean) {
        this._toggle = value;
    }
    get askPermission(): boolean {
        return this._askPermission;
    }
    set askPermission(value: boolean) {
        this._askPermission = value;
    }
    get enable(): boolean {
        return this._enable;
    }
    set enable(value: boolean) {
        this._enable = value;
    }
    get platformIsEnabled(): boolean {
        return this._platformIsEnabled;
    }
    set platformIsEnabled(value: boolean) {
        this._platformIsEnabled = value;
    }
}