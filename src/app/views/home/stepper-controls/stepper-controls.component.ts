import {Component, Input} from '@angular/core';
import {StepperComponent} from '../../../../common/components/stepper/stepper.component';
import {NextStepDirective} from '../../../../common/components/stepper/next-step.directive';

@Component({
  selector: 'app-stepper-controls',
  imports: [
    NextStepDirective
  ],
  templateUrl: './stepper-controls.component.html',
  styleUrl: './stepper-controls.component.css'
})
export class StepperControlsComponent {

  @Input({required: true}) stepper!: StepperComponent;
}
