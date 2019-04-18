import { VolunteersDataSource } from './volunteer.data-source';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { EventService } from '../../../core/services/event.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { merge } from 'hammerjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {

  @Input() eventId: number;

  dataSource: VolunteersDataSource;
  displayedColumns = ['avatar', 'lastName', 'firstName', 'email', 'gender', 'phoneNumber', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

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
    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 1;
    //       this.loadUsersPage();
    //     })
    //   )
    //   .subscribe();

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
      // this.input.nativeElement.value,
      '',
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onView(eventId: number) {

  }

}
