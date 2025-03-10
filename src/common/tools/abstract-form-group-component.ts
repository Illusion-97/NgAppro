import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export abstract class AbstractFormGroupComponent {
    abstract form: FormGroup

  getControl(control: string | AbstractControl) : AbstractControl {
    if(typeof control === "string") {
      const c = this.form.get(control)
      if(!c) throw new Error('Le controle est introuvable')
      control = c
    }
    return control
  }

  hasInteraction(control: string| AbstractControl) : boolean {
    control = this.getControl(control)
    return control.dirty || control.touched
  }

  isInvalid(control: string | AbstractControl) {
    control = this.getControl(control)
    return this.hasInteraction(control) && control.invalid
  }

  hasError(control: string | AbstractControl, errorCode: string) {
    control = this.getControl(control)
    return this.hasInteraction(control) && control.hasError(errorCode)
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if(this.form.valid)
      this.onSubmit$()
  }

  abstract onSubmit$(): void

  mustMatch(matchingControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        return control.value === matchingControl.value ? null : {"mustmatch": true}
    }
  }
}
