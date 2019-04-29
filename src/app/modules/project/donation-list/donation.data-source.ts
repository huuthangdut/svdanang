import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';

import { Donation } from '../../../core/models/donation.model';
import { ProjectService } from './../../../core/services/project.service';

export class DonationsDataSource implements DataSource<Donation> {
  private donationsSubject = new BehaviorSubject<Donation[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number = 0;
  public pageSize: number = 0;
  public totalElements: number = 0;

  constructor(private projectService: ProjectService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Donation[]> {
    return this.donationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.donationsSubject.complete();
    this.loadingSubject.complete();
  }

  loadDonations(projectId: number, filter = '', sortBy = 'amount',
    sortDirection = 'desc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.projectService.getDonations(projectId, filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let donations = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.donationsSubject.next(donations);
        }
      });
  }
}