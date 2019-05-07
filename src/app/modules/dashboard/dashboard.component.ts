import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TdDigitsPipe, TdLoadingService, ITdDataTableColumn } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { single, multi } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  // Current date
  year: any = new Date().getFullYear();

  dashboard: any;

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'avatar', label: '' },
    { name: 'name', label: 'Họ tên' },
    { name: 'activity', label: 'Hoạt động' }
  ];

  // Data table
  data: any[] = [
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },
    {
      'avatar': 'http://angular.demo.aspnetzero.com/assets/common/images/default-profile-picture.png',
      'name': 'Tran Huu Thang',
      'activity': 'Chíp vừa ủng hộ cho dự án Buôn lậu từ thiện  số tiền 1500$',
    },

  ];



  // view = [innerWidth / 1.3, 250];
  totalLabel: 'Tổng tiền';

  single: any[];
  multi: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  yAxisLabel = 'Số tiền đã gây quỹ (USD)';
  showYAxisLabel = true;
  xAxisLabel = 'Chủ đề';


  colorScheme = {

    domain: ['#4DD0E1', '#BA68C8', '#FF7043', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(
    private _titleService: Title,
    private _loadingService: TdLoadingService) {
    Object.assign(this, { single, multi })
  }

  ngOnInit(): void {


    // this._titleService.setTitle('Trang tổng quan - Diễn đàn sinh viên Đà nẵng');
    this.dashboard = {
      meetings: [
        { icon: 'event_note', name: 'Cuộc họp có tiêu đề hơi dài 1 tí', location: 'Địa điểm 1', createdAt: new Date(2019, 4, 20) },
        { icon: 'event_note', name: 'Cuộc họp có tiêu đề hơi dài 1 tí', location: 'Địa điểm 1', createdAt: new Date() },
        { icon: 'event_note', name: 'Cuộc họp có tiêu đề hơi dài 1 tí', location: 'Địa điểm 1', createdAt: new Date() },
        { icon: 'event_note', name: 'Cuộc họp có tiêu đề hơi dài 1 tí', location: 'Địa điểm 1', createdAt: new Date() },
      ]
    }
  }


  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }


}
