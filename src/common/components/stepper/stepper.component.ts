import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef, Input,
  QueryList,
  ViewChild
} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
import {StepComponent} from './step/step.component';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements AfterViewInit, AfterContentInit {
  @Input({transform: (value: string) => Number(value)})
  interval?: number
  @Input({transform: () => true})
  random: boolean = false

  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  get index() {
    return this.currentIndex.value
  }

  set index(value) {
    this.currentIndex.next(value)
  }

  @ViewChild("relative")
  div?: ElementRef<HTMLDivElement>
  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>

  get isFirst() {
    return !this.index
  }

  get last() {
    return this.steps.length - 1
  }

  get isLast() {
    return this.index == this.last
  }

  constructor() {
    console.log("in constructor")
    console.log("div : ", this.div)
    console.log("steps : ", this.steps)
  }

  prev() {
    this.index = this.isFirst ? this.last : this.index - 1
  }

  next() {
    this.index = this.isLast ? 0 : this.index + 1
  }

  ngAfterViewInit(): void {
    console.log("in afterViewInit")
    console.log("div : ", this.div)
    console.log("steps : ", this.steps)

  }

  ngAfterContentInit(): void {
    console.log("in afterContentInit")
    console.log("div : ", this.div)
    console.log("steps : ", this.steps)

    this.steps.forEach((step, index) => {
      step.index = index
      // uniquement en DEV
      step.detectorRef.detectChanges()
    })

    if(this.interval)
      interval(this.interval).subscribe(() => this.random
        ? this.index = Math.ceil(Math.random() * this.last)
        : this.next())
  }
}
