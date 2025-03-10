import {Component, inject} from '@angular/core';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Observable<Produit[]>  = inject(ActivatedRoute).data.pipe(map(({produits}) => produits))
}

export interface Produit {
  id: number
  name: string
  src: string
  rating: number
  price: number
}
