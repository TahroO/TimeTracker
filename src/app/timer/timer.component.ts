import {Component, OnDestroy} from '@angular/core';
import {DataService} from "../data-service/data-service";
import {Project} from "../utils/project";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
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
  projectDataTest: Project[] = [];


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

  createProject(projectName:string, timeSpent: number) {
    return new Project(projectName, timeSpent);
  }

  //ToDo needs fix for addition - else branch should be limited (multiple adds)
  addCounterToAbsolut() {
    if (this.counter) {
      if (this.counter >= this.totalAmount) {
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
      // this should be the timerObject array
      //ToDo how to provide the name generic?
      this.projectDataTest = [this.createProject('foo', this.totalAmount)];
      console.log(this.totalAmount);
      console.log(this.projectDataTest);
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

  protected readonly FormData = FormData;
}
