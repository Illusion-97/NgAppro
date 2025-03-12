import { Routes } from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {authGuard, AuthService} from '../auth/auth.service';
import {Observable, Subject} from 'rxjs';
import {ModalService} from '../common/services/modal.service';
import {ExitConfirmComponent} from '../common/components/exit-confirm/exit-confirm.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./views/home/home.component")
      .then(m => m.HomeComponent),
    resolve: {
      produits: ()=> inject(HttpClient).get("/products")
    },
    canActivate: [
      ()=> {
        console.log("canActivate")
        return true
      }
    ]
  },
  {
    path: "products",
    loadChildren: () => import("../products/product.routes")
      .then(m => m.routes),
    canMatch: [authGuard],
    canDeactivate: [
      () => {
        const response = new Subject<boolean>()
        inject(ModalService).open({
          component: ExitConfirmComponent,
          inputs: {},
          onClose: (closeFn, submitted) => {
            response.next(submitted)
            closeFn()
          }
        })

        return response
      }
    ]
  },
  {
    path: "auth",
    loadChildren: () => import("../auth/auth.routes")
      .then(m => m.routes),
    canActivateChild: [
      ()=> {
        console.log("canActivate")
        return true
      }
    ]
  },
  {
    path: "**",
    loadComponent: () => import("./views/not-found/not-found.component")
      .then(m => m.NotFoundComponent)
  }
];
