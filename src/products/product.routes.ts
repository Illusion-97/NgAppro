import {ActivatedRoute, Routes} from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productResolver} from './views/editor/editor.component';

export const routes: Routes = [
  {
    path:"",
    loadComponent: () => import("./views/list/list.component")
      .then(m => m.ListComponent),
    resolve: {
      produits: ()=> inject(HttpClient).get("/products")
    }
  },
  {
    path: ":id",
    loadComponent: () => import("./views/editor/editor.component")
      .then(m => m.EditorComponent),
    resolve: {
      produit: productResolver
    }/*,
    data: {
      fixedProduct: undefined
    }*/
  }
]
