import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCreate() {
    this.router.navigate(['/events/new']);
  }
}
