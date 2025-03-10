import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {WaiterComponent} from '../waiter/waiter.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    WaiterComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
