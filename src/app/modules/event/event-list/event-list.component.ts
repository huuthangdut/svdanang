import { DialogService } from './../../../shared/services/dialog.service';
import { EventService } from './../../../core/services/event.service';
import { EventsDataSource } from './event.data-source';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { merge } from 'hammerjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, AfterViewInit {

  dataSource: EventsDataSource;
  displayedColumns = ['name', 'description', 'location', 'topic', 'startTime', 'endTime', 'createdDate', 'status', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(private router: Router,
    private eventService: EventService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.dataSource = new EventsDataSource(this.eventService);
    this.dataSource.loadEvents();
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
        tap(() => this.loadEventsPage())
      ).subscribe();
  }

  loadEventsPage() {
    this.dataSource.loadEvents(
      // this.input.nativeElement.value,
      '',
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onCreate() {
    this.router.navigate(['/events/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/events', id]);
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá sự kiện',
      message: 'Bạn có chắc chắn muốn xoá sự kiện này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(id).subscribe(() =>
          this.loadEventsPage());
      }
    });
  }

}
