import { Injectable, ErrorHandler } from '@angular/core';
import * as Raven from "raven-js";





Raven
  .config('https://f00e58525b9d46c7b1ebaa1b0445a6ce@sentry.io/238214',{
    environment: 'TEST'
  })
  .install();

@Injectable()
export class GlobalErrorHandlerProvider  implements ErrorHandler {

  handleError(error:any):void{
    console.error(error);
    Raven.captureException(error.originalError || error);
    // if(!environment.production) {
    //   super.handleError(err);
    // }
  }

}
