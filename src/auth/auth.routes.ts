import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: "login", loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent)},
  {path: "register",  loadComponent: () => import('./views/register/register.component').then(m => m.RegisterComponent)},
  {path: "**", redirectTo: "login"} // path : "**" (wildcards) récupère toutes routes ne correspondant pas aux précédentes
]
