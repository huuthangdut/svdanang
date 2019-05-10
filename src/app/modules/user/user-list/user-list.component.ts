import { Title } from '@angular/platform-browser';
import { ACTION } from './../../../shared/constants/action.constant';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UserService } from './../../../core/services';
import { DialogService } from './../../../shared/services/dialog.service';
import { UserFormComponent } from './../user-form/user-form.component';
import { UsersDataSource } from './user.data-source';

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
  @ViewChild('search') search: ElementRef;

  ACTION = ACTION;



  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Danh sách người dùng');

    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers();
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUsersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadUsersPage())
      ).subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
      this.search.nativeElement.value,
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
        this.userService.deleteUser(id).subscribe(
          response => this.handleDeleteSuccess(),
          error => this.handleDeleteError(error)
        );
      }
    });
  }

  handleDeleteSuccess(): void {
    this.snackBar.open('Xoá người dùng thành công.', '', {
      duration: 2000
    });
    this.paginator.pageIndex = 0;
    this.loadUsersPage();
  }

  handleDeleteError(error: any): void {
    this.snackBar.open('Có lỗi xảy ra. Vui lòng thử lại', '', {
      duration: 2000
    });
  }

}

