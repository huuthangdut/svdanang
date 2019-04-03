import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  schedules = [];
  schedule = {};

  constructor() { }

  ngOnInit() {
    this.schedules = [
      { startTime: new Date(), endTime: new Date(), schedule: 'Ke hoach 1', location: 'Thon Among 1' },
      { startTime: new Date(), endTime: new Date(), schedule: 'Ke hoach 2', location: 'Thon Among 2' },
      { startTime: new Date(), endTime: new Date(), schedule: 'Ke hoach 3', location: 'Thon Among 3' },
      { startTime: new Date(), endTime: new Date(), schedule: 'Ke hoach 4', location: 'Thon Among 4' },
      { startTime: new Date(), endTime: new Date(), schedule: 'Ke hoach 5', location: 'Thon Among 5' },
      { startTime: new Date(), endTime: new Date(), schedule: 'Ke hoach 6', location: 'Thon Among 6' }
    ]
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";

  }

}
