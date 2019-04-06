import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';

import { UserModel } from '../../../core/models';
import { UserService } from './../../../core/services';
import { DialogService } from './../../../shared/services/dialog.service';
import { UserFormComponent } from './../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  dataSource: UsersDataSource;
  displayedColumns = ['avatar', 'userName', 'lastName', 'firstName', 'email', 'department', 'roles', 'isActive', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers();
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
        tap(() => this.loadUsersPage())
      ).subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
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
    dialogConfig.position = { top: '10vh' }

    let dialogRef = this.dialog.open(UserFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response)
          this.loadUsersPage()
      });
  }

  onEdit(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "650px";
    dialogConfig.position = { top: '10vh' };
    dialogConfig.data = { userId: id };

    let dialogRef = this.dialog.open(UserFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response)
          this.loadUsersPage()
      });
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá người dùng',
      message: 'Bạn có chắc chắn muốn xoá người dùng này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() =>
          this.loadUsersPage());
      }
    });
  }

}


class UsersDataSource implements DataSource<UserModel> {
  private usersSubject = new BehaviorSubject<UserModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number;
  public pageSize: number;
  public totalElements: number;

  constructor(private userService: UserService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<UserModel[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(filter = '', sortBy = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.userService.getUsers(filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let users = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.usersSubject.next(users)
        }
      });
  }
}
