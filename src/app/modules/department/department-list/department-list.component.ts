import { Title } from '@angular/platform-browser';
import { DepartmentFormComponent } from './../department-form/department-form.component';
import { DialogService } from './../../../shared/services/dialog.service';
import { DepartmentService } from './../../../core/services/department.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { ACTION } from '../../../shared/constants/action.constant';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  isLoading = false;

  displayedColumns = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource();

  ACTION = ACTION;

  constructor(
    private departmentService: DepartmentService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Danh sách ban');

    this.loadDepartmentsPage();
  }

  loadDepartmentsPage() {
    this.isLoading = true;
    this.departmentService.getAll().subscribe(response => {
      if (response.success) {
        this.dataSource = new MatTableDataSource(response.data);
        this.isLoading = false;
      }
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    dialogConfig.position = { top: '15vh' };
    const dialogRef = this.dialog.open(DepartmentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartmentsPage();
      }
    });
  }

  onEdit(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    dialogConfig.position = { top: '15vh' };
    dialogConfig.data = { departmentId: id }
    const dialogRef = this.dialog.open(DepartmentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartmentsPage();
      }
    });
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá ban',
      message: 'Bạn có chắc chắn muốn xoá ban này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.departmentService.deleteDepartment(id).subscribe(
          (response) => this.handleDeleteSuccess(response),
          (error) => this.handleDeleteError(error)
        )
      }
    });
  }

  handleDeleteSuccess(response): void {
    this.snackBar.open('Xoá ban thành công.', '', {
      duration: 2000
    });
    this.loadDepartmentsPage();
  }

  handleDeleteError(error: any): void {
    this.snackBar.open('Có lỗi xảy ra. Vui lòng thử lại', '', {
      duration: 2000
    });
  }

}