import { SubscriptionModel } from "./subscription";
import { UserModel } from "./user";

export class InfoSupportModel {
    private _version: string;
    private _user:UserModel
    private _subscription:SubscriptionModel

    get version(): string {
        return this._version;
    }
    set version(value: string) {
        this._version = value;
    }

    get user(): UserModel {
        return this._user;
    }
    set user(value: UserModel) {
        this._user = value;
    }

    get subscription(): SubscriptionModel {
        return this._subscription;
    }
    set subscription(value: SubscriptionModel) {
        this._subscription = value;
    }

}