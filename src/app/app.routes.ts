import { Routes } from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./views/home/home.component")
      .then(m => m.HomeComponent),
    resolve: {
      produits: ()=> inject(HttpClient).get("/products")
    }
  },
  {
    path: "**",
    loadComponent: () => import("./views/not-found/not-found.component")
      .then(m => m.NotFoundComponent)
  }
];
