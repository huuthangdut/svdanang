import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatePipeService {

  constructor() { }

  toUnixTimestamp(value): number | null {
    if (moment(value).isValid()) {
      return +moment(value);
    }

    return null;
  }

  fromUnixTimeStamp(value: number): Date | null {
    if (moment(value).isValid()) {
      return moment(value).toDate();
    }

    return null;
  }
}
