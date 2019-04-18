import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { DateConstants } from './../constants/date.constant';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, DateConstants.DATE_VI);
  }
}