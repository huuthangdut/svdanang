import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { EventService } from '../../../core/services/event.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { VolunteersDataSource } from './volunteer.data-source';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit, AfterViewInit {

  @Input() eventId: number;

  dataSource: VolunteersDataSource;
  displayedColumns = ['avatar', 'fullName', 'email', 'gender', 'phoneNumber', 'address', 'office', 'skills', 'note']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.dataSource = new VolunteersDataSource(this.eventService);
    this.dataSource.loadVolunteers(this.eventId);
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadVolunteersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadVolunteersPage())
      ).subscribe();
  }

  loadVolunteersPage() {
    this.dataSource.loadVolunteers(
      this.eventId,
      this.search.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

}
