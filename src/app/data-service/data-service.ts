import {Component, WritableSignal} from '@angular/core';
import { Injectable, signal } from '@angular/core';

@Component({
  selector: 'app-data-service',
  standalone: true,
  imports: [],
  templateUrl: './data-service.html',
  styleUrl: './data-service.css'
})

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private data: WritableSignal<number[]>  = signal<number[]>([]);

  setData(update: number[]) {
    this.data.set(update);
  }

  getData(){
    return this.data;
  }
}
