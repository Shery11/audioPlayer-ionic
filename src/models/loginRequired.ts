import { AppModule } from "../app/app.module";
import { StorageProvider } from "../providers/storage/storage";
import { LandingPage } from "../pages/landing/landing";

export function LoginRequired() {

    return function (constructor) {
        constructor.prototype.ionViewCanEnter = async function () {
            const userStorage = AppModule.injector.get(StorageProvider);
            let user = await userStorage.getUser();
            const isAllowed = (user!=null); 
            if (!isAllowed) {
                setTimeout(() => {
                  this.navCtrl.setRoot(LandingPage);
                }, 0);
              }
            return isAllowed;
        };
    }
}