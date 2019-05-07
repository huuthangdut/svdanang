import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTimeAgo'
})

export class DateTimeAgoPipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    moment.locale('vi');
    return moment(value).fromNow();
  }

}