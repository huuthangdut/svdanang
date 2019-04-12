import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Role } from '../../../core/models';
import { RoleService } from '../../../core/services';
import { DialogService } from '../../../shared/services/dialog.service';
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
    private roleService: RoleService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource = new RolesDataSource(this.roleService);
    this.dataSource.loadRoles();
  }

  ngAfterViewInit() {
    // // server-side search
    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.loadRolesPage();
    //     })
    //   )
    //   .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadRolesPage())
      ).subscribe();
  }

  loadRolesPage() {
    this.dataSource.loadRoles(
      // this.input.nativeElement.value,
      '',
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "650px";
    dialogConfig.position = { top: '10vh' };
    let dialogRef = this.dialog.open(RoleFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response)
          this.loadRolesPage()
      });
  }

  onEdit(id: number) {
    console.log("on edit" + id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "650px";
    dialogConfig.position = { top: '10vh' };
    dialogConfig.data = { roleId: id };
    let dialogRef = this.dialog.open(RoleFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response)
          this.loadRolesPage()
      });
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá vai trò',
      message: 'Bạn có chắc chắn muốn xoá vai trò này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.roleService.deleteRole(id).subscribe(() =>
          this.loadRolesPage());
      }
    });
  }

}

class RolesDataSource implements DataSource<Role> {
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

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
