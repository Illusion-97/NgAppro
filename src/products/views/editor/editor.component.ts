import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs';
import {AbstractFormGroupComponent} from '../../../common/tools/abstract-form-group-component';

@Component({
  selector: 'app-editor',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormGroupComponent {
  // string, number, boolean ...
  control: FormControl<boolean> = new FormControl<boolean>(true, {nonNullable: true})
  // object
  group: FormGroup<{attribut: FormControl<boolean>}> = new FormGroup<{attribut: FormControl<boolean>}>({
    attribut: this.control
  })
  // collections
  array: FormArray = new FormArray([
    new FormControl()
  ])

  form: FormGroup = new FormGroup<ProduitForm>({
    id: new FormControl(0, {nonNullable: true}),
    name: new FormControl("Mon nouveau Produit", {nonNullable: true, validators: [Validators.required, Validators.minLength(5)]}),
    src: new FormControl("https://toutetnimportequoi", {nonNullable: true, validators: [Validators.required, Validators.pattern("https://.+")]}),
    rating: new FormControl(3, {nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(5)]}),
    price: new FormControl(45, {nonNullable: true, validators: [Validators.required]})
  })

  private http = inject(HttpClient)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private readonly endpoint = "/products"

  get isUpdate() {
    return !!this.form.value.id
  }

  get url() {
    return this.isUpdate ? `${this.endpoint}/${this.form.value.id}` : this.endpoint
  }


  onSubmit$() {
      this.http[this.isUpdate ? 'put' : 'post'](this.url,this.form.value)
        .subscribe(() => this.router.navigate(["../"], {relativeTo: this.route}))
  }


  /* const interaction = this.control.touched || this.control.dirty
   const invalid = this.control.invalid && interaction
   const required = this.control.hasError('required')
   const minlength = this.control.hasError('minlength')
   // {required: true}
   // {minlength: {expected: 5, actual: 2}}
   const errors = this.control.errors */
}

export interface ProduitForm {
  id: FormControl<number>
  name: FormControl<string>
  src: FormControl<string>
  rating: FormControl<number>
  price: FormControl<number>
}
