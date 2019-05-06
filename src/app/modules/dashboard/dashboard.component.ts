import { Component, OnInit } from '@angular/core';
import { TdDigitsPipe, TdLoadingService } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { multi } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Current date
  year: any = new Date().getFullYear();

  products: Object[];
  alerts: Object[];

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  // line, area
  autoScale: boolean = true;

  constructor(
    private _titleService: Title,
    private _loadingService: TdLoadingService) {
    // Chart
    this.multi = multi.map((group: any) => {
      group.series = group.series.map((dataItem: any) => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });
  }

  ngOnInit(): void {
    this._titleService.setTitle('Covalent Quickstart');
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

}
