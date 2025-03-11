import { Routes } from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {authGuard, AuthService} from '../auth/auth.service';

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
        if(inject(AuthService).hasChanges)
          alert("Sure ?")
        return true
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
