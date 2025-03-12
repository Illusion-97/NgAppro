import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {WaiterComponent} from '../waiter/waiter.component';
import {AuthService} from '../../../auth/auth.service';
import {ModalService} from '../../../common/services/modal.service';
import {LoginComponent} from '../../../auth/views/login/login.component';

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

  constructor(protected router: Router, private modal: ModalService) {
    router.events.subscribe(() => this.hiddenDropdown = true)
  }

  openLogin() {
    this.modal.open({
      component: LoginComponent,
      inputs: {},
      onClose: (closeFn, submitted) => {
        if(submitted) {
          this.service.login({email: "yadekalom@gmail.com", password: "Password"})
            .subscribe(() => this.router.navigate(['/'])
              .then(() => closeFn()))
        }
        else {
          closeFn()
        }
      }
    })
  }
}
