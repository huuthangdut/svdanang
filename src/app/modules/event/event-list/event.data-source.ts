import { EventService } from './../../../core/services/event.service';
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { first, catchError, finalize } from 'rxjs/operators';
import { Event } from '../../../core/models/event.model';

export class EventsDataSource implements DataSource<Event> {
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number;
  public pageSize: number;
  public totalElements: number;

  constructor(private eventService: EventService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Event[]> {
    return this.eventsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.eventsSubject.complete();
    this.loadingSubject.complete();
  }

  loadEvents(filter = '', sortBy = 'createdAt',
    sortDirection = 'desc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.eventService.getEvents(filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let events = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.eventsSubject.next(events);
        }
      });
  }
}
