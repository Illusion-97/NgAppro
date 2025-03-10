import {Component, inject} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Produit} from '../../../app/views/home/home.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products: Observable<Produit[]>  = inject(ActivatedRoute).data.pipe(map(({produits}) => produits || []))
}
