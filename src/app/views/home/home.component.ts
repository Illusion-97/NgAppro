import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Observable<Produit[]>  = inject(HttpClient).get<Produit[]>("http://localhost:3000/products")
}

interface Produit {
  id: number
  name: string
  src: string
  rating: number
  price: number
}
