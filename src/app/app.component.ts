import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TimerComponent} from "./timer/timer.component";
import {NgForOf} from "@angular/common";
import {TimeChartComponent} from "./time-chart/time-chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimerComponent, NgForOf, TimeChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TimeTracker';

  timers: number[] = []

  constructor() {

  }

  addTimer() {
    this.timers.push(1);
    return this.timers;
  }

  removeTimer() {
    this.timers.pop();
    return this.timers;
  }



}
