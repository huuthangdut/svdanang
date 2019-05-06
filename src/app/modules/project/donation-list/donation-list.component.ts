import { DonationFormComponent } from './../donation-form/donation-form.component';
import { ProjectService } from './../../../core/services/project.service';
import { DonationsDataSource } from './donation.data-source';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DialogService } from '../../../shared/services/dialog.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit, AfterViewInit {

  @Input() projectId: number;

  dataSource: DonationsDataSource;
  displayedColumns = ['avatar', 'lastName', 'firstName', 'email', 'phoneNumber', 'amount', 'fee', 'createdAt', 'note', 'actions']

  donated = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new DonationsDataSource(this.projectService);
    this.dataSource.loadDonations(this.projectId);

    this.getCurrentDonatedAmount();
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDonationsPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadDonationsPage())
      ).subscribe();
  }

  getCurrentDonatedAmount() {
    this.projectService.getDonatedAmount(this.projectId).subscribe(response => {
      if (response.success) {
        this.donated = response.data;
      }
    });
  }

  loadDonationsPage() {
    this.dataSource.loadDonations(
      this.projectId,
      this.search.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onAddDonation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "470px";
    dialogConfig.position = { top: '15vh' };
    dialogConfig.data = { projectId: this.projectId }

    let dialogRef = this.dialog.open(DonationFormComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.paginator.pageIndex = 0;
          this.loadDonationsPage();
          this.getCurrentDonatedAmount();
        }

      });
  }

  onEdit(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "470px";
    dialogConfig.position = { top: '15vh' };
    dialogConfig.data = { projectId: this.projectId, donationId: id }

    let dialogRef = this.dialog.open(DonationFormComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.paginator.pageIndex = 0;
          this.loadDonationsPage();
          this.getCurrentDonatedAmount();
        }

      });
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá vai trò',
      message: 'Bạn có chắc chắn muốn xoá vai trò này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteDonation(id).subscribe(
          (response) => this.handleDeleteSuccess(),
          (error) => this.handleDeleteError(error));
      }
    });
  }

  handleDeleteSuccess() {
    this.snackBar.open("Xoá thông tin ủng hộ thành công.", '', {
      duration: 2000
    });
    this.paginator.pageIndex = 0;
    this.loadDonationsPage();
    this.getCurrentDonatedAmount();
  }

  handleDeleteError(error) {
    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000
    })
  }



}
