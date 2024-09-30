import {Component, effect, ViewChild} from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle, NgApexchartsModule
} from "ng-apexcharts";
import {DataService} from "../data-service/data-service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-time-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './time-chart.component.html',
  styleUrl: './time-chart.component.css'
})
export class TimeChartComponent {
  dataSignal;
  numbers: number[] = [];

  @ViewChild("chart", {static: false }) chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  constructor(private dataService: DataService) {
    effect(() => {
      const currentSignalValue = this.dataSignal();
      this.numbers = [...currentSignalValue];
    });
    this.dataSignal = this.dataService.getData();

    this.chartOptions = {
      series: [
        {
          name: "series-1",
          data: this.numbers
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Foo1"
      },
      xaxis: {
        categories: ["Project 1", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }

    };

  }

  // Updates the chart with new data
  public updateSeries() {
    this.dataSignal = this.dataService.getData();
    console.warn('Update state:' + this.numbers);
    this.chartOptions.series = [{
      data: this.numbers
    }];


  }

}
