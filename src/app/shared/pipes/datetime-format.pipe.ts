import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { DateConstants } from '../constants/date.constant';

@Pipe({
  name: 'datetimeFormat'
})

export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, DateConstants.DATE_TIME_VI);
  }
}