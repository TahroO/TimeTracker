import {Component, OnDestroy, Output} from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnDestroy {

  counter: number | undefined;
  totalAmount: number = 0;
  timerRef: any;
  running: boolean = false;
  startText = 'Start';
  projectData: number[] = [];

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  addCounterToAbsolut() {
    if (this.counter) {
      this.totalAmount += this.counter;
      this.addAbsolutToProject();
    }
    return this.totalAmount;
  }

  addAbsolutToProject() {
    if (this.counter) {
      this.projectData.push(this.counter);
      return this.projectData;
    }
    return null;
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
