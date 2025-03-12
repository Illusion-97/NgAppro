import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AbstractFormGroupComponent} from '../../../common/tools/abstract-form-group-component';
import {AuthService} from 'my-auth';
import {ModalService} from '../../../common/services/modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends AbstractFormGroupComponent {
  @Input()
  form: FormGroup = new FormGroup({
    email: new FormControl("yadekalom@gmail.com", {validators: [Validators.email, Validators.required]}),
    password: new FormControl("Password", {validators: [Validators.minLength(6), Validators.required]}),
  })


  protected readonly service : AuthService = inject(AuthService)
  private readonly router: Router = inject(Router)
  private readonly modal = inject(ModalService)

  onSubmit$(): void {
    this.service.login(this.form.value).subscribe(() => this.router.navigate(['/']).then(() => this.modal.close()))
  }
}
