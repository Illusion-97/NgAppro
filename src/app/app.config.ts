import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpInterceptorFn, provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, finalize, throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';

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

const tokenInterceptor : HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if(req.url.startsWith(environment.API_URL) && auth.token) {
    req = req.clone({
      url: environment.API_URL + req.url,
      setHeaders: {
        Authorization: "Bearer " + auth.token
      }
    })
  }
  return next(req).pipe(catchError(err => {
    if(err.status == 401)
      auth.logout()
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
      backEndInterceptor,
      tokenInterceptor
    ]))
  ]
};

