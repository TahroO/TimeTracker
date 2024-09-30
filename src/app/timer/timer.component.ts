import {Component, OnDestroy} from '@angular/core';
import {DataService} from "../data-service/data-service";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnDestroy {

  constructor(private dataService: DataService) {
  }

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
    this.counter = 0;
    clearInterval(this.timerRef);
  }

  //ToDo needs fix for addition - subtract already existing balance from counter
  addCounterToAbsolut() {
    if (this.counter) {
      if (this.counter > this.totalAmount) {
        this.totalAmount += (this.counter - this.totalAmount);
        this.addAbsolutToProject();
      } else {
        this.totalAmount += this.counter;
        this.addAbsolutToProject();
      }
    }
    return this.totalAmount;
  }
//ToDo fix to make it possible to store multiple values from different counters
  addAbsolutToProject() {
    if (this.totalAmount) {
      this.projectData = [this.totalAmount];
      console.log(this.totalAmount);
      this.sendData(this.projectData);
      return this.projectData;
    }
    return this.projectData;
  }

  sendData(data: any) {
    this.dataService.setData(data);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
