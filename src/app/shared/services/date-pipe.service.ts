import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatePipeService {

  constructor() { }

  toUnixTimestamp(value): number {
    if (moment(value).isValid()) {
      return +moment(value);
    }

    return +moment();
  }

  fromUnixTimeStamp(value: number): Date {
    if (moment(value).isValid()) {
      return moment(value).toDate();
    }

    return moment().toDate();
  }
}
