import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { DialogService } from '../../../shared/services/dialog.service';
import { ProjectService } from './../../../core/services/project.service';
import { ProjectsDataSource } from './project.data-source';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  dataSource: ProjectsDataSource;
  displayedColumns = ['image', 'name', 'topic', 'startTime', 'endTime', 'createdDate', 'status', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;


  constructor(private router: Router,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new ProjectsDataSource(this.projectService);
    this.dataSource.loadProjects();
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProjectsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProjectsPage())
      ).subscribe();
  }

  loadProjectsPage() {
    this.dataSource.loadProjects(
      this.search.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onCreate() {
    this.router.navigate(['/projects/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/projects', id]);
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá dự án',
      message: 'Bạn có chắc chắn muốn xoá dự án này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).subscribe(
          () => this.handleDeleteSuccess(),
          (error) => this.handleDeleteError(error)

        );
      }
    });
  }

  handleDeleteSuccess(): void {
    this.snackBar.open('Xoá dự án thành công.', '', {
      duration: 2000
    });
    this.paginator.pageIndex = 0;
    this.loadProjectsPage();
  }

  handleDeleteError(error: any): void {
    this.snackBar.open('Có lỗi xảy ra. Vui lòng thử lại', '', {
      duration: 2000
    });
  }

}
