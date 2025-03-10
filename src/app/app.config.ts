import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpInterceptorFn, provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, finalize, throwError} from 'rxjs';

const backEndInterceptor : HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith("/")) {
    req = req.clone({
      url: environment.API_URL + req.url
    })
  }
  return next(req).pipe(catchError(err => {
    console.log("gestion globale")
    return throwError(() => err)
  }))
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next) => {
        document.body.classList.add("!cursor-wait")
        return next(req).pipe(finalize(() => document.body.classList.remove("!cursor-wait")))
      },
      backEndInterceptor
    ]))
  ]
};

