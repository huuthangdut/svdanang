import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';

import { RoleService } from '../../../core/services';
import { Role } from './../../../core/models/role.model';
import { RoleFormComponent } from './../role-form/role-form.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, AfterViewInit {

  dataSource: RolesDataSource;
  displayedColumns = ['name', 'description', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private dialog: MatDialog,
    private roleService: RoleService) { }

  ngOnInit() {
    this.dataSource = new RolesDataSource(this.roleService);
    this.dataSource.loadRoles();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadRolesPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadRolesPage())
      ).subscribe();
  }

  loadRolesPage() {
    this.dataSource.loadRoles(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "40%";
    dialogConfig.position = { top: '10vh' }
    // dialogConfig.height = "60%";
    this.dialog.open(RoleFormComponent, dialogConfig);
  }

  onEdit(roleId: number) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { id: roleId };
    this.dialog.open(RoleFormComponent, dialogConfig);
  }

}

class RolesDataSource implements DataSource<Role> {
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private roleService: RoleService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Role[]> {
    return this.rolesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rolesSubject.complete();
    this.loadingSubject.complete();
  }

  loadRoles(filter = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 3) {
    this.loadingSubject.next(true);

    this.roleService.getRoles(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(roles => this.rolesSubject.next(roles));
  }
}
