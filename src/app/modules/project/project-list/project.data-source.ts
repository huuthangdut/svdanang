import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';

import { Project } from '../../../core/models/project.model';
import { ProjectService } from './../../../core/services/project.service';

export class ProjectsDataSource implements DataSource<Project> {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number;
  public pageSize: number;
  public totalElements: number;

  constructor(private projectService: ProjectService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.projectsSubject.complete();
    this.loadingSubject.complete();
  }

  loadProjects(filter = '', sortBy = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.projectService.getProjects(filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let projects = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.projectsSubject.next(projects);
        }
      });
  }
}
