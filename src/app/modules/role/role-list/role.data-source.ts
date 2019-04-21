import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';

import { Role } from '../../../core/models';
import { RoleService } from '../../../core/services';

export class RolesDataSource implements DataSource<Role> {
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number;
  public pageSize: number;
  public totalElements: number;

  constructor(private roleService: RoleService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Role[]> {
    return this.rolesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rolesSubject.complete();
    this.loadingSubject.complete();
  }

  loadRoles(filter = '', sortBy = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.roleService.getRoles(filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let roles = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.rolesSubject.next(roles);
        }
      });
  }
}
