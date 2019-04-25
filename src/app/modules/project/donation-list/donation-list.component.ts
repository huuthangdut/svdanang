import { ProjectService } from './../../../core/services/project.service';
import { DonationsDataSource } from './donation.data-source';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit, AfterViewInit {

  @Input() projectId: number;

  dataSource: DonationsDataSource;
  displayedColumns = ['avatar', 'lastName', 'firstName', 'email', 'gender', 'phoneNumber', 'amount', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.dataSource = new DonationsDataSource(this.projectService);
    this.dataSource.loadDonations(this.projectId);
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

  loadDonationsPage() {
    this.dataSource.loadDonations(
      this.projectId,
      this.search.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onView(donationId: number) {

  }



}
