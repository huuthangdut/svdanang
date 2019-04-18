import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { RoleService } from '../../../core/services';
import { DialogService } from '../../../shared/services/dialog.service';
import { RoleFormComponent } from './../role-form/role-form.component';
import { RolesDataSource } from './role.data-source';

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
  @ViewChild('search') search: ElementRef;

  constructor(
    private dialog: MatDialog,
    private roleService: RoleService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new RolesDataSource(this.roleService);
    this.dataSource.loadRoles();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
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
    dialogConfig.position = { top: '10vh' };
    let dialogRef = this.dialog.open(RoleFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response)
          this.loadRolesPage()
      });
  }

  onEdit(id: number) {
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
        this.roleService.deleteRole(id).subscribe(
          () => this.handleDeleteSuccess,
          (error) => this.handleDeleteError);
      }
    });
  }

  handleDeleteSuccess() {
    this.paginator.pageIndex = 0;
    this.loadRolesPage();
    this.snackBar.open("Xoá thành công.", "");
  }

  handleDeleteError() {
    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.")
  }

}

