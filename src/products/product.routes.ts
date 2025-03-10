import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export const routes: Routes = [
  {
    path:"",
    loadComponent: () => import("./views/list/list.component")
      .then(m => m.ListComponent),
    resolve: {
      produits: ()=> inject(HttpClient).get("/products")
    }
  }
]
