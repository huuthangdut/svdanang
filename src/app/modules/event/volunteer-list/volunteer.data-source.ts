import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';

import { Volunteer } from './../../../core/models/volunteer.model';
import { EventService } from './../../../core/services/event.service';

export class VolunteersDataSource implements DataSource<Volunteer> {
  private volunteersSubject = new BehaviorSubject<Volunteer[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number;
  public pageSize: number;
  public totalElements: number;

  constructor(private eventService: EventService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Volunteer[]> {
    return this.volunteersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.volunteersSubject.complete();
    this.loadingSubject.complete();
  }

  loadVolunteers(eventId: number, filter = '', sortBy = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.eventService.getVolunteers(eventId, filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let volunteers = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.volunteersSubject.next(volunteers);
        }
      });
  }
}