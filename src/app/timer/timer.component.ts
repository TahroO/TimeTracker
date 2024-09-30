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

  //ToDo Needs to be reworked so that counter is not undefined;
  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  //ToDo needs fix for addition - subtract already existing balance from counter
  addCounterToAbsolut() {
    if (this.counter) {
      this.totalAmount += this.counter;
      this.addAbsolutToProject();
    }
    this.sendData();
    return this.totalAmount;
  }

  //ToDo Review which data is stored
  // this also seems to update only once when button is pressed
  addAbsolutToProject() {
    if (this.counter) {
      this.projectData.push(this.counter);

      return this.projectData;
    }
    return null;
  }

  sendData() {
    this.dataService.setData(this.projectData);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
