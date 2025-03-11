import {Component, inject} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Produit} from '../../../app/views/home/home.component';
import {AsyncPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';

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
  private readonly http = inject(HttpClient)

  delete(id: number) {
    this.products = this.http.delete("/products/" + id)
      .pipe(switchMap(() => this.http.get<Produit[]>("/products")))
  }
}
