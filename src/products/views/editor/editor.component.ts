import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router} from '@angular/router';
import {catchError, finalize, map, of, race, timeout} from 'rxjs';
import {AbstractFormGroupComponent} from '../../../common/tools/abstract-form-group-component';
import {Produit} from '../../../app/views/home/home.component';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-editor',
  imports: [ReactiveFormsModule],
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
  //private route = inject(ActivatedRoute)
  private readonly endpoint = "/products"
  auth = inject(AuthService)

  constructor(private readonly route: ActivatedRoute) {
    super();
    route.data.subscribe(({produit}) => {
      if(produit) this.form.patchValue(produit)
      else this.form.reset(/*{name: "Name reset"}*/)
    })
    this.form.valueChanges.subscribe(changes => {
      this.auth.hasChanges = true
    })
  }

  get isUpdate() {
    return !!this.form.value.id
  }

  get url() {
    return this.isUpdate ? `${this.endpoint}/${this.form.value.id}` : this.endpoint
  }


  onSubmit$() {
      this.http[this.isUpdate ? 'put' : 'post'](this.url,this.form.value)
        .subscribe(() => {
          this.auth.hasChanges = false
          this.router.navigate(["../"], {relativeTo: this.route})
        })
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

export const productResolver: ResolveFn<Produit | undefined> = (route, state) => {
  // const id = Number(route.params['id'])
  const id = Number(route.paramMap.get('id'))
  const router = inject(Router)
  return id
    ? inject(HttpClient).get<Produit>("/products/"+id)
      .pipe(catchError(err=> {
        console.log("gestion personnalisée", err)
        return of(new RedirectCommand(router.parseUrl("/products/0")))
      }))
    : undefined
}
