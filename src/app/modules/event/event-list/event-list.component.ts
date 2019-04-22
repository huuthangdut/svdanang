import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { EventService } from './../../../core/services/event.service';
import { DialogService } from './../../../shared/services/dialog.service';
import { EventsDataSource } from './event.data-source';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, AfterViewInit {

  dataSource: EventsDataSource;
  displayedColumns = ['image', 'name', 'location', 'topic', 'startTime', 'endTime', 'createdDate', 'status', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;


  constructor(private router: Router,
    private eventService: EventService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new EventsDataSource(this.eventService);
    this.dataSource.loadEvents();
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadEventsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEventsPage())
      ).subscribe();
  }

  loadEventsPage() {
    this.dataSource.loadEvents(
      this.search.nativeElement.value,
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
        this.eventService.deleteEvent(id).subscribe(
          () => this.handleDeleteSuccess(),
          (error) => this.handleDeleteError(error)

        );
      }
    });
  }

  handleDeleteSuccess(): void {
    this.snackBar.open('Xoá sự kiện thành công.', '', {
      duration: 2000
    });
    this.paginator.pageIndex = 0;
    this.loadEventsPage();
  }

  handleDeleteError(error: any): void {
    this.snackBar.open('Có lỗi xảy ra. Vui lòng thử lại', '', {
      duration: 2000
    });
  }

}
