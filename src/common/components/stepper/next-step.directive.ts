import {Directive, HostListener, Input} from '@angular/core';
import {StepperComponent} from './stepper.component';

@Directive({
  selector: '[nextStep]'
})
export class NextStepDirective {

  @Input({required: true}) stepper!: StepperComponent
  @Input() nextStep: 'first' | 'prev' | 'next' | 'last' | number = "next"

  @HostListener("click")
  handleClick() {
    switch (this.nextStep) {
      case "first":
        this.stepper.index = 0
        break
      case "prev":
        this.stepper.prev()
        break
      case "next":
        this.stepper.next()
        break
      case "last":
        this.stepper.index = this.stepper.last
        break
      default:
        this.stepper.index = this.nextStep
    }
  }

}
