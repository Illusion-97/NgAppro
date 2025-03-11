import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {StepperComponent} from '../stepper.component';

@Component({
  selector: 'app-step',
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.css'
})
export class StepComponent {
  index: number = 0
  currentIndex = inject(StepperComponent).currentIndex
  detectorRef = inject(ChangeDetectorRef)
  get left() {
    return (this.index - this.currentIndex.value) * 100
  }
}
