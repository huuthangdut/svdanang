import { Dashboard } from './../../core/models/dashboard.model';
import { DashboardService } from './../../core/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdDigitsPipe, TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  // Current date
  year: any = new Date().getFullYear();

  loading = false;


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  yAxisLabel = 'Số tiền đã gây quỹ (VND)';
  showYAxisLabel = true;
  xAxisLabel = this.year;


  colorScheme = {
    domain: ['#4DD0E1', '#BA68C8', '#FF7043', '#AAAAAA']
  };

  // dashboard = {
  //   lastestMeetings: [
  //     { icon: 'event_note', name: 'Cuộc họp 1', location: 'Địa điểm 1', createdAt: new Date(2019, 4, 20) },
  //     { icon: 'event_note', name: 'Cuộc họp 1', location: 'Địa điểm 1', createdAt: new Date() },
  //     { icon: 'event_note', name: 'Cuộc họp 1', location: 'Địa điểm 1', createdAt: new Date() },
  //     { icon: 'event_note', name: 'Cuộc họp 1', location: 'Địa điểm 1', createdAt: new Date() },
  //     { icon: 'event_note', name: 'Cuộc họp 1', location: 'Địa điểm 1', createdAt: new Date() },
  //   ],
  //   userActivities: [
  //     {
  //       'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
  //       'activity': 'Chíp vừa ủng hộ cho dự án xxx số tiền 1500$',
  //       'createdAt': new Date()
  //     },
  //     {
  //       'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
  //       'activity': 'Chíp vừa ủng hộ cho dự án xxx số tiền 1500$',
  //       'createdAt': new Date()
  //     },
  //     {
  //       'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
  //       'activity': 'Chíp vừa ủng hộ cho dự án xxx số tiền 1500$',
  //       'createdAt': new Date()
  //     },
  //     {
  //       'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
  //       'activity': 'Chíp vừa ủng hộ cho dự án xxx số tiền 1500$',
  //       'createdAt': new Date()
  //     },
  //     {
  //       'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
  //       'activity': 'Chíp vừa ủng hộ cho dự án xxx số tiền 1500$',
  //       'createdAt': new Date()
  //     },
  //   ],
  //   totalRaisedByTopic: [
  //     {
  //       'name': 'Xã hội',
  //       'value': 2500000,
  //     },
  //     {
  //       'name': 'Giáo dục',
  //       'value': 2000000,
  //     },
  //     {
  //       'name': 'Trẻ em',
  //       'value': 250000
  //     },
  //   ],
  //   totalRaisedLastestYear: [
  //     {
  //       'name': 'Buôn lậu',
  //       'series': [
  //         {
  //           'name': '2019',
  //           'value': 7300000
  //         }
  //       ]
  //     },

  //     {
  //       'name': 'Giáo dục',
  //       'series': [
  //         {
  //           'name': '2019',
  //           'value': 8270000
  //         }
  //       ]
  //     },

  //     {
  //       'name': 'Xã hội',
  //       'series': [
  //         {
  //           'name': '2019',
  //           'value': 8940000
  //         },
  //       ]
  //     },
  //     {
  //       'name': 'Trẻ em',
  //       'series': [
  //         {
  //           'name': '2019',
  //           'value': 8940000
  //         },
  //       ]
  //     }
  //   ],
  //   totalRaisedInYear: [
  //     {
  //       'name': 'Xã hội',
  //       'series': [
  //         {
  //           'value': 150000,
  //           'name': 'T1',
  //         },
  //         {
  //           'value': 300000,
  //           'name': 'T2',
  //         },
  //         {
  //           'value': 600000,
  //           'name': 'T3',
  //         },
  //         {
  //           'value': 1200000,
  //           'name': 'T4',
  //         },
  //         {
  //           'value': 1500000,
  //           'name': 'T5',
  //         },
  //         {
  //           'value': 1500000,
  //           'name': 'T6',
  //         },
  //         {
  //           'value': 1500000,
  //           'name': 'T7',
  //         },
  //         {
  //           'value': 3500000,
  //           'name': 'T8',
  //         },
  //       ]
  //     },
  //     {
  //       'name': 'Giáo dục',
  //       'series': [
  //         {
  //           'value': 0,
  //           'name': 'T1',
  //         },
  //         {
  //           'value': 100000,
  //           'name': 'T2',
  //         },
  //         {
  //           'value': 200000,
  //           'name': 'T3',
  //         },
  //         {
  //           'value': 3200000,
  //           'name': 'T4',
  //         },
  //         {
  //           'value': 4500000,
  //           'name': 'T5',
  //         },
  //         {
  //           'value': 6500000,
  //           'name': 'T6',
  //         },
  //         {
  //           'value': 6500000,
  //           'name': 'T7',
  //         },
  //         {
  //           'value': 7500000,
  //           'name': 'T8',
  //         },
  //       ]
  //     },
  //     {
  //       'name': 'Trẻ em',
  //       'series': [
  //         {
  //           'value': 250000,
  //           'name': 'T1',
  //         },
  //         {
  //           'value': 350000,
  //           'name': 'T2',
  //         },
  //         {
  //           'value': 700000,
  //           'name': 'T3',
  //         },
  //         {
  //           'value': 2200000,
  //           'name': 'T4',
  //         },
  //         {
  //           'value': 2500000,
  //           'name': 'T5',
  //         },
  //         {
  //           'value': 2500000,
  //           'name': 'T6',
  //         },
  //         {
  //           'value': 3500000,
  //           'name': 'T7',
  //         },
  //         {
  //           'value': 4500000,
  //           'name': 'T8',
  //         },
  //       ]
  //     },
  //   ]
  // };

  // pie

  dashboard: Dashboard;

  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(
    private dashboardService: DashboardService,
    private titleService: Title,
    private loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Trang thông tin tổng quan');

    this.loading = true;
    this.dashboardService.getDashboardData().subscribe(response => {
      if (response.success) {
        this.dashboard = response.data;

        this.loading = false;
      }
    });
  }


  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  axisDate(val: string): string {
    return new DatePipe('en').transform(val, 'MMMM');
  }


}
