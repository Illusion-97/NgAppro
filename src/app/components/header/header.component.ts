import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {WaiterComponent} from '../waiter/waiter.component';
import {AuthService} from '../../../auth/auth.service';

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
  protected service = inject(AuthService)

  hiddenDropdown: boolean = true

  constructor(protected router: Router) {
    router.events.subscribe(() => this.hiddenDropdown = true)
  }
}
