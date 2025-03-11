import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AbstractFormGroupComponent} from '../../../common/tools/abstract-form-group-component';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractFormGroupComponent {
  password: FormControl = new FormControl("", {validators: [Validators.minLength(6), Validators.required]})
  confirmPassword: FormControl = new FormControl("", {validators: [Validators.required, this.mustMatch(this.password)]})

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", {validators: Validators.required}),
    email: new FormControl("", {validators: [Validators.email, Validators.required]}),
    password: this.password,
  })

  private service : AuthService = inject(AuthService)
  private router: Router = inject(Router)

  onSubmit$(): void {
    this.service.register(this.form.value).subscribe(() => this.router.navigate(['/auth/login']))
  }
}
